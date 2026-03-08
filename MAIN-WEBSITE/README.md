# 🚀 Astra Capital e.U. - Website

## Über dieses Projekt

Dies ist die offizielle Website von **Astra Capital e.U.** - eine moderne, professionelle Unternehmenswebsite, die als **Fusion aus 3 Premium-Templates** erstellt wurde:

- **Ultimex** (One-Page Portfolio mit Lines)
- **Blackex** (Scroll-Page Design)
- **Doex** (Multi-Page Portfolio)

Die Website dient als **Portal** zu den verschiedenen Geschäftsbereichen von Astra Capital.

---

## 📁 Verzeichnisstruktur

```
/app/
├── MAIN-WEBSITE/                    ← 🎯 HAUPTWEBSITE (Fusion)
│   ├── index.html                   ← Startseite/Portal
│   ├── css/
│   │   ├── plugins.css              ← Externe Plugins (Bootstrap, etc.)
│   │   ├── style-dark.css           ← Dark Theme Basis (von Ultimex)
│   │   ├── style-light.css          ← Light Theme Basis
│   │   ├── astra-custom.css         ← ⭐ Custom Astra Styles
│   │   └── astra-pages.css          ← Styles für Unterseiten
│   ├── js/
│   │   ├── plugins.js               ← jQuery, Swiper, etc.
│   │   ├── ultimex.js               ← Slider & Animationen (angepasst)
│   │   └── astra-custom.js          ← ⭐ Theme Toggle & Custom JS
│   ├── pages/                       ← Unterseiten der Bereiche
│   │   ├── development.html         ← Astra Development
│   │   └── ecom.html                ← Astra Ecom
│   ├── img/                         ← Bilder & Assets
│   └── fonts/                       ← Schriftarten
│
├── (ultimex)-one-page-portfolio/    ← Original Ultimex Template
├── (blackex)-scroll-page/           ← Original Blackex Template
├── (doex)-multi-page/               ← Original Doex Template
│
└── frontend/public/                 ← Live-Server Verzeichnis
    └── (Kopie von MAIN-WEBSITE)
```

---

## 🏢 Geschäftsbereiche

| Bereich | Name | Status | Beschreibung |
|---------|------|--------|--------------|
| IT | Astra Development | ✅ Aktiv | Softwareentwicklung & IT-Lösungen |
| E-Commerce | Astra Ecom | ✅ Aktiv | Online-Shop & E-Commerce |
| Beratung | Astra Consulting | ⏳ Coming Soon | Unternehmensberatung |
| Vending | Astra Vending | ⏳ Coming Soon | Automatenverkauf |

---

## ✨ Features

### Hauptseite (Portal)
- **Fullscreen Slider** mit allen 4 Geschäftsbereichen
- **Dark/Light Theme Toggle** mit Wellen-Animation
- **Animated Preloader** im Astra-Design
- **Responsive Design** für Desktop & Mobile
- **Vertical Lines** Designelement
- **Slide Indicators** (rund rechts + eckig unten)
- **Coming Soon** Badge für zukünftige Bereiche

### Design
- **Akzentfarbe:** `#ff264a` (Astra Rot)
- **Fonts:** Raleway + Oswald
- **Style:** Dark Mode als Standard, Light Mode verfügbar

### Technologien
- HTML5 / CSS3
- JavaScript / jQuery
- Swiper.js (Slider)
- Bootstrap Grid
- Ionicons

---

## 🎨 Anpassungen (Was wurde geändert)

### Von Ultimex übernommen:
- Basis-Layout mit Lines
- Slider-System
- Navigation Style
- Social Icons (links)
- Bottom Credits

### Custom Entwicklungen:
- Theme Toggle (Sonne/Mond Icon mit Wellen-Animation)
- Area Indicators (synchronisiert mit Slider)
- Coming Soon Styling
- Custom Preloader
- Responsive Navbar Fixes
- Astra Branding

---

## 🚀 Lokale Entwicklung

### Server starten:
```bash
cd MAIN-WEBSITE
python3 -m http.server 8080
```
Dann öffnen: `http://localhost:8080`

### Oder mit Node.js:
```bash
cd MAIN-WEBSITE
npx serve
```

---

## 📝 TODO / Nächste Schritte

- [ ] Echte Bilder für Slider-Hintergründe einsetzen
- [ ] Logo austauschen (`img/logo-light.png` & `img/logo-dark.png`)
- [ ] Unterseiten mit Inhalt füllen (Development, Ecom)
- [ ] Kontaktformular einrichten
- [ ] SEO Optimierung
- [ ] Consulting & Vending Seiten erstellen (wenn aktiv)

---

## 📄 Lizenz

Die Original-Templates (Ultimex, Blackex, Doex) sind von **ex-nihilo** (ThemeForest).
Custom Entwicklungen © 2024 Astra Capital e.U.

---

## 👤 Kontakt

**Astra Capital e.U.**
- Email: info@astra-capital.at
- LinkedIn: [Link]
- Instagram: [Link]
