Raspi Learning Hub

A web-based learning platform for cybersecurity and Linux server administration, designed to run on a Raspberry Pi.

Project Overview

Raspi Learning Hub provides learning materials and demonstrations related to:

Linux Server Administration

Cybersecurity Fundamentals

Red Team and Blue Team

Web Server Configuration

Linux Server Security Hardening

FTP and Database Services

Squid Proxy

Security Onion and Suricata

Technology Stack

Component

Technology

Frontend

Vue 3

Frontend Framework

Quasar

Backend

Django

API

Django REST Framework

Database

MariaDB / MySQL

Application Server

Gunicorn

Web Server

Nginx

Operating System

Raspberry Pi OS Lite 64-bit

System Requirements

Before installation, prepare the following:

Raspberry Pi with a 64-bit compatible processor

Raspberry Pi OS Lite (64-bit)

MicroSD card or storage device

Internet connection

SSH access or keyboard and monitor

At least 2 GB RAM recommended

Another computer for SSH access (optional)

Note: These instructions are intended for a 64-bit Debian-based Raspberry Pi OS installation. Commands may need adjustment for other operating systems.

1. Update Raspberry Pi

Open the Raspberry Pi terminal and update the system:

sudo apt update
sudo apt upgrade -y
sudo reboot

After restarting, reconnect to the Raspberry Pi.

Check the operating system:

cat /etc/os-release

Check the processor architecture:

uname -m

For a 64-bit ARM installation, the expected output is usually:

aarch64

2. Install Required Packages

Install Git, Nginx, MariaDB, Python, and the required development packages:

sudo apt update

sudo apt install -y \
git \
nginx \
mariadb-server \
python3 \
python3-pip \
python3-venv \
python3-dev \
build-essential \
pkg-config \
default-libmysqlclient-dev \
curl \
gnupg

Verify the installations:

git --version
python3 --version
nginx -v
mariadb --version

3. Install Node.js and npm

The frontend requires Node.js and npm.

Install Node.js 24:

curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -

sudo apt install -y nodejs

Verify:

node -v
npm -v

4. Clone the GitHub Repository

Clone the project:

cd ~
git clone https://github.com/medinatyrone37/raspi-learning-hub.git

Open the project directory:

cd ~/raspi-learning-hub

Check the project files:

ls -la

The project structure includes:

raspi-learning-hub/
├── backend/
│   ├── api/
│   ├── config/
│   └── manage.py
├── database/
│   └── raspi_web_server_backup.sql
├── src/
├── public/
├── package.json
├── quasar.config.js
└── README.md

5. Configure MariaDB Database

Start and enable MariaDB:

sudo systemctl enable mariadb
sudo systemctl start mariadb

Open the MariaDB console:

sudo mariadb

Create the database and application user.

Important: Replace CHANGE_THIS_DB_PASSWORD with your own strong database password. Use the same password later in the Django environment configuration.

CREATE DATABASE raspi_web_server
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

CREATE USER 'django'@'localhost'
IDENTIFIED BY 'CHANGE_THIS_DB_PASSWORD';

GRANT ALL PRIVILEGES ON raspi_web_server.*
TO 'django'@'localhost';

FLUSH PRIVILEGES;

EXIT;

6. Restore the Database Backup

The repository contains an SQL backup:

database/raspi_web_server_backup.sql

This backup contains the database structure and records from the existing project database.

From the project root, import the backup:

mariadb -u django -p raspi_web_server < database/raspi_web_server_backup.sql

Enter the database password created in the previous step.

Verify that the database was restored:

sudo mariadb

USE raspi_web_server;

SHOW TABLES;

EXIT;

Important: This restoration procedure is intended for a newly created, empty database. Do not import the backup into a database containing important existing records without creating another backup first.

The SQL backup may contain existing user accounts and password hashes. Keep the repository private if the backup contains personal or confidential records.

7. Set Up the Django Backend

Open the backend directory:

cd ~/raspi-learning-hub/backend

Create a Python virtual environment:

