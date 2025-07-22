from BattleMetrics import BattleMetrics
from Normalizer import Normalizer
from Fingerprinter import Fingerprinter

if __name__ == '__main__':
    bm = BattleMetrics()
    normalizer = Normalizer()
    fingerprinter = Fingerprinter()

    servers = bm.fetchServers(size=400)
    normalized = normalizer.bulk(servers)
    groups = fingerprinter.fingerprint_servers(normalized)
    
    
    group = "Origemz"
    print(f"========{group}========")
    for server in groups[group]:
        print(f"|=> {server.name}")
    
    print("\n")