import spacy
from spacy.training import Example
from spacy.util import minibatch, compounding
import sqlite3
import json
import random
import re
from typing import List, Dict, Tuple, Optional
from dataclasses import dataclass
import logging

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class ServerInfo:
    canonical_name: str
    region: Optional[str] = None
    map_name: Optional[str] = None
    gameplay_tags: List[str] = None
    raw_name: str = ""
    
    def to_dict(self):
        return {
            'raw_name': self.raw_name,
            'canonical_name': self.canonical_name,
            'region': self.region,
            'map': self.map_name,
            'gameplay_tags': self.gameplay_tags or []
        }

class DayZDatabase:
    """Gerencia a base de dados de tokens conhecidos"""
    
    def __init__(self, db_path: str = "dayz_tokens.db"):
        self.db_path = db_path
        self.init_database()
        self.populate_initial_data()
    
    def init_database(self):
        """Inicializa as tabelas da base de dados"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Tabela de tokens por categoria
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS tokens (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                token TEXT NOT NULL,
                category TEXT NOT NULL,
                subcategory TEXT,
                confidence REAL DEFAULT 1.0,
                variations TEXT -- JSON array com variações
            )
        ''')
        
        # Tabela de padrões regex
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS patterns (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                pattern TEXT NOT NULL,
                category TEXT NOT NULL,
                description TEXT
            )
        ''')
        
        # Tabela de dados de treinamento para spaCy
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS training_data (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                text TEXT NOT NULL,
                entities TEXT NOT NULL -- JSON com entidades anotadas
            )
        ''')
        
        conn.commit()
        conn.close()
    
    def populate_initial_data(self):
        """Popula dados iniciais se a base estiver vazia"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Verifica se já tem dados
        cursor.execute("SELECT COUNT(*) FROM tokens")
        if cursor.fetchone()[0] > 0:
            conn.close()
            return
        
        # Dados iniciais
        initial_tokens = [
            # Regiões
            ('na', 'REGION', 'north_america', 1.0, '["usa", "america", "na", "north-america"]'),
            ('eu', 'REGION', 'europe', 1.0, '["europe", "european"]'),
            ('br', 'REGION', 'south_america', 1.0, '["brasil", "brazil", "sa", "br"]'),
            ('ru', 'REGION', 'eastern_europe', 1.0, '["russia", "russian"]'),
            ('au', 'REGION', 'oceania', 1.0, '["australia", "oceania"]'),
            
            # Mapas
            ('chernarus', 'MAP', None, 1.0, '["cherno"]'),
            ('livonia', 'MAP', None, 1.0, '["livonia"]'),
            ('deerisle', 'MAP', None, 1.0, '["deer-isle", "deerisle"]'),
            ('stalker', 'MAP', None, 1.0, '["stalker"]'),
            ('chernobyl', 'MAP', None, 1.0, '["chernobyl"]'),
            
            # Tags de Gameplay
            ('vanilla', 'GAMEPLAY', 'mod_type', 1.0, '["vanilla+", "vanilla++", "vanila", "vanila+", "vanila++"]'),
            ('modded', 'GAMEPLAY', 'mod_type', 1.0, '["mod", "mods", "fullmod", "full-mod"]'),
            ('pvp', 'GAMEPLAY', 'combat', 1.0, '["fullpvp", "full-pvp", "pvp"]'),
            ('pve', 'GAMEPLAY', 'combat', 1.0, '["pve-only", "pveonly", "pve"]'),
            ('rp', 'GAMEPLAY', 'mode', 1.0, '["roleplay", "role-play"]'),
            ('solo', 'GAMEPLAY', 'group_size', 1.0, '[]'),
            ('duo', 'GAMEPLAY', 'group_size', 1.0, '[]'),
            ('trio', 'GAMEPLAY', 'group_size', 1.0, '[]'),
            ('1pp', 'GAMEPLAY', 'perspective', 1.0, '["1st", "first-person", "firstperson"]'),
            ('3pp', 'GAMEPLAY', 'perspective', 1.0, '["3rd", "third-person", "thirdperson"]'),
            ('no-raid', 'GAMEPLAY', 'rules', 1.0, '["noraid", "no_raid", "noraidweekdays"]'),
            ('high-fps', 'GAMEPLAY', 'performance', 1.0, '["highfps", "high_fps", "fps+"]'),
            ('fresh-wipe', 'GAMEPLAY', 'status', 1.0, '["fresh-wiped", "freshwipe", "freshwiped"]'),
            ('wiped', 'GAMEPLAY', 'status', 1.0, '["wipe", "fresh", "reset"]'),
            
            # Nomes conhecidos de servidores
            ('battlegroundz', 'SERVER_NAME', None, 1.0, '["battlegz", "bgz"]'),
            ('origemz', 'SERVER_NAME', None, 1.0, '["origem"]'),
            ('mag', 'SERVER_NAME', None, 1.0, '["middleagedgamers"]'),
            ('thelab', 'SERVER_NAME', None, 1.0, '["lab"]'),
            ('groundzero', 'SERVER_NAME', None, 1.0, '["ground-zero"]'),
        ]
        
        cursor.executemany('''
            INSERT INTO tokens (token, category, subcategory, confidence, variations)
            VALUES (?, ?, ?, ?, ?)
        ''', initial_tokens)
        
        # Padrões regex
        patterns = [
            (r'\[WIPED\s+\d{1,2}[./]\d{1,2}\]', 'GAMEPLAY', 'Data de wipe em colchetes'),
            (r'WIPE\s+\d{1,2}[./]\d{1,2}', 'GAMEPLAY', 'Data de wipe'),
            (r'#\d+', 'SERVER_NUMBER', 'Número do servidor'),
            (r'\d+PP', 'GAMEPLAY', 'Perspectiva (1PP/3PP)'),
            (r'solo[/-]duo[/-]trio', 'GAMEPLAY', 'Grupo solo/duo/trio'),
            (r'max\s+\d+', 'GAMEPLAY', 'Tamanho máximo do grupo'),
        ]
        
        cursor.executemany('''
            INSERT INTO patterns (pattern, category, description)
            VALUES (?, ?, ?)
        ''', patterns)
        
        conn.commit()
        conn.close()
        logger.info("Base de dados inicializada com dados padrão")
    
    def get_all_tokens(self) -> Dict[str, List[Tuple[str, str, float]]]:
        """Retorna todos os tokens organizados por categoria"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT token, category, subcategory, confidence, variations
            FROM tokens
        ''')
        
        result = {}
        for token, category, subcategory, confidence, variations_json in cursor.fetchall():
            if category not in result:
                result[category] = []
            
            variations = json.loads(variations_json) if variations_json else []
            result[category].append((token, subcategory, confidence, variations))
        
        conn.close()
        return result
    
    def add_token(self, token: str, category: str, subcategory: str = None, 
                  confidence: float = 1.0, variations: List[str] = None):
        """Adiciona um novo token à base de dados"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        variations_json = json.dumps(variations or [])
        cursor.execute('''
            INSERT OR REPLACE INTO tokens (token, category, subcategory, confidence, variations)
            VALUES (?, ?, ?, ?, ?)
        ''', (token, category, subcategory, confidence, variations_json))
        
        conn.commit()
        conn.close()
        logger.info(f"Token adicionado: {token} -> {category}")