python3 -m venv venv

Activate it:

source venv/bin/activate

Upgrade pip:

pip install --upgrade pip

Install the backend dependencies:

pip install \
Django==6.1.1 \
django-cors-headers==4.9.0 \
djangorestframework==3.18.1 \
djangorestframework-simplejwt==5.5.1 \
mysqlclient==2.3.0 \
PyJWT==2.15.1 \
asgiref==3.12.1 \
sqlparse==0.6.0 \
tzdata==2026.4 \
gunicorn

If mysqlclient fails to install, verify that the MariaDB development packages and build tools from Step 2 were installed.

8. Configure Django Settings

Open the Django settings file:

nano config/settings.py

For production deployment, configure the following settings.

First, add this import near the beginning of the file:

import os

Replace the existing SECRET_KEY and DEBUG settings with:

SECRET_KEY = os.environ["DJANGO_SECRET_KEY"]

DEBUG = os.environ.get("DJANGO_DEBUG", "False").lower() == "true"

ALLOWED_HOSTS = ["*"]

The wildcard allows access using different Raspberry Pi IP addresses and hostnames. For a more restrictive production setup, replace it with the specific hostnames and IP addresses that should be allowed.

Update the database configuration to read the password from the environment:

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": "raspi_web_server",
        "USER": "django",
        "PASSWORD": os.environ["DB_PASSWORD"],
        "HOST": "127.0.0.1",
        "PORT": "3306",
    }
}

Configure static files:

STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

Save the file:

Press CTRL + O

Press ENTER

Press CTRL + X

Important: Do not commit production passwords or Django secret keys to GitHub.

9. Create the Environment Configuration

Generate a Django secret key:

python3 -c "import secrets; print(secrets.token_urlsafe(50))"

Copy the generated value.

Create the environment configuration file:

sudo nano /etc/raspi-learning-hub.env

Add the following:

DJANGO_SECRET_KEY=PASTE_YOUR_GENERATED_SECRET_KEY
DJANGO_DEBUG=False
DB_PASSWORD=YOUR_DATABASE_PASSWORD

Replace the placeholders with the actual values you created.

Save the file, then secure it:

sudo chmod 600 /etc/raspi-learning-hub.env
sudo chown root:root /etc/raspi-learning-hub.env

10. Run Django Migrations

Return to the backend directory:

cd ~/raspi-learning-hub/backend

Activate the virtual environment if it is not active:

source venv/bin/activate

Run the database migrations:

python manage.py migrate

Collect static files:

python manage.py collectstatic --noinput

Check the Django configuration:

python manage.py check

The expected result is:

System check identified no issues

11. Create a Dedicated Application User

Create a system account for running the Django application:

sudo useradd --system --create-home --home-dir /opt/raspi-learning-hub --shell /usr/sbin/nologin raspiapp

Copy the project into the application directory:

sudo cp -a ~/raspi-learning-hub/. /opt/raspi-learning-hub/

Set the appropriate ownership:

sudo chown -R raspiapp:www-data /opt/raspi-learning-hub

The deployed project will be located at:

/opt/raspi-learning-hub/

12. Configure Gunicorn

Create a systemd service:

sudo nano /etc/systemd/system/raspi-learning-hub.service

Paste this configuration:

[Unit]
Description=Raspi Learning Hub Django Application
After=network.target mariadb.service
Requires=mariadb.service

[Service]
User=raspiapp
Group=www-data
WorkingDirectory=/opt/raspi-learning-hub/backend
EnvironmentFile=/etc/raspi-learning-hub.env
ExecStart=/opt/raspi-learning-hub/backend/venv/bin/gunicorn config.wsgi:application --bind 127.0.0.1:8000 --workers 2
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target

Save the file.

Reload systemd:

sudo systemctl daemon-reload

Enable and start the service:

sudo systemctl enable raspi-learning-hub
sudo systemctl start raspi-learning-hub

Check the service:

sudo systemctl status raspi-learning-hub

The service should show:

Active: active (running)

