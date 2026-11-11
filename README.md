# Raspi Learning Hub

A web-based learning platform for cybersecurity and Linux server
administration, designed to run on a Raspberry Pi.

## Project Overview

Raspi Learning Hub provides learning materials and demonstrations
related to:

-   Linux Server Administration
-   Cybersecurity Fundamentals
-   Red Team and Blue Team
-   Web Server Configuration
-   Linux Server Security Hardening
-   FTP and Database Services
-   Squid Proxy
-   Security Onion and Suricata

## Technology Stack

  Component            Technology
  -------------------- -------------------------------
  Frontend             Vue 3
  Frontend Framework   Quasar
  Backend              Django
  API                  Django REST Framework
  Database             MariaDB / MySQL
  Application Server   Gunicorn
  Web Server           Nginx
  Operating System     Raspberry Pi OS Lite (64-bit)

## System Requirements

-   Raspberry Pi capable of running a 64-bit operating system
-   Raspberry Pi OS Lite (64-bit), based on Debian
-   Internet connection
-   MicroSD card or other suitable storage
-   SSH access or a keyboard and monitor
-   At least 2 GB RAM recommended

> These instructions target a 64-bit Debian-based Raspberry Pi OS
> installation. Other operating systems may require adjusted package
> names or commands. The deployment steps have not yet been verified on
> every Raspberry Pi model.

------------------------------------------------------------------------

## 1. Update Raspberry Pi OS

``` bash
sudo apt update
sudo apt upgrade -y
sudo reboot
```

After the Raspberry Pi restarts, reconnect to it and check the OS and
architecture:

``` bash
cat /etc/os-release
uname -m
```

For a 64-bit ARM installation, `uname -m` should normally return
`aarch64`.

## 2. Install Required Packages

``` bash
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
  curl
```

Check the installed tools:

``` bash
git --version
python3 --version
nginx -v
mariadb --version
```

## 3. Install Node.js and npm

The Quasar frontend requires a supported Node.js version. This project
specifies Node.js 22.12 or later in the supported Node 22 line, Node 24,
or Node 26 and later. Node.js 24 LTS is a suitable choice.

Install Node.js 24 using the NodeSource setup script:

``` bash
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt install -y nodejs
```

Verify:

``` bash
node -v
npm -v
```

## 4. Clone the GitHub Repository

``` bash
cd ~
git clone https://github.com/medinatyrone37/raspi-learning-hub.git
cd raspi-learning-hub
```

The project contains the Django backend, Quasar frontend, and database
backup.

``` text
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
```

## 5. Configure MariaDB

Start and enable MariaDB:

``` bash
sudo systemctl enable --now mariadb
```

Open the MariaDB console:

``` bash
sudo mariadb
```

Create the database and application user. Replace
`CHANGE_THIS_DB_PASSWORD` with a strong password of your own.

``` sql
CREATE DATABASE raspi_web_server
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

CREATE USER 'django'@'localhost'
  IDENTIFIED BY 'CHANGE_THIS_DB_PASSWORD';

GRANT ALL PRIVILEGES ON raspi_web_server.*
  TO 'django'@'localhost';

FLUSH PRIVILEGES;
EXIT;
```

Keep the database password. You will need it when configuring Django.

## 6. Restore the Database Backup

The repository includes this backup:

``` text
database/raspi_web_server_backup.sql
```

From the project root directory, import it into the newly created
database:

``` bash
mariadb -u django -p raspi_web_server < database/raspi_web_server_backup.sql
```

Enter the database password created in Step 5.

Verify that the tables were imported:

``` bash
sudo mariadb
```

``` sql
USE raspi_web_server;
SHOW TABLES;
EXIT;
```

> **Important:** Restore this backup into a new, empty database.
> Importing it into a database that already contains important records
> may cause conflicts or overwrite data. Back up any existing database
> before attempting a restore. The backup may contain existing user
> records and password hashes; keep the GitHub repository private if
> those records are not intended for public access.

## 7. Set Up the Django Backend

Go to the backend directory:

``` bash
cd ~/raspi-learning-hub/backend
```

Create and activate a Python virtual environment:

``` bash
python3 -m venv venv
source venv/bin/activate
```

Upgrade pip:

``` bash
pip install --upgrade pip
```

Install the backend dependencies:

``` bash
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
```

If `mysqlclient` fails to install, confirm that the development packages
from Step 2 are installed, then retry inside the activated virtual
environment.

