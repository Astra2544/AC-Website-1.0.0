# 🚀 Astra Capital e.U. - Docker Deployment

## Schnellstart

```bash
# 1. In das Verzeichnis wechseln
cd /pfad/zu/MAIN-WEBSITE

# 2. Environment Datei erstellen
cp .env.example .env

# 3. .env anpassen (Domain, Port, etc.)
nano .env

# 4. Docker Container starten
docker-compose up -d --build

# 5. Status prüfen
docker-compose ps
```

## Dateien

| Datei | Beschreibung |
|-------|-------------|
| `Dockerfile` | Docker Image Definition |
| `docker-compose.yml` | Container Orchestrierung |
| `.env.example` | Beispiel Umgebungsvariablen |
| `.env` | Deine Umgebungsvariablen (erstellen!) |
| `docker/nginx.conf` | Nginx Hauptkonfiguration |
| `docker/default.conf` | Nginx Server Block |
| `NGINX_REVERSE_PROXY_PROMPT.md` | Prompt für externen Nginx |

## Umgebungsvariablen (.env)

```env
# Container
CONTAINER_NAME=astra-capital-website
WEBSITE_PORT=8080
TIMEZONE=Europe/Vienna

# Domain
DOMAIN=astra-capital.at

# Ressourcen
CPU_LIMIT=0.5
MEMORY_LIMIT=256M

# Pfade
LOG_PATH=./logs
NETWORK_NAME=astra-network
```

## Befehle

```bash
# Container starten
docker-compose up -d

# Container stoppen
docker-compose down

# Logs anzeigen
docker-compose logs -f

# Container neu bauen
docker-compose up -d --build --force-recreate

# Status prüfen
docker-compose ps

# In Container Shell
docker exec -it astra-capital-website /bin/sh

# Health Check
curl http://localhost:8080/health
```

## Architektur

```
┌─────────────────────────────────────────────────────────┐
│                    INTERNET                              │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│              EXTERNER NGINX (Port 80/443)               │
│         SSL Termination, Reverse Proxy                   │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼ Port 8080
┌─────────────────────────────────────────────────────────┐
│              DOCKER CONTAINER (Nginx Alpine)            │
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │            Astra Capital Website                 │    │
│  │                                                  │    │
│  │  • index.html (Portal)                          │    │
│  │  • pages/development.html                       │    │
│  │  • pages/ecom.html                              │    │
│  │  • pages/consulting.html                        │    │
│  │  • pages/vending.html                           │    │
│  │  • css/, js/, img/                              │    │
│  └─────────────────────────────────────────────────┘    │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Externer Nginx Setup

Siehe `NGINX_REVERSE_PROXY_PROMPT.md` für einen vollständigen Prompt, den du einer anderen KI geben kannst, um die Nginx Konfiguration auf deinem Server zu erstellen.

### Kurzfassung:

1. Kopiere den Prompt aus `NGINX_REVERSE_PROXY_PROMPT.md`
2. Ersetze die Platzhalter:
   - `{{DEINE_DOMAIN}}` → `astra-capital.at`
   - `{{SSL_CERT_PATH}}` → Pfad zum SSL Zertifikat
   - `{{SSL_KEY_PATH}}` → Pfad zum Private Key
   - `{{BACKEND_PORT}}` → `8080` (oder dein WEBSITE_PORT)
   - `{{BACKEND_HOST}}` → `127.0.0.1`

3. Die KI erstellt die Nginx Config unter `/etc/nginx/sites-available/`

## Troubleshooting

### Container startet nicht
```bash
# Logs prüfen
docker-compose logs astra-website

# Konfiguration validieren
docker-compose config
```

### Website nicht erreichbar
```bash
# Port prüfen
netstat -tlnp | grep 8080

# Health Check
curl -v http://localhost:8080/health

# Nginx Logs im Container
docker exec -it astra-capital-website cat /var/log/nginx/error.log
```

### Nginx Konfiguration testen
```bash
docker exec -it astra-capital-website nginx -t
```

## Updates

```bash
# Neue Website-Dateien kopieren und neu bauen
docker-compose up -d --build --force-recreate
```

## Backup

```bash
# Website-Dateien sichern
tar -czvf astra-backup-$(date +%Y%m%d).tar.gz MAIN-WEBSITE/

# Docker Volume sichern (Logs)
docker run --rm -v astra-logs:/data -v $(pwd):/backup alpine tar -czvf /backup/logs-backup.tar.gz /data
```
