# 🚀 Astra Capital e.U. - Website

## Über dieses Projekt

Dies ist die offizielle Website von **Astra Capital e.U.** - eine moderne, professionelle Unternehmenswebsite mit 4 Geschäftsbereichen.

---

## 🐳 Docker Deployment

### Schnellstart

```bash
# 1. Environment Datei erstellen
cp .env.example .env

# 2. .env anpassen (Domain, Port, etc.)
nano .env

# 3. Docker Container starten
docker-compose up -d --build

# 4. Website erreichbar auf Port 8080
curl http://localhost:8080
```

Siehe `DOCKER_README.md` für vollständige Dokumentation.

### Nginx Reverse Proxy

Für den externen Nginx (Port 80/443) siehe `NGINX_REVERSE_PROXY_PROMPT.md`.
Der Prompt enthält eine vollständige Nginx-Konfiguration mit Platzhaltern für deine Domain.

---

## 📁 Verzeichnisstruktur

```
/MAIN-WEBSITE/
├── docker/                     ← Docker Konfigurationen
│   ├── nginx.conf              ← Nginx Hauptconfig
│   └── default.conf            ← Server Block
├── pages/                      ← Bereichsseiten
│   ├── development.html        ← Cyan (#00d4ff)
│   ├── ecom.html               ← Grün (#00ff88)
│   ├── consulting.html         ← Gold (#ffaa00)
│   └── vending.html            ← Lila (#aa00ff)
├── css/                        ← Stylesheets
│   ├── astra-custom.css        ← Preloader & Portal
│   └── astra-areas.css         ← MEGA-CSS für Bereiche
├── js/                         ← JavaScript
├── img/                        ← Bilder
├── Dockerfile                  ← Docker Image
├── docker-compose.yml          ← Container Orchestrierung
├── .env.example                ← Beispiel Umgebungsvariablen
├── index.html                  ← Portal/Startseite
├── 404.html                    ← Error Page
└── NGINX_REVERSE_PROXY_PROMPT.md ← Nginx Prompt
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
