from typing import List

class ServerInfo:
    def __init__(self, id, name, address, 
                 ip, port):
        self.id: str = id
        self.name: str = name
        self.address: str = address,
        self.ip: str = ip
        self.port: str = port

        """For normalizing server names"""
        self.tags: List[str] = []
        self.regionTags: List[str] = []
        self.siteUrl: List[str] = None
        self.discordUrl: str = None
        self.instanceNumber: str = None
        self.wiped: bool = None
        self.map: str = None
        self.canonicalName: str = None