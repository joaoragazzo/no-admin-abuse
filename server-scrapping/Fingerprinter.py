from typing import List, Dict, Set, Tuple
from interfaces.ServerInfo import ServerInfo
import re
from difflib import SequenceMatcher
from collections import defaultdict

class Fingerprinter:
    def __init__(self):
        # Threshold para considerar nomes similares (0.0 a 1.0)
        self.similarity_threshold = 0.7
        
        # Peso para diferentes tipos de similaridade
        self.weights = {
            'name_similarity': 0.5,      # Similaridade do nome canônico
            'tags_overlap': 0.2,         # Sobreposição de tags
            'region_match': 0.15,        # Mesma região
            'map_match': 0.1,           # Mesmo mapa
            'url_match': 0.05           # Mesmo domínio de URL
        }
        
        # Palavras que indicam séries/network de servidores
        self.series_indicators = {
            'podpivas', 'stalker', 'the wall', 'saviors', 'агония', 'agonia',
            'blaklandz', 'dayzz', 'expansion', 'the last', 'zombieland',
            'veteranos', 'nova ordem', 'red echo', 'atom', 'fenix'
        }
        
        # Padrões de stopwords para melhor comparação
        self.name_stopwords = {
            'server', 'srv', 'dayz', 'official', 'season', 'new', 'old',
            'best', 'top', 'hard', 'hardcore', 'survival', 'pve', 'pvp'
        }

    def fingerprint_servers(self, servers: List[ServerInfo]) -> Dict[str, List[ServerInfo]]:
        """Agrupa servidores similares por fingerprint"""
        
        # Primeiro, vamos preparar os dados
        prepared_servers = self._prepare_servers(servers)
        
        # Criar grupos baseados em similaridade
        groups = self._create_similarity_groups(prepared_servers)
        
        # Refinar grupos e nomear
        final_groups = self._refine_and_name_groups(groups)
        
        return final_groups

    def _prepare_servers(self, servers: List[ServerInfo]) -> List[ServerInfo]:
        """Prepara os servidores para análise de similaridade"""
        prepared = []
        
        for server in servers:
            # Garantir que todos os campos necessários existem
            if not hasattr(server, 'canonicalName') or not server.canonicalName:
                server.canonicalName = server.name.lower()
            
            if not hasattr(server, 'tags'):
                server.tags = []
            
            if not hasattr(server, 'regionTags'):
                server.regionTags = []
                
            if not hasattr(server, 'map'):
                server.map = None
                
            if not hasattr(server, 'siteUrl'):
                server.siteUrl = []
            
            # Criar uma versão limpa do nome para comparação
            server._clean_comparison_name = self._create_clean_comparison_name(server.canonicalName)
            
            prepared.append(server)
        
        return prepared

    def _create_clean_comparison_name(self, name: str) -> str:
        """Cria uma versão super limpa do nome para comparação"""
        if not name:
            return ""
            
        # Converter para minúsculo
        clean = name.lower().strip()
        
        # Remover números (para agrupar séries)
        clean = re.sub(r'\d+', '', clean)
        
        # Remover caracteres especiais
        clean = re.sub(r'[^\w\s]', ' ', clean)
        
        # Remover stopwords
        words = clean.split()
        words = [w for w in words if w not in self.name_stopwords and len(w) > 1]
        
        return ' '.join(words).strip()

    def _create_similarity_groups(self, servers: List[ServerInfo]) -> List[List[ServerInfo]]:
        """Cria grupos baseados em similaridade"""
        groups = []
        processed = set()
        
        for i, server1 in enumerate(servers):
            if i in processed:
                continue
                
            # Criar novo grupo com este servidor
            current_group = [server1]
            processed.add(i)
            
            # Encontrar servidores similares
            for j, server2 in enumerate(servers):
                if j <= i or j in processed:
                    continue
                    
                similarity_score = self._calculate_similarity(server1, server2)
                
                if similarity_score >= self.similarity_threshold:
                    current_group.append(server2)
                    processed.add(j)
            
            groups.append(current_group)
        
        return groups

    def _calculate_similarity(self, server1: ServerInfo, server2: ServerInfo) -> float:
        """Calcula score de similaridade entre dois servidores"""
        
        # 1. Similaridade do nome canônico
        name_sim = self._calculate_name_similarity(
            server1._clean_comparison_name, 
            server2._clean_comparison_name
        )
        
        # 2. Sobreposição de tags
        tags_sim = self._calculate_tags_overlap(server1.tags, server2.tags)
        
        # 3. Match de região
        region_sim = self._calculate_region_match(server1.regionTags, server2.regionTags)
        
        # 4. Match de mapa
        map_sim = self._calculate_map_match(server1.map, server2.map)
        
        # 5. Match de URL/domínio
        url_sim = self._calculate_url_match(server1.siteUrl, server2.siteUrl)
        
        # Score final ponderado
        final_score = (
            name_sim * self.weights['name_similarity'] +
            tags_sim * self.weights['tags_overlap'] +
            region_sim * self.weights['region_match'] +
            map_sim * self.weights['map_match'] +
            url_sim * self.weights['url_match']
        )
        
        return final_score

    def _calculate_name_similarity(self, name1: str, name2: str) -> float:
        """Calcula similaridade entre dois nomes"""
        if not name1 or not name2:
            return 0.0
            
        # Usar SequenceMatcher para similaridade básica
        basic_similarity = SequenceMatcher(None, name1, name2).ratio()
        
        # Bonus para palavras chave de séries conhecidas
        series_bonus = 0.0
        for indicator in self.series_indicators:
            if indicator in name1.lower() and indicator in name2.lower():
                series_bonus = 0.3
                break
        
        # Bonus para palavras em comum
        words1 = set(name1.split())
        words2 = set(name2.split())
        if words1 and words2:
            common_words_ratio = len(words1.intersection(words2)) / len(words1.union(words2))
            series_bonus += common_words_ratio * 0.2
        
        return min(1.0, basic_similarity + series_bonus)

    def _calculate_tags_overlap(self, tags1: List[str], tags2: List[str]) -> float:
        """Calcula sobreposição de tags"""
        if not tags1 or not tags2:
            return 0.0
            
        set1 = set(tag.lower() for tag in tags1)
        set2 = set(tag.lower() for tag in tags2)
        
        if not set1 or not set2:
            return 0.0
            
        intersection = len(set1.intersection(set2))
        union = len(set1.union(set2))
        
        return intersection / union if union > 0 else 0.0

    def _calculate_region_match(self, regions1: List[str], regions2: List[str]) -> float:
        """Calcula match de região"""
        if not regions1 or not regions2:
            return 0.0
            
        set1 = set(region.lower() for region in regions1)
        set2 = set(region.lower() for region in regions2)
        
        return 1.0 if set1.intersection(set2) else 0.0

    def _calculate_map_match(self, map1: str, map2: str) -> float:
        """Calcula match de mapa"""
        if not map1 or not map2:
            return 0.0
            
        return 1.0 if map1.lower() == map2.lower() else 0.0

    def _calculate_url_match(self, urls1: List[str], urls2: List[str]) -> float:
        """Calcula match de domínio das URLs"""
        if not urls1 or not urls2:
            return 0.0
            
        domains1 = set()
        domains2 = set()
        
        for url in urls1:
            domain = self._extract_domain(url)
            if domain:
                domains1.add(domain)
                
        for url in urls2:
            domain = self._extract_domain(url)
            if domain:
                domains2.add(domain)
        
        return 1.0 if domains1.intersection(domains2) else 0.0

    def _extract_domain(self, url: str) -> str:
        """Extrai domínio de uma URL"""
        if not url:
            return ""
            
        # Regex simples para extrair domínio
        match = re.search(r'(?:https?://)?(?:www\.)?([^/]+)', url)
        return match.group(1).lower() if match else ""

    def _refine_and_name_groups(self, groups: List[List[ServerInfo]]) -> Dict[str, List[ServerInfo]]:
        """Refina os grupos e cria nomes apropriados"""
        final_groups = {}
        
        for group in groups:
            if len(group) == 0:
                continue
                
            # Decidir nome do grupo
            group_name = self._decide_group_name(group)
            
            # Se já existe um grupo com este nome, mesclar
            if group_name in final_groups:
                final_groups[group_name].extend(group)
            else:
                final_groups[group_name] = group
        
        # Ordenar servidores dentro de cada grupo
        for group_name in final_groups:
            final_groups[group_name].sort(key=lambda s: (s.canonicalName or s.name, s.name))
        
        return final_groups

    def _decide_group_name(self, group: List[ServerInfo]) -> str:
        """Decide o melhor nome para um grupo de servidores"""
        
        # Se só tem um servidor, usar nome canônico
        if len(group) == 1:
            return group[0].canonicalName or group[0].name
        
        # Encontrar palavras mais comuns nos nomes
        word_frequency = defaultdict(int)
        
        for server in group:
            name = server.canonicalName or server.name
            # Limpar e dividir em palavras
            clean_name = re.sub(r'[^\w\s]', ' ', name.lower())
            words = [w for w in clean_name.split() if len(w) > 2 and w not in self.name_stopwords]
            
            for word in words:
                word_frequency[word] += 1
        
        # Encontrar palavras que aparecem na maioria dos servidores
        threshold = len(group) * 0.5  # Pelo menos 50% dos servidores
        common_words = [word for word, freq in word_frequency.items() if freq >= threshold]
        
        if common_words:
            # Priorizar palavras de séries conhecidas
            for word in common_words:
                if word in self.series_indicators:
                    return word.title()
            
            # Senão, usar a palavra mais frequente e mais longa
            best_word = max(common_words, key=lambda w: (word_frequency[w], len(w)))
            return best_word.title()
        
        # Fallback: usar o nome canônico do primeiro servidor
        return group[0].canonicalName or group[0].name

    def print_groups_summary(self, groups: Dict[str, List[ServerInfo]]):
        """Imprime um resumo dos grupos encontrados"""
        print(f"Encontrados {len(groups)} grupos de servidores:")
        print("=" * 50)
        
        # Ordenar grupos por tamanho (maiores primeiro)
        sorted_groups = sorted(groups.items(), key=lambda x: len(x[1]), reverse=True)
        
        for group_name, servers in sorted_groups:
            print(f"\n🎮 {group_name} ({len(servers)} servidores):")
            for i, server in enumerate(servers[:5], 1):  # Mostrar apenas os primeiros 5
                print(f"  {i}. {server.name}")
            
            if len(servers) > 5:
                print(f"  ... e mais {len(servers) - 5} servidores")
        
        print(f"\nTotal de servidores processados: {sum(len(servers) for servers in groups.values())}")

    def get_group_statistics(self, groups: Dict[str, List[ServerInfo]]) -> Dict:
        """Retorna estatísticas dos grupos"""
        total_servers = sum(len(servers) for servers in groups.values())
        single_server_groups = len([g for g in groups.values() if len(g) == 1])
        multi_server_groups = len(groups) - single_server_groups
        
        largest_group = max(groups.values(), key=len) if groups else []
        
        return {
            'total_groups': len(groups),
            'total_servers': total_servers,
            'single_server_groups': single_server_groups,
            'multi_server_groups': multi_server_groups,
            'largest_group_size': len(largest_group),
            'average_group_size': total_servers / len(groups) if groups else 0
        }