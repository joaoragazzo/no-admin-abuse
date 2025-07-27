import re
import json
from typing import Dict, List, Optional, Set
from dataclasses import dataclass
from difflib import SequenceMatcher

@dataclass
class ServerInfo:
    canonical_name: str
    region: Optional[str] = None
    map_name: Optional[str] = None
    gameplay_tags: List[str] = None
    raw_name: str = ""
    
    def __post_init__(self):
        if self.gameplay_tags is None:
            self.gameplay_tags = []

class DayZServerClassifier:
    def __init__(self):
        # Configurações de tags conhecidas com variações
        self.gameplay_tags_config = {
            'vanilla': ['vanilla', 'vanilla+', 'vanilla++', 'vanila', 'vanila+'],
            'modded': ['modded', 'mod', 'mods', 'fullmod', 'full-mod'],
            'pvp': ['pvp', 'fullpvp', 'full-pvp'],
            'pve': ['pve', 'pve-only', 'pveonly'],
            'rp': ['rp', 'roleplay', 'role-play'],
            'solo': ['solo', 'solo-duo-trio', 'solo/duo/trio'],
            'duo': ['duo', 'solo-duo-trio', 'solo/duo/trio'],
            'trio': ['trio', 'solo-duo-trio', 'solo/duo/trio'],
            '1pp': ['1pp', '1st', 'first-person', 'firstperson'],
            '3pp': ['3pp', '3rd', 'third-person', 'thirdperson'],
            'no-raid': ['no-raid', 'noraid', 'no_raid', 'noraidweekdays'],
            'no-base': ['no-base', 'nobase', 'no_base'],
            'high-fps': ['high-fps', 'highfps', 'high_fps', 'fps+'],
            'fresh-wipe': ['fresh-wipe', 'fresh-wiped', 'freshwipe', 'freshwiped'],
            'wiped': ['wiped', 'wipe', 'fresh', 'reset'],
            'weekend-raid': ['weekend-raid', 'weekendraid', 'weekend-raiding'],
            'loaded': ['loaded', 'loot+', 'more-loot', 'moreloot'],
            'cars': ['cars+', 'more-cars', 'morecars'],
            'helis': ['helis', 'helicopters', 'heli'],
            'balanced': ['balanced', 'balanced-mods']
        }
        
        # Regiões conhecidas
        self.regions = {
            'us': ['us', 'usa', 'america', 'na', 'north-america'],
            'eu': ['eu', 'europe', 'european'],
            'br': ['br', 'brasil', 'brazil', 'sa', 'south-america'],
            'ru': ['ru', 'russia', 'russian'],
            'au': ['au', 'australia', 'oceania'],
            'as': ['as', 'asia', 'asian']
        }
        
        # Mapas conhecidos
        self.maps = {
            'chernarus': ['chernarus', 'cherno'],
            'livonia': ['livonia'],
            'deerisle': ['deerisle', 'deer-isle'],
            'stalker': ['stalker'],
            'chernobyl': ['chernobyl']
        }
        
        # Palavras comuns que devem ser ignoradas no nome canônico
        self.ignore_words = {
            'server', 'srv', 'official', 'community', '#1', '#2', '#3', '#4', '#5',
            'max', 'group', 'limit', 'fps', 'start', 'k', 'only', 'today'
        }
        
    def normalize_text(self, text: str) -> str:
        """Normaliza texto removendo caracteres especiais e convertendo para minúsculas"""
        return re.sub(r'[^\w\s-]', '', text.lower().strip())
    
    def similarity(self, a: str, b: str) -> float:
        """Calcula similaridade entre duas strings"""
        return SequenceMatcher(None, a, b).ratio()
    
    def extract_bracketed_content(self, text: str) -> tuple:
        """Extrai conteúdo entre colchetes e parênteses"""
        brackets = re.findall(r'\[([^\]]+)\]', text)
        parentheses = re.findall(r'\(([^)]+)\)', text)
        pipes = re.findall(r'\|([^|]+)\|', text)
        
        # Remove conteúdo extraído do texto principal
        clean_text = re.sub(r'\[[^\]]+\]|\([^)]+\)|\|[^|]+\|', '', text).strip()
        
        return clean_text, brackets + parentheses + pipes
    
    def find_best_match(self, word: str, categories: Dict[str, List[str]], threshold: float = 0.8) -> Optional[str]:
        """Encontra a melhor correspondência para uma palavra nas categorias"""
        word_norm = self.normalize_text(word)
        best_match = None
        best_score = 0
        
        for category, variations in categories.items():
            for variation in variations:
                similarity = self.similarity(word_norm, self.normalize_text(variation))
                if similarity >= threshold and similarity > best_score:
                    best_match = category
                    best_score = similarity
                    
        return best_match
    
    def extract_region(self, tokens: List[str]) -> Optional[str]:
        """Extrai região dos tokens"""
        for token in tokens:
            region = self.find_best_match(token, self.regions)
            if region:
                return region.upper()
        return None
    
    def extract_map(self, tokens: List[str]) -> Optional[str]:
        """Extrai mapa dos tokens"""
        for token in tokens:
            map_name = self.find_best_match(token, self.maps)
            if map_name:
                return map_name.title()
        return None
    
    def extract_gameplay_tags(self, tokens: List[str]) -> List[str]:
        """Extrai tags de gameplay dos tokens"""
        tags = set()
        
        for token in tokens:
            # Verifica correspondências diretas e similares
            tag = self.find_best_match(token, self.gameplay_tags_config, threshold=0.7)
            if tag:
                tags.add(tag)
            
            # Verifica padrões específicos
            if re.search(r'\d+pp', token.lower()):
                if '1' in token:
                    tags.add('1pp')
                elif '3' in token:
                    tags.add('3pp')
            
            # Verifica grupo de jogadores
            if re.search(r'solo|duo|trio', token.lower()):
                if 'solo' in token.lower():
                    tags.add('solo')
                if 'duo' in token.lower():
                    tags.add('duo')
                if 'trio' in token.lower():
                    tags.add('trio')
            
            # Verifica datas de wipe
            if re.search(r'\d{1,2}[./]\d{1,2}|\d{1,2}\s*(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)', token.lower()):
                tags.add('wiped')
        
        return list(tags)
    
    def extract_canonical_name(self, text: str, extracted_tokens: List[str]) -> str:
        """Extrai o nome canônico removendo tags conhecidas"""
        # Remove separadores comuns
        text = re.sub(r'::|[|#]', ' ', text)
        
        # Tokeniza
        words = re.findall(r'\w+', text.lower())
        
        # Remove palavras que são tags conhecidas ou palavras comuns
        canonical_words = []
        for word in words:
            is_tag = False
            
            # Verifica se é uma tag conhecida
            for category_tags in self.gameplay_tags_config.values():
                for tag in category_tags:
                    if self.similarity(word, self.normalize_text(tag)) > 0.8:
                        is_tag = True
                        break
                if is_tag:
                    break
            
            # Verifica se é região ou mapa
            if not is_tag:
                if (self.find_best_match(word, self.regions) or 
                    self.find_best_match(word, self.maps)):
                    is_tag = True
            
            # Verifica se é palavra a ser ignorada
            if not is_tag and word not in self.ignore_words:
                # Verifica se não é um número simples ou data
                if not re.match(r'^\d+$|^\d{1,2}[./]\d{1,2}$', word):
                    canonical_words.append(word)
        
        # Pega as primeiras palavras mais significativas
        canonical_name = ' '.join(canonical_words[:3]) if canonical_words else text.split()[0]
        return canonical_name.title()
    
    def classify_server(self, server_name: str) -> ServerInfo:
        """Classifica um nome de servidor"""
        # Extrai conteúdo entre separadores
        clean_text, extracted_content = self.extract_bracketed_content(server_name)
        
        # Tokeniza todo o conteúdo
        all_tokens = []
        all_tokens.extend(re.findall(r'\w+', clean_text))
        for content in extracted_content:
            all_tokens.extend(re.findall(r'\w+', content))
        
        # Extrai informações
        region = self.extract_region(all_tokens)
        map_name = self.extract_map(all_tokens)
        gameplay_tags = self.extract_gameplay_tags(all_tokens)
        canonical_name = self.extract_canonical_name(clean_text, all_tokens)
        
        return ServerInfo(
            canonical_name=canonical_name,
            region=region,
            map_name=map_name,
            gameplay_tags=gameplay_tags,
            raw_name=server_name
        )
    
    def classify_multiple(self, server_names: List[str]) -> List[Dict]:
        """Classifica múltiplos servidores e retorna JSON"""
        results = []
        for name in server_names:
            server_info = self.classify_server(name)
            results.append({
                'raw_name': server_info.raw_name,
                'canonical_name': server_info.canonical_name,
                'region': server_info.region,
                'map': server_info.map_name,
                'gameplay_tags': server_info.gameplay_tags
            })
        return results
    
    def add_gameplay_tag(self, tag_name: str, variations: List[str]):
        """Adiciona nova tag de gameplay"""
        self.gameplay_tags_config[tag_name] = variations
    
    def add_region(self, region_code: str, variations: List[str]):
        """Adiciona nova região"""
        self.regions[region_code] = variations
    
    def add_map(self, map_name: str, variations: List[str]):
        """Adiciona novo mapa"""
        self.maps[map_name] = variations