class SpacyDayZClassifier:
    """Classificador usando spaCy com NER customizado"""
    
    def __init__(self, db_path: str = "dayz_tokens.db"):
        self.db = DayZDatabase(db_path)
        self.nlp = None
        self.labels = ["REGION", "MAP", "GAMEPLAY", "SERVER_NAME", "SERVER_NUMBER"]
        self.setup_spacy_model()
    
    def setup_spacy_model(self):
        """Configura o modelo spaCy"""
        try:
            # Tenta carregar modelo treinado
            self.nlp = spacy.load("./dayz_model")
            logger.info("Modelo treinado carregado")
        except:
            # Cria novo modelo
            self.nlp = spacy.blank("en")
            
            # Adiciona pipeline NER se não existir
            if "ner" not in self.nlp.pipe_names:
                ner = self.nlp.add_pipe("ner")
            else:
                ner = self.nlp.get_pipe("ner")
            
            # Adiciona labels
            for label in self.labels:
                ner.add_label(label)
            
            logger.info("Novo modelo spaCy criado")
    
    def generate_training_data(self) -> List[Tuple[str, Dict]]:
        """Gera dados de treinamento automaticamente baseado na base de dados"""
        training_data = []
        tokens_by_category = self.db.get_all_tokens()
        
        # Gera exemplos simples e bem definidos
        examples = []
        
        # Exemplos básicos com uma entidade por vez
        if "SERVER_NAME" in tokens_by_category:
            for server_name, _, _, _ in tokens_by_category["SERVER_NAME"]:
                text = server_name.upper()
                examples.append((text, {"entities": [(0, len(text), "SERVER_NAME")]}))
        
        if "REGION" in tokens_by_category:
            for region, _, _, _ in tokens_by_category["REGION"]:
                text = f"[{region.upper()}]"
                examples.append((text, {"entities": [(1, len(text)-1, "REGION")]}))
        
        if "MAP" in tokens_by_category:
            for map_name, _, _, _ in tokens_by_category["MAP"]:
                text = map_name.title()
                examples.append((text, {"entities": [(0, len(text), "MAP")]}))
        
        if "GAMEPLAY" in tokens_by_category:
            for gameplay, _, _, _ in tokens_by_category["GAMEPLAY"]:
                text = gameplay.upper()
                examples.append((text, {"entities": [(0, len(text), "GAMEPLAY")]}))
        
        # Exemplos compostos mais simples e controlados
        composite_examples = [
            # Formato: Server + Region
            ("ORIGEMZ US", [(0, 7, "SERVER_NAME"), (8, 10, "REGION")]),
            ("BATTLEGROUNDZ EU", [(0, 12, "SERVER_NAME"), (13, 15, "REGION")]),
            ("THELAB BR", [(0, 6, "SERVER_NAME"), (7, 9, "REGION")]),
            
            # Formato: Server + Map
            ("ORIGEMZ Chernarus", [(0, 7, "SERVER_NAME"), (8, 17, "MAP")]),
            ("BATTLEGROUNDZ Livonia", [(0, 12, "SERVER_NAME"), (13, 20, "MAP")]),
            ("THELAB Deerisle", [(0, 6, "SERVER_NAME"), (7, 15, "MAP")]),
            
            # Formato: Gameplay simples
            ("VANILLA", [(0, 7, "GAMEPLAY")]),
            ("PVP", [(0, 3, "GAMEPLAY")]),
            ("PVE", [(0, 3, "GAMEPLAY")]),
            ("1PP", [(0, 3, "GAMEPLAY")]),
            ("3PP", [(0, 3, "GAMEPLAY")]),
            ("SOLO", [(0, 4, "GAMEPLAY")]),
            ("DUO", [(0, 3, "GAMEPLAY")]),
            ("TRIO", [(0, 4, "GAMEPLAY")]),
            
            # Formato: Server | Gameplay
            ("ORIGEMZ | VANILLA", [(0, 7, "SERVER_NAME"), (10, 17, "GAMEPLAY")]),
            ("BATTLEGROUNDZ | PVP", [(0, 12, "SERVER_NAME"), (15, 18, "GAMEPLAY")]),
            ("THELAB | 1PP", [(0, 6, "SERVER_NAME"), (9, 12, "GAMEPLAY")]),
            
            # Formato: [Region] Server
            ("[US] ORIGEMZ", [(1, 3, "REGION"), (5, 12, "SERVER_NAME")]),
            ("[EU] BATTLEGROUNDZ", [(1, 3, "REGION"), (5, 17, "SERVER_NAME")]),
            ("[BR] THELAB", [(1, 3, "REGION"), (5, 11, "SERVER_NAME")]),
        ]
        
        # Valida e adiciona exemplos compostos
        for text, entities in composite_examples:
            if self.validate_entities(text, entities):
                examples.append((text, {"entities": entities}))
        
        # Adiciona exemplos reais cuidadosamente anotados
        real_examples = [
            ("OrigemZ Vanilla+ |Solo-Duo-Trio|RAIDTOKEN|1PP|NOVA SEASON", {
                "entities": [[0,7,"SERVER_NAME"],[8,16,"GAMEPLAY"],[18,22,"GAMEPLAY"],[23,26,"GAMEPLAY"],[27,31,"GAMEPLAY"],[32,41,"GAMEPLAY"],[42,45,"GAMEPLAY"],[46,57,"GAMEPLAY"]]
            }),
            ("[WIPED 18.07] BattleGroundZ :: Chernarus [3PP][EU] | Vanilla++", {
                "entities": [[1,6,"GAMEPLAY"],[14,27,"SERVER_NAME"],[31,40,"MAP"],[42,45,"GAMEPLAY"],[47,49,"REGION"],[53,62,"GAMEPLAY"]]
            }),
            ("MAG MiddleAgedGamers #1 PVE |FRESH-WIPED 3 June|", {
                "entities": [[0,20,"SERVER_NAME"],[21,23,"SERVER_NUMBER"],[24,27,"GAMEPLAY"],[29,40,"GAMEPLAY"]]
            }),
            ("heybarmby's Livonia - Organic RP", {
                "entities": [[0,11,"SERVER_NAME"],[12,19,"MAP"],[30,32,"GAMEPLAY"]]
            }),
            ("DayZ Aftermath Chernarus 3 | Max Group 3", {
                "entities": [[0,14,"SERVER_NAME"],[15,24,"MAP"],[25,26,"SERVER_NUMBER"],[29,40,"GAMEPLAY"]]
            }),
            ("MIDNIGHT PLUS 3PP | n2 | CHERNARUS | WIPE 19.07", {
                "entities": [[0,13,"SERVER_NAME"],[14,17,"GAMEPLAY"],[25,34,"MAP"],[37,41,"GAMEPLAY"]]
            }),
            ("MIDNIGHT PLUS 3PP | CHERNARUS | WIPE 19.07", {
                "entities": [[0,13,"SERVER_NAME"],[14,17,"GAMEPLAY"],[20,29,"MAP"],[32,36,"GAMEPLAY"]]
            }),
            ("Ground Zero US2 | Solo/Duo/Trio | Weekend Raiding | High FPS", {
                "entities": [[0,11,"SERVER_NAME"],[12,15,"REGION"],[18,22,"GAMEPLAY"],[23,26,"GAMEPLAY"],[27,31,"GAMEPLAY"]]
            }),
            ("The Lab US2 | Trio | dayzthelab.com", {
                "entities": [[0,7,"SERVER_NAME"],[8,11,"REGION"],[14,18,"GAMEPLAY"]]
            }),
            ("**WIPED TODAY** Axios | 250k Start | PVP | Helis", {
                "entities": [[2,7,"GAMEPLAY"],[16,21,"SERVER_NAME"],[37,40,"GAMEPLAY"],[43,48,"GAMEPLAY"]]
            }),
            ("FOG FamilyOfGamers | PVE ONLY | FRESH WIPE JULY 2nd |", {
                "entities": [[0,18,"SERVER_NAME"],[21,24,"GAMEPLAY"],[38,42,"GAMEPLAY"]]
            }),
            ("The Lab US4 | Duo | dayzthelab.com", {
                "entities": [[0,7,"SERVER_NAME"],[8,11,"REGION"],[14,17,"GAMEPLAY"]]
            }),
            ("The Lab US5 | Max 5 | Deerisle | dayzthelab.com", {
                "entities": [[0,7,"SERVER_NAME"],[8,11,"REGION"],[14,19,"REGION"],[22,30,"MAP"]]
            }),
            ("[WIPED 18.07] BattleGroundZ :: Livonia [3PP][EU] | Vanilla++", {
                "entities": [[1,6,"REGION"],[14,27,"SERVER_NAME"],[31,38,"MAP"],[40,43,"GAMEPLAY"],[45,47,"GAMEPLAY"],[51,60,"GAMEPLAY"]]
            }),
            ("Rearmed US4 | Solo/Duo/Trio", {
                "entities": [[0,7,"SERVER_NAME"],[8,11,"REGION"],[14,18,"GAMEPLAY"],[19,22,"GAMEPLAY"],[23,27,"GAMEPLAY"]]
            }),
            ("LOADED - Solo/Duo/Trio | Balanced Mods | dayzloaded.gg", {
                "entities": [[0,6,"SERVER_NAME"],[9,13,"GAMEPLAY"],[14,17,"GAMEPLAY"],[18,22,"GAMEPLAY"]]
            }),
            ("KarmaKrew Chernarus #3 NA - 1PP | VANILLA + MODS", {
                "entities": [[0,9,"SERVER_NAME"],[10,19,"MAP"],[20,22,"SERVER_NUMBER"],[23,25,"REGION"],[28,31,"GAMEPLAY"],[34,43,"GAMEPLAY"],[44,48,"GAMEPLAY"]]
            }),
            ("[WIPED] #1 SKYFALL - VANILLA+ | LOOT+ | CARS+ | HIGH FPS+", {
                "entities": [[1,6,"GAMEPLAY"],[8,10,"SERVER_NUMBER"],[11,18,"SERVER_NAME"],[21,29,"GAMEPLAY"]]
            }),
            ("Ground Zero US1 | 4 Group Limit | Weekend Raiding | High FPS", {
                "entities": [[0,11,"SERVER_NAME"],[12,15,"REGION"],[18,31,"GAMEPLAY"]]
            }),
            ("Vendetta | Solo/Duo/Trio | 1PP | High FPS", {
                "entities": [[0,8,"SERVER_NAME"],[11,15,"GAMEPLAY"],[16,19,"GAMEPLAY"],[20,24,"GAMEPLAY"],[27,30,"GAMEPLAY"]]
            }),
            ("[BR] EPIDEMIC Z BRASIL VANILLA-1PP-GROUP-WIPE 08/07", {
                "entities": [[1,3,"REGION"],[5,15,"GAMEPLAY"],[16,22,"REGION"],[23,30,"GAMEPLAY"],[31,34,"GAMEPLAY"],[41,45,"GAMEPLAY"]]
            }),
            ("Escape From DayZ US1 | Chernarus | 5 Max", {
                "entities": [[0,16,"SERVER_NAME"],[17,20,"REGION"],[23,32,"MAP"],[35,40,"GAMEPLAY"]]
            }),
            ("The Lab EU3 | Trio | Deerisle | dayzthelab.com", {
                "entities": [[0,7,"SERVER_NAME"],[8,11,"REGION"],[14,18,"GAMEPLAY"],[21,29,"MAP"]]
            }),
            ("SUETA RU | 3PP | PVP MORE LOOT | WIPE 19.07", {
                "entities": [[0,5,"SERVER_NAME"],[6,8,"REGION"],[11,14,"GAMEPLAY"],[33,37,"GAMEPLAY"]]
            }),
            ("KarmaKrew Chernarus #2 - SOLO DUO TRIO | 1PP | VANILLA + MODS", {
                "entities": [[0,9,"SERVER_NAME"],[10,19,"MAP"],[20,22,"SERVER_NUMBER"],[25,29,"GAMEPLAY"],[30,33,"GAMEPLAY"],[34,38,"GAMEPLAY"],[41,44,"GAMEPLAY"],[47,54,"GAMEPLAY"]]
            }),
            ("KarmaKrew Chernarus #1 - 1PP | VANILLA + MODS", {
                "entities": [[0,9,"SERVER_NAME"],[10,19,"MAP"],[20,22,"SERVER_NUMBER"],[25,28,"GAMEPLAY"],[31,38,"GAMEPLAY"]]
            }),
            ("KRYPTIC - #2 | Solo Duo Trio | High FPS", {
                "entities": [[0,7,"SERVER_NAME"],[10,12,"SERVER_NUMBER"],[15,19,"GAMEPLAY"],[20,23,"GAMEPLAY"],[24,28,"GAMEPLAY"]]
            }),
            ("Dead City STALKER RP RU NO WHITELIST AoD", {
                "entities": [[0,9,"SERVER_NAME"],[10,17,"MAP"],[18,20,"GAMEPLAY"],[21,23,"REGION"]]
            }),
            ("The Lab EU4 | Duo | dayzthelab.com", {
                "entities": [[0,7,"SERVER_NAME"],[8,11,"REGION"],[14,17,"GAMEPLAY"]]
            }),
            ("Edge Of Darkness | STALKER RP | AoD", {
                "entities": [[0,16,"SERVER_NAME"],[19,26,"MAP"],[27,29,"GAMEPLAY"]]
            }),
            ("[BR] AnarkiaZ Vanilla Inaugurado 26/05/2025", {
                "entities": [[1,3,"REGION"],[5,13,"SERVER_NAME"],[14,21,"GAMEPLAY"]]
            }),
            ("Ground Zero EU2 | Solo/Duo/Trio | Weekend Raiding | High FPS", {
                "entities": [[0,11,"SERVER_NAME"],[12,15,"REGION"],[18,22,"GAMEPLAY"],[23,26,"GAMEPLAY"],[27,31,"GAMEPLAY"]]
            }),
            ("DayZ Aftermath Chernarus 2 | Max Group 6", {
                "entities": [[0,14,"SERVER_NAME"],[15,24,"MAP"],[25,26,"SERVER_NUMBER"],[29,40,"GAMEPLAY"]]
            }),
            ("The Lab US1 | Max 5 | dayzthelab.com", {
                "entities": [[0,7,"SERVER_NAME"],[8,11,"REGION"],[14,19,"GAMEPLAY"]]
            }),
            ("DayZ Aftermath Livonia | Max Group 6", {
                "entities": [[0,14,"SERVER_NAME"],[15,22,"MAP"],[25,36,"GAMEPLAY"]]
            }),
            ("[BR] EPIDEMIC Z BRASIL VANILLA-1PP-SOLO-DUO-TRIO-WIPE 19/07", {
                "entities": [[1,3,"REGION"],[5,15,"SERVER_NAME"],[16,22,"REGION"],[23,30,"GAMEPLAY"],[31,34,"GAMEPLAY"],[35,39,"GAMEPLAY"],[40,43,"GAMEPLAY"],[44,48,"GAMEPLAY"],[49,53,"GAMEPLAY"]]
            }),
            ("MIDNIGHT PLUS 3PP | LIVONIA | WIPE 19.07", {
                "entities": [[0,13,"SERVER_NAME"],[14,17,"GAMEPLAY"],[20,27,"MAP"],[30,34,"GAMEPLAY"]]
            }),
            ("SKYLINE BRASIL 1PP Loot+ Aventura++ NoRaid gg/skylinebrasil", {
                "entities": [[0,14,"SERVER_NAME"],[15,18,"GAMEPLAY"],[19,24,"GAMEPLAY"],[36,42,"GAMEPLAY"]]
            }),
            ("#1 [TDB] Vanilla+ 1PP| loot++ | stamina | PVP | WIPED July 1st", {
                "entities": [[0,2,"SERVER_NUMBER"],[4,7,"SERVER_NAME"],[9,17,"GAMEPLAY"],[18,21,"GAMEPLAY"],[23,29,"GAMEPLAY"],[42,45,"GAMEPLAY"],[48,53,"GAMEPLAY"]]
            }),
            ("Rearmed EU4 | Solo Duo Trio", {
                "entities": [[0,7,"SERVER_NAME"],[8,11,"REGION"],[14,18,"GAMEPLAY"],[19,22,"GAMEPLAY"],[23,27,"GAMEPLAY"]]
            }),
            ("DayzUnderground.com - OrganicRP - Enhanced Vanilla", {
                "entities": [[0,15,"SERVER_NAME"],[29,31,"GAMEPLAY"],[43,50,"GAMEPLAY"]]
            }),
            ("#1 | US | BLOOD,GUTS & GLORY | PVE w/PVP Zones | Wiped 13th, Ju", {
                "entities": [[0,2,"SERVER_NUMBER"],[5,7,"REGION"],[10,28,"SERVER_NAME"],[31,34,"GAMEPLAY"],[37,40,"GAMEPLAY"],[49,54,"GAMEPLAY"]]
            }),
            ("Wiped 7/18 Escape From DayZ US3 | Alteria | 5 Max", {
                "entities": [[0,5,"GAMEPLAY"],[11,27,"SERVER_NAME"],[28,31,"REGION"],[44,49,"GAMEPLAY"]]
            }),
            ("The Lab US3 | Clans | Deerisle | dayzthelab.com", {
                "entities": [[0,7,"SERVER_NAME"],[8,11,"REGION"],[14,19,"GAMEPLAY"],[22,30,"MAP"]]
            }),
            ("Basically Vanilla #1 - Vanilla|1PP|Party|Loot+|Map", {
                "entities": [[0,17,"SERVER_NAME"],[18,20,"SERVER_NUMBER"],[31,34,"GAMEPLAY"],[41,46,"GAMEPLAY"]]
            }),
            ("The Lab EU1 | Max 5 | dayzthelab.com", {
                "entities": [[0,7,"SERVER_NAME"],[8,11,"REGION"],[14,19,"GAMEPLAY"]]
            }),
            ("WormWood US2 |Solo/Duo/Trio|WeekendRaid|AirDrop|KOTH|1PP|KeyCar", {
                "entities": [[0,8,"SERVER_NAME"],[9,12,"REGION"],[14,18,"GAMEPLAY"],[19,22,"GAMEPLAY"],[23,27,"GAMEPLAY"],[53,56,"GAMEPLAY"]]
            }),
            ("MANHUNT Chernarus Lite [3PP]", {
                "entities": [[0,7,"SERVER_NAME"],[8,17,"MAP"],[24,27,"GAMEPLAY"]]
            }),
            ("The Lab EU2 | Trio | dayzthelab.com", {
                "entities": [[0,7,"SERVER_NAME"],[8,11,"REGION"],[14,18,"GAMEPLAY"]]
            }),
            ("SALVATION EU - Vanilla+ Enhanced - dayzsalvation.com", {
                "entities": [[0,9,"SERVER_NAME"],[10,12,"REGION"],[15,23,"GAMEPLAY"]]
            }),
            ("#3 [TDB] Vanilla+ 1PP - Solo/Duo/Trio | PVP | WIPED July 1st", {
                "entities": [[0,2,"SERVER_NUMBER"],[4,7,"SERVER_NAME"],[9,17,"GAMEPLAY"],[18,21,"GAMEPLAY"],[24,28,"GAMEPLAY"],[29,32,"GAMEPLAY"],[33,37,"GAMEPLAY"],[40,43,"GAMEPLAY"]]
            }),
            ("SAYONARA 3PP | CHERNARUS", {
                "entities": [[0,8,"SERVER_NAME"],[9,12,"GAMEPLAY"],[15,24,"MAP"]]
            }),
            ("OrigemZ Vanilla+ |GROUP|RAIDTOKEN|FPS++|NOVA SEASON", {
                "entities": [[0,7,"SERVER_NAME"],[8,16,"GAMEPLAY"],[18,23,"GAMEPLAY"],[24,33,"GAMEPLAY"],[40,51,"GAMEPLAY"]]
            }),
            ("Ground Zero EU1 | 4 Group Limit | Weekend Raiding | High FPS", {
                "entities": [[0,11,"SERVER_NAME"],[12,15,"REGION"],[18,31,"GAMEPLAY"]]
            }),
            ("DayOne Chernarus 1PP (No Bases|Adventure)", {
                "entities": [[0,6,"SERVER_NAME"],[7,16,"MAP"],[17,20,"GAMEPLAY"],[22,30,"GAMEPLAY"]]
            }),
            ("FavelaZ Brasil |FPS+|PVP+|ANIMAL+|ARMAS+|HELIS|KOTH|AIRDROP|EVE", {
                "entities": [[0,7,"SERVER_NAME"],[8,14,"REGION"]]
            }),
            ("GunRunnerZ |Loot 20X|500k Start|Helis|Raid Alarm|Fresh Wipe", {
                "entities": [[0,10,"SERVER_NAME"],[55,59,"GAMEPLAY"]]
            }),
            ("GROZA 5 | CHERNO 3PP | Solo Duo Trio | RU | PVP | WIPE 19.07", {
                "entities": [[0,5,"SERVER_NAME"],[6,7,"SERVER_NUMBER"],[10,16,"MAP"],[17,20,"GAMEPLAY"],[23,27,"GAMEPLAY"],[28,31,"GAMEPLAY"],[32,36,"GAMEPLAY"],[39,41,"REGION"],[44,47,"GAMEPLAY"],[50,54,"GAMEPLAY"]]
            }),
            ("xCONQUEST | 40 VS 40 | SEASON 3", {
                "entities": [[0,9,"SERVER_NAME"]]
            }),
            ("[BR] THELINEZ | PVP/PVE | NORAID | CHERNARUS | HELIS | MAPA", {
                "entities": [[1,3,"REGION"],[5,13,"SERVER_NAME"],[16,19,"GAMEPLAY"],[20,23,"GAMEPLAY"],[26,32,"GAMEPLAY"],[35,44,"MAP"]]
            }),
            ("MANHUNT CASUAL [3PP]", {
                "entities": [[0,7,"SERVER_NAME"],[16,19,"GAMEPLAY"]]
            }),
            ("Titan | Max 5 | Tarkov Inspired | Keycards | Airdrops", {
                "entities": [[0,5,"SERVER_NAME"],[8,13,"GAMEPLAY"]]
            }),
            ("STALKER 2014 | Hardcore Roleplay Survival | discord.gg/s14", {
                "entities": [[0,12,"SERVER_NAME"],[15,23,"GAMEPLAY"],[24,32,"GAMEPLAY"],[33,41,"GAMEPLAY"]]
            }),
            ("KarmaKrew Namalsk #1 - 4 MAN MAX | 1PP | VANILLA + MODS", {
                "entities": [[0,9,"SERVER_NAME"],[10,17,"MAP"],[18,20,"SERVER_NUMBER"],[23,32,"GAMEPLAY"],[35,38,"GAMEPLAY"],[41,48,"GAMEPLAY"]]
            }),
            ("MIDNIGHT PLUS 3PP | n2 | LIVONIA | WIPE 19.07", {
                "entities": [[0,13,"SERVER_NAME"],[14,17,"GAMEPLAY"],[25,32,"MAP"],[35,39,"GAMEPLAY"]]
            }),
            ("#1 | US | BLOOD,GUTS & GLORY | PVE w/PVP Zones | Wiped 13th, Ju", {
                "entities": [[0,2,"SERVER_NUMBER"],[5,7,"REGION"],[10,28,"SERVER_NAME"],[31,34,"GAMEPLAY"],[37,40,"GAMEPLAY"],[49,54,"GAMEPLAY"]]
            }),
            ("Basically Vanilla US #1 - Vanilla|1PP|Party|Loot+|Map", {
                "entities": [[0,17,"SERVER_NAME"],[18,20,"REGION"],[34,37,"GAMEPLAY"],[44,49,"GAMEPLAY"]]
            })
        ]
        
        # Valida exemplos reais antes de adicionar
        for text, annotations in real_examples:
            if self.validate_entities(text, annotations["entities"]):
                examples.append((text, annotations))
        
        return examples
    
    def validate_entities(self, text: str, entities: List[Tuple[int, int, str]]) -> bool:
        """Valida se as entidades não se sobrepõem e estão alinhadas corretamente"""
        if not entities:
            return True
        
        # Verifica alinhamento
        for start, end, label in entities:
            if start < 0 or end > len(text) or start >= end:
                return False
            # Verifica se a substring faz sentido
            substring = text[start:end]
            if not substring.strip():
                return False
        
        # Verifica sobreposições
        entities_sorted = sorted(entities, key=lambda x: x[0])
        for i in range(len(entities_sorted) - 1):
            current_end = entities_sorted[i][1]
            next_start = entities_sorted[i + 1][0]
            if current_end > next_start:
                return False
        
        return True
    
    def train_model(self, iterations: int = 30):
        """Treina o modelo spaCy"""
        training_data = self.generate_training_data()
        logger.info(f"Gerados {len(training_data)} exemplos de treinamento")
        
        # Converte para formato do spaCy com validação
        examples = []
        valid_examples = 0
        
        for text, annotations in training_data:
            try:
                doc = self.nlp.make_doc(text)
                example = Example.from_dict(doc, annotations)
                examples.append(example)
                valid_examples += 1
            except Exception as e:
                logger.warning(f"Exemplo inválido ignorado: '{text}' - {str(e)}")
                continue
        
        logger.info(f"Usando {valid_examples} exemplos válidos para treinamento")
        
        if not examples:
            logger.error("Nenhum exemplo válido para treinamento!")
            return
        
        # Inicializa o modelo
        try:
            self.nlp.initialize(lambda: examples)
        except Exception as e:
            logger.error(f"Erro ao inicializar modelo: {e}")
            return
        
        # Treina o modelo
        for i in range(iterations):
            random.shuffle(examples)
            losses = {}
            
            try:
                batches = minibatch(examples, size=compounding(4.0, 32.0, 1.001))
                for batch in batches:
                    self.nlp.update(batch, losses=losses, drop=0.2)
                
                if i % 10 == 0:
                    logger.info(f"Iteração {i}, Perdas: {losses}")
                    
            except Exception as e:
                logger.error(f"Erro durante treinamento na iteração {i}: {e}")
                break
        
        # Salva o modelo
        try:
            self.nlp.to_disk("./dayz_model")
            logger.info("Modelo treinado e salvo com sucesso")
        except Exception as e:
            logger.error(f"Erro ao salvar modelo: {e}")
    
    def classify_server(self, server_name: str) -> ServerInfo:
        """Classifica um nome de servidor usando o modelo treinado"""
        # Pre-processamento
        clean_name = self.preprocess_text(server_name)
        
        try:
            # Aplica o modelo spaCy
            doc = self.nlp(clean_name)
            
            # Extrai entidades
            entities = {
                'REGION': [],
                'MAP': [],
                'GAMEPLAY': [],
                'SERVER_NAME': [],
                'SERVER_NUMBER': []
            }
            
            for ent in doc.ents:
                if ent.label_ in entities:
                    entities[ent.label_].append(ent.text.lower())
            
            # Se não encontrou entidades com spaCy, usa fallback
            if not any(entities.values()):
                entities = self.fallback_classification(clean_name)
            
        except Exception as e:
            logger.warning(f"Erro ao classificar '{server_name}': {e}")
            entities = self.fallback_classification(clean_name)
        
        # Constrói resultado
        canonical_name = self.extract_canonical_name(entities['SERVER_NAME'], clean_name)
        region = entities['REGION'][0].upper() if entities['REGION'] else None
        map_name = entities['MAP'][0].title() if entities['MAP'] else None
        gameplay_tags = list(set(entities['GAMEPLAY']))  # Remove duplicatas
        
        return ServerInfo(
            canonical_name=canonical_name,
            region=region,
            map_name=map_name,
            gameplay_tags=gameplay_tags,
            raw_name=server_name
        )
    
    def fallback_classification(self, text: str) -> Dict[str, List[str]]:
        """Método de fallback para classificação usando regex e keywords"""
        entities = {
            'REGION': [],
            'MAP': [],
            'GAMEPLAY': [],
            'SERVER_NAME': [],
            'SERVER_NUMBER': []
        }
        
        tokens_by_category = self.db.get_all_tokens()
        words = text.lower().split()
        
        # Busca por tokens conhecidos
        for word in words:
            for category, token_list in tokens_by_category.items():
                for token, _, _, variations in token_list:
                    try:
                        all_variations = [token] + (json.loads(variations) if variations else [])
                    except Exception:
                        all_variations = [token]

                    for variation in all_variations:
                        if word == variation.lower() or variation.lower() in word:
                            if category in entities:
                                entities[category].append(word)
                            break
        
        # Busca por padrões específicos
        if re.search(r'\b(us|usa|america)\b', text, re.I):
            entities['REGION'].append('us')
        elif re.search(r'\b(eu|europe)\b', text, re.I):
            entities['REGION'].append('eu')
        elif re.search(r'\b(br|brasil|brazil)\b', text, re.I):
            entities['REGION'].append('br')
        elif re.search(r'\b(ru|russia)\b', text, re.I):
            entities['REGION'].append('ru')
        
        # Busca por perspectiva
        if re.search(r'\b1pp\b', text, re.I):
            entities['GAMEPLAY'].append('1pp')
        elif re.search(r'\b3pp\b', text, re.I):
            entities['GAMEPLAY'].append('3pp')
        
        # Busca por grupo
        if re.search(r'\bsolo\b', text, re.I):
            entities['GAMEPLAY'].append('solo')
        if re.search(r'\bduo\b', text, re.I):
            entities['GAMEPLAY'].append('duo')
        if re.search(r'\btrio\b', text, re.I):
            entities['GAMEPLAY'].append('trio')
        
        return entities
    
    def preprocess_text(self, text: str) -> str:
        """Pre-processa o texto"""
        # Remove caracteres especiais mantendo espaços e hífens
        text = re.sub(r'[^\w\s\-]', ' ', text)
        # Normaliza espaços
        text = re.sub(r'\s+', ' ', text.strip())
        return text
    
    def extract_canonical_name(self, server_names: List[str], full_text: str) -> str:
        """Extrai nome canônico"""
        if server_names:
            return max(server_names, key=len).title()
        
        # Fallback: pega a primeira palavra significativa
        words = full_text.split()
        for word in words:
            if len(word) > 2 and not word.isdigit():
                return word.title()
        
        return "Unknown"
    
    def classify_multiple(self, server_names: List[str]) -> List[Dict]:
        """Classifica múltiplos servidores"""
        results = []
        for name in server_names:
            server_info = self.classify_server(name)
            results.append(server_info.to_dict())
        return results

