# =====================================================
# Astra Capital e.U. - Docker Setup
# =====================================================
# Statische Website mit Nginx
# 
# Verwendung:
# 1. docker-compose up -d --build
# 2. Website läuft auf dem konfigurierten PORT
# =====================================================

FROM nginx:alpine

# Maintainer
LABEL maintainer="Astra Capital e.U."
LABEL description="Astra Capital Website - Static Site"
LABEL version="1.0"

# Arbeitsverzeichnis
WORKDIR /usr/share/nginx/html

# Entferne Standard nginx Seite
RUN rm -rf /usr/share/nginx/html/*

# Kopiere Website-Dateien
COPY MAIN-WEBSITE/ /usr/share/nginx/html/

# Kopiere nginx Konfiguration
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/default.conf /etc/nginx/conf.d/default.conf

# Setze Berechtigungen
RUN chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /usr/share/nginx/html

# Health Check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

# Exponiere Port (wird von docker-compose überschrieben)
EXPOSE 80

# Starte nginx
CMD ["nginx", "-g", "daemon off;"]
