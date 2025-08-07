import re
import numpy as np
from collections import Counter, defaultdict
from typing import List, Dict, Tuple, Optional
import string
from difflib import SequenceMatcher
import json

class ServerNameExtractor:
    def __init__(self):
        # Padrões comuns de separadores e tags
        self.separators = ['|', '::', '#', '-', '•', '→', '►', '»']
        self.bracket_patterns = [r'\[.*?\]', r'\(.*?\)', r'\{.*?\}']
        
        # Padrões de tags comuns (para remoção)
        self.common_tags = {
            'game_modes': ['PVP', 'PVE', 'RP', 'ROLEPLAY', 'VANILLA', 'MODDED'],
            'regions': ['US', 'EU', 'BR', 'RU', 'UK', 'CA', 'AU', 'ASIA'],
            'player_limits': ['SOLO', 'DUO', 'TRIO', 'SQUAD', 'GROUP'],
            'server_info': ['FRESH', 'WIPED', 'WIPE', 'MAX', 'PP', 'FPS'],
            'maps': ['CHERNARUS', 'LIVONIA', 'NAMALSK', 'ESSEKER'],
            'features': ['HELI', 'CARS', 'TRADERS', 'SAFE', 'ZONE', 'RAID', 'TOKEN']
        }
        
        # Cache para otimização
        self.similarity_cache = {}
        self.canonical_cache = {}
        
    def preprocess_name(self, name: str) -> str:
        """Pré-processamento básico do nome"""
        # Remove caracteres especiais no início/fim
        name = name.strip()
        # Normaliza espaços múltiplos
        name = re.sub(r'\s+', ' ', name)
        return name
    
    def extract_by_separators(self, name: str) -> List[str]:
        """Extrai candidatos baseado em separadores comuns"""
        candidates = []
        
        # Tenta cada separador
        for sep in self.separators:
            if sep in name:
                parts = name.split(sep)
                # Pega a primeira parte (geralmente o nome canônico)
                first_part = parts[0].strip()
                if first_part:
                    candidates.append(first_part)
                break
        
        # Se não encontrou separador, tenta por brackets
        if not candidates:
            # Remove conteúdo entre brackets primeiro
            clean_name = name
            for pattern in self.bracket_patterns:
                clean_name = re.sub(pattern, '', clean_name).strip()
            
            if clean_name and clean_name != name:
                candidates.append(clean_name)
        
        return candidates
    
    def extract_by_position_analysis(self, name: str) -> List[str]:
        """Análise posicional baseada em padrões comuns"""
        candidates = []
        
        # Remove brackets primeiro
        clean_name = name
        for pattern in self.bracket_patterns:
            clean_name = re.sub(pattern, '', clean_name).strip()
        
        # Padrão: Nome + número/código (ex: "Rearmed US4")
        match = re.match(r'^([A-Za-z\s]+[A-Za-z])\s*[A-Z]*\d+', clean_name)
        if match:
            candidates.append(match.group(1).strip())
        
        # Padrão: Nome + "Main" ou similar
        match = re.match(r'^(.+?)\s+(Main|Primary|Official|Server)', clean_name, re.IGNORECASE)
        if match:
            candidates.append(match.group(1).strip())
        
        # Padrão: Nome antes de números ou códigos de região
        match = re.match(r'^(.+?)\s+(?:[A-Z]{2,3}\d+|#\d+|\d+)', clean_name)
        if match:
            candidates.append(match.group(1).strip())
        
        return candidates
    
    def extract_by_ml_heuristics(self, names: List[str]) -> Dict[str, str]:
        """Análise baseada em padrões de machine learning usando clustering de similaridade"""
        if len(names) < 2:
            return {names[0]: self.extract_primary_candidate(names[0])} if names else {}
        
        # Cria matriz de similaridade
        similarity_matrix = self._build_similarity_matrix(names)
        
        # Agrupa nomes similares
        clusters = self._cluster_by_similarity(names, similarity_matrix, threshold=0.4)
        
        # Extrai nome canônico para cada cluster
        results = {}
        for cluster in clusters:
            canonical = self._extract_canonical_from_cluster(cluster)
            for name in cluster:
                results[name] = canonical
        
        return results
    
    def _build_similarity_matrix(self, names: List[str]) -> np.ndarray:
        """Constrói matriz de similaridade entre nomes"""
        n = len(names)
        matrix = np.zeros((n, n))
        
        for i in range(n):
            for j in range(i, n):
                if i == j:
                    matrix[i][j] = 1.0
                else:
                    # Calcula múltiplas métricas de similaridade
                    sim = self._calculate_similarity(names[i], names[j])
                    matrix[i][j] = matrix[j][i] = sim
        
        return matrix
    
    def _calculate_similarity(self, name1: str, name2: str) -> float:
        """Calcula similaridade entre dois nomes usando múltiplas métricas"""
        # Cache para otimização
        cache_key = tuple(sorted([name1, name2]))
        if cache_key in self.similarity_cache:
            return self.similarity_cache[cache_key]
        
        # Extrai candidatos de ambos os nomes
        candidates1 = self.extract_primary_candidate(name1)
        candidates2 = self.extract_primary_candidate(name2)
        
        # Similaridade de sequência
        seq_sim = SequenceMatcher(None, candidates1.lower(), candidates2.lower()).ratio()
        
        # Similaridade de palavras-chave
        words1 = set(candidates1.lower().split())
        words2 = set(candidates2.lower().split())
        
        if words1 and words2:
            word_sim = len(words1.intersection(words2)) / len(words1.union(words2))
        else:
            word_sim = 0
        
        # Similaridade de prefixo comum
        common_prefix = self._longest_common_prefix(candidates1.lower(), candidates2.lower())
        prefix_sim = len(common_prefix) / max(len(candidates1), len(candidates2))
        
        # Combina métricas com pesos
        final_sim = (seq_sim * 0.4) + (word_sim * 0.4) + (prefix_sim * 0.2)
        
        self.similarity_cache[cache_key] = final_sim
        return final_sim
    
    def _longest_common_prefix(self, str1: str, str2: str) -> str:
        """Encontra o prefixo comum mais longo"""
        i = 0
        while i < min(len(str1), len(str2)) and str1[i] == str2[i]:
            i += 1
        return str1[:i]
    
    def _cluster_by_similarity(self, names: List[str], similarity_matrix: np.ndarray, threshold: float) -> List[List[str]]:
        """Agrupa nomes por similaridade"""
        n = len(names)
        visited = [False] * n
        clusters = []
        
        for i in range(n):
            if not visited[i]:
                cluster = [names[i]]
                visited[i] = True
                
                for j in range(i + 1, n):
                    if not visited[j] and similarity_matrix[i][j] >= threshold:
                        cluster.append(names[j])
                        visited[j] = True
                
                clusters.append(cluster)
        
        return clusters
    
    def _extract_canonical_from_cluster(self, cluster: List[str]) -> str:
        """Extrai o nome canônico de um cluster de nomes similares"""
        if len(cluster) == 1:
            return self.extract_primary_candidate(cluster[0])
        
        # Extrai candidatos de todos os nomes do cluster
        all_candidates = []
        for name in cluster:
            candidate = self.extract_primary_candidate(name)
            all_candidates.append(candidate)
        
        # Encontra o candidato mais comum/representativo
        # Estratégia: menor, mais limpo, mais frequente
        candidate_scores = {}
        
        for candidate in all_candidates:
            if candidate not in candidate_scores:
                candidate_scores[candidate] = {
                    'count': 0,
                    'avg_length': 0,
                    'cleanliness': self._calculate_cleanliness(candidate)
                }
            
            candidate_scores[candidate]['count'] += 1
            candidate_scores[candidate]['avg_length'] = len(candidate)
        
        # Pontuação baseada em frequência, limpeza e tamanho
        best_candidate = None
        best_score = -1
        
        for candidate, stats in candidate_scores.items():
            # Score = frequência * limpeza / comprimento_normalizado
            score = (stats['count'] * stats['cleanliness']) / (1 + stats['avg_length'] / 20)
            
            if score > best_score:
                best_score = score
                best_candidate = candidate
        
        return best_candidate or all_candidates[0]
    
    def _calculate_cleanliness(self, text: str) -> float:
        """Calcula o quão 'limpo' é um texto (menos tags, números, símbolos)"""
        if not text:
            return 0
        
        # Penaliza por números, símbolos e tags conhecidas
        penalty = 0
        
        # Penalidade por números
        penalty += len(re.findall(r'\d', text)) * 0.1
        
        # Penalidade por símbolos especiais
        penalty += len(re.findall(r'[^\w\s]', text)) * 0.15
        
        # Penalidade por tags conhecidas
        text_upper = text.upper()
        for tag_category in self.common_tags.values():
            for tag in tag_category:
                if tag in text_upper:
                    penalty += 0.2
        
        # Bônus por parecer um nome próprio (capitalização)
        if text and text[0].isupper():
            penalty -= 0.1
        
        # Normaliza entre 0 e 1
        cleanliness = max(0, 1 - (penalty / len(text)))
        return cleanliness
    
    def extract_primary_candidate(self, name: str) -> str:
        """Extrai o candidato primário para nome canônico"""
        if name in self.canonical_cache:
            return self.canonical_cache[name]
        
        name = self.preprocess_name(name)
        
        # Combina múltiplas estratégias
        candidates = []
        
        # Estratégia 1: Por separadores
        candidates.extend(self.extract_by_separators(name))
        
        # Estratégia 2: Por análise posicional
        candidates.extend(self.extract_by_position_analysis(name))
        
        # Estratégia 3: Fallback - primeira palavra ou duas primeiras palavras
        if not candidates:
            words = name.split()
            if len(words) >= 2:
                candidates.append(' '.join(words[:2]))
            elif words:
                candidates.append(words[0])
        
        # Remove brackets e limpa candidatos
        clean_candidates = []
        for candidate in candidates:
            clean = candidate
            for pattern in self.bracket_patterns:
                clean = re.sub(pattern, '', clean).strip()
            
            # Remove tags óbvias do final
            clean = self._remove_trailing_tags(clean)
            
            if clean and len(clean) > 1:
                clean_candidates.append(clean)
        
        # Seleciona o melhor candidato
        if clean_candidates:
            # Ordena por pontuação de limpeza
            best = max(clean_candidates, key=self._calculate_cleanliness)
        else:
            # Fallback para o nome original limpo
            best = re.sub(r'\[.*?\]|\(.*?\)|\{.*?\}', '', name).strip()
        
        self.canonical_cache[name] = best
        return best
    
    def _remove_trailing_tags(self, text: str) -> str:
        """Remove tags óbvias do final do texto"""
        # Padrões de tags no final
        patterns = [
            r'\s+(US|EU|BR|RU|UK|CA|AU)\d*$',
            r'\s+#\d+$',
            r'\s+(Main|Primary|Official|Server)$',
            r'\s+\d+$'
        ]
        
        for pattern in patterns:
            text = re.sub(pattern, '', text, flags=re.IGNORECASE)
        
        return text.strip()
    
    def extract_batch(self, names: List[str], use_clustering: bool = True) -> Dict[str, str]:
        """Extrai nomes canônicos para uma lista de nomes"""
        if not names:
            return {}
        
        if use_clustering and len(names) > 1:
            # Usa análise de clustering para melhor precisão
            return self.extract_by_ml_heuristics(names)
        else:
            # Processa individualmente
            results = {}
            for name in names:
                results[name] = self.extract_primary_candidate(name)
            return results
    
    def get_statistics(self, names: List[str]) -> Dict:
        """Gera estatísticas sobre os nomes processados"""
        results = self.extract_batch(names)
        
        # Conta frequência de nomes canônicos
        canonical_counts = Counter(results.values())
        
        # Analisa padrões de separadores
        separator_usage = Counter()
        for name in names:
            for sep in self.separators:
                if sep in name:
                    separator_usage[sep] += 1
                    break
        
        return {
            'total_names': len(names),
            'unique_canonical': len(canonical_counts),
            'canonical_frequency': dict(canonical_counts.most_common(10)),
            'separator_usage': dict(separator_usage),
            'avg_name_length': np.mean([len(name) for name in names]),
            'avg_canonical_length': np.mean([len(canonical) for canonical in results.values()])
        }