## 8. Configure Django for Deployment

Open the settings file:

``` bash
nano ~/raspi-learning-hub/backend/config/settings.py
```

For a production deployment, make sure `os` is imported near the top:

``` python
import os
```

Configure the secret key and debug mode using environment variables:

``` python
SECRET_KEY = os.environ["DJANGO_SECRET_KEY"]
DEBUG = os.environ.get("DJANGO_DEBUG", "False").lower() == "true"
ALLOWED_HOSTS = ["*"]
```

The wildcard allows requests using different hostnames and IP addresses.
For a public-facing deployment, it is safer to replace `["*"]` with the
Raspberry Pi's known IP address and hostname.

Configure the database connection to use the environment variable for
the password:

``` python
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
```

Configure static files:

``` python
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
```

Save and close the file (`Ctrl+O`, `Enter`, then `Ctrl+X`).

> Keep the existing installed apps, middleware, URL configuration, and
> other project settings. Do not replace the entire settings file with
> only the snippets above.

## 9. Create the Environment File

Generate a new Django secret key:

``` bash
python3 -c "import secrets; print(secrets.token_urlsafe(50))"
```

Copy the generated value.

Create a system environment file:

``` bash
sudo nano /etc/raspi-learning-hub.env
```

Add the following, replacing the placeholders:

``` env
DJANGO_SECRET_KEY=PASTE_YOUR_GENERATED_SECRET_KEY
DJANGO_DEBUG=False
DB_PASSWORD=YOUR_DATABASE_PASSWORD
```

Save the file and restrict access:

``` bash
sudo chown root:root /etc/raspi-learning-hub.env
sudo chmod 600 /etc/raspi-learning-hub.env
```

Do not commit this environment file or its values to GitHub.

## 10. Run Django Migrations and Collect Static Files

Return to the backend directory and activate the virtual environment:

``` bash
cd ~/raspi-learning-hub/backend
source venv/bin/activate
```

Load the environment variables into the current shell before running
Django commands:

``` bash
set -a
source /etc/raspi-learning-hub.env
set +a
```

Run migrations and collect static files:

``` bash
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py check
```

The Django check should complete without configuration errors.

> If migration commands report schema conflicts after restoring the SQL
> backup, stop and inspect the database and migration state before
> attempting to delete or recreate tables. Do not run destructive
> migration commands against data you need to preserve.

## 11. Prepare the Application Directory

Create a dedicated system account:

``` bash
sudo useradd --system --create-home \
  --home-dir /opt/raspi-learning-hub \
  --shell /usr/sbin/nologin raspiapp
```

Copy the project into the deployment directory:

``` bash
sudo cp -a ~/raspi-learning-hub/. /opt/raspi-learning-hub/
```

The virtual environment created in the home directory must also be
available in the deployment directory. Create it directly in the
deployment directory instead, then install the same dependencies from
Step 7:

``` bash
sudo python3 -m venv /opt/raspi-learning-hub/backend/venv
sudo /opt/raspi-learning-hub/backend/venv/bin/pip install --upgrade pip
sudo /opt/raspi-learning-hub/backend/venv/bin/pip install \
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
```

Set ownership:

``` bash
sudo chown -R raspiapp:www-data /opt/raspi-learning-hub
```

## 12. Configure Gunicorn with systemd

Create the service file:

``` bash
sudo nano /etc/systemd/system/raspi-learning-hub.service
```

Add:

``` ini
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
```

Save the file, then reload systemd and start the service:

``` bash
sudo systemctl daemon-reload
sudo systemctl enable --now raspi-learning-hub
```

Check its status:

``` bash
sudo systemctl status raspi-learning-hub
```

The service should show `active (running)`.

## 13. Build the Quasar Frontend

Open the deployed project directory:

``` bash
cd /opt/raspi-learning-hub
```

Install dependencies and build the production frontend:

``` bash
npm install
npm run build
```

The generated files should be in:

``` text
/opt/raspi-learning-hub/dist/spa
```

Copy the frontend build to the Nginx web directory:

``` bash
sudo mkdir -p /var/www/raspi-learning-hub
sudo cp -a /opt/raspi-learning-hub/dist/spa/. /var/www/raspi-learning-hub/
sudo chown -R www-data:www-data /var/www/raspi-learning-hub
```

## 14. Configure Nginx

Create the Nginx site configuration:

``` bash
sudo nano /etc/nginx/sites-available/raspi-learning-hub
```

Add:

