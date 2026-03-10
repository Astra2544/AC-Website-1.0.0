# Astra Capital e.U. - Website

## Über dieses Projekt

Dies ist die offizielle Website von **Astra Capital e.U.** - eine moderne, professionelle Unternehmenswebsite mit 4 Geschäftsbereichen.

---

## Architektur

```
┌─────────────────────────────────────────────────────────────┐
│                      INTERNET                                │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│         DEIN EXTERNER NGINX (Port 80/443)                    │
│              SSL + Static Files + API Proxy                  │
│                                                              │
│    /           → Static Files (MAIN-WEBSITE/*)              │
│    /api/*      → Proxy zu localhost:8000                    │
│    /health     → Proxy zu localhost:8000                    │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼ Port 8000
┌─────────────────────────────────────────────────────────────┐
│                  DOCKER COMPOSE                              │
│                                                              │
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

---

## Schnellstart

```bash
# 1. In das Verzeichnis wechseln
cd MAIN-WEBSITE

# 2. Environment Datei erstellen
cp .env.example .env

# 3. .env anpassen
nano .env

# 4. Backend starten
docker-compose up -d --build

# 5. Health Check
curl http://localhost:8000/health
```

### Nginx Proxy Konfiguration (auf deinem Server)

Füge in deiner Nginx Config hinzu:

```nginx
# API Proxy zum Backend
location /api/ {
    proxy_pass http://127.0.0.1:8000/api/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

location /health {
    proxy_pass http://127.0.0.1:8000/health;
}
```

---

## Environment Variables (.env)

| Variable | Beschreibung | Default |
|----------|--------------|---------|
| `CONTAINER_NAME` | Basis-Name für Container | `astra-capital` |
| `API_PORT` | Port für Backend API | `8000` |
| `DOMAIN` | Deine Domain | `astra-capital.eu` |
| `CONTACT_EMAIL` | E-Mail für Benachrichtigungen | `info@astra-capital.at` |
| `TZ` | Zeitzone | `Europe/Vienna` |
| `SMTP_HOST` | SMTP Server (optional) | - |
| `SMTP_PORT` | SMTP Port | `587` |
| `SMTP_USER` | SMTP Benutzer | - |
| `SMTP_PASS` | SMTP Passwort | - |

---

## API Endpunkte

### Health Check
```bash
GET /health
```

### Kontaktformular
```bash
POST /api/contact
Content-Type: application/json

{
    "name": "Max Mustermann",
    "email": "max@example.com",
    "subject": "Anfrage",
    "message": "Ihre Nachricht...",
    "area": "development"  # development, ecom, consulting, vending, general
}
```

### Newsletter
```bash
POST /api/newsletter
Content-Type: application/json

{
    "email": "max@example.com",
    "name": "Max"  # optional
}
```

---

## Geschäftsbereiche

| Bereich | Name | Farbe | Status |
|---------|------|-------|--------|
| IT | Astra Development | Cyan `#00d4ff` | ✅ Aktiv |
| E-Commerce | Astra Ecom | Grün `#00ff88` | ✅ Aktiv |
| Beratung | Astra Consulting | Gold `#ffaa00` | ⏳ Coming Soon |
| Vending | Astra Vending | Lila `#aa00ff` | ⏳ Coming Soon |

---

## Verzeichnisstruktur

```
/MAIN-WEBSITE/
├── backend/                    ← FastAPI Backend
│   ├── server.py               ← API Server
│   ├── requirements.txt        ← Python Dependencies
│   └── Dockerfile              ← Backend Image
├── pages/                      ← Bereichsseiten
│   ├── development.html
│   ├── ecom.html
│   ├── consulting.html
│   └── vending.html
├── css/
├── js/
│   └── astra-api.js            ← Frontend API Integration
├── img/
├── docker-compose.yml          ← Nur Backend Service
├── .env.example
├── index.html                  ← Portal
└── README.md
```

---

## Lizenz

Original-Templates von **ex-nihilo** (ThemeForest).
Custom Entwicklungen © 2024 Astra Capital e.U.