13. Build the Quasar Frontend

Open the frontend project directory:

cd /opt/raspi-learning-hub

Install frontend dependencies:

npm install

Build the production frontend:

npm run build

The generated production files should be located at:

/opt/raspi-learning-hub/dist/spa

Copy the generated frontend files to the Nginx web directory:

sudo mkdir -p /var/www/raspi-learning-hub

sudo cp -a /opt/raspi-learning-hub/dist/spa/. /var/www/raspi-learning-hub/

Set the directory permissions:

sudo chown -R www-data:www-data /var/www/raspi-learning-hub

14. Configure Nginx

Create the Nginx configuration:

sudo nano /etc/nginx/sites-available/raspi-learning-hub

Paste the following:

server {
    listen 80;
    server_name _;

    root /var/www/raspi-learning-hub;
    index index.html;

    location /api/ {
        proxy_pass http://127.0.0.1:8000;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /admin/ {
        proxy_pass http://127.0.0.1:8000;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /static/ {
        alias /opt/raspi-learning-hub/backend/staticfiles/;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}

Enable the website:

sudo ln -s /etc/nginx/sites-available/raspi-learning-hub /etc/nginx/sites-enabled/

Disable the default Nginx website:

sudo rm -f /etc/nginx/sites-enabled/default

Test the configuration:

sudo nginx -t

If the configuration is successful, restart Nginx:

sudo systemctl restart nginx

Enable Nginx at startup:

sudo systemctl enable nginx

15. Access the Web Application

Find the Raspberry Pi IP address:

hostname -I

Example output:

192.168.1.100

Open a browser on another device connected to the same network.

Visit:

http://192.168.1.100

Replace the example IP address with the actual Raspberry Pi IP address.

The application should now load through the Nginx web server.

16. Test the Application

Test the Django API:

curl http://127.0.0.1/api/status/

Expected response:

{
    "status": "online",
    "message": "Raspi Web Server API is working!"
}

Test the application using another device:

Open the Raspberry Pi IP address in a browser.

Check whether the homepage loads.

Open the Login page.

Test user registration.

Test user login.

Open the Cybersecurity learning section.

Verify that the learning pages require authentication.

Check whether the database records are accessible.

17. Useful Maintenance Commands

Check the Django service

sudo systemctl status raspi-learning-hub

Restart Django

sudo systemctl restart raspi-learning-hub

View Django logs

sudo journalctl -u raspi-learning-hub -n 100 --no-pager

Follow Django logs

sudo journalctl -u raspi-learning-hub -f

Check Nginx

sudo systemctl status nginx

Restart Nginx

sudo systemctl restart nginx

Check Nginx configuration

sudo nginx -t

View Nginx error logs

sudo tail -f /var/log/nginx/error.log

Check MariaDB

sudo systemctl status mariadb

Restart Raspberry Pi

sudo reboot

18. Troubleshooting

Problem

Possible Solution

Website cannot be accessed

Check the Raspberry Pi IP address and Nginx service.

API returns 502 Bad Gateway

Check whether Gunicorn is running.

API returns 404

Verify Django URL configuration and Nginx proxy settings.

Database connection error

Check MariaDB status, database name, username, and password.

Frontend does not load

Rebuild the Quasar frontend and check the Nginx root directory.

Static files are missing

Run python manage.py collectstatic --noinput and restart Nginx.

Gunicorn fails to start

Check Django logs using journalctl.

npm install fails

Check the Node.js version and internet connection.

19. Security Recommendations

Keep Django DEBUG disabled in production.

Use a unique and strong Django secret key.

Use a strong MariaDB password.

Never commit production credentials to GitHub.

Keep the SQL backup private because it may contain user account records.

Do not expose Gunicorn port 8000 directly to the network.

Keep the Raspberry Pi OS and installed packages updated.

Back up the database before making major changes.

20. Project Repository

GitHub Repository:

https://github.com/medinatyrone37/raspi-learning-hub

Database Backup:

database/raspi_web_server_backup.sql