# Exemplo de uso e teste
def test_extractor():
    # Dados de teste do usuário
    test_data = [
        {"name": "OrigemZ Vanilla+ |Solo-Duo-Trio|RAIDTOKEN|1PP|NOVA SEASON", "expectedCanonicalName": "OrigemZ"},
        {"name": "Rearmed US4 | Solo/Duo/Trio", "expectedCanonicalName": "Rearmed"},
        {"name": "The Project Main - Chernarus | 4 Group Limit", "expectedCanonicalName": "The Project Main"},
        {"name": "heybarmby's Livonia - Organic RP", "expectedCanonicalName": "heybarmby"},
        {"name": "MAG MiddleAgedGamers #1 PVE |FRESH-WIPED 3 June|", "expectedCanonicalName": "MiddleAgedGamers"},
        {"name": "Rearmed US Main", "expectedCanonicalName": "Rearmed"},
        {"name": "[WIPED 18.07] BattleGroundZ :: Chernarus [3PP][EU] | Vanilla++", "expectedCanonicalName": "BattleGroundZ"},
        {"name": "Rearmed EU4 | Solo Duo Trio", "expectedCanonicalName": "Rearmed"},
        {"name": "OrigemZ Vanilla+ |GROUP|RAIDTOKEN|FPS++|NOVA SEASON", "expectedCanonicalName": "OrigemZ"},
        {"name": "[BR] EPIDEMIC Z BRASIL VANILLA-1PP-SOLO-DUO-TRIO-WIPOU", "expectedCanonicalName": "EPIDEMIC Z"},
        {"name": "MIDNIGHT PLUS 3PP | CHERNARUS | WIPE 19.07", "expectedCanonicalName": "MIDNIGHT PLUS"},
        {"name": "Rearmed US3 | 5 Man Max", "expectedCanonicalName": "Rearmed"},
        {"name": "Sunnyvale #11 | Chernarus | PvE w/ PvP Zones", "expectedCanonicalName": "Sunnyvale"},
        {"name": "DayZ Aftermath Chernarus 3 | Max Group 3", "expectedCanonicalName": "DayZ Aftermath"},
        {"name": "MIDNIGHT PLUS 3PP | n2 | CHERNARUS | WIPE 19.07", "expectedCanonicalName": "MIDNIGHT PLUS"},
        {"name": "[BR] THELINEZ | PVP/PVE | NORAID | CHERNO | HELI | WIPE 25/07", "expectedCanonicalName": "THELINEZ"}
    ]
    
    # Inicializa o extrator
    extractor = ServerNameExtractor()
    
    # Extrai nomes
    names = [item["name"] for item in test_data]
    results = extractor.extract_batch(names, use_clustering=True)
    
    # Avalia resultados
    print("=== RESULTADOS DA EXTRAÇÃO ===")
    correct = 0
    total = len(test_data)
    
    for item in test_data:
        name = item["name"]
        expected = item["expectedCanonicalName"]
        extracted = results[name]
        
        is_correct = expected.lower() == extracted.lower()
        if is_correct:
            correct += 1
        
        print(f"✓ {extracted}" if is_correct else f"✗ {extracted} (esperado: {expected})")
        print(f"  Input: {name}")
        print()
    
    accuracy = (correct / total) * 100
    print(f"=== MÉTRICAS ===")
    print(f"Precisão: {accuracy:.1f}% ({correct}/{total})")
    
    # Estatísticas detalhadas
    stats = extractor.get_statistics(names)
    print(f"\nEstatísticas:")
    for key, value in stats.items():
        print(f"  {key}: {value}")

if __name__ == "__main__":
    test_extractor()