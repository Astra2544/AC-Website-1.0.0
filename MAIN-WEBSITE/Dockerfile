# Astra Capital e.U. - Frontend Docker Setup
# Statische Website mit Nginx Alpine

FROM nginx:alpine

LABEL maintainer="Astra Capital e.U."

WORKDIR /usr/share/nginx/html

# Entferne Standard-Seite
RUN rm -rf /usr/share/nginx/html/*

# Kopiere Website
COPY index.html .
COPY 404.html .
COPY 50x.html .
COPY css/ css/
COPY js/ js/
COPY img/ img/
COPY fonts/ fonts/
COPY pages/ pages/

# Berechtigungen
RUN chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
