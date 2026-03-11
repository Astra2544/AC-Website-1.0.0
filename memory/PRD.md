# Astra Capital e.U. - Website PRD

## Aktueller Stand: 11.03.2026

## Geschäftsbereiche & Farben

| Bereich | Farbe | HEX | Status |
|---------|-------|-----|--------|
| **Astra Development** | Rot | `#ff264a` | ✅ Aktiv |
| **Astra Ecom** | Blau | `#0073ff` | ✅ Aktiv |
| **Astra Consulting** | Gelb | `#ffbf00` | ⏳ Coming Soon |
| **Astra Vending** | Lila | `#9000ff` | ⏳ Coming Soon |

## Implementierte Features

### Portal (index.html)
- ✅ Fullscreen Slider mit 4 Bereichen
- ✅ TOR-Preloader Animation (funktioniert in allen Größen)
- ✅ Dark/Light Theme Toggle mit Wellen-Animation
- ✅ Dynamische Bereichsfarben (wechseln mit Slide)
- ✅ Coming Soon Badge für Consulting & Vending
- ✅ Custom Cursor (Rot) mit smoothem Ring
- ✅ Rechtliches-Link (unten rechts)
- ✅ Responsive Design

### Bereichsseiten (pages/)
- ✅ development.html - Rot
- ✅ ecom.html - Blau
- ✅ consulting.html - Gelb
- ✅ vending.html - Lila
- ✅ **legal.html - NEU** (Rechtliches mit Accordion)
- ✅ Custom Cursor mit smoothem Ring-Effekt
- ✅ Footer mit Rechtliches-Link

### Rechtliches (legal.html)
- ✅ Accordion-Design
- ✅ Impressum
- ✅ Datenschutzerklärung
- ✅ AGB
- ✅ Barrierefrei (Skip-Link, aria-labels, Keyboard-Navigation)
- ✅ URL-Hash Support (#impressum, #datenschutz, #agb)

### Backend (FastAPI)
- ✅ /api/contact - Kontaktformular
- ✅ /api/newsletter - Newsletter
- ✅ /api/stats - Statistiken
- ✅ /health - Health Check
- ✅ Docker-ready

### Docker Setup
- ✅ astra-website (Nginx) - Port 8080
- ✅ astra-backend (FastAPI) - Port 8000
- ✅ Environment Variables konfiguriert

## Dateistruktur

```
/MAIN-WEBSITE/
├── backend/
│   ├── server.py
│   ├── requirements.txt
│   └── Dockerfile
├── pages/
│   ├── development.html
│   ├── ecom.html
│   ├── consulting.html
│   ├── vending.html
│   └── legal.html          ← NEU
├── css/
│   ├── astra-custom.css
│   └── astra-areas.css
├── js/
│   ├── ultimex.js
│   ├── astra-custom.js
│   └── astra-api.js
├── img/
├── fonts/
├── Dockerfile
├── docker-compose.yml
├── .env.example
├── index.html
└── README.md
```

## Environment Variables

```env
CONTAINER_NAME=astra-capital
WEBSITE_PORT=8080
API_PORT=8000
DOMAIN=astra-capital.eu
CONTACT_EMAIL=info@astra-capital.at
TZ=Europe/Vienna
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
```

## Deployment

```bash
cp .env.example .env
# .env anpassen
docker-compose up -d --build
```

## Nächste Schritte (Optional)

- [ ] Echte Firmen-Daten in legal.html eintragen
- [ ] Echte Bilder für Hero-Slider
- [ ] Logo austauschen
- [ ] SMTP für E-Mail konfigurieren
- [ ] Cookie Banner
- [ ] SEO Meta Tags
