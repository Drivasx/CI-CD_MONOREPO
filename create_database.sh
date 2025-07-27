#!/bin/bash

# Variables - Cambia estos valores
DB_NAME="cicd_database"
DB_USER="admin"
DB_PASSWORD="admin"

# Crear la base de datos y el usuario
sudo -u postgres psql <<EOF
CREATE DATABASE $DB_NAME;
CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';
GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;
EOF

echo "✅ Base de datos '$DB_NAME' y usuario '$DB_USER' creados con éxito."