``` nginx
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
```

Enable the site and disable the default site:

``` bash
sudo ln -s /etc/nginx/sites-available/raspi-learning-hub /etc/nginx/sites-enabled/raspi-learning-hub
sudo rm -f /etc/nginx/sites-enabled/default
```

Test and restart Nginx:

``` bash
sudo nginx -t
sudo systemctl enable nginx
sudo systemctl restart nginx
```

## 15. Access the Application

Find the Raspberry Pi's IP address:

``` bash
hostname -I
```

For example, if the output is `192.168.1.100`, open this address from a
device connected to the same network:

``` text
http://192.168.1.100
```

Replace the example IP with the actual Raspberry Pi IP address.

## 16. Test the Application

Check the API locally on the Raspberry Pi:

``` bash
curl http://127.0.0.1/api/status/
```

The expected response is:

``` json
{
  "status": "online",
  "message": "Raspi Web Server API is working!"
}
```

Then test the website in a browser:

1.  Open the Raspberry Pi IP address.
2.  Confirm that the homepage loads.
3.  Open the Login page.
4.  Test user registration and login.
5.  Open the Cybersecurity learning section.
6.  Confirm that protected learning pages require authentication.

## 17. Useful Maintenance Commands

Check the Django service:

``` bash
sudo systemctl status raspi-learning-hub
```

Restart Django:

``` bash
sudo systemctl restart raspi-learning-hub
```

View Django logs:

``` bash
sudo journalctl -u raspi-learning-hub -n 100 --no-pager
```

Follow Django logs:

``` bash
sudo journalctl -u raspi-learning-hub -f
```

Check Nginx:

``` bash
sudo systemctl status nginx
```

Restart Nginx:

``` bash
sudo systemctl restart nginx
```

Check Nginx configuration:

``` bash
sudo nginx -t
```

View Nginx error logs:

``` bash
sudo tail -f /var/log/nginx/error.log
```

Check MariaDB:

``` bash
sudo systemctl status mariadb
```

Restart the Raspberry Pi:

``` bash
sudo reboot
```

## 18. Troubleshooting

  -----------------------------------------------------------------------
  Problem                             Possible solution
  ----------------------------------- -----------------------------------
  Website cannot be accessed          Check the Raspberry Pi IP address,
                                      network connection, and Nginx
                                      service.

  API returns 502 Bad Gateway         Check whether the Gunicorn service
                                      is running.

  API returns 404                     Verify Django URL configuration and
                                      the Nginx proxy configuration.

  Database connection error           Check MariaDB status, database
                                      name, username, and password.

  Frontend does not load              Rebuild the Quasar frontend and
                                      verify the Nginx root directory.

  Static files are missing            Run `collectstatic` and verify the
                                      Nginx `/static/` alias.

  Gunicorn fails to start             Inspect the service logs with
                                      `journalctl`.

  npm install fails                   Check the Node.js version, internet
                                      connection, and available storage.
  -----------------------------------------------------------------------

## 19. Security Notes

-   Keep Django `DEBUG` disabled in production.
-   Generate a unique Django secret key for each deployment.
-   Use a strong MariaDB password.
-   Do not commit environment files, passwords, or secret keys to
    GitHub.
-   Keep the SQL backup private if it contains personal or confidential
    user records.
-   Do not expose Gunicorn port `8000` directly to the network; it
    should listen on `127.0.0.1`.
-   Keep Raspberry Pi OS and installed packages updated.
-   Back up the database before making major changes.
-   For internet-facing deployments, configure HTTPS and restrict
    allowed hosts and network access.

## 20. Repository

GitHub Repository:

https://github.com/medinatyrone37/raspi-learning-hub

Database backup:

`database/raspi_web_server_backup.sql`

## Deployment Checklist

-   [ ] Raspberry Pi OS Lite 64-bit installed
-   [ ] Required system packages installed
-   [ ] Node.js and npm installed
-   [ ] Repository cloned
-   [ ] MariaDB installed and configured
-   [ ] SQL backup restored
-   [ ] Django dependencies installed
-   [ ] Django environment variables configured
-   [ ] Django migrations completed
-   [ ] Gunicorn service running
-   [ ] Quasar frontend built
-   [ ] Nginx configured and running
-   [ ] Website accessible through the Raspberry Pi IP address
-   [ ] Login and registration tested
-   [ ] API status endpoint tested

**Deployment is complete when all checklist items have been verified on
the Raspberry Pi.**
