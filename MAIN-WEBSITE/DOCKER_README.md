# Astra Capital e.U. - Docker Deployment

## Schnellstart

```bash
# 1. In das Verzeichnis wechseln
cd /pfad/zu/MAIN-WEBSITE

# 2. Environment Datei erstellen
cp .env.example .env

# 3. .env anpassen (Domain, E-Mail, SMTP etc.)
nano .env

# 4. Docker Container starten
docker-compose up -d --build

# 5. Status prüfen
docker-compose ps
```

## Services

| Service | Container | Port | Beschreibung |
|---------|-----------|------|--------------|
| `astra-website` | Nginx Alpine | 8080 | Frontend + API Proxy |
| `astra-backend` | Python FastAPI | 8000 | Backend API |

## Dateien

| Datei | Beschreibung |
|-------|-------------|
| `Dockerfile` | Frontend Image (Nginx) |
| `backend/Dockerfile` | Backend Image (Python) |
| `docker-compose.yml` | Container Orchestrierung |
| `docker/default.conf` | Nginx Config mit API Proxy |
| `.env.example` | Beispiel Umgebungsvariablen |
| `.env` | Deine Umgebungsvariablen (erstellen!) |

## Environment Variables (.env)

```env
# Container
CONTAINER_NAME=astra-capital

# Ports
WEBSITE_PORT=8080
API_PORT=8000

# Domain
DOMAIN=astra-capital.eu

# Kontakt
CONTACT_EMAIL=info@astra-capital.at

# Timezone
TZ=Europe/Vienna

# SMTP (optional - für E-Mail Benachrichtigungen)
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
```

## Befehle

```bash
# Alle Container starten
docker-compose up -d

# Mit Rebuild
docker-compose up -d --build

# Container stoppen
docker-compose down

# Logs anzeigen (alle)
docker-compose logs -f

# Nur Backend Logs
docker-compose logs -f astra-backend

# Nur Frontend Logs
docker-compose logs -f astra-website

# Status prüfen
docker-compose ps

# In Container Shell (Backend)
docker exec -it astra-capital-backend /bin/sh

# In Container Shell (Frontend)
docker exec -it astra-capital-website /bin/sh

# Health Check Frontend
curl http://localhost:8080/health

# Health Check Backend direkt
curl http://localhost:8000/health

# API Test
curl http://localhost:8080/api/info
```

## Architektur

```
┌─────────────────────────────────────────────────────────────┐
│                      INTERNET                                │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│         EXTERNER NGINX (Port 80/443)                         │
│              SSL Termination                                 │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼ Port 8080
┌─────────────────────────────────────────────────────────────┐
│                  DOCKER COMPOSE                              │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │            astra-website (Nginx)                     │    │
│  │                Port 80 → 8080                        │    │
│  │                                                      │    │
│  │    /           → Static Files (HTML, CSS, JS)       │    │
│  │    /api/*      → Proxy zu astra-backend:8000        │    │
│  │    /health     → Proxy zu astra-backend:8000        │    │
│  └───────────────────────┬─────────────────────────────┘    │
│                          │                                   │
│                          ▼                                   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │            astra-backend (FastAPI)                   │    │
│  │                Port 8000                             │    │
│  │                                                      │    │
│  │    /health         → Health Check                   │    │
│  │    /api/contact    → Kontaktformular                │    │
│  │    /api/newsletter → Newsletter Signup              │    │
│  │    /api/stats      → Statistiken                    │    │
│  └───────────────────────┬─────────────────────────────┘    │
│                          │                                   │
│                          ▼                                   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │            backend-data (Docker Volume)              │    │
│  │                                                      │    │
│  │    contacts.json     → Kontaktanfragen              │    │
│  │    newsletter.json   → Newsletter Abos              │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## API Endpunkte

### Health Check
```bash
curl http://localhost:8080/health
```

### Kontaktformular testen
```bash
curl -X POST http://localhost:8080/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Testanfrage",
    "message": "Dies ist eine Testnachricht",
    "area": "development"
  }'
```

### Newsletter testen
```bash
curl -X POST http://localhost:8080/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test"
  }'
```

### Statistiken abrufen
```bash
curl http://localhost:8080/api/stats
```

## Troubleshooting

### Container startet nicht
```bash
# Logs prüfen
docker-compose logs astra-backend
docker-compose logs astra-website

# Konfiguration validieren
docker-compose config
```

### API nicht erreichbar
```bash
# Backend direkt testen
curl http://localhost:8000/health

# Nginx Logs prüfen
docker-compose logs astra-website

# Nginx Config im Container prüfen
docker exec -it astra-capital-website cat /etc/nginx/conf.d/default.conf
```

### Daten sichern
```bash
# Volume Backup
docker run --rm -v astra-backend-data:/data -v $(pwd):/backup alpine \
  tar -czvf /backup/backend-data-backup.tar.gz /data
```

## Updates

```bash
# Neuen Code ziehen und neu bauen
git pull
docker-compose up -d --build --force-recreate
```

## Volumes löschen (Vorsicht!)

```bash
# Container stoppen
docker-compose down

# Volumes löschen (ALLE DATEN GEHEN VERLOREN)
docker-compose down -v
```
