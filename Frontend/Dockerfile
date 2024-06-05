FROM httpd:2.4

# Instalar locales y configurar es_ES.UTF-8
RUN apt-get update && apt-get install -y locales \
    && echo "es_ES.UTF-8 UTF-8" > /etc/locale.gen \
    && locale-gen es_ES.UTF-8 \
    && apt-get clean

# Configurar Apache para usar UTF-8
RUN echo 'AddDefaultCharset UTF-8' >> /usr/local/apache2/conf/httpd.conf

# Copiar los archivos al directorio del servidor web
COPY ./ /usr/local/apache2/htdocs/

# Establecer las variables de entorno de localización
ENV LANG es_ES.UTF-8
ENV LANGUAGE es_ES:es
ENV LC_ALL es_ES.UTF-8