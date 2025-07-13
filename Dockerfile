# Stage 1: Build Angular Application
FROM node:22.14.0 AS build_angular

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build --omit=dev

# Stage 2: Install Composer
FROM composer:2.8.9 AS build_composer

WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader


# Stage 3: Serve with Apache and PHP
FROM php:8.4-apache

COPY --from=build_angular /app/dist/my-portfolio/browser/ /var/www/html/
COPY --from=build_composer /app/vendor /var/www/html/vendor

RUN apt-get update && apt-get install -y \
  curl libpng-dev libfreetype6-dev libjpeg-dev && \
  docker-php-ext-configure gd --with-freetype --with-jpeg && \
  docker-php-ext-install gd && \
  curl -L https://github.com/mailhog/mhsendmail/releases/download/v0.2.0/mhsendmail_linux_amd64 \
  -o /usr/local/bin/mhsendmail && \
  chmod +x /usr/local/bin/mhsendmail && \
  echo "ServerName localhost" >> /etc/apache2/conf-available/servername.conf && \
  a2enconf servername && \
  a2enmod expires && \
  a2enmod rewrite && \
  echo "sendmail_path = '/usr/local/bin/mhsendmail --smtp-addr=mailhog:1025'" > /usr/local/etc/php/conf.d/sendmail.ini

EXPOSE 80
