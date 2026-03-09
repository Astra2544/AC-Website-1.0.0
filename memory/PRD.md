# Astra Capital e.U. - Website PRD

## Original Problem Statement
Komplette Website für Astra Capital e.U. mit 4 Geschäftsbereichen, jeweils mit eigener Hauptfarbe und vollständigen Unterseiten.

## Was wurde implementiert

### Hauptseite (Portal)
- ✅ Fullscreen Slider mit 4 Bereichen
- ✅ Custom Preloader mit TOR-Animation (ASTRA/CAPITAL Text → Grauer Balken → Roter Fill → Tor öffnet sich)
- ✅ Dark/Light Theme Toggle mit Wave-Animation
- ✅ Area Indicators (rechts)
- ✅ Social Links (LinkedIn, Instagram, E-Mail)
- ✅ Responsive Design

### Bereichsseiten (4 komplette Websites)
1. **Astra Development** (Cyan #00d4ff)
   - Hero, About, Services (6), Facts, Portfolio, Contact, Footer
   - IT Dienstleistungen & Software

2. **Astra Ecom** (Grün #00ff88)
   - Hero, About, Services (6), Facts, Portfolio, Contact, Footer
   - E-Commerce & Online Business

3. **Astra Consulting** (Gold #ffaa00)
   - Hero, About, Services (6), Facts, Approach, Contact, Footer
   - Strategische Unternehmensberatung

4. **Astra Vending** (Lila #aa00ff)
   - Hero, About, Services (6), Facts, Products, Contact, Footer
   - Automated Retail & Self-Service

### CSS Framework
- astra-custom.css - Hauptseite + Preloader
- astra-areas.css - Mega-CSS für alle Bereichsseiten (inkl. alle Farb-Varianten)

## Dateistruktur
```
/app/MAIN-WEBSITE/
├── index.html (Portal)
├── pages/
│   ├── development.html
│   ├── ecom.html
│   ├── consulting.html
│   └── vending.html
├── css/
│   ├── astra-custom.css
│   ├── astra-areas.css
│   └── ...
└── img/, js/, fonts/
```

## TODO / Backlog
- [ ] Echte Bilder für Hero-Hintergründe
- [ ] Echte Portfolio-Bilder
- [ ] Logo austauschen
- [ ] Kontaktformular Backend (PHP/API)
- [ ] SEO Optimierung
- [ ] Analytics Integration

## Nächste Schritte
- Echte Inhalte einfügen
- Bilder austauschen
- Kontaktformular funktional machen
