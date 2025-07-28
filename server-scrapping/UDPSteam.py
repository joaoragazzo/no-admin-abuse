import socket
import struct
import time

MASTER_SERVER = ("hl2master.steampowered.com", 27011)

def get_dayz_servers(region=0xFF, max_servers=1000):
    """
    Busca servidores DayZ do Steam Master Server
    region: código da região (0xFF = todas as regiões)
    """
    
    # Construir a requisição A2M_GET_SERVERS_BATCH
    req_header = b'\x31'  # A2M_GET_SERVERS_BATCH
    
    # Seed IP (começar de 0.0.0.0:0)
    seed = b'0.0.0.0:0\x00'
    
    # Filtros para DayZ
    # Formato: \key\value\key\value...\0
    filters = b'\\gamedir\\dayz\\empty\\1\\secure\\1\x00'
    
    # Montar requisição completa
    request = req_header + bytes([region]) + seed + filters
    
    print(f"Enviando requisição: {request.hex()}")
    
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.settimeout(10.0)  # Timeout maior
    
    try:
        sock.sendto(request, MASTER_SERVER)
        print("Requisição enviada, aguardando resposta...")
        
        servers = []
        packets_received = 0
        
        while len(servers) < max_servers:
            try:
                data, addr = sock.recvfrom(1400)
                packets_received += 1
                print(f"Pacote {packets_received} recebido de {addr}, tamanho: {len(data)}")
                
                if not data:
                    print("Dados vazios recebidos")
                    break
                
                # Verificar header da resposta
                if data[0] == 0x66:  # M2A_SERVER_BATCH
                    print("Resposta M2A_SERVER_BATCH recebida")
                    # Pular o header byte
                    data = data[1:]
                    
                    # Parsear servidores (cada servidor = 6 bytes: 4 IP + 2 porta)
                    for i in range(0, len(data), 6):
                        if i + 6 > len(data):
                            break
                        
                        # Extrair IP (4 bytes)
                        ip_bytes = data[i:i+4]
                        ip = ".".join(str(b) for b in ip_bytes)
                        
                        # Extrair porta (2 bytes, big endian)
                        port_bytes = data[i+4:i+6]
                        port = struct.unpack('>H', port_bytes)[0]  # Big endian
                        
                        # Verificar se não é o terminador (0.0.0.0:0)
                        if ip != "0.0.0.0" or port != 0:
                            servers.append(f"{ip}:{port}")
                        else:
                            print("Terminador encontrado, finalizando...")
                            return servers
                            
                elif data[0] == 0x0A:  # Possível resposta alternativa
                    print("Resposta tipo 0x0A recebida")
                    # Similar ao anterior mas sem header específico
                    data = data[1:]
                    for i in range(0, len(data), 6):
                        if i + 6 > len(data):
                            break
                        ip = ".".join(str(b) for b in data[i:i+4])
                        port = struct.unpack('>H', data[i+4:i+6])[0]
                        if ip != "0.0.0.0" or port != 0:
                            servers.append(f"{ip}:{port}")
                        else:
                            return servers
                else:
                    print(f"Header desconhecido: 0x{data[0]:02x}")
                    print(f"Primeiros bytes: {data[:20].hex()}")
                    
            except socket.timeout:
                print("Timeout na recepção")
                break
            except Exception as e:
                print(f"Erro ao processar dados: {e}")
                break
        
        return servers
        
    except Exception as e:
        print(f"Erro na comunicação: {e}")
        return []
    finally:
        sock.close()

def query_server_info(ip, port):
    """
    Consulta informações detalhadas de um servidor específico
    """
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        sock.settimeout(3.0)
        
        # A2S_INFO query
        query = b'\xFF\xFF\xFF\xFF\x54Source Engine Query\x00'
        sock.sendto(query, (ip, port))
        
        data, _ = sock.recvfrom(1400)
        if data and len(data) > 4:
            # Resposta básica recebida
            return True
        return False
        
    except:
        return False
    finally:
        sock.close()

def test_alternative_query():
    """
    Testa abordagem alternativa para buscar servidores
    """
    print("Testando query alternativa...")
    
    # Tentar diferentes combinações de filtros
    filters_variations = [
        b'\\gamedir\\dayz\x00',
        b'\\appid\\221100\x00',  # DayZ App ID
        b'\\gamedir\\dayz\\appid\\221100\x00',
        b'\\name_match\\*DayZ*\x00',
        b'\\map\\chernarus\x00',
        b'\\gamedir\\dayz\\dedicated\\1\x00',
        b'\x00'  # Sem filtros
    ]
    
    for i, filters in enumerate(filters_variations):
        print(f"\nTentativa {i+1} com filtros: {filters}")
        
        req_header = b'\x31'
        seed = b'0.0.0.0:0\x00'
        request = req_header + bytes([0xFF]) + seed + filters
        
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        sock.settimeout(5.0)
        
        try:
            sock.sendto(request, MASTER_SERVER)
            data, _ = sock.recvfrom(1400)
            
            if data:
                print(f"Resposta recebida! Tamanho: {len(data)}")
                print(f"Header: 0x{data[0]:02x}")
                if len(data) > 20:
                    print(f"Primeiros bytes: {data[:20].hex()}")
                
                # Tentar parsear como servidores
                if data[0] in [0x66, 0x0A]:
                    servers = []
                    data = data[1:]
                    for j in range(0, min(len(data), 60), 6):  # Limitar para teste
                        if j + 6 > len(data):
                            break
                        ip = ".".join(str(b) for b in data[j:j+4])
                        port = struct.unpack('>H', data[j+4:j+6])[0]
                        if ip != "0.0.0.0":
                            servers.append(f"{ip}:{port}")
                    
                    print(f"Servidores encontrados: {len(servers)}")
                    for server in servers[:5]:  # Mostrar só os 5 primeiros
                        print(f"  {server}")
                        
                break  # Parar na primeira resposta válida
                        
        except Exception as e:
            print(f"Erro: {e}")
        finally:
            sock.close()

# Exemplo de uso
if __name__ == "__main__":
    print("=== Buscando servidores DayZ ===")
    
    # Primeiro, tentar a query principal
    servers = get_dayz_servers()
    
    if servers:
        print(f"\n✅ Encontrados {len(servers)} servidores DayZ!")
        print("\nPrimeiros 10 servidores:")
        for i, server in enumerate(servers[:10], 1):
            print(f"{i:2d}. {server}")
            
        # Testar conectividade com alguns servidores
        print("\n=== Testando conectividade ===")
        for server in servers[:5]:
            ip, port = server.split(':')
            status = "✅ Online" if query_server_info(ip, int(port)) else "❌ Offline"
            print(f"{server} - {status}")
            
    else:
        print("\n❌ Nenhum servidor encontrado com a query principal")
        print("Tentando abordagens alternativas...\n")
        test_alternative_query()