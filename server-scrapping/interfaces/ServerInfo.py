from typing import List

class ServerInfo:
    def __init__(self, id, name, 
                 ip, port, country):
        self.id: str = id
        self.name: str = name
        self.ip: str = ip
        self.port: str = port
        self.country: str = country

        """For normalizing server names"""
        self.tags: List[str] = []
        self.regionTags: List[str] = []
        self.siteUrl: List[str] = None
        self.discordUrl: str = None
        self.instanceNumber: str = None
        self.wiped: bool = None
        self.map: str = None
        self.canonicalName: str = None
        self.normalizedTags: List[str] = []