# Exemplo de uso
if __name__ == "__main__":
    classifier = DayZServerClassifier()
    
    # Lista de servidores de exemplo
    servers = [
        "OrigemZ Vanilla+ |Solo-Duo-Trio|RAIDTOKEN|1PP|NOVA SEASON",
        "[WIPED 18.07] BattleGroundZ :: Chernarus [3PP][EU] | Vanilla++",
        "MAG MiddleAgedGamers #1 PVE |FRESH-WIPED 3 June|",
        "heybarmby's Livonia - Organic RP",
        "DayZ Aftermath Chernarus 3 | Max Group 3",
        "MIDNIGHT PLUS 3PP | n2 | CHERNARUS | WIPE 19.07",
        "Ground Zero US2 | Solo/Duo/Trio | Weekend Raiding | High FPS",
        "[BR] EPIDEMIC Z BRASIL VANILLA-1PP-GROUP-WIPE 08/07",
        "SUETA RU | 3PP | PVP MORE LOOT | WIPE 19.07"
    ]
    
    # Classifica os servidores
    results = classifier.classify_multiple(servers)
    
    # Exibe resultados em JSON formatado
    print(json.dumps(results, indent=2, ensure_ascii=False))
    
    # Exemplo de como adicionar novas tags
    # classifier.add_gameplay_tag('hardcore', ['hardcore', 'hard-core', 'hc'])
    # classifier.add_region('jp', ['jp', 'japan', 'japanese'])