# Astra Capital e.U. - Website PRD

## Original Problem Statement
Komplette Website für Astra Capital e.U. mit 4 Geschäftsbereichen, jeweils mit eigener Hauptfarbe und vollständigen Unterseiten. Preloader mit TOR-Animation. Backend-Integration für Kontaktformulare.

## Was wurde implementiert

### Phase 1 (Initial)
- ✅ Portal mit Fullscreen Slider
- ✅ TOR-Preloader Animation
- ✅ Dark/Light Theme Toggle
- ✅ 4 komplette Bereichsseiten
- ✅ Responsive Design

### Phase 2 (10.03.2026)
- ✅ **Bereichsfarben auf Portal-Seite:**
  - Development: Cyan `#00d4ff`
  - Ecom: Grün `#00ff88`
  - Consulting: Gold `#ffaa00`
  - Vending: Lila `#aa00ff`
- ✅ Coming Soon Badge für Consulting & Vending (in jeweiliger Bereichsfarbe)
- ✅ Navigation Coming Soon mit Tooltip + blockierte Links
- ✅ Area Indicators mit Bereichsfarben

- ✅ **Backend (FastAPI) implementiert:**
  - `/api/contact` - Kontaktformular
  - `/api/newsletter` - Newsletter Signup
  - `/api/stats` - Statistiken
  - `/health` - Health Check

- ✅ **docker-compose.yml NUR Backend:**
  - Kein Nginx im Docker (extern auf Server)
  - Environment Variables:
    - API_PORT, DOMAIN, CONTACT_EMAIL
    - SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
    - TZ

- ✅ **Frontend API Integration** (`astra-api.js`)
- ✅ Toast-Notifications

## Dateistruktur
```
/MAIN-WEBSITE/
├── backend/
│   ├── server.py          ← FastAPI Server
│   ├── requirements.txt
│   └── Dockerfile         ← NUR Backend Image
├── pages/
│   ├── development.html
│   ├── ecom.html
│   ├── consulting.html
│   └── vending.html
├── css/
│   ├── astra-custom.css   ← +Bereichsfarben
│   └── astra-areas.css
├── js/
│   ├── astra-api.js       ← API Integration
│   └── ...
├── docker-compose.yml     ← NUR Backend Service
├── .env.example
└── index.html             ← Portal mit Bereichsfarben
```

## Geschäftsbereiche

| Bereich | Farbe | Status |
|---------|-------|--------|
| Development | Cyan #00d4ff | ✅ Aktiv |
| Ecom | Grün #00ff88 | ✅ Aktiv |
| Consulting | Gold #ffaa00 | ⏳ Coming Soon |
| Vending | Lila #aa00ff | ⏳ Coming Soon |

## Nächste Schritte
1. `.env` auf Server erstellen
2. `docker-compose up -d --build`
3. Nginx Config für API Proxy anpassen
4. SMTP für E-Mail konfigurieren (optional)
