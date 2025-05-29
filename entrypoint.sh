#!/bin/sh
set -e

echo "Aguardando o banco de dados ficar pronto..."
while ! nc -z $DB_HOST $DB_PORT; do
  sleep 0.1
done

echo "Banco de dados esta pronto! Rodando migracoes..."
python manage.py makemigrations
python manage.py migrate auth
python manage.py migrate sites
python manage.py migrate user
python manage.py migrate socialaccount
python manage.py migrate



python manage.py runserver 0.0.0.0:8000

exec "$@"