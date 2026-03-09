# =====================================================
# NGINX REVERSE PROXY PROMPT
# =====================================================
# 
# Verwende diesen Prompt für eine andere KI, die Zugriff
# auf deinen Nginx Server hat (Port 80/443)
#
# =====================================================

## PROMPT FÜR EXTERNE KI:

---

Erstelle eine Nginx Server-Konfiguration für einen Reverse Proxy mit folgenden Anforderungen:

**PLATZHALTER (müssen ausgefüllt werden):**
- DOMAIN: {{DEINE_DOMAIN}} (z.B. astra-capital.at)
- SSL_CERT_PATH: {{PFAD_ZUM_SSL_ZERTIFIKAT}} (z.B. /etc/letsencrypt/live/astra-capital.at/fullchain.pem)
- SSL_KEY_PATH: {{PFAD_ZUM_SSL_KEY}} (z.B. /etc/letsencrypt/live/astra-capital.at/privkey.pem)
- BACKEND_PORT: {{DOCKER_WEBSITE_PORT}} (Standard: 8080)
- BACKEND_HOST: {{SERVER_IP_ODER_LOCALHOST}} (z.B. 127.0.0.1 oder localhost)

**Anforderungen:**
1. HTTP (Port 80) soll automatisch auf HTTPS (Port 443) weiterleiten
2. SSL/TLS mit modernen Cipher Suites (TLS 1.2+)
3. Reverse Proxy zu einem lokalen Docker Container auf Port {{BACKEND_PORT}}
4. Gzip Kompression aktivieren
5. Security Headers setzen (X-Frame-Options, X-Content-Type-Options, etc.)
6. WebSocket Support (falls später benötigt)
7. Proxy Headers für korrekte Client-IP Weiterleitung
8. Rate Limiting zum Schutz vor DDoS
9. Access Logs und Error Logs
10. Let's Encrypt kompatibel (/.well-known/acme-challenge)

**Zusätzliche Subdomains (optional):**
- www.{{DEINE_DOMAIN}} → Weiterleitung zu {{DEINE_DOMAIN}}

**Konfigurationsdatei erstellen unter:**
/etc/nginx/sites-available/{{DEINE_DOMAIN}}.conf

**Nach Erstellung:**
1. Symlink erstellen: ln -s /etc/nginx/sites-available/{{DEINE_DOMAIN}}.conf /etc/nginx/sites-enabled/
2. Nginx Konfiguration testen: nginx -t
3. Nginx neu laden: systemctl reload nginx

---

## BEISPIEL KONFIGURATION (zum Anpassen):

```nginx
# =====================================================
# {{DEINE_DOMAIN}} - Nginx Reverse Proxy Configuration
# =====================================================

# Rate Limiting Zone
limit_req_zone $binary_remote_addr zone=astra_limit:10m rate=10r/s;

# Upstream für Docker Container
upstream astra_backend {
    server {{BACKEND_HOST}}:{{BACKEND_PORT}};
    keepalive 32;
}

# HTTP → HTTPS Redirect
server {
    listen 80;
    listen [::]:80;
    server_name {{DEINE_DOMAIN}} www.{{DEINE_DOMAIN}};

    # Let's Encrypt Challenge
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    # Redirect alle anderen Requests zu HTTPS
    location / {
        return 301 https://{{DEINE_DOMAIN}}$request_uri;
    }
}

# WWW → Non-WWW Redirect
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name www.{{DEINE_DOMAIN}};

    ssl_certificate {{SSL_CERT_PATH}};
    ssl_certificate_key {{SSL_KEY_PATH}};

    return 301 https://{{DEINE_DOMAIN}}$request_uri;
}

# Haupt Server Block
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name {{DEINE_DOMAIN}};

    # SSL Zertifikate
    ssl_certificate {{SSL_CERT_PATH}};
    ssl_certificate_key {{SSL_KEY_PATH}};

    # SSL Einstellungen
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_session_tickets off;

    # Moderne SSL Konfiguration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # HSTS
    add_header Strict-Transport-Security "max-age=63072000" always;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;

    # Logs
    access_log /var/log/nginx/{{DEINE_DOMAIN}}.access.log;
    error_log /var/log/nginx/{{DEINE_DOMAIN}}.error.log;

    # Gzip
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript application/rss+xml application/atom+xml image/svg+xml;

    # Rate Limiting
    limit_req zone=astra_limit burst=20 nodelay;

    # Proxy zu Docker Container
    location / {
        proxy_pass http://astra_backend;
        proxy_http_version 1.1;

        # Proxy Headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;

        # WebSocket Support
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;

        # Buffer
        proxy_buffering on;
        proxy_buffer_size 4k;
        proxy_buffers 8 4k;
    }

    # Health Check Endpoint
    location /health {
        proxy_pass http://astra_backend/health;
        access_log off;
    }

    # Let's Encrypt
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
}
```

---

## ANLEITUNG ZUM AUSFÜLLEN:

1. **{{DEINE_DOMAIN}}** ersetzen mit: z.B. `astra-capital.at`

2. **{{SSL_CERT_PATH}}** ersetzen mit dem Pfad zum SSL Zertifikat:
   - Let's Encrypt: `/etc/letsencrypt/live/astra-capital.at/fullchain.pem`
   - Eigenes Zertifikat: `/etc/ssl/certs/astra-capital.at.pem`

3. **{{SSL_KEY_PATH}}** ersetzen mit dem Pfad zum Private Key:
   - Let's Encrypt: `/etc/letsencrypt/live/astra-capital.at/privkey.pem`
   - Eigenes Zertifikat: `/etc/ssl/private/astra-capital.at.key`

4. **{{BACKEND_PORT}}** ersetzen mit dem Port aus docker-compose.yml:
   - Standard: `8080`
   - Aus .env: Der Wert von WEBSITE_PORT

5. **{{BACKEND_HOST}}** ersetzen mit:
   - Lokaler Docker: `127.0.0.1` oder `localhost`
   - Remote Docker: IP-Adresse des Docker Hosts

---

## BEFEHLE NACH KONFIGURATION:

```bash
# 1. Symlink erstellen
sudo ln -s /etc/nginx/sites-available/astra-capital.at.conf /etc/nginx/sites-enabled/

# 2. Konfiguration testen
sudo nginx -t

# 3. Nginx neu laden
sudo systemctl reload nginx

# 4. Status prüfen
sudo systemctl status nginx
```

---

## OPTIONAL: SSL ZERTIFIKAT MIT LET'S ENCRYPT

```bash
# Certbot installieren (falls nicht vorhanden)
sudo apt install certbot python3-certbot-nginx

# Zertifikat erstellen (vor der HTTPS Konfiguration)
sudo certbot certonly --nginx -d astra-capital.at -d www.astra-capital.at

# Auto-Renewal testen
sudo certbot renew --dry-run
```
