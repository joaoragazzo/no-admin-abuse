from typing import List, Optional, Set
from interfaces.ServerInfo import ServerInfo
import re

class Normalizer:
    def __init__(self):
        # Regex patterns compilados para melhor performance
        self.urlRegex = re.compile(r'(https?://[^\s]+|[\w.-]+\.[a-z]{2,}/[^\s]*)', re.IGNORECASE)
        self.instanceNumberRegex = re.compile(r'#(\d+)')
        self.wipedRegex = re.compile(r'\b(wiped?|inaugurad[oa]|inaugura[çc][ãa]o)\b', re.IGNORECASE)
        
        # Tags mais abrangentes e organizadas por categoria
        self.gameplayTagsRegex = re.compile(
            r'\b(no-?raid|vanilla\+{0,2}|v\+{1,2}|deathmatch|dm|pvp\+?|pve\+?|pvevp|rp|roleplay|'
            r'hardcore\+{0,2}|hc|survival|adventure|quest|quests|trader|trading|'
            r'friendly|modded|vanilla|casual|softcore|no pvp|fpp|tpp|3pp|1pp|no-base|lite|no base)\b', 
            re.IGNORECASE
        )
        
        self.technicalTagsRegex = re.compile(
            r'\b(3pp|1pp|first\s+person|third\s+person|loot\s*x?\+*\d*|x\d+loot|'
            r'start\s*\d+k?|bitcoin|dna|ai|bots?|heli?s?|cars?|vehicles?|boats?|'
            r'skill\s*perks?|skills?|koth|king\s+of\s+the\s+hill|bbp|airdrops?|'
            r'events?|custom|whitelist|no whitelist|wl|no\s+kos|nokos|aod)\b', 
            re.IGNORECASE
        )
        
        # Regiões expandidas
        self.regionTagRegex = re.compile(
            r'\b('
            r'north\s*america|latin\s*america|us/en|ger/eng?|usa|na|eu|europe|brasil|brazil|'
            r'australia|oceania|russia|ukraine|germany|belgium|france|czech|slovakia|'
            r'serbia|hungary|argentina|singapore|taiwan|china|'
            r'br|us|au|ru|uk|ua|fr|be|ger|de|cz|sk|hun|rs|latam|arg|asia|pacific|sy|sg|la|tw|cn'
            r')\d*?\b',
            re.IGNORECASE
        )
        
        # Mapas expandidos
        self.mapRegex = re.compile(
            r'\b(livonia|namalsk|chernarus|cherno|deer\s*isle|deerisle|'
            r'banov|sakhal|syberia|enoch|takistan|esseker|altis|'
            r'kamyshovo|expansion|stalker)\b', 
            re.IGNORECASE
        )
        
        # Separadores comuns
        self.separators = ['|', '-', '•', ':', '~', '★', '►', '»', '→']
        
        # Palavras comuns para remover
        self.stopWords = {
            'server', 'srv', 'discord', 'gg', 'www', 'com', 'ru', 'net', 'org',
            'season', 'temp', 'full', 'new', 'old', 'best', 'top', 'official'
        }

    def bulk(self, serverList: List[ServerInfo]):
        normalizedServerList = [self.normalize(server) for server in serverList]
        return normalizedServerList

    def normalize(self, serverInfo: ServerInfo) -> ServerInfo:
        serverInfo.canonicalName = serverInfo.name.strip()
        
        # 1. Extrair URLs
        self._extract_urls(serverInfo)
        
        # 2. Remover colchetes e normalizar case
        serverInfo.canonicalName = re.sub(r'[\[\]]', '', serverInfo.canonicalName)
        serverInfo.canonicalName = serverInfo.canonicalName.lower()
        
        # 3. Extrair número da instância
        self._extract_instance_number(serverInfo)
        
        # 4. Extrair status de wipe
        self._extract_wiped_status(serverInfo)
        
        # 5. Extrair região
        self._extract_region_tags(serverInfo)
        
        # 6. Extrair mapa
        self._extract_map_tags(serverInfo)
        
        # 7. Separar por delimitadores e extrair tags
        self._extract_tags_by_separators(serverInfo)
        
        # 8. Extrair tags de gameplay e técnicas
        self._extract_gameplay_tags(serverInfo)
        self._extract_technical_tags(serverInfo)
        
        # 9. Limpar nome final
        self._clean_final_name(serverInfo)
        
        return serverInfo

    def _extract_urls(self, serverInfo: ServerInfo):
        """Extrai URLs do nome do servidor"""
        urls = self.urlRegex.findall(serverInfo.canonicalName)
        if urls:
            serverInfo.siteUrl = urls
            serverInfo.canonicalName = self.urlRegex.sub('', serverInfo.canonicalName).strip()

    def _extract_instance_number(self, serverInfo: ServerInfo):
        """Extrai número da instância (#1, #2, etc.)"""
        match = self.instanceNumberRegex.search(serverInfo.canonicalName)
        if match:
            serverInfo.instanceNumber = f"#{match.group(1)}"
            serverInfo.canonicalName = self.instanceNumberRegex.sub('', serverInfo.canonicalName).strip()

    def _extract_wiped_status(self, serverInfo: ServerInfo):
        """Detecta se o servidor foi wipado recentemente"""
        if self.wipedRegex.search(serverInfo.canonicalName):
            serverInfo.wiped = True
            serverInfo.canonicalName = self.wipedRegex.sub('', serverInfo.canonicalName).strip()

    def _extract_region_tags(self, serverInfo: ServerInfo):
        """Extrai tags de região"""
        regions = self.regionTagRegex.findall(serverInfo.canonicalName)
        if regions:
            serverInfo.regionTags = [region.lower() for region in regions]
            serverInfo.canonicalName = self.regionTagRegex.sub('', serverInfo.canonicalName).strip()

    def _extract_map_tags(self, serverInfo: ServerInfo):
        """Extrai nome do mapa"""
        match = self.mapRegex.search(serverInfo.canonicalName)
        if match:
            serverInfo.mapTags = match.group(0).lower()
            serverInfo.canonicalName = self.mapRegex.sub('', serverInfo.canonicalName).strip()

    def _extract_tags_by_separators(self, serverInfo: ServerInfo):
        """Separa nome por delimitadores comuns e extrai tags"""
        if not hasattr(serverInfo, 'tags'):
            serverInfo.tags = []
            
        for separator in self.separators:
            if separator in serverInfo.canonicalName:
                parts = [part.strip() for part in serverInfo.canonicalName.split(separator)]
                if len(parts) > 1:
                    # Primeira parte é o nome, resto são tags
                    serverInfo.canonicalName = parts[0]
                    serverInfo.tags.extend([tag for tag in parts[1:] if tag and len(tag) > 1])
                break

    def _extract_gameplay_tags(self, serverInfo: ServerInfo):
        """Extrai tags relacionadas ao gameplay"""
        if not hasattr(serverInfo, 'tags'):
            serverInfo.tags = []
            
        gameplay_tags = self.gameplayTagsRegex.findall(serverInfo.canonicalName)
        if gameplay_tags:
            serverInfo.tags.extend(gameplay_tags)
            serverInfo.canonicalName = self.gameplayTagsRegex.sub('', serverInfo.canonicalName).strip()

    def _extract_technical_tags(self, serverInfo: ServerInfo):
        """Extrai tags técnicas (loot, bots, etc.)"""
        if not hasattr(serverInfo, 'tags'):
            serverInfo.tags = []
            
        tech_tags = self.technicalTagsRegex.findall(serverInfo.canonicalName)
        if tech_tags:
            serverInfo.tags.extend(tech_tags)
            serverInfo.canonicalName = self.technicalTagsRegex.sub('', serverInfo.canonicalName).strip()

    def _clean_final_name(self, serverInfo: ServerInfo):
        """Limpeza final do nome canônico"""
        # Remove múltiplos espaços
        serverInfo.canonicalName = re.sub(r'\s+', ' ', serverInfo.canonicalName).strip()
        
        # Remove caracteres especiais no início/fim
        serverInfo.canonicalName = re.sub(r'^[^\w\s]+|[^\w\s]+$', '', serverInfo.canonicalName).strip()
        
        # Remove palavras comuns (stop words)
        words = serverInfo.canonicalName.split()
        filtered_words = [word for word in words if word.lower() not in self.stopWords]
        
        if filtered_words:  # Se ainda há palavras após filtrar
            serverInfo.canonicalName = ' '.join(filtered_words)
        
        # Remove tags duplicadas
        if hasattr(serverInfo, 'tags') and serverInfo.tags:
            serverInfo.tags = list(set(tag.lower().strip() for tag in serverInfo.tags if tag.strip()))
        
        # Se o nome ficou muito curto ou vazio, usa palavras das tags
        if len(serverInfo.canonicalName) < 3 and hasattr(serverInfo, 'tags') and serverInfo.tags:
            # Procura por uma tag que possa ser o nome principal
            main_tags = [tag for tag in serverInfo.tags if len(tag) > 3 and 
                        tag.lower() not in ['pvp', 'pve', 'hardcore', 'vanilla', 'modded']]
            if main_tags:
                serverInfo.canonicalName = main_tags[0]
        
        # Capitaliza primeira letra de cada palavra
        serverInfo.canonicalName = serverInfo.canonicalName.title()

    def get_clean_name_only(self, server_name: str) -> str:
        """Método helper para obter apenas o nome limpo sem processar outras informações"""
        temp_server = ServerInfo()
        temp_server.name = server_name
        normalized = self.normalize(temp_server)
        return normalized.canonicalName