# =====================================================
# NGINX REVERSE PROXY - PROMPT FÜR EXTERNE KI
# =====================================================
# Kopiere diesen Prompt und gib ihn einer KI, die
# Zugriff auf deinen Nginx Server hat.
#
# VORHER AUSFÜLLEN:
# - DOMAIN: astra-capital.eu
# - BACKEND_PORT: 8080 (aus .env EXTERNAL_PORT)
# =====================================================


## PROMPT:

---

Erstelle eine Nginx Reverse Proxy Konfiguration mit folgenden Einstellungen:

**Domain:** astra-capital.eu
**Backend:** 127.0.0.1:8080 (lokaler Docker Container)
**SSL:** Let's Encrypt (certbot)

**Anforderungen:**

1. HTTP (Port 80) automatisch auf HTTPS (Port 443) weiterleiten
2. www.astra-capital.eu auf astra-capital.eu weiterleiten (ohne www)
3. SSL/TLS mit Let's Encrypt Zertifikat
4. Reverse Proxy zu localhost:8080
5. Gzip Kompression aktivieren
6. Security Headers setzen:
   - X-Frame-Options: SAMEORIGIN
   - X-Content-Type-Options: nosniff
   - X-XSS-Protection: 1; mode=block
   - Strict-Transport-Security (HSTS)
7. Proxy Headers für korrekte IP-Weiterleitung:
   - X-Real-IP
   - X-Forwarded-For
   - X-Forwarded-Proto
   - X-Forwarded-Host
8. WebSocket Support (Upgrade Header)
9. Keepalive Connections zum Backend
10. Access und Error Logs unter /var/log/nginx/astra-capital.eu.*

**SSL Zertifikat erstellen mit:**
```
sudo certbot certonly --nginx -d astra-capital.eu -d www.astra-capital.eu
```

**Konfiguration speichern unter:**
/etc/nginx/sites-available/astra-capital.eu

**Nach Erstellung:**
```
sudo ln -s /etc/nginx/sites-available/astra-capital.eu /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---


## ALTERNATIVE: Wenn du die Platzhalter selbst ausfüllen willst:

---

Erstelle eine Nginx Reverse Proxy Konfiguration:

**Domain:** [HIER_DOMAIN_EINTRAGEN]
**Backend Port:** [HIER_PORT_EINTRAGEN]
**Backend Host:** [127.0.0.1 oder IP]

**Anforderungen:**
1. HTTP → HTTPS Redirect
2. www → non-www Redirect  
3. Let's Encrypt SSL
4. Reverse Proxy zum Backend
5. Gzip Kompression
6. Security Headers (HSTS, X-Frame-Options, etc.)
7. Proxy Headers (X-Real-IP, X-Forwarded-*)
8. WebSocket Support
9. Logs unter /var/log/nginx/[DOMAIN].*

---


## QUICK REFERENCE:

| Einstellung | Wert |
|-------------|------|
| Domain | astra-capital.eu |
| Backend Host | 127.0.0.1 |
| Backend Port | 8080 |
| SSL | Let's Encrypt |
| Cert Path | /etc/letsencrypt/live/astra-capital.eu/fullchain.pem |
| Key Path | /etc/letsencrypt/live/astra-capital.eu/privkey.pem |
