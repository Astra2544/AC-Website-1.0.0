# Astra Capital e.U. - Docker Setup
# Statische Website - Nginx läuft extern

FROM nginx:alpine

LABEL maintainer="Astra Capital e.U."

WORKDIR /usr/share/nginx/html

# Entferne Standard-Seite und kopiere Website
RUN rm -rf /usr/share/nginx/html/*
COPY . /usr/share/nginx/html/

# Berechtigungen
RUN chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