# Exemplo de uso
if __name__ == "__main__":
    # Inicializa o classificador
    classifier = SpacyDayZClassifier()
    
    # Treina o modelo (necessário apenas uma vez)
    print("Treinando modelo...")
    classifier.train_model(iterations=50)
    
    # Lista de servidores de teste
    test_servers = [
        "OrigemZ Vanilla+ |Solo-Duo-Trio|RAIDTOKEN|1PP|NOVA SEASON",
        "[WIPED 18.07] BattleGroundZ :: Chernarus [3PP][EU] | Vanilla++",
        "MAG MiddleAgedGamers #1 PVE |FRESH-WIPED 3 June|",
        "Ground Zero US2 | Solo/Duo/Trio | Weekend Raiding | High FPS",
        "[BR] EPIDEMIC Z BRASIL VANILLA-1PP-GROUP-WIPE 08/07",
        "Ponto Z Brasil | Full PVP NoRaid Loot++",
        "3854 | EUROPE - DE | 1st Person Only",
        "Salty Zombies PVE|Difficult|Terje|Quests|Dungeons|Dragons|Pets",
        "THE STRUGGLE Livonia | 1PP | Vanilla w/Locks and Notes",
        "MONSTER ARMY|FR][TRADER/DRUGS...][PVE]  https://discord.gg/mHBJ",
        "[GER][PVE]Dayz World Survival |Hunting and survive|Cherno|",
        "=FRESH WIPE=[AU] After DayZ Jurassic Isle | PvE with PvP Zones",
        "Fullsend Cherno PVE 150k Start Heli/boats Highly Immersive",
        "TWINKLE Play #1 | PVE | Livonia | QUESTS | AUTOEVENTS",
        "PVE Dead Time Survive Cherno",
        "The New Z | PvE Only | No PvP",
        "The Path to Oblivion PVE",
        "The Project - DeathMatch",
        "[RU] New Eden PVE 2",
        "GatvolGaming",
        "DDD-PVE-6月新档-硬核生存-任务技能",
        "Savage Landz PvE - Deerisle |==Fresh Wipe=06/11/25|",
        "CZ/SK DAYZERO RP dayzero.cz",
        "Fearless PVE Chill II",
        "War Souls PVE",
        "UltimateDayZPVEOnly|EU1|DeerIsle|Fresh|Arenas|Bosses",
        "4187 | EUROPE - DE | 1st Person Only"
    ]
    
    # Classifica os servidores
    results = classifier.classify_multiple(test_servers)
    
    # Exibe resultados
    print(json.dumps(results, indent=2, ensure_ascii=False))
    
    # Exemplo de como adicionar novos tokens
    classifier.db.add_token("hardcore", "GAMEPLAY", "difficulty", 1.0, ["hard-core", "hc"])
    classifier.db.add_token("jp", "REGION", "asia", 1.0, ["japan", "japanese"])