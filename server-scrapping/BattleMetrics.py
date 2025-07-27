import requests
from interfaces.ServerInfo import ServerInfo
from typing import List

class BattleMetrics:
    def __init__(self):
        self.url = "https://api.battlemetrics.com"
        
    
    def fetchServers(self, game="dayz", size=1000) -> List[ServerInfo]:
        servers = []
        page_key = None
        total_fetched = 0
        max_page_size = 100

        while total_fetched < size:
            params = {
                "filter[game]": game,
                "page[size]": min(max_page_size, size - total_fetched),
            }

            if page_key:
                params["page[key]"] = page_key
                params["page[rel]"] = "next"

            response = requests.get(self.url + "/servers", params=params)
            json = response.json()

            if "data" not in json:
                print("Erro na resposta:", json)
                break

            data = json["data"]
            servers.extend(data)
            total_fetched += len(data)

            next_link = json.get("links", {}).get("next")
            if not next_link:
                break

            from urllib.parse import urlparse, parse_qs
            parsed = urlparse(next_link)
            query = parse_qs(parsed.query)
            page_key = query.get("page[key]", [None])[0]

            if not page_key:
                break

        return [ServerInfo(
            server['attributes']['id'],
            server['attributes']['name'],
            server['attributes']['ip'],
            server['attributes']['port'],
        ) for server in servers]
