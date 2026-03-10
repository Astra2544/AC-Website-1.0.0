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
│              NGINX REVERSE PROXY (extern)                    │
│                Port 80/443 + SSL                             │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼ Port 8080
┌─────────────────────────────────────────────────────────────┐
│                    DOCKER COMPOSE                            │
│  ┌───────────────────────┐    ┌────────────────────────┐    │
│  │   astra-website       │    │   astra-backend        │    │
│  │   (Nginx Alpine)      │◄──►│   (Python FastAPI)     │    │
│  │   Port 80 → 8080      │    │   Port 8000            │    │
│  │                       │    │                        │    │
│  │   - index.html        │    │   - /api/contact       │    │
│  │   - pages/*           │    │   - /api/newsletter    │    │
│  │   - /api/* → proxy    │    │   - /api/stats         │    │
│  └───────────────────────┘    └────────────────────────┘    │
│                                          │                   │
│                                          ▼                   │
│                               ┌────────────────────────┐    │
│                               │   backend-data         │    │
│                               │   (Docker Volume)      │    │
│                               │   - contacts.json      │    │
│                               │   - newsletter.json    │    │
│                               └────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## Docker Deployment

### Schnellstart

```bash
# 1. In das Verzeichnis wechseln
cd MAIN-WEBSITE

# 2. Environment Datei erstellen
cp .env.example .env

# 3. .env anpassen
nano .env

# 4. Docker Container starten
docker-compose up -d --build

# 5. Status prüfen
docker-compose ps

# 6. Health Check
curl http://localhost:8080/health
curl http://localhost:8000/health
```

### Environment Variables (.env)

| Variable | Beschreibung | Default |
|----------|--------------|---------|
| `CONTAINER_NAME` | Basis-Name für Container | `astra-capital` |
| `WEBSITE_PORT` | Port für Website (Nginx) | `8080` |
| `API_PORT` | Port für Backend API | `8000` |
| `DOMAIN` | Deine Domain | `astra-capital.eu` |
| `CONTACT_EMAIL` | E-Mail für Benachrichtigungen | `info@astra-capital.at` |
| `TZ` | Zeitzone | `Europe/Vienna` |
| `SMTP_HOST` | SMTP Server (optional) | - |
| `SMTP_PORT` | SMTP Port | `587` |
| `SMTP_USER` | SMTP Benutzer | - |
| `SMTP_PASS` | SMTP Passwort | - |

### Befehle

```bash
# Container starten
docker-compose up -d

# Container stoppen
docker-compose down

# Logs anzeigen (alle)
docker-compose logs -f

# Logs nur Backend
docker-compose logs -f astra-backend

# Neu bauen
docker-compose up -d --build --force-recreate

# Status
docker-compose ps
```

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

### Statistiken
```bash
GET /api/stats
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
├── docker/                     ← Docker Konfigurationen
│   └── default.conf            ← Nginx Config mit API Proxy
├── pages/                      ← Bereichsseiten
│   ├── development.html        ← Cyan
│   ├── ecom.html               ← Grün
│   ├── consulting.html         ← Gold (Coming Soon)
│   └── vending.html            ← Lila (Coming Soon)
├── css/                        ← Stylesheets
│   ├── astra-custom.css        ← Hauptstyles + Preloader
│   └── astra-areas.css         ← Bereichs-CSS
├── js/                         ← JavaScript
│   ├── astra-api.js            ← API Integration
│   └── astra-custom.js         ← Custom Scripts
├── img/                        ← Bilder
├── Dockerfile                  ← Frontend Image
├── docker-compose.yml          ← Container Orchestrierung
├── .env.example                ← Beispiel Environment
├── index.html                  ← Portal/Startseite
├── 404.html                    ← Error Page
└── README.md                   ← Diese Datei
```

---

## Features

### Portal (index.html)
- Fullscreen Slider mit 4 Geschäftsbereichen
- TOR-Preloader Animation (Astra Branding)
- Dark/Light Theme Toggle mit Wellen-Animation
- Responsive Design
- "Coming Soon" Badge für Consulting & Vending

### Bereichsseiten
- Hero mit Parallax & Floating Shapes
- Custom Cursor Effekt
- About Section mit animierten Stats
- 6 Service Cards
- Portfolio/Works Grid
- Testimonials
- Team Section
- Kontaktformular (mit Backend-Integration)
- Newsletter Signup
- Footer mit Navigation

### Backend
- FastAPI Server
- Kontaktformular-Verarbeitung
- Newsletter-Verwaltung
- E-Mail-Benachrichtigungen (optional)
- Statistik-Endpoint

---

## Nginx Reverse Proxy (Extern)

Siehe `NGINX_PROMPT.md` für die externe Nginx-Konfiguration.

---

## Lokale Entwicklung

```bash
# Einfacher HTTP Server
cd MAIN-WEBSITE
python3 -m http.server 8080

# Backend separat starten
cd backend
pip install -r requirements.txt
python server.py
```

---

## Lizenz

Original-Templates (Ultimex, Blackex, Doex) von **ex-nihilo** (ThemeForest).
Custom Entwicklungen © 2024 Astra Capital e.U.

---

## Kontakt

**Astra Capital e.U.**
- Email: info@astra-capital.at
- Web: https://astra-capital.eu
