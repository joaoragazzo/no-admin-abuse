from rapidfuzz import fuzz
from typing import Dict, List, Set, Optional
import re
from dataclasses import dataclass

@dataclass
class TagMapping:
    """Representa um mapeamento de tag com suas variações"""
    canonical: str  # Tag normalizada (ex: "VANILLAPP")
    variations: Set[str]  # Variações conhecidas
    similarity_threshold: int = 85  # Threshold para matching fuzzy

class TagNormalizer:
    """Sistema de normalização de tags de gameplay"""
    
    def __init__(self):
        # Dicionário de mapeamentos: tag_normalizada -> TagMapping
        self.tag_mappings: Dict[str, TagMapping] = {}
        
        # Cache para evitar recalcular similaridades
        self.similarity_cache: Dict[str, str] = {}
        
        # Inicializa com mapeamentos padrão
        self._initialize_default_mappings()
    
    def _initialize_default_mappings(self):
        """Inicializa com mapeamentos padrão conhecidos"""
        
        # Mapeamentos para Vanilla - ORDEM IMPORTA (mais específico primeiro)
        self.add_mapping("VANILLAPP", {
            "vanilla++", "vanila++", "vanilha++", "van++", "vani++"
        })

        self.add_mapping("VANILLAP", {
            "vanilla+", "vanila+", "vanilha+", "van+", "vani+", "vp", "vanp", "vanilap"
        })

        self.add_mapping("VANILLA", {
            "vanilla", "vanila", "vanilha", "vani", "van"
        })
        
        # Mapeamentos para perspectiva
        self.add_mapping("FPP", {
            "1pp", "fpp", "first person", "first-person", "firstperson", 
            "primeira pessoa", "1st", "fps"
        })
        
        self.add_mapping("TPP", {
            "3pp", "tpp", "third", "third-person", "thirdperson",
            "terceira", "3rd", "3person"
        })
        
        # Mapeamentos para PvP
        self.add_mapping("PVP", {
            "pvp", "player vs player", "playervspLayer", "pvp+"
        })
        
        self.add_mapping("PVE", {
            "pve", "player vs environment", "pve+", "coop", "co-op"
        })
        
        self.add_mapping("FULLPVP", {
            "fullpvp", "full-pvp", "full_pvp", "totalpvp", "pvpfull",
            "completepvp", "hardcorepvp"
        })
        
        # Mapeamentos para tipos de servidor
        self.add_mapping("ROLEPLAY", {
            "rp", "roleplay", "role-play", "role_play", "roleplaying",
            "rpg", "immersive", "organic rp"
        })
        
        self.add_mapping("HARDCORE", {
            "hardcore", "hard-core", "hard_core", "hc", "hardmode",
            "extreme", "brutal", "hardcore+", "hardcore++"
        })
        
        # Mapeamentos para grupo/solo - SEPARADOS
        self.add_mapping("SOLO", {
            "solo", "single", "individual", "alone", "1man", "oneman",
            "1player", "singleplayer", "sozinho"
        })
        
        self.add_mapping("DUO", {
            "duo", "double", "pair", "2man", "twoman", "dupla",
            "2player", "2players", "dois", "casal", "2p"
        })
        
        self.add_mapping("TRIO", {
            "trio", "triple", "3man", "threeman", "three",
            "3player", "3players", "tres", "3p", "max group 3"
        })
        
        self.add_mapping("SQUAD", {
            "squad", "team", "group", "crew", "clan", "5man", "fiveman",
            "4man", "fourman", "4player", "5player", "grupo", "equipe"
        })
        
        self.add_mapping("NOBASE", {
            "nobase", "no-base", "no base", "nobasebuilding", "no building"
        })

        self.add_mapping("WIPE", {
            "fresh wipe", "nova season", "new season", "season", "wipe", "wiped",
            "fresh", "fresh-wiped", "wiped today"
        })
        
        self.add_mapping("DEATHMATCH", {
            "deathmatch", "dm"
        })

        self.add_mapping("NORAID", {
            "noraid", "no-raid", "no raid"
        })
        

    def _split_combined_tags(self, tag: str) -> List[str]:
        """
        Separa tags combinadas como 'solo/duo/trio' ou 'solo-duo-trio' em tags individuais
        """
        # Lista de separadores possíveis
        separators = ['/', '-', '|', '&']
        
        # Verifica se contém algum separador
        for sep in separators:
            if sep in tag:
                # Separa e limpa cada parte
                parts = [part.strip() for part in tag.split(sep) if part.strip()]
                return parts
        
        # Se não tem separador, retorna a tag como lista única
        return [tag]

    def add_mapping(self, canonical_tag: str, variations: Set[str], threshold: int = 85):
        """Adiciona ou atualiza um mapeamento de tag"""
        canonical_tag = canonical_tag.upper()
        
        # Normaliza todas as variações para lowercase
        normalized_variations = {var.lower().strip() for var in variations}
        
        if canonical_tag in self.tag_mappings:
            # Atualiza variações existentes
            self.tag_mappings[canonical_tag].variations.update(normalized_variations)
        else:
            # Cria novo mapeamento
            self.tag_mappings[canonical_tag] = TagMapping(
                canonical=canonical_tag,
                variations=normalized_variations,
                similarity_threshold=threshold
            )
        
        # Limpa cache para forçar recálculo
        self.similarity_cache.clear()
    
    def _preprocess_tag(self, tag: str) -> str:
        """Pré-processa uma tag removendo caracteres especiais MAS MANTÉM + e números"""
        # Converte para lowercase e remove espaços nas bordas
        tag = tag.lower().strip()
        
        # Remove caracteres especiais MAS MANTÉM + e números importantes
        # Substitui hífens e underscores por espaços, mas mantém + e números
        tag = re.sub(r'[^\w\+\s]', ' ', tag)
        tag = re.sub(r'\s+', ' ', tag).strip()
        
        return tag
    
    def _find_exact_match(self, tag: str) -> Optional[str]:
        """Busca por match exato nas variações conhecidas"""
        processed_tag = self._preprocess_tag(tag)
        
        # Ordena por especificidade (mais específico primeiro)
        # Isso garante que vanilla++ seja encontrado antes de vanilla
        sorted_mappings = sorted(
            self.tag_mappings.items(),
            key=lambda x: max(len(var) for var in x[1].variations),
            reverse=True
        )
        
        for canonical, mapping in sorted_mappings:
            # Testa match exato primeiro
            if processed_tag in mapping.variations:
                return canonical
            
            # Testa também variações processadas
            for variation in mapping.variations:
                if self._preprocess_tag(variation) == processed_tag:
                    return canonical
        
        return None
    
    def _find_fuzzy_match(self, tag: str) -> Optional[str]:
        """Busca por match fuzzy usando similaridade de strings"""
        processed_tag = self._preprocess_tag(tag)
        
        # Ignora tags muito curtas ou que parecem códigos/números
        if len(processed_tag) < 2 or re.match(r'^[\d\.\-]+$', processed_tag):
            return None
        
        best_match = None
        best_score = 0
        
        for canonical, mapping in self.tag_mappings.items():
            for variation in mapping.variations:
                processed_variation = self._preprocess_tag(variation)
                
                # Calcula similaridade
                score = fuzz.ratio(processed_tag, processed_variation)
                
                # Também testa com partial ratio
                partial_score = fuzz.partial_ratio(processed_tag, processed_variation)
                final_score = max(score, partial_score)
                
                if (final_score >= mapping.similarity_threshold and 
                    final_score > best_score):
                    best_match = canonical
                    best_score = final_score
        
        return best_match
    
    def normalize_tag(self, tag_input):
        """
        Normaliza uma tag individual ou lista de tags
        Agora suporta tags combinadas como 'solo/duo/trio'
        
        Args:
            tag_input: str ou List[str] - Tag individual ou lista de tags
            
        Returns:
            str ou List[str] - Tag normalizada ou lista de tags normalizadas
        """
        # Se recebeu uma lista, processa cada item
        if isinstance(tag_input, list):
            return self.normalize_tags(tag_input)
        
        # Se recebeu uma string individual
        if not isinstance(tag_input, str) or not tag_input.strip():
            return []
        
        original_tag = tag_input.strip()
        
        # Primeiro, verifica se é uma tag combinada
        split_tags = self._split_combined_tags(original_tag)
        
        # Se foi separada em múltiplas tags, processa cada uma
        if len(split_tags) > 1:
            normalized_list = []
            for single_tag in split_tags:
                normalized = self._normalize_single_tag(single_tag)
                if normalized:  # Só adiciona se encontrou match
                    normalized_list.append(normalized)
            return normalized_list
        
        # Se é uma tag simples, processa normalmente
        result = self._normalize_single_tag(original_tag)
        return result if result else None
    
    def _normalize_single_tag(self, tag: str) -> Optional[str]:
        """
        Normaliza uma única tag (sem separadores)
        Retorna None se não encontrar match conhecido
        """
        if not tag or not tag.strip():
            return None
            
        original_tag = tag.strip()
        
        # Verifica cache primeiro
        if original_tag in self.similarity_cache:
            cached_result = self.similarity_cache[original_tag]
            return cached_result if cached_result != "NO_MATCH" else None
        
        # Busca match exato primeiro (mais rápido)
        exact_match = self._find_exact_match(original_tag)
        if exact_match:
            self.similarity_cache[original_tag] = exact_match
            return exact_match
        
        # Se não encontrou match exato, tenta fuzzy matching
        fuzzy_match = self._find_fuzzy_match(original_tag)
        if fuzzy_match:
            self.similarity_cache[original_tag] = fuzzy_match
            return fuzzy_match
        
        # Se não encontrou nenhum match, marca como NO_MATCH no cache
        self.similarity_cache[original_tag] = "NO_MATCH"
        return None

    def normalize_tags(self, tags: List[str]) -> List[str]:
        """Normaliza uma lista de tags"""
        if not tags:
            return []
        
        normalized = []
        seen = set()  # Para evitar duplicatas
        
        for tag in tags:
            result = self.normalize_tag(tag)
            
            # Se o resultado é uma lista (tag combinada foi separada)
            if isinstance(result, list):
                for normalized_tag in result:
                    if normalized_tag and normalized_tag not in seen:
                        normalized.append(normalized_tag)
                        seen.add(normalized_tag)
            # Se o resultado é uma string simples
            elif result and result not in seen:
                normalized.append(result)
                seen.add(result)
        
        return normalized