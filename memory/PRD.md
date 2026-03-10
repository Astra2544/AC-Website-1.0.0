# Astra Capital e.U. - Website PRD

## Original Problem Statement
Komplette Website für Astra Capital e.U. mit 4 Geschäftsbereichen, jeweils mit eigener Hauptfarbe und vollständigen Unterseiten. Preloader mit TOR-Animation. Backend-Integration für Kontaktformulare.

## User Personas
- **Besucher**: Potentielle Kunden die sich über Astra Capital informieren
- **Admin**: Empfängt Kontaktanfragen und Newsletter-Abos

## Core Requirements (Static)
1. Portal mit 4 Geschäftsbereichen (Slider)
2. Bereichsseiten mit vollständigem Inhalt
3. Coming Soon für Consulting & Vending
4. Docker-Deployment mit Backend
5. Kontaktformular mit Backend-Verarbeitung

## Was wurde implementiert

### Phase 1 (Initial - 09.03.2026)
- ✅ Portal mit Fullscreen Slider
- ✅ TOR-Preloader Animation
- ✅ Dark/Light Theme Toggle
- ✅ 4 komplette Bereichsseiten
- ✅ Responsive Design

### Phase 2 (10.03.2026)
- ✅ Coming Soon Badge für Consulting & Vending (im Slider)
- ✅ Navigation Coming Soon mit Tooltip
- ✅ Area Indicators für Coming Soon markiert
- ✅ **FastAPI Backend** implementiert:
  - `/api/contact` - Kontaktformular
  - `/api/newsletter` - Newsletter Signup
  - `/api/stats` - Statistiken
  - `/health` - Health Check
- ✅ **docker-compose.yml** mit 2 Services:
  - astra-website (Nginx + API Proxy)
  - astra-backend (FastAPI)
- ✅ **Environment Variables** im docker-compose:
  - WEBSITE_PORT, API_PORT
  - DOMAIN, CONTACT_EMAIL
  - SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
  - TZ (Timezone)
- ✅ **Nginx Config** mit API Proxy (`/api/*`)
- ✅ **Frontend API Integration** (`astra-api.js`)
- ✅ Toast-Notifications für Form-Feedback

## Dateistruktur
```
/MAIN-WEBSITE/
├── backend/
│   ├── server.py          ← FastAPI Server
│   ├── requirements.txt   ← Python Dependencies
│   └── Dockerfile         ← Backend Image
├── docker/
│   └── default.conf       ← Nginx Config + API Proxy
├── pages/
│   ├── development.html
│   ├── ecom.html
│   ├── consulting.html
│   └── vending.html
├── css/
│   ├── astra-custom.css   ← +Toast Styles
│   └── astra-areas.css
├── js/
│   ├── astra-api.js       ← NEU: API Integration
│   └── ...
├── Dockerfile             ← Frontend Image
├── docker-compose.yml     ← 2 Services + Environments
└── .env.example           ← Beispiel Env Vars
```

## Prioritized Backlog

### P0 (Done)
- [x] Coming Soon für Consulting/Vending
- [x] Backend für Kontaktformular
- [x] Docker-Compose mit Environments

### P1 (Nice to Have)
- [ ] Echte Bilder für Hero-Hintergründe
- [ ] Echte Team-Fotos
- [ ] Logo austauschen

### P2 (Future)
- [ ] SEO Optimierung (Meta Tags, Schema)
- [ ] Analytics Integration
- [ ] Cookie Banner
- [ ] Admin Dashboard für Kontaktanfragen

## Test Results
- Frontend: 100% (Coming Soon funktioniert)
- Backend: Implementiert, Docker-ready
- Mobile: 100% responsive

## Nächste Schritte
1. `.env` auf Server erstellen
2. `docker-compose up -d --build`
3. SMTP für E-Mail konfigurieren
4. SSL über externen Nginx
