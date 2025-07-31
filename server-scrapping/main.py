from BattleMetrics import BattleMetrics
from Normalizer import Normalizer
from Fingerprinter import Fingerprinter
from TagNormalizer import TagNormalizer
from RegionNormalizer import RegionNormalizer
import json
import requests

def normalize_all(groups):
    for group in groups:
        for server in groups[group]:
            server.tags = tagNormalizer.normalize_tags(server.tags)
            server.regionTags = regionNormalizer.normalize_tags(server.regionTags)
    return groups

def print_all(groups):
    for group in groups:
        print(f"=========={group}==========")
        for server in groups[group]:
            print(f"\t=> {server.name}")
            print(f"\t   {server.tags}")
            print(f"\t   {server.regionTags}")
        print("\n\n")

def to_java_style_json(groups):
    result = []

    for group in groups:
        group_data = {
            "name": group,
            "servers": []
        }

        for server in groups[group]:
            server_data = {
                "name": server.name,
                "ip": server.ip,
                "port": server.port,
                "tags": server.tags, 
                "country": server.country
            }
            group_data["servers"].append(server_data)

        result.append(group_data)

    return result

if __name__ == '__main__':
    bm = BattleMetrics()
    normalizer = Normalizer()
    fingerprinter = Fingerprinter()
    tagNormalizer = TagNormalizer()
    regionNormalizer = RegionNormalizer()

    servers = bm.fetchServers(size=1000)
    print("=== Servers done")
    normalized = normalizer.bulk(servers)
    print("=== Normalized servers done")
    groups = fingerprinter.fingerprint_servers(normalized)
    print("=== Groups done")

    normalized = normalize_all(groups)

    java_dto_payload = to_java_style_json(normalized)

    PROD="https://no-admin-abuse.joaoragazzo.dev/api/v1/server/bulk"
    DEV="http://localhost:8080/server/bulk"

    response = requests.put(DEV, data=json.dumps(java_dto_payload), headers={"Content-Type": "application/json"})
    print(response.text)