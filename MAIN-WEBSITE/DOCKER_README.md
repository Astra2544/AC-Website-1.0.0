# Astra Capital e.U. - Docker Backend Deployment

## Übersicht

Dieses Projekt verwendet Docker **NUR für das Backend** (FastAPI).
Das Frontend (statische HTML/CSS/JS) wird über deinen **externen Nginx** bedient.

## Schnellstart

```bash
# 1. In das Verzeichnis wechseln
cd /pfad/zu/MAIN-WEBSITE

# 2. Environment Datei erstellen
cp .env.example .env

# 3. .env anpassen
nano .env

# 4. Backend Container starten
docker-compose up -d --build

# 5. Status prüfen
docker-compose ps

# 6. Health Check
curl http://localhost:8000/health
```

## Environment Variables (.env)

```env
# Container
CONTAINER_NAME=astra-capital

# Backend Port
API_PORT=8000

# Domain
DOMAIN=astra-capital.eu

# Kontakt
CONTACT_EMAIL=info@astra-capital.at

# Timezone
TZ=Europe/Vienna

# SMTP (optional)
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
```

## Befehle

```bash
# Container starten
docker-compose up -d

# Mit Rebuild
docker-compose up -d --build

# Container stoppen
docker-compose down

# Logs anzeigen
docker-compose logs -f astra-backend

# Status prüfen
docker-compose ps

# In Container Shell
docker exec -it astra-capital-backend /bin/sh

# Health Check
curl http://localhost:8000/health

# API Test
curl http://localhost:8000/api/info
```

## Nginx Konfiguration (auf deinem Server)

Füge folgendes in deine Nginx Site-Config ein:

```nginx
server {
    listen 80;
    listen 443 ssl;
    server_name astra-capital.eu www.astra-capital.eu;
    
    # SSL Zertifikate
    ssl_certificate /etc/letsencrypt/live/astra-capital.eu/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/astra-capital.eu/privkey.pem;
    
    # Static Files (Frontend)
    root /pfad/zu/MAIN-WEBSITE;
    index index.html;
    
    # API Proxy zum Docker Backend
    location /api/ {
        proxy_pass http://127.0.0.1:8000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_connect_timeout 30s;
        proxy_send_timeout 30s;
        proxy_read_timeout 30s;
    }
    
    # Health Check Endpoint
    location /health {
        proxy_pass http://127.0.0.1:8000/health;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
    
    # Static Files
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache Static Assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff|woff2|ttf|svg)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

## API Testen

```bash
# Health Check
curl http://localhost:8000/health

# Kontaktformular
curl -X POST http://localhost:8000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@example.com",
    "subject": "Test",
    "message": "Testnachricht",
    "area": "development"
  }'

# Newsletter
curl -X POST http://localhost:8000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'

# Stats
curl http://localhost:8000/api/stats
```

## Troubleshooting

### Container startet nicht
```bash
docker-compose logs astra-backend
```

### API nicht erreichbar
```bash
# Backend direkt testen
curl http://localhost:8000/health

# Port prüfen
netstat -tlnp | grep 8000
```

### Daten sichern
```bash
docker run --rm -v astra-backend-data:/data -v $(pwd):/backup alpine \
  tar -czvf /backup/backend-data-backup.tar.gz /data
```
