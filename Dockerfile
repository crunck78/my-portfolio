# Stage 1: Build Angular Application
FROM node:22.14.0 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# Stage 2: Serve with Apache and PHP
FROM php:8.1-apache

COPY --from=build /app/dist/my-portfolio/browser/ /var/www/html/

# Set ServerName to suppress FQDN warning
RUN echo "ServerName localhost" >> /etc/apache2/conf-available/servername.conf

# Enable the ServerName configuration
RUN a2enconf servername

# Enable mod_expires for caching
RUN a2enmod expires

EXPOSE 80
