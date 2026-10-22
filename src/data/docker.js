export const dockerLessons = [
  {
    id: 1,
    title: 'What is Docker?',
    subtitle: 'A practical introduction to containers and modern application deployment',
    category: 'Docker Fundamentals',
    icon: 'fa-brands fa-docker',
    template: 'dockerIntro',

    slides: [
      {
        type: 'hero',
        title: 'What is Docker?',
        subtitle:
          'A practical introduction to containers, images, and portable application deployment',
      },
      {
        type: 'concept',
        title: 'The Big Idea',
        content:
          'Docker is a platform that packages an application together with the dependencies it needs so it can run consistently across different environments.',
        points: [
          'Package applications into containers',
          'Keep application dependencies isolated',
          'Run the same application across different environments',
          'Make deployment more consistent and portable',
        ],
        visual: {
          type: 'docker-container',
          title: 'APP INSIDE A CONTAINER',
        },
      },
      {
        type: 'comparison',
        title: 'Traditional Deployment vs Docker',
        left: {
          title: 'Traditional',
          points: [
            'Install dependencies manually',
            'Environment differences can cause problems',
            'Configuration may differ between machines',
            'Applications share the host environment',
          ],
        },
        right: {
          title: 'With Docker',
          points: [
            'Dependencies are packaged with the application',
            'Containers provide isolation',
            'Environment can be reproduced',
            'Applications are easier to move and deploy',
          ],
        },
        visual: {
          type: 'docker-flow',
          title: 'TRADITIONAL vs DOCKER',
          icon: 'compare_arrows',
          center: 'DEPLOYMENT',
          items: [
            { title: 'Traditional', text: 'Manual setup per machine', icon: 'build' },
            { title: 'With Docker', text: 'Same packaged environment', icon: 'inventory_2' },
            { title: 'Problem', text: 'Works on my machine only', icon: 'warning' },
            { title: 'Result', text: 'Runs the same everywhere', icon: 'check_circle' },
          ],
        },
      },
      {
        type: 'cards',
        title: 'Why Docker Became Popular',
        cards: [
          {
            title: 'Portable',
            icon: 'swap_horiz',
            text: 'Applications can be moved between development, testing, servers, and cloud environments.',
          },
          {
            title: 'Consistent',
            icon: 'check_circle',
            text: 'The application and its dependencies can be packaged together.',
          },
          {
            title: 'Isolated',
            icon: 'security',
            text: 'Containers provide separated environments for applications and services.',
          },
          {
            title: 'Efficient',
            icon: 'speed',
            text: 'Containers are lightweight compared with traditional virtual machines.',
          },
        ],
        visual: {
          type: 'docker-flow',
          title: 'DOCKER BENEFITS',
          icon: 'inventory_2',
          center: 'DOCKER',
          items: [
            { title: 'Portable', icon: 'swap_horiz' },
            { title: 'Consistent', icon: 'check_circle' },
            { title: 'Isolated', icon: 'security' },
            { title: 'Efficient', icon: 'speed' },
          ],
        },
      },
      {
        type: 'process',
        title: 'How Docker Works',
        steps: [
          {
            number: '01',
            title: 'Create',
            text: 'Build an image containing the application and its dependencies.',
          },
          {
            number: '02',
            title: 'Run',
            text: 'Use the image to create a running container.',
          },
          {
            number: '03',
            title: 'Connect',
            text: 'Connect the container to networks, storage, and other services.',
          },
          {
            number: '04',
            title: 'Deploy',
            text: 'Run the same containerized application on another Docker environment.',
          },
        ],
        visual: {
          type: 'docker-build',
          title: 'FROM IMAGE TO CONTAINER',
        },
      },
      {
        type: 'technical',
        title: 'Docker at a Glance',
        content:
          'Docker provides a standardized way to package, distribute, and run applications using containers.',
        points: [
          'Docker Engine runs containers',
          'Images act as templates',
          'Containers are running instances of images',
          'Docker networks connect containers',
          'Volumes provide persistent storage',
        ],
        visual: {
          type: 'docker-flow',
          title: 'DOCKER COMPONENTS',
          icon: 'inventory_2',
          center: 'DOCKER ENGINE',
          items: [
            { title: 'Images', text: 'Templates', icon: 'layers' },
            { title: 'Containers', text: 'Running apps', icon: 'view_in_ar' },
            { title: 'Networks', text: 'Communication', icon: 'hub' },
            { title: 'Volumes', text: 'Saved data', icon: 'storage' },
          ],
        },
      },
      {
        type: 'summary',
        title: 'Key Takeaways',
        points: [
          'Docker uses containers to package applications.',
          'Images provide the blueprint for containers.',
          'Containers help isolate applications and dependencies.',
          'Docker improves portability and deployment consistency.',
        ],
        visual: {
          type: 'docker-container',
          title: 'DOCKER BASICS',
        },
      },
    ],
  },

  {
    id: 2,
    title: 'Why Use Containers?',
    subtitle: 'Understanding the problems containers solve in software development',
    category: 'Docker Fundamentals',
    icon: 'inventory_2',
    template: 'containerImpact',

    slides: [
      {
        type: 'hero',
        title: 'Why Use Containers?',
        subtitle:
          'Understanding portability, isolation, consistency, and efficient application deployment',
      },
      {
        type: 'concept',
        title: 'The Problem Before Containers',
        content:
          'Applications often behave differently between development, testing, and production because each environment may have different operating systems, libraries, versions, and configurations.',
        points: [
          'Dependency conflicts',
          'Different software versions',
          'Configuration differences',
          'Deployment inconsistencies',
        ],
        visual: {
          type: 'docker-flow',
          title: 'ENVIRONMENT DIFFERENCES',
          icon: 'warning',
          center: 'SAME APP, DIFFERENT RESULT',
          items: [
            { title: 'Developer Laptop', text: 'Python 3.13, works', icon: 'laptop' },
            { title: 'Testing Server', text: 'Python 3.9, fails', icon: 'bug_report' },
            { title: 'Production', text: 'Missing library', icon: 'dns' },
            { title: 'Docker Fix', text: 'One packaged environment', icon: 'inventory_2' },
          ],
        },
      },
      {
        type: 'comparison',
        title: 'Virtual Machines vs Containers',
        left: {
          title: 'Virtual Machines',
          points: [
            'Include a complete guest operating system',
            'Usually require more resources',
            'Boot more slowly',
            'Provide strong environment isolation',
          ],
        },
        right: {
          title: 'Containers',
          points: [
            'Share the host operating system kernel',
            'Use fewer resources',
            'Start quickly',
            'Package applications and dependencies',
          ],
        },
        visual: {
          type: 'docker-flow',
          title: 'VM vs CONTAINER STACK',
          icon: 'layers',
          center: 'HOST MACHINE',
          items: [
            { title: 'VM', text: 'App + Guest OS + Hypervisor', icon: 'dns' },
            { title: 'Container', text: 'App + Docker Engine', icon: 'view_in_ar' },
            { title: 'VM Start', text: 'Slower boot', icon: 'hourglass_empty' },
            { title: 'Container Start', text: 'Starts quickly', icon: 'bolt' },
          ],
        },
      },
      {
        type: 'cards',
        title: 'Major Benefits',
        cards: [
          {
            title: 'Portability',
            icon: 'flight_takeoff',
            text: 'Move the same containerized application between compatible Docker environments.',
          },
          {
            title: 'Isolation',
            icon: 'lock',
            text: 'Keep application environments separated from one another.',
          },
          {
            title: 'Scalability',
            icon: 'trending_up',
            text: 'Create additional container instances when an application needs more capacity.',
          },
          {
            title: 'Fast Deployment',
            icon: 'rocket_launch',
            text: 'Containers can be created and started quickly.',
          },
        ],
        visual: {
          type: 'docker-flow',
          title: 'CONTAINER BENEFITS',
          icon: 'inventory_2',
          center: 'CONTAINERS',
          items: [
            { title: 'Portability', icon: 'flight_takeoff' },
            { title: 'Isolation', icon: 'lock' },
            { title: 'Scalability', icon: 'trending_up' },
            { title: 'Fast Deploy', icon: 'rocket_launch' },
          ],
        },
      },
      {
        type: 'scenario',
        title: 'A Common Development Problem',
        scenario:
          'A developer builds a Django application that works correctly on their laptop. When another developer runs it, dependency versions are different and the application fails.',
        solution:
          'Package the application environment into a Docker image so the development environment can be reproduced more consistently.',
        visual: {
          type: 'docker-build',
          title: 'REPRODUCIBLE ENVIRONMENT',
        },
      },
      {
        type: 'technical',
        title: 'Container Isolation',
        content:
          'Containers isolate processes, filesystems, networking, and application dependencies while sharing the underlying host kernel.',
        points: [
          'Separate application processes',
          'Isolated filesystem view',
          'Controlled networking',
          'Independent environment variables',
          'Resource controls',
        ],
        visual: {
          type: 'docker-container',
          title: 'ISOLATED CONTAINER',
        },
      },
      {
        type: 'summary',
        title: 'Why Containers Matter',
        points: [
          'Containers reduce environment differences.',
          'They are lightweight and fast to start.',
          'They help applications become portable.',
          'They support repeatable deployment workflows.',
        ],
        visual: {
          type: 'docker-flow',
          title: 'WHY CONTAINERS',
          icon: 'inventory_2',
          center: 'CONTAINERS',
          items: [
            { title: 'Portable', icon: 'flight_takeoff' },
            { title: 'Isolated', icon: 'lock' },
            { title: 'Fast', icon: 'bolt' },
            { title: 'Consistent', icon: 'check_circle' },
          ],
        },
      },
    ],
  },

  {
    id: 3,
    title: 'Docker Architecture',
    subtitle: 'Understanding the Docker Engine, CLI, daemon, images, and containers',
    category: 'Docker Fundamentals',
    icon: 'account_tree',
    template: 'dockerArchitecture',

    slides: [
      {
        type: 'hero',
        title: 'Docker Architecture',
        subtitle: 'How Docker components work together to create and manage containers',
      },
      {
        type: 'architecture',
        title: 'The Docker Architecture',
        layers: [
          {
            title: 'Docker CLI',
            text: 'The command-line interface used to send commands to Docker.',
          },
          {
            title: 'Docker Engine / Daemon',
            text: 'The background service responsible for managing images, containers, networks, and volumes.',
          },
          {
            title: 'Docker Objects',
            text: 'Images, containers, networks, and volumes are managed by the Docker Engine.',
          },
          {
            title: 'Application',
            text: 'The application runs inside one or more Docker containers.',
          },
        ],
        visual: {
          type: 'docker-container',
          title: 'ENGINE ON THE HOST',
        },
      },
      {
        type: 'concept',
        title: 'Docker Client',
        content: 'The Docker CLI is the interface developers commonly use to interact with Docker.',
        points: [
          'docker build',
          'docker run',
          'docker ps',
          'docker images',
          'docker logs',
          'docker compose',
        ],
        visual: {
          type: 'docker-flow',
          title: 'DOCKER CLI COMMANDS',
          icon: 'terminal',
          center: 'docker',
          items: [
            { title: 'build', text: 'Create images', icon: 'build' },
            { title: 'run', text: 'Start containers', icon: 'play_arrow' },
            { title: 'ps', text: 'List containers', icon: 'list' },
            { title: 'logs', text: 'Read output', icon: 'description' },
          ],
        },
      },
      {
        type: 'concept',
        title: 'Docker Daemon',
        content:
          'The Docker daemon is the service that performs container-related operations requested through the Docker API.',
        points: [
          'Builds images',
          'Creates containers',
          'Starts and stops containers',
          'Manages networks',
          'Manages volumes',
        ],
        visual: {
          type: 'docker-flow',
          title: 'DOCKER DAEMON (dockerd)',
          icon: 'settings',
          center: 'DAEMON',
          items: [
            { title: 'Images', text: 'Builds & stores', icon: 'layers' },
            { title: 'Containers', text: 'Starts & stops', icon: 'view_in_ar' },
            { title: 'Networks', text: 'Connects services', icon: 'hub' },
            { title: 'Volumes', text: 'Manages data', icon: 'storage' },
          ],
        },
      },
      {
        type: 'cards',
        title: 'Core Docker Objects',
        cards: [
          {
            title: 'Images',
            icon: 'layers',
            text: 'Read-only templates used to create containers.',
          },
          {
            title: 'Containers',
            icon: 'view_in_ar',
            text: 'Running or stopped instances created from images.',
          },
          {
            title: 'Networks',
            icon: 'hub',
            text: 'Allow containers and external systems to communicate.',
          },
          {
            title: 'Volumes',
            icon: 'storage',
            text: 'Provide persistent storage for containerized applications.',
          },
        ],
        visual: {
          type: 'docker-image',
          title: 'IMAGE → CONTAINER',
        },
      },
      {
        type: 'process',
        title: 'A Typical Docker Command Flow',
        steps: [
          {
            number: '01',
            title: 'Command',
            text: 'The user executes a Docker CLI command.',
          },
          {
            number: '02',
            title: 'Request',
            text: 'The CLI sends the request to the Docker Engine.',
          },
          {
            number: '03',
            title: 'Action',
            text: 'The Docker Engine performs the requested operation.',
          },
          {
            number: '04',
            title: 'Result',
            text: 'Docker returns information or starts the requested resource.',
          },
        ],
        visual: {
          type: 'docker-flow',
          title: 'CLI → ENGINE → RESULT',
          icon: 'swap_horiz',
          center: 'REQUEST FLOW',
          items: [
            { title: 'docker run', text: 'You type', icon: 'terminal' },
            { title: 'Docker API', text: 'CLI sends request', icon: 'api' },
            { title: 'Daemon', text: 'Does the work', icon: 'settings' },
            { title: 'Container', text: 'Result appears', icon: 'view_in_ar' },
          ],
        },
      },
      {
        type: 'summary',
        title: 'Architecture Recap',
        points: [
          'The Docker CLI provides the user interface.',
          'The Docker Engine manages Docker resources.',
          'Images are templates for containers.',
          'Networks and volumes extend container functionality.',
        ],
        visual: {
          type: 'docker-flow',
          title: 'DOCKER ARCHITECTURE',
          icon: 'settings',
          center: 'DOCKER ENGINE',
          items: [
            { title: 'CLI', icon: 'terminal' },
            { title: 'Images', icon: 'layers' },
            { title: 'Containers', icon: 'view_in_ar' },
            { title: 'Networks', icon: 'hub' },
          ],
        },
      },
    ],
  },

  {
    id: 4,
    title: 'Images vs Containers',
    subtitle: 'Understanding the difference between Docker images and running containers',
    category: 'Docker Fundamentals',
    icon: 'layers',
    template: 'imageContainer',

    slides: [
      {
        type: 'hero',
        title: 'Images vs Containers',
        subtitle: 'Two of the most important concepts you need to understand before using Docker',
      },
      {
        type: 'comparison',
        title: 'Image vs Container',
        left: {
          title: 'Docker Image',
          points: [
            'Read-only template',
            'Contains application files',
            'Contains required dependencies',
            'Can be stored and distributed',
            'Used to create containers',
          ],
        },
        right: {
          title: 'Docker Container',
          points: [
            'Running instance of an image',
            'Has its own writable layer',
            'Can be started and stopped',
            'Can have network connections',
            'Can use mounted storage',
          ],
        },
        visual: {
          type: 'docker-image',
          title: 'IMAGE LAYERS → CONTAINER',
        },
      },
      {
        type: 'concept',
        title: 'Think of It Like This',
        content:
          'An image is like a blueprint or recipe. A container is the actual running instance created from that blueprint.',
        points: [
          'One image can create many containers',
          'Containers can have different names',
          'Containers can use different ports',
          'Containers can have different configurations',
        ],
        visual: {
          type: 'docker-flow',
          title: 'ONE IMAGE, MANY CONTAINERS',
          icon: 'layers',
          center: 'nginx IMAGE',
          items: [
            { title: 'web-1', text: 'Port 8080', icon: 'view_in_ar' },
            { title: 'web-2', text: 'Port 8081', icon: 'view_in_ar' },
            { title: 'web-3', text: 'Port 8082', icon: 'view_in_ar' },
            { title: 'Same Template', text: 'Different instances', icon: 'content_copy' },
          ],
        },
      },
      {
        type: 'process',
        title: 'From Image to Container',
        steps: [
          {
            number: '01',
            title: 'Image',
            text: 'A Docker image contains the application environment.',
          },
          {
            number: '02',
            title: 'Create',
            text: 'Docker creates a container from the image.',
          },
          {
            number: '03',
            title: 'Start',
            text: 'The container starts its configured process.',
          },
          {
            number: '04',
            title: 'Run',
            text: 'The application operates inside the running container.',
          },
        ],
        visual: {
          type: 'docker-image',
          title: 'docker run FLOW',
        },
      },
      {
        type: 'command',
        title: 'List Docker Images',
        command: 'docker images',
        explanation:
          'Displays Docker images stored on this machine. Each row is one image: its repository name, tag (version), image ID, when it was created, and its size.',
        example: `REPOSITORY    TAG       IMAGE ID       CREATED        SIZE
my-app        1.0       3f4c2a9b1d7e   2 hours ago    198MB
nginx         latest    a8758716bb6a   5 days ago     192MB
mysql         8.4       5b3f1c7e9a21   2 weeks ago    586MB
hello-world   latest    ee301c921b8a   4 months ago   9.14kB`,
        visual: {
          type: 'docker-image',
          title: 'LOCAL IMAGES',
        },
      },
      {
        type: 'command',
        title: 'List Running Containers',
        command: 'docker ps',
        explanation:
          'Displays currently running containers: the container ID, the image used, how long it has been up, the port mapping (host:container), and its name.',
        example: `CONTAINER ID   IMAGE       COMMAND                  CREATED          STATUS          PORTS                 NAMES
b7e41c2d9a10   nginx       "/docker-entrypoint.…"   10 minutes ago   Up 10 minutes   0.0.0.0:8080->80/tcp  web-server
4d2f9c1e7b33   mysql:8.4   "docker-entrypoint.s…"   2 hours ago      Up 2 hours      3306/tcp, 33060/tcp   mysql-db`,
        visual: {
          type: 'docker-container',
          title: 'RUNNING CONTAINERS',
        },
      },
      {
        type: 'summary',
        title: 'Remember the Difference',
        points: [
          'Images are templates.',
          'Containers are instances created from images.',
          'A single image can create multiple containers.',
          'Containers can be started, stopped, removed, and recreated.',
        ],
        visual: {
          type: 'docker-image',
          title: 'IMAGE → CONTAINER',
        },
      },
    ],
  },

  
  {
    id: 5,
    title: 'Installing Docker',
    subtitle: 'Installing and verifying Docker Engine on Ubuntu Server',
    category: 'Docker Fundamentals',
    icon: 'download',
    template: 'installation',

    slides: [
      {
        type: 'hero',
        title: 'Installing Docker',
        subtitle:
          'Learn how to prepare Ubuntu Server, install Docker Engine, manage its service, and verify a working container installation.',
      },
      {
        type: 'concept',
        title: 'Installation Requirements',
        content:
          'Docker Engine runs containerized applications on a Linux host. Before installation, verify that the system uses a supported Ubuntu release, has internet access, and provides an account with sudo privileges.',
        points: [
          'Use a supported Ubuntu Server release.',
          'Connect the server to the internet.',
          'Use an account with sudo privileges.',
          'Ensure enough disk space for packages and images.',
          'Review existing Docker or conflicting packages before installation.',
        ],
        visual: {
          type: 'docker-flow',
          title: 'PRE-INSTALLATION CHECKLIST',
          icon: 'checklist',
          center: 'READY?',
          items: [
            { title: 'Ubuntu', text: 'Supported release', icon: 'computer' },
            { title: 'Internet', text: 'Repository access', icon: 'wifi' },
            { title: 'Sudo', text: 'Admin permissions', icon: 'verified_user' },
            { title: 'Storage', text: 'Enough disk space', icon: 'sd_storage' },
          ],
        },
      },
      {
        type: 'concept',
        title: 'Understand the Installation Process',
        content:
          'Docker installation is performed in stages. The administrator prepares the package manager, configures the official repository, installs the engine and supporting tools, and then verifies the service.',
        points: [
          'Prepare the operating system.',
          'Configure Docker package verification and repository access.',
          'Install Docker Engine and supporting components.',
          'Start the Docker service.',
          'Verify the installation with a test container.',
        ],
        visual: {
          type: 'docker-flow',
          title: 'INSTALLATION OVERVIEW',
          icon: 'account_tree',
          center: 'DOCKER',
          items: [
            { title: 'Prepare', text: 'Update packages', icon: 'update' },
            { title: 'Configure', text: 'Official repository', icon: 'storage' },
            { title: 'Install', text: 'Engine and CLI', icon: 'download' },
            { title: 'Verify', text: 'Run a test', icon: 'verified' },
          ],
        },
      },
      {
        type: 'command',
        title: 'Step 1 — Update Ubuntu',
        command: `sudo apt update
sudo apt install ca-certificates curl`,
        explanation:
          'The apt update command refreshes package information. The ca-certificates and curl packages provide certificate trust and a tool for downloading files from remote repositories.',
        example:
          'The terminal displays package information and installation progress. The exact output depends on the Ubuntu release and current package versions.',
        visual: {
          type: 'docker-flow',
          title: 'PREPARE THE SYSTEM',
          icon: 'system_update',
          center: 'APT',
          items: [
            { title: 'Refresh', text: 'Package lists', icon: 'update' },
            { title: 'Certificates', text: 'Secure connections', icon: 'verified_user' },
            { title: 'Curl', text: 'Download tool', icon: 'download' },
          ],
        },
      },
      {
        type: 'command',
        title: 'Step 2 — Add Docker’s Signing Key',
        command: `sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc`,
        explanation:
          'Create the directory used to store repository keys, download Docker’s official signing key, and make the key readable by the package manager. This helps apt verify packages from the configured repository.',
        example:
          'These commands normally produce little or no output when successful. If curl reports a network or certificate error, investigate the connection before continuing.',
        visual: {
          type: 'docker-flow',
          title: 'PACKAGE VERIFICATION',
          icon: 'verified',
          center: 'GPG KEY',
          items: [
            { title: 'Directory', text: 'Create keyring', icon: 'folder' },
            { title: 'Download', text: 'Official key', icon: 'download' },
            { title: 'Permissions', text: 'Readable key', icon: 'lock' },
          ],
        },
      },
      {
        type: 'command',
        title: 'Step 3 — Configure the Repository',
        command: `sudo tee /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "\${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/docker.asc
EOF

sudo apt update`,
        explanation:
          'This command creates an apt source file for Docker’s official Ubuntu repository. It detects the Ubuntu codename and CPU architecture automatically, uses the stable package channel, and associates the repository with the downloaded signing key. The final apt update loads package information from the newly configured source.',
        example:
          'The terminal should fetch package indexes from the configured repositories. Repository errors must be resolved before installing Docker.',
        visual: {
          type: 'docker-flow',
          title: 'OFFICIAL PACKAGE SOURCE',
          icon: 'storage',
          center: 'APT',
          items: [
            { title: 'Repository', text: 'Docker packages', icon: 'cloud' },
            { title: 'Codename', text: 'Ubuntu release', icon: 'label' },
            { title: 'Architecture', text: 'System platform', icon: 'memory' },
            { title: 'Signing Key', text: 'Package trust', icon: 'verified' },
          ],
        },
      },
      {
        type: 'command',
        title: 'Step 4 — Install Docker Engine',
        command: `sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin`,
        explanation:
          'Install Docker Engine, the Docker command-line interface, containerd, the Buildx plugin, and the Compose plugin. Review the package list and confirm the installation if apt prompts for approval.',
        example:
          'Package names identify the components being installed. Exact versions depend on the configured repository and available updates.',
        visual: {
          type: 'docker-flow',
          title: 'DOCKER COMPONENTS',
          icon: 'download',
          center: 'ENGINE',
          items: [
            { title: 'Docker CE', text: 'Container engine', icon: 'settings' },
            { title: 'Docker CLI', text: 'Terminal interface', icon: 'terminal' },
            { title: 'containerd', text: 'Container runtime', icon: 'memory' },
            { title: 'Compose', text: 'Multi-service apps', icon: 'layers' },
          ],
        },
      },
      {
        type: 'command',
        title: 'Step 5 — Start and Enable Docker',
        command: `sudo systemctl enable --now docker
sudo systemctl status docker`,
        explanation:
          'The enable option configures Docker to start automatically during boot. The now option starts the service immediately. The status command displays the current service state.',
        example:
          'Look for active (running) in the service status. Press q to exit the status screen.',
        visual: {
          type: 'docker-flow',
          title: 'MANAGE THE SERVICE',
          icon: 'settings',
          center: 'docker.service',
          items: [
            { title: 'Enable', text: 'Start at boot', icon: 'power_settings_new' },
            { title: 'Start', text: 'Run now', icon: 'play_arrow' },
            { title: 'Status', text: 'Check service', icon: 'info' },
          ],
        },
      },
      {
        type: 'command',
        title: 'Step 6 — Check the Docker Version',
        command: `docker --version
sudo docker info`,
        explanation:
          'The first command prints the Docker CLI version. The second displays information about the Docker Engine, including server details, storage, and runtime configuration. The CLI version alone does not prove the service is working.',
        example:
          'The version output includes a version number and build identifier. The info command should display server information when the daemon is available.',
        visual: {
          type: 'docker-flow',
          title: 'VERIFY THE INSTALLATION',
          icon: 'verified',
          center: 'DOCKER',
          items: [
            { title: 'CLI', text: 'Version available', icon: 'terminal' },
            { title: 'Daemon', text: 'Engine responds', icon: 'settings' },
            { title: 'Info', text: 'Server details', icon: 'description' },
          ],
        },
      },
      {
        type: 'command',
        title: 'Step 7 — Run Hello World',
        command: `sudo docker run hello-world`,
        explanation:
          'Docker searches for the hello-world image locally. If it is unavailable, Docker downloads it from Docker Hub, creates a container, and runs the program. The program prints a confirmation message and exits.',
        example: `Hello from Docker!
This message shows that your installation appears to be working correctly.`,
        visual: {
          type: 'docker-flow',
          title: 'TEST CONTAINER LIFECYCLE',
          icon: 'celebration',
          center: 'HELLO WORLD',
          items: [
            { title: 'Pull', text: 'Download image', icon: 'cloud_download' },
            { title: 'Create', text: 'Make container', icon: 'inventory_2' },
            { title: 'Run', text: 'Execute program', icon: 'play_arrow' },
            { title: 'Confirm', text: 'Print message', icon: 'check_circle' },
          ],
        },
      },
      {
        type: 'technical',
        title: 'Common Installation Problems',
        content:
          'Installation problems can come from repository configuration, network access, package conflicts, service startup failures, or permission restrictions. Read the error message before attempting a fix.',
        points: [
          'Package not found: check the Ubuntu release and repository configuration.',
          'Repository or key error: inspect the repository file and signing-key path.',
          'Service not running: inspect the Docker service status and logs.',
          'Permission denied: check sudo privileges and Docker socket permissions.',
          'Network failure: check connectivity and DNS resolution.',
        ],
        visual: {
          type: 'docker-flow',
          title: 'TROUBLESHOOTING FLOW',
          icon: 'build',
          center: 'DIAGNOSE',
          items: [
            { title: 'Packages', text: 'Check apt errors', icon: 'inventory_2' },
            { title: 'Repository', text: 'Check source/key', icon: 'storage' },
            { title: 'Service', text: 'Inspect status', icon: 'settings' },
            { title: 'Permissions', text: 'Check access', icon: 'lock' },
          ],
        },
      },
      {
        type: 'command',
        title: 'Troubleshooting — Inspect Docker Logs',
        command: `sudo systemctl status docker
sudo journalctl -u docker --no-pager -n 50`,
        explanation:
          'Use these diagnostic commands if Docker fails to start or a container operation fails. The first shows the service state. The second displays the latest 50 log lines from the Docker service.',
        example:
          'Review the timestamps and error messages to identify what failed. These commands inspect the system; they do not reinstall Docker.',
        visual: {
          type: 'docker-flow',
          title: 'DIAGNOSTIC TOOLS',
          icon: 'search',
          center: 'LOGS',
          items: [
            { title: 'Status', text: 'Service state', icon: 'info' },
            { title: 'Journal', text: 'Recent events', icon: 'description' },
            { title: 'Analyze', text: 'Find errors', icon: 'troubleshoot' },
          ],
        },
      },
      {
        type: 'summary',
        title: 'Installation Complete',
        points: [
          'Prepare Ubuntu and configure Docker’s official package repository.',
          'Install Docker Engine and its supporting components.',
          'Start Docker and enable it at boot.',
          'Verify the CLI and engine, then run hello-world.',
          'Use service status and logs to investigate installation problems.',
        ],
        visual: {
          type: 'docker-flow',
          title: 'DOCKER INSTALLATION CHECKLIST',
          icon: 'verified',
          center: 'READY',
          items: [
            { title: 'Installed', icon: 'download' },
            { title: 'Running', icon: 'play_arrow' },
            { title: 'Verified', icon: 'check_circle' },
            { title: 'Troubleshoot', icon: 'build' },
          ],
        },
      },
    ],
  },


  {
    id: 6,
    title: 'Docker Images',
    subtitle: 'Learn how Docker images are created, stored, tagged, and managed',
    category: 'Working with Docker',
    icon: 'layers',
    template: 'dockerImages',

    slides: [
      {
        type: 'hero',
        title: 'Docker Images',
        subtitle: 'The reusable building blocks behind Docker containers',
      },
      {
        type: 'concept',
        title: 'What is a Docker Image?',
        content:
          'A Docker image is a packaged, read-only filesystem containing the files, libraries, dependencies, and configuration required to run an application.',
        points: [
          'Images are immutable templates',
          'Images contain application dependencies',
          'Images can be versioned using tags',
          'Images can be shared through registries',
        ],
        visual: {
          type: 'docker-image',
          title: 'IMAGE LAYERS',
        },
      },
      {
        type: 'cards',
        title: 'Image Components',
        cards: [
          {
            title: 'Base Image',
            icon: 'foundation',
            text: 'Provides the starting operating system or runtime environment.',
          },
          {
            title: 'Application',
            icon: 'code',
            text: 'Contains the application source code and required files.',
          },
          {
            title: 'Dependencies',
            icon: 'extension',
            text: 'Includes packages and libraries required by the application.',
          },
          {
            title: 'Configuration',
            icon: 'settings',
            text: 'Defines how the container should be configured and started.',
          },
        ],
        visual: {
          type: 'docker-flow',
          title: 'WHAT IS INSIDE AN IMAGE',
          icon: 'layers',
          center: 'IMAGE',
          items: [
            { title: 'Base Image', text: 'OS / runtime', icon: 'foundation' },
            { title: 'Dependencies', text: 'Libraries', icon: 'extension' },
            { title: 'Application', text: 'Your code', icon: 'code' },
            { title: 'Configuration', text: 'Startup command', icon: 'settings' },
          ],
        },
      },
      {
        type: 'concept',
        title: 'Image Tags',
        content: 'Tags help identify different versions or variants of an image.',
        points: ['ubuntu:24.04', 'python:3.13', 'mysql:8.4', 'nginx:latest'],
        visual: {
          type: 'docker-flow',
          title: 'NAME : TAG',
          icon: 'sell',
          center: 'image:tag',
          items: [
            { title: 'ubuntu', text: 'Tag 24.04', icon: 'tag' },
            { title: 'python', text: 'Tag 3.13', icon: 'tag' },
            { title: 'mysql', text: 'Tag 8.4', icon: 'tag' },
            { title: 'nginx', text: 'Tag latest', icon: 'tag' },
          ],
        },
      },
      {
        type: 'command',
        title: 'List Images',
        command: 'docker images',
        explanation:
          'Shows the images stored locally on the Docker host. REPOSITORY is the image name, TAG is the version, and SIZE shows how much disk space it uses.',
        example: `REPOSITORY    TAG       IMAGE ID       CREATED        SIZE
my-app        1.0       3f4c2a9b1d7e   2 hours ago    198MB
nginx         latest    a8758716bb6a   5 days ago     192MB
mysql         8.4       5b3f1c7e9a21   2 weeks ago    586MB
hello-world   latest    ee301c921b8a   4 months ago   9.14kB`,
        visual: {
          type: 'docker-image',
          title: 'LOCAL IMAGE STORE',
        },
      },
      {
        type: 'command',
        title: 'Pull an Image',
        command: 'docker pull nginx:latest',
        explanation:
          'Downloads an image from a registry. Images are made of layers, so each "Pull complete" line is one layer being downloaded.',
        example: `latest: Pulling from library/nginx
2cc3ae149d28: Pull complete
a97f4c3e1b52: Pull complete
7d8e0f2b6a14: Pull complete
c4a1e9d5f032: Pull complete
Digest: sha256:9a3f1e7c5b2d84a60e1f93c7d5b8a2e4f6c0d1b3a5e7f9c2d4b6a8e0f1c3d5b7
Status: Downloaded newer image for nginx:latest
docker.io/library/nginx:latest`,
        visual: {
          type: 'docker-flow',
          title: 'PULL FROM REGISTRY',
          icon: 'cloud_download',
          center: 'docker pull',
          items: [
            { title: 'Docker Hub', text: 'Remote registry', icon: 'cloud' },
            { title: 'Layers', text: 'Downloaded one by one', icon: 'layers' },
            { title: 'Local Store', text: 'Saved on this host', icon: 'storage' },
          ],
        },
      },
      {
        type: 'command',
        title: 'Remove an Image',
        command: 'docker rmi nginx:latest',
        explanation:
          'Removes a local image. "Untagged" means the name:tag was removed, and "Deleted" means the image layers were actually deleted from disk. Images used by a container cannot be removed until that container is removed.',
        example: `Untagged: nginx:latest
Untagged: nginx@sha256:9a3f1e7c5b2d84a60e1f93c7d5b8a2e4f6c0d1b3a5e7f9c2d4b6a8e0f1c3d5b7
Deleted: sha256:a8758716bb6aa4d90071160d27028fe4eaee7ce8166221a97d30440c8eac2be6`,
        visual: {
          type: 'docker-flow',
          title: 'REMOVE AN IMAGE',
          icon: 'delete',
          center: 'docker rmi',
          items: [
            { title: 'Untag', text: 'Name removed', icon: 'label_off' },
            { title: 'Delete Layers', text: 'Disk space freed', icon: 'delete' },
            { title: 'In Use?', text: 'Remove container first', icon: 'warning' },
          ],
        },
      },
      {
        type: 'summary',
        title: 'Image Recap',
        points: [
          'Images are templates used to create containers.',
          'Images can have different tags and versions.',
          'Images can be pulled from registries.',
          'Images can be built locally using Dockerfiles.',
        ],
        visual: {
          type: 'docker-image',
          title: 'IMAGE LAYERS',
        },
      },
    ],
  },

  {
    id: 7,
    title: 'Docker Containers',
    subtitle: 'Create, run, inspect, stop, and remove containers',
    category: 'Working with Docker',
    icon: 'view_in_ar',
    template: 'dockerContainers',

    slides: [
      {
        type: 'hero',
        title: 'Docker Containers',
        subtitle: 'Learn how to manage the actual runtime environments created from Docker images',
      },
      {
        type: 'concept',
        title: 'What is a Container?',
        content: 'A container is an isolated runtime environment created from a Docker image.',
        points: [
          'Containers run application processes',
          'Containers can be started and stopped',
          'Containers have unique names or IDs',
          'Containers can connect to networks',
          'Containers can use persistent volumes',
        ],
        visual: {
          type: 'docker-container',
          title: 'A RUNNING CONTAINER',
        },
      },
      {
        type: 'command',
        title: 'Run a Container',
        command: 'docker run nginx',
        explanation:
          'Creates and starts a new container from the nginx image in the foreground. The terminal shows the container logs and stays attached until you press Ctrl+C.',
        example: `/docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
/docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
/docker-entrypoint.sh: Configuration complete; ready for start up
2026/10/07 02:30:11 [notice] 1#1: nginx/1.27.2
2026/10/07 02:30:11 [notice] 1#1: start worker processes
2026/10/07 02:30:11 [notice] 1#1: start worker process 29`,
        visual: {
          type: 'docker-flow',
          title: 'FOREGROUND CONTAINER',
          icon: 'play_arrow',
          center: 'docker run',
          items: [
            { title: 'Image Found', text: 'nginx', icon: 'layers' },
            { title: 'Container Created', icon: 'view_in_ar' },
            { title: 'Logs Shown', text: 'Terminal stays attached', icon: 'description' },
            { title: 'Ctrl+C', text: 'Stops it', icon: 'stop' },
          ],
        },
      },
      {
        type: 'command',
        title: 'Run in the Background',
        command: 'docker run -d nginx',
        explanation:
          'The -d option runs the container in detached mode (in the background). Docker prints the full container ID and gives your terminal back.',
        example: '9f2c7a41d8e6b305c1a47e92f0d3b86a5c7e1d94f20b8a63e5c97d10a4b2f68e',
        visual: {
          type: 'docker-flow',
          title: 'DETACHED MODE (-d)',
          icon: 'cloud_queue',
          center: 'BACKGROUND',
          items: [
            { title: 'Container Starts', icon: 'play_arrow' },
            { title: 'ID Printed', text: '64-character ID', icon: 'tag' },
            { title: 'Terminal Free', text: 'You can keep working', icon: 'terminal' },
          ],
        },
      },
      {
        type: 'command',
        title: 'Give a Container a Name',
        command: 'docker run -d --name web-server nginx',
        explanation:
          'Assigns a readable name to the container, so you can use "web-server" in later commands instead of the long ID.',
        example: 'b7e41c2d9a10f3856e2c7d4a19b05f8c3e6a2d7194c0b85fe3a61d92c7048b5a',
        visual: {
          type: 'docker-flow',
          title: 'NAMED CONTAINER',
          icon: 'label',
          center: 'web-server',
          items: [
            { title: 'Readable Name', text: 'web-server', icon: 'label' },
            { title: 'Short ID', text: 'b7e41c2d9a10', icon: 'tag' },
            { title: 'Used In', text: 'stop, logs, rm', icon: 'terminal' },
          ],
        },
      },
      {
        type: 'command',
        title: 'Stop a Container',
        command: 'docker stop web-server',
        explanation:
          'Stops a running container gracefully by sending a stop signal first. Docker prints the container name when it succeeds.',
        example: 'web-server',
        visual: {
          type: 'docker-flow',
          title: 'STOP A CONTAINER',
          icon: 'stop_circle',
          center: 'docker stop',
          items: [
            { title: 'Stop Signal', text: 'SIGTERM sent', icon: 'notifications' },
            { title: 'Graceful Exit', text: 'App shuts down', icon: 'power_settings_new' },
            { title: 'Status', text: 'Exited', icon: 'stop' },
          ],
        },
      },
      {
        type: 'command',
        title: 'Remove a Container',
        command: 'docker rm web-server',
        explanation:
          'Removes a stopped container. Docker prints the container name when it succeeds. The image is not deleted, so you can create a new container from it again.',
        example: 'web-server',
        visual: {
          type: 'docker-flow',
          title: 'REMOVE A CONTAINER',
          icon: 'delete',
          center: 'docker rm',
          items: [
            { title: 'Stopped First', icon: 'stop' },
            { title: 'Container Removed', icon: 'delete' },
            { title: 'Image Stays', text: 'Can run again', icon: 'layers' },
          ],
        },
      },
      {
        type: 'technical',
        title: 'Container Lifecycle',
        points: ['Created', 'Running', 'Stopped', 'Restarted', 'Removed'],
        visual: {
          type: 'docker-flow',
          title: 'CONTAINER LIFECYCLE',
          icon: 'autorenew',
          center: 'LIFECYCLE',
          items: [
            { title: 'Created', icon: 'add_circle' },
            { title: 'Running', icon: 'play_arrow' },
            { title: 'Stopped', icon: 'stop' },
            { title: 'Restarted', icon: 'restart_alt' },
            { title: 'Removed', icon: 'delete' },
          ],
        },
      },
      {
        type: 'summary',
        title: 'Container Management',
        points: [
          'Containers are created from images.',
          'Use docker run to create and start containers.',
          'Use docker ps to inspect running containers.',
          'Stopped containers can be restarted or removed.',
        ],
        visual: {
          type: 'docker-container',
          title: 'CONTAINER LIFECYCLE',
        },
      },
    ],
  },

  {
    id: 8,
    title: 'Dockerfile',
    subtitle: 'Build custom Docker images using instructions and layers',
    category: 'Building Images',
    icon: 'description',
    template: 'dockerfile',

    slides: [
      {
        type: 'hero',
        title: 'Dockerfile',
        subtitle: 'Define how your application image should be built',
      },
      {
        type: 'concept',
        title: 'What is a Dockerfile?',
        content:
          'A Dockerfile is a text file containing instructions used by Docker to build an image.',
        points: [
          'Defines the base image',
          'Installs dependencies',
          'Copies application files',
          'Sets configuration',
          'Defines the startup command',
        ],
        visual: {
          type: 'docker-build',
          title: 'DOCKERFILE → IMAGE',
        },
      },
      {
        type: 'cards',
        title: 'Common Dockerfile Instructions',
        cards: [
          {
            title: 'FROM',
            icon: 'layers',
            text: 'Defines the base image.',
          },
          {
            title: 'RUN',
            icon: 'terminal',
            text: 'Executes commands while building the image.',
          },
          {
            title: 'COPY',
            icon: 'content_copy',
            text: 'Copies files into the image.',
          },
          {
            title: 'WORKDIR',
            icon: 'folder',
            text: 'Sets the working directory.',
          },
          {
            title: 'CMD',
            icon: 'play_arrow',
            text: 'Defines the default command when the container starts.',
          },
          {
            title: 'EXPOSE',
            icon: 'lan',
            text: 'Documents a port intended to be used by the application.',
          },
        ],
        visual: {
          type: 'docker-flow',
          title: 'DOCKERFILE INSTRUCTIONS',
          icon: 'description',
          center: 'Dockerfile',
          items: [
            { title: 'FROM', text: 'Base image', icon: 'layers' },
            { title: 'WORKDIR', text: 'Folder', icon: 'folder' },
            { title: 'COPY', text: 'Add files', icon: 'content_copy' },
            { title: 'RUN', text: 'Install', icon: 'terminal' },
            { title: 'EXPOSE', text: 'Port', icon: 'lan' },
            { title: 'CMD', text: 'Start command', icon: 'play_arrow' },
          ],
        },
      },
      {
        type: 'command',
        title: 'Example Dockerfile',
        command: `FROM python:3.13-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]`,
        explanation:
          'This example creates a Python-based image, installs dependencies, copies the application, exposes port 8000, and starts Django.',
        visual: {
          type: 'docker-image',
          title: 'LAYERS FROM THIS DOCKERFILE',
        },
      },
      {
        type: 'process',
        title: 'Building an Image',
        steps: [
          {
            number: '01',
            title: 'Read',
            text: 'Docker reads the Dockerfile instructions.',
          },
          {
            number: '02',
            title: 'Build',
            text: 'Docker executes each instruction and creates image layers.',
          },
          {
            number: '03',
            title: 'Tag',
            text: 'The resulting image receives a name and optional version tag.',
          },
          {
            number: '04',
            title: 'Run',
            text: 'A container can be created from the resulting image.',
          },
        ],
        visual: {
          type: 'docker-build',
          title: 'BUILD PIPELINE',
        },
      },
      {
        type: 'command',
        title: 'Build an Image',
        command: 'docker build -t my-app:1.0 .',
        explanation:
          'Builds an image from the Dockerfile in the current directory (the dot). -t gives the image a name and tag. Each step in the output matches one Dockerfile instruction.',
        example: `[+] Building 42.7s (10/10) FINISHED                          docker:default
 => [internal] load build definition from Dockerfile            0.0s
 => [internal] load metadata for docker.io/library/python:3.13-slim  1.8s
 => [1/5] FROM docker.io/library/python:3.13-slim               9.4s
 => [2/5] WORKDIR /app                                          0.1s
 => [3/5] COPY requirements.txt .                               0.0s
 => [4/5] RUN pip install -r requirements.txt                  28.3s
 => [5/5] COPY . .                                              0.2s
 => exporting to image                                          2.6s
 => => naming to docker.io/library/my-app:1.0                   0.0s`,
        visual: {
          type: 'docker-build',
          title: 'BUILDING my-app:1.0',
        },
      },
      {
        type: 'summary',
        title: 'Dockerfile Recap',
        points: [
          'Dockerfiles define image build instructions.',
          'Each instruction can create an image layer.',
          'Dockerfiles make image builds reproducible.',
          'Custom application images can be built from Dockerfiles.',
        ],
        visual: {
          type: 'docker-build',
          title: 'BUILD FROM DOCKERFILE',
        },
      },
    ],
  },

  {
    id: 9,
    title: 'Docker Compose',
    subtitle: 'Manage multi-container applications with a single configuration',
    category: 'Application Deployment',
    icon: 'view_quilt',
    template: 'dockerCompose',

    slides: [
      {
        type: 'hero',
        title: 'Docker Compose',
        subtitle: 'Run multiple connected services using a single Compose configuration',
      },
      {
        type: 'concept',
        title: 'What is Docker Compose?',
        content:
          'Docker Compose is a tool for defining and running multi-container applications using a YAML configuration file.',
        points: [
          'Define multiple services',
          'Configure networks',
          'Configure volumes',
          'Set environment variables',
          'Start the application stack with one command',
        ],
        visual: {
          type: 'docker-compose',
          title: 'ONE FILE, MANY SERVICES',
        },
      },
      {
        type: 'architecture',
        title: 'Example Application Stack',
        layers: [
          {
            title: 'Frontend',
            text: 'Vue + Quasar application container.',
          },
          {
            title: 'Backend',
            text: 'Django API application container.',
          },
          {
            title: 'Database',
            text: 'MySQL database container with persistent storage.',
          },
          {
            title: 'Docker Network',
            text: 'Allows the application services to communicate.',
          },
        ],
        visual: {
          type: 'docker-compose',
          title: 'APPLICATION STACK',
        },
      },
      {
        type: 'command',
        title: 'Example compose.yaml',
        command: `services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"

  mysql:
    image: mysql:8.4
    environment:
      MYSQL_DATABASE: app_db
      MYSQL_USER: django
      MYSQL_PASSWORD: password
      MYSQL_ROOT_PASSWORD: root`,
        explanation: 'A Compose file can define multiple services and their configuration.',
        visual: {
          type: 'docker-flow',
          title: 'WHAT THIS FILE DEFINES',
          icon: 'description',
          center: 'compose.yaml',
          items: [
            { title: 'backend', text: 'Built from ./backend', icon: 'api' },
            { title: 'Port 8000:8000', text: 'Host to container', icon: 'lan' },
            { title: 'mysql', text: 'Image mysql:8.4', icon: 'storage' },
            { title: 'Environment', text: 'DB name and users', icon: 'settings' },
          ],
        },
      },
      {
        type: 'command',
        title: 'Start the Stack',
        command: 'docker compose up -d',
        explanation:
          'Creates the network and starts every service defined in the Compose file, in the background. Each line shows one resource and its result.',
        example: `[+] Running 3/3
 ✔ Network myapp_default      Created    0.1s
 ✔ Container myapp-mysql-1    Started    1.3s
 ✔ Container myapp-backend-1  Started    1.9s`,
        visual: {
          type: 'docker-flow',
          title: 'STACK STARTING',
          icon: 'play_arrow',
          center: 'compose up',
          items: [
            { title: 'Network Created', text: 'myapp_default', icon: 'hub' },
            { title: 'MySQL Started', text: 'myapp-mysql-1', icon: 'storage' },
            { title: 'Backend Started', text: 'myapp-backend-1', icon: 'api' },
          ],
        },
      },
      {
        type: 'command',
        title: 'Stop the Stack',
        command: 'docker compose down',
        explanation:
          'Stops and removes the containers and the network created by Compose. Named volumes are kept unless you add the -v option.',
        example: `[+] Running 3/3
 ✔ Container myapp-backend-1  Removed    0.4s
 ✔ Container myapp-mysql-1    Removed    1.2s
 ✔ Network myapp_default      Removed    0.3s`,
        visual: {
          type: 'docker-flow',
          title: 'STACK STOPPING',
          icon: 'stop_circle',
          center: 'compose down',
          items: [
            { title: 'Backend Removed', icon: 'delete' },
            { title: 'MySQL Removed', icon: 'delete' },
            { title: 'Network Removed', icon: 'hub' },
            { title: 'Volumes Kept', text: 'Data survives', icon: 'storage' },
          ],
        },
      },
      {
        type: 'cards',
        title: 'Why Use Compose?',
        cards: [
          {
            title: 'Simple',
            icon: 'bolt',
            text: 'Start multiple services using a single command.',
          },
          {
            title: 'Repeatable',
            icon: 'repeat',
            text: 'Store application configuration in version control.',
          },
          {
            title: 'Organized',
            icon: 'account_tree',
            text: 'Keep related services together as one application stack.',
          },
          {
            title: 'Portable',
            icon: 'swap_horiz',
            text: 'Recreate the same stack on another compatible environment.',
          },
        ],
        visual: {
          type: 'docker-compose',
          title: 'COMPOSE BENEFITS',
        },
      },
      {
        type: 'summary',
        title: 'Compose Recap',
        points: [
          'Compose defines multi-container applications.',
          'Services can communicate through Docker networks.',
          'Volumes can provide persistent data.',
          'docker compose up starts the application stack.',
        ],
        visual: {
          type: 'docker-compose',
          title: 'MULTI-SERVICE STACK',
        },
      },
    ],
  },

  {
    id: 10,
    title: 'Docker Networks',
    subtitle: 'Connect containers and control application communication',
    category: 'Docker Networking',
    icon: 'hub',
    template: 'dockerNetworks',

    slides: [
      {
        type: 'hero',
        title: 'Docker Networks',
        subtitle: 'Understand how containers communicate with each other and the outside world',
      },
      {
        type: 'concept',
        title: 'Why Docker Networking Matters',
        content:
          'Applications often consist of multiple services that need to communicate, such as a frontend, backend API, and database.',
        points: [
          'Connect containers',
          'Provide service discovery',
          'Control communication',
          'Expose selected services to the host',
        ],
        visual: {
          type: 'docker-network',
          title: 'CLIENT → DOCKER NETWORK',
        },
      },
      {
        type: 'cards',
        title: 'Common Docker Network Types',
        cards: [
          {
            title: 'Bridge',
            icon: 'account_tree',
            text: 'The common default network for containers on a Docker host.',
          },
          {
            title: 'Host',
            icon: 'computer',
            text: 'The container shares the host network namespace.',
          },
          {
            title: 'None',
            icon: 'block',
            text: 'Disables normal network connectivity for the container.',
          },
          {
            title: 'Custom Networks',
            icon: 'hub',
            text: 'Allow applications to create organized isolated networks.',
          },
        ],
        visual: {
          type: 'docker-flow',
          title: 'NETWORK DRIVERS',
          icon: 'hub',
          center: 'NETWORK TYPES',
          items: [
            { title: 'bridge', text: 'Default, isolated', icon: 'account_tree' },
            { title: 'host', text: 'Shares host network', icon: 'computer' },
            { title: 'none', text: 'No networking', icon: 'block' },
            { title: 'custom', text: 'Your own network', icon: 'hub' },
          ],
        },
      },
      {
        type: 'architecture',
        title: 'Container Communication',
        layers: [
          {
            title: 'Frontend',
            text: 'Sends requests to the backend service.',
          },
          {
            title: 'Backend',
            text: 'Processes API requests and communicates with the database.',
          },
          {
            title: 'Database',
            text: 'Stores application data.',
          },
          {
            title: 'Docker Network',
            text: 'Provides communication between the services.',
          },
        ],
        visual: {
          type: 'docker-network',
          title: 'SERVICES ON ONE NETWORK',
        },
      },
      {
        type: 'command',
        title: 'List Networks',
        command: 'docker network ls',
        explanation:
          'Displays the Docker networks on this host. bridge, host, and none are created by Docker automatically, and my-network is a custom network.',
        example: `NETWORK ID     NAME         DRIVER    SCOPE
a1b2c3d4e5f6   bridge       bridge    local
f6e5d4c3b2a1   host         host      local
0a9b8c7d6e5f   none         null      local
3c4d5e6f7a8b   my-network   bridge    local`,
        visual: {
          type: 'docker-network',
          title: 'AVAILABLE NETWORKS',
        },
      },
      {
        type: 'command',
        title: 'Inspect a Network',
        command: 'docker network inspect my-network',
        explanation:
          'Shows detailed information in JSON: the driver, the subnet and gateway, and every container connected to the network with its IP address (shortened here).',
        example: `[
    {
        "Name": "my-network",
        "Driver": "bridge",
        "Scope": "local",
        "IPAM": {
            "Config": [
                { "Subnet": "172.20.0.0/16", "Gateway": "172.20.0.1" }
            ]
        },
        "Containers": {
            "4d2f9c1e7b33...": {
                "Name": "mysql-db",
                "IPv4Address": "172.20.0.2/16"
            },
            "c91a5e7d3b20...": {
                "Name": "backend",
                "IPv4Address": "172.20.0.3/16"
            }
        }
    }
]`,
        visual: {
          type: 'docker-flow',
          title: 'NETWORK DETAILS',
          icon: 'hub',
          center: 'my-network',
          items: [
            { title: 'Subnet', text: '172.20.0.0/16', icon: 'lan' },
            { title: 'Gateway', text: '172.20.0.1', icon: 'router' },
            { title: 'mysql-db', text: '172.20.0.2', icon: 'storage' },
            { title: 'backend', text: '172.20.0.3', icon: 'api' },
          ],
        },
      },
      {
        type: 'technical',
        title: 'Service Discovery',
        content:
          'On user-defined Docker networks, containers can communicate using service or container names instead of hard-coded IP addresses.',
        points: [
          'Backend can connect to mysql',
          'Services can use stable names',
          'Docker handles internal network resolution',
          'Avoid relying on changing container IP addresses',
        ],
        visual: {
          type: 'docker-flow',
          title: 'NAME → IP RESOLUTION',
          icon: 'dns',
          center: 'DOCKER DNS',
          items: [
            { title: 'backend asks', text: 'Connect to "mysql"', icon: 'api' },
            { title: 'Docker DNS', text: 'Resolves the name', icon: 'dns' },
            { title: 'mysql found', text: '172.20.0.2', icon: 'storage' },
            { title: 'IP may change', text: 'The name stays stable', icon: 'sync' },
          ],
        },
      },
      {
        type: 'summary',
        title: 'Network Recap',
        points: [
          'Networks allow containers to communicate.',
          'Bridge networks are commonly used for application stacks.',
          'Compose automatically creates application networks.',
          'Service names can be used for internal communication.',
        ],
        visual: {
          type: 'docker-network',
          title: 'CONTAINER NETWORK',
        },
      },
    ],
  },

  {
    id: 11,
    title: 'Docker Volumes & Data Persistence',
    subtitle: 'Keep important application data safe beyond the container lifecycle',
    category: 'Storage',
    icon: 'storage',
    template: 'dockerVolumes',

    slides: [
      {
        type: 'hero',
        title: 'Volumes & Data Persistence',
        subtitle: 'Understand how Docker stores data that needs to survive container recreation',
      },
      {
        type: 'concept',
        title: 'The Persistence Problem',
        content:
          'Containers are designed to be replaceable. Data stored only inside a container can be lost when that container is removed.',
        points: [
          'Containers can be recreated',
          'Application data may need to survive',
          'Databases require persistent storage',
          'Volumes separate data from the container lifecycle',
        ],
        visual: {
          type: 'docker-volume',
          title: 'CONTAINER + VOLUME',
        },
      },
      {
        type: 'comparison',
        title: 'Container Storage vs Volume',
        left: {
          title: 'Container Writable Layer',
          points: [
            'Tied to the container',
            'Can disappear when container is removed',
            'Useful for temporary data',
            'Not ideal for important database data',
          ],
        },
        right: {
          title: 'Docker Volume',
          points: [
            'Managed separately from containers',
            'Can survive container removal',
            'Useful for persistent data',
            'Commonly used with databases',
          ],
        },
        visual: {
          type: 'docker-volume',
          title: 'TEMPORARY vs PERSISTENT',
        },
      },
      {
        type: 'command',
        title: 'Create a Volume',
        command: 'docker volume create app-data',
        explanation:
          'Creates a named volume managed by Docker. On success Docker prints the volume name.',
        example: 'app-data',
        visual: {
          type: 'docker-volume',
          title: 'NEW VOLUME: app-data',
        },
      },
      {
        type: 'command',
        title: 'Use a Volume',
        command: 'docker run -d --name mysql-db -v mysql-data:/var/lib/mysql mysql:8.4',
        explanation:
          'Mounts the mysql-data volume into the MySQL data directory, so database files are stored in the volume. Note: the official MySQL image also needs -e MYSQL_ROOT_PASSWORD=... (or another password option) or the container exits right after starting.',
        example: `Unable to find image 'mysql:8.4' locally
8.4: Pulling from library/mysql
3f9a1c7e5b02: Pull complete
b2d4e6f8a0c1: Pull complete
Status: Downloaded newer image for mysql:8.4
4d2f9c1e7b33a8f05c6e19d2b7a40e3c5f81d96a2b0c7e4f13a58d9c6e2b0f71`,
        visual: {
          type: 'docker-volume',
          title: 'mysql-data → /var/lib/mysql',
        },
      },
      {
        type: 'command',
        title: 'List Volumes',
        command: 'docker volume ls',
        explanation:
          'Displays the volumes on this host. DRIVER "local" means the data is stored on this machine.',
        example: `DRIVER    VOLUME NAME
local     app-data
local     mysql-data`,
        visual: {
          type: 'docker-volume',
          title: 'VOLUMES ON THIS HOST',
        },
      },
      {
        type: 'scenario',
        title: 'Database Example',
        scenario:
          'A MySQL container stores application data. The container is recreated after a configuration change.',
        solution:
          'Mount the database directory to a persistent Docker volume so the database files remain available when the container is recreated.',
        visual: {
          type: 'docker-flow',
          title: 'DATA SURVIVES RECREATION',
          icon: 'storage',
          center: 'mysql-data VOLUME',
          items: [
            { title: 'Old Container', text: 'Removed', icon: 'delete' },
            { title: 'Volume', text: 'Still exists', icon: 'storage' },
            { title: 'New Container', text: 'Mounts the volume', icon: 'view_in_ar' },
            { title: 'Data Intact', text: 'Database restored', icon: 'check_circle' },
          ],
        },
      },
      {
        type: 'summary',
        title: 'Storage Recap',
        points: [
          'Containers can be temporary.',
          'Important data should be stored separately.',
          'Docker volumes provide persistent storage.',
          'Databases commonly use volumes.',
        ],
        visual: {
          type: 'docker-volume',
          title: 'PERSISTENT DATA',
        },
      },
    ],
  },

  {
    id: 12,
    title: 'Docker Hub & Registries',
    subtitle: 'Store, download, version, and distribute container images',
    category: 'Image Distribution',
    icon: 'cloud_upload',
    template: 'dockerRegistry',

    slides: [
      {
        type: 'hero',
        title: 'Docker Hub & Registries',
        subtitle: 'Understand where Docker images are stored and how they are distributed',
      },
      {
        type: 'concept',
        title: 'What is a Container Registry?',
        content: 'A container registry is a service used to store and distribute container images.',
        points: [
          'Store images',
          'Download images',
          'Version images with tags',
          'Share application images',
          'Support automated deployment workflows',
        ],
        visual: {
          type: 'docker-flow',
          title: 'REGISTRY WORKFLOW',
          icon: 'cloud',
          center: 'REGISTRY',
          items: [
            { title: 'Build', text: 'On your machine', icon: 'build' },
            { title: 'Push', text: 'Upload image', icon: 'cloud_upload' },
            { title: 'Store', text: 'Docker Hub', icon: 'cloud' },
            { title: 'Pull', text: 'On the server', icon: 'cloud_download' },
          ],
        },
      },
      {
        type: 'comparison',
        title: 'Local Images vs Registry Images',
        left: {
          title: 'Local',
          points: [
            'Stored on your Docker host',
            'Available only to that environment',
            'Useful during development',
            'Can be built locally',
          ],
        },
        right: {
          title: 'Registry',
          points: [
            'Stored remotely',
            'Can be shared between systems',
            'Useful for deployment',
            'Can provide versioned image tags',
          ],
        },
        visual: {
          type: 'docker-flow',
          title: 'LOCAL vs REGISTRY',
          icon: 'compare_arrows',
          center: 'IMAGE LOCATION',
          items: [
            { title: 'Local', text: 'Only this machine', icon: 'laptop' },
            { title: 'Registry', text: 'Shared remotely', icon: 'cloud' },
            { title: 'Development', text: 'Build locally', icon: 'code' },
            { title: 'Deployment', text: 'Pull from registry', icon: 'rocket_launch' },
          ],
        },
      },
      {
        type: 'command',
        title: 'Pull an Image',
        command: 'docker pull nginx:latest',
        explanation:
          'Downloads an image from the configured registry (Docker Hub by default). Each "Pull complete" line is one image layer.',
        example: `latest: Pulling from library/nginx
2cc3ae149d28: Pull complete
a97f4c3e1b52: Pull complete
7d8e0f2b6a14: Pull complete
c4a1e9d5f032: Pull complete
Digest: sha256:9a3f1e7c5b2d84a60e1f93c7d5b8a2e4f6c0d1b3a5e7f9c2d4b6a8e0f1c3d5b7
Status: Downloaded newer image for nginx:latest
docker.io/library/nginx:latest`,
        visual: {
          type: 'docker-flow',
          title: 'REGISTRY → LOCAL',
          icon: 'cloud_download',
          center: 'docker pull',
          items: [
            { title: 'docker.io', text: 'Docker Hub', icon: 'cloud' },
            { title: 'Layers', text: 'Pull complete', icon: 'layers' },
            { title: 'Local Image', text: 'nginx:latest', icon: 'storage' },
          ],
        },
      },
      {
        type: 'command',
        title: 'Tag an Image',
        command: 'docker tag my-app:latest username/my-app:1.0',
        explanation:
          'Gives the same image a second name that a registry can accept (username/image:tag). It prints nothing on success, so check it with docker images. Both names point to the same image ID.',
        example: `# No output on success. Verify with:
$ docker images
REPOSITORY        TAG      IMAGE ID       CREATED         SIZE
my-app            latest   3f4c2a9b1d7e   2 hours ago     198MB
username/my-app   1.0      3f4c2a9b1d7e   2 hours ago     198MB`,
        visual: {
          type: 'docker-flow',
          title: 'ONE IMAGE, TWO NAMES',
          icon: 'sell',
          center: 'IMAGE ID 3f4c2a9b1d7e',
          items: [
            { title: 'my-app:latest', text: 'Local name', icon: 'label' },
            { title: 'username/my-app:1.0', text: 'Registry name', icon: 'label' },
            { title: 'Same Image', text: 'No copy made', icon: 'content_copy' },
          ],
        },
      },
      {
        type: 'command',
        title: 'Push an Image',
        command: 'docker push username/my-app:1.0',
        explanation:
          'Uploads the tagged image to the registry. You must be logged in (docker login) first. "Pushed" means a layer was uploaded, and "Layer already exists" means the registry already had it.',
        example: `The push refers to repository [docker.io/username/my-app]
5f70bf18a086: Pushed
c2a9d1b4e7f3: Pushed
8d1e0f3a5b92: Layer already exists
e4f6a8c0b2d1: Pushed
1.0: digest: sha256:4b7e1d9c3a5f8206e1b4d7a9c2f5083e6b1d4a7c9e2f5b8d0a3c6e9f1b4d7a20 size: 1573`,
        visual: {
          type: 'docker-flow',
          title: 'LOCAL → REGISTRY',
          icon: 'cloud_upload',
          center: 'docker push',
          items: [
            { title: 'docker login', text: 'Needed first', icon: 'login' },
            { title: 'Layers Uploaded', text: 'Pushed', icon: 'layers' },
            { title: 'Digest', text: 'Unique fingerprint', icon: 'fingerprint' },
            { title: 'Available', text: 'Others can pull it', icon: 'public' },
          ],
        },
      },
      {
        type: 'technical',
        title: 'Image Versioning',
        content: 'Tags help identify which version of an image should be deployed.',
        points: ['latest', '1.0', '1.1', '2.0', 'production', 'development'],
        visual: {
          type: 'docker-flow',
          title: 'VERSION TAGS',
          icon: 'sell',
          center: 'my-app',
          items: [
            { title: ':1.0', text: 'First release', icon: 'tag' },
            { title: ':1.1', text: 'Bug fixes', icon: 'tag' },
            { title: ':2.0', text: 'Major update', icon: 'tag' },
            { title: ':latest', text: 'Newest default', icon: 'new_releases' },
          ],
        },
      },
      {
        type: 'summary',
        title: 'Registry Recap',
        points: [
          'Registries store Docker images.',
          'Docker Hub is a commonly used public registry.',
          'Images can be tagged with versions.',
          'Registries make image distribution easier.',
        ],
        visual: {
          type: 'docker-flow',
          title: 'IMAGE REGISTRY',
          icon: 'cloud',
          center: 'REGISTRY',
          items: [
            { title: 'Pull', icon: 'cloud_download' },
            { title: 'Tag', icon: 'sell' },
            { title: 'Push', icon: 'cloud_upload' },
            { title: 'Share', icon: 'public' },
          ],
        },
      },
    ],
  },

  {
    id: 13,
    title: 'Docker Container Security',
    subtitle: 'Apply basic security principles when running containerized applications',
    category: 'Docker Security',
    icon: 'security',
    template: 'dockerSecurity',

    slides: [
      {
        type: 'hero',
        title: 'Docker Container Security',
        subtitle: 'Build safer containerized applications using isolation and least privilege',
      },
      {
        type: 'concept',
        title: 'Why Container Security Matters',
        content:
          'Containers provide isolation, but they still need proper configuration and security controls.',
        points: [
          'Use trusted base images',
          'Keep images updated',
          'Avoid unnecessary privileges',
          'Protect secrets',
          'Limit exposed services',
        ],
        visual: {
          type: 'docker-security',
          title: 'CONTAINER SECURITY',
        },
      },
      {
        type: 'cards',
        title: 'Basic Security Practices',
        cards: [
          {
            title: 'Minimal Images',
            icon: 'layers_clear',
            text: 'Use only the software and dependencies required by the application.',
          },
          {
            title: 'Least Privilege',
            icon: 'lock',
            text: 'Avoid running applications with unnecessary administrator privileges.',
          },
          {
            title: 'Updates',
            icon: 'update',
            text: 'Keep base images, packages, and Docker components updated.',
          },
          {
            title: 'Secrets',
            icon: 'vpn_key',
            text: 'Do not hard-code passwords, API keys, or sensitive credentials into images.',
          },
        ],
        visual: {
          type: 'docker-flow',
          title: 'SECURITY PRACTICES',
          icon: 'security',
          center: 'HARDENED',
          items: [
            { title: 'Minimal Images', icon: 'layers_clear' },
            { title: 'Least Privilege', icon: 'lock' },
            { title: 'Updates', icon: 'update' },
            { title: 'Secrets', icon: 'vpn_key' },
          ],
        },
      },
      {
        type: 'comparison',
        title: 'Safer vs Riskier Configuration',
        left: {
          title: 'Safer Approach',
          points: [
            'Use minimal base images',
            'Run as a non-root user when possible',
            'Limit exposed ports',
            'Use environment or secret management',
          ],
        },
        right: {
          title: 'Riskier Approach',
          points: [
            'Run everything as root',
            'Expose unnecessary services',
            'Embed passwords in images',
            'Use outdated vulnerable images',
          ],
        },
        visual: {
          type: 'docker-flow',
          title: 'SAFER vs RISKIER',
          icon: 'compare_arrows',
          center: 'CONFIGURATION',
          items: [
            { title: 'Non-root User', text: 'Safer', icon: 'verified_user' },
            { title: 'Runs as root', text: 'Riskier', icon: 'warning' },
            { title: 'Few Ports', text: 'Safer', icon: 'lan' },
            { title: 'Password in Image', text: 'Riskier', icon: 'key_off' },
          ],
        },
      },
      {
        type: 'scenario',
        title: 'Security Scenario',
        scenario:
          'A web application container is configured with administrator privileges and contains database credentials directly inside its Dockerfile.',
        solution:
          'Use a non-root user where practical and provide sensitive configuration through secure environment or secret-management mechanisms rather than baking credentials into the image.',
        visual: {
          type: 'docker-flow',
          title: 'FIX THE CONFIGURATION',
          icon: 'build',
          center: 'SECURE SETUP',
          items: [
            { title: 'Problem', text: 'Root + password in Dockerfile', icon: 'warning' },
            { title: 'Non-root User', text: 'Limits damage', icon: 'person' },
            { title: 'Secrets Outside', text: 'Env / secret store', icon: 'vpn_key' },
            { title: 'Safer Image', text: 'No credentials inside', icon: 'verified' },
          ],
        },
      },
      {
        type: 'technical',
        title: 'Security Checklist',
        points: [
          'Trusted base image',
          'Updated dependencies',
          'Minimal installed packages',
          'Non-root execution where practical',
          'Limited network exposure',
          'Protected credentials',
        ],
        visual: {
          type: 'docker-security',
          title: 'SECURITY CHECKLIST',
        },
      },
      {
        type: 'summary',
        title: 'Security Recap',
        points: [
          'Containers are not automatically secure.',
          'Use trusted and updated images.',
          'Follow least-privilege principles.',
          'Keep sensitive information out of images.',
        ],
        visual: {
          type: 'docker-security',
          title: 'HARDENED CONTAINERS',
        },
      },
    ],
  },

  {
    id: 14,
    title: 'Docker Troubleshooting & Logs',
    subtitle: 'Diagnose common container problems using Docker inspection tools',
    category: 'Troubleshooting',
    icon: 'bug_report',
    template: 'dockerTroubleshooting',

    slides: [
      {
        type: 'hero',
        title: 'Docker Troubleshooting',
        subtitle: 'Learn how to inspect containers, read logs, and diagnose common problems',
      },
      {
        type: 'concept',
        title: 'Where Should You Start?',
        content:
          'When a container does not behave as expected, begin by checking its status, logs, configuration, and resource usage.',
        points: [
          'Check whether the container is running',
          'Read application logs',
          'Inspect container configuration',
          'Check network connectivity',
          'Verify mounted volumes',
        ],
        visual: {
          type: 'docker-flow',
          title: 'TROUBLESHOOTING START',
          icon: 'bug_report',
          center: 'PROBLEM',
          items: [
            { title: 'Status', text: 'docker ps', icon: 'list' },
            { title: 'Logs', text: 'docker logs', icon: 'description' },
            { title: 'Config', text: 'docker inspect', icon: 'manage_search' },
            { title: 'Network & Volumes', text: 'Check mounts', icon: 'hub' },
          ],
        },
      },
      {
        type: 'command',
        title: 'Check Running Containers',
        command: 'docker ps',
        explanation:
          'Shows running containers. Check STATUS ("Up ..." means running) and PORTS to confirm the container is reachable on the expected port.',
        example: `CONTAINER ID   IMAGE       COMMAND                  CREATED          STATUS          PORTS                 NAMES
b7e41c2d9a10   nginx       "/docker-entrypoint.…"   10 minutes ago   Up 10 minutes   0.0.0.0:8080->80/tcp  web-server
4d2f9c1e7b33   mysql:8.4   "docker-entrypoint.s…"   2 hours ago      Up 2 hours      3306/tcp, 33060/tcp   mysql-db`,
        visual: {
          type: 'docker-container',
          title: 'RUNNING CONTAINERS',
        },
      },
      {
        type: 'command',
        title: 'View Container Logs',
        command: 'docker logs web-server',
        explanation:
          'Displays the output the container has written so far. Here the nginx access log shows a successful request (200) and a missing file (404).',
        example: `/docker-entrypoint.sh: Configuration complete; ready for start up
2026/10/07 02:30:11 [notice] 1#1: nginx/1.27.2
172.17.0.1 - - [07/Oct/2026:02:31:05 +0000] "GET / HTTP/1.1" 200 615 "-" "curl/8.5.0" "-"
172.17.0.1 - - [07/Oct/2026:02:31:09 +0000] "GET /favicon.ico HTTP/1.1" 404 153 "-" "curl/8.5.0" "-"`,
        visual: {
          type: 'monitoring',
          title: 'CONTAINER LOGS',
        },
      },
      {
        type: 'command',
        title: 'Follow Live Logs',
        command: 'docker logs -f web-server',
        explanation:
          'Same as docker logs, but the command stays open and prints new lines as they are written. Press Ctrl+C to stop following (the container keeps running).',
        example: `172.17.0.1 - - [07/Oct/2026:02:31:05 +0000] "GET / HTTP/1.1" 200 615 "-" "curl/8.5.0" "-"
172.17.0.1 - - [07/Oct/2026:02:31:09 +0000] "GET /favicon.ico HTTP/1.1" 404 153 "-" "curl/8.5.0" "-"
172.17.0.1 - - [07/Oct/2026:02:32:41 +0000] "GET / HTTP/1.1" 200 615 "-" "Mozilla/5.0" "-"
(waiting for new log lines... press Ctrl+C to stop)`,
        visual: {
          type: 'monitoring',
          title: 'LIVE LOG STREAM',
        },
      },
      {
        type: 'command',
        title: 'Inspect a Container',
        command: 'docker inspect web-server',
        explanation:
          'Displays detailed configuration as JSON (shortened here): the current state, the image, port mappings, mounts, and network settings. It is useful for checking why a container is not behaving as expected.',
        example: `[
    {
        "Id": "b7e41c2d9a10f3856e2c7d4a19b05f8c3e6a2d7194c0b85fe3a61d92c7048b5a",
        "Name": "/web-server",
        "State": {
            "Status": "running",
            "Running": true,
            "ExitCode": 0
        },
        "Config": {
            "Image": "nginx",
            "Env": ["PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin"]
        },
        "NetworkSettings": {
            "Ports": { "80/tcp": [{ "HostIp": "0.0.0.0", "HostPort": "8080" }] },
            "IPAddress": "172.17.0.2"
        },
        "Mounts": []
    }
]`,
        visual: {
          type: 'docker-flow',
          title: 'WHAT INSPECT SHOWS',
          icon: 'manage_search',
          center: 'web-server',
          items: [
            { title: 'State', text: 'running, exit code 0', icon: 'check_circle' },
            { title: 'Ports', text: '8080 → 80', icon: 'lan' },
            { title: 'IP Address', text: '172.17.0.2', icon: 'router' },
            { title: 'Mounts', text: 'None attached', icon: 'storage' },
          ],
        },
      },
      {
        type: 'cards',
        title: 'Common Problems',
        cards: [
          {
            title: 'Port Conflict',
            icon: 'lan',
            text: 'Another application may already be using the host port.',
          },
          {
            title: 'Container Exits',
            icon: 'stop_circle',
            text: 'The main process may have crashed or completed.',
          },
          {
            title: 'Network Issue',
            icon: 'wifi_off',
            text: 'The container may not be connected to the expected network.',
          },
          {
            title: 'Missing Data',
            icon: 'storage',
            text: 'A required volume may not be mounted correctly.',
          },
        ],
        visual: {
          type: 'docker-flow',
          title: 'PROBLEM → CHECK',
          icon: 'build',
          center: 'DIAGNOSE',
          items: [
            { title: 'Port Conflict', text: 'Check docker ps', icon: 'lan' },
            { title: 'Container Exits', text: 'Read logs', icon: 'description' },
            { title: 'Network Issue', text: 'Inspect network', icon: 'wifi_off' },
            { title: 'Missing Data', text: 'Check volumes', icon: 'storage' },
          ],
        },
      },
      {
        type: 'process',
        title: 'Troubleshooting Workflow',
        steps: [
          {
            number: '01',
            title: 'Status',
            text: 'Check whether the container is running or stopped.',
          },
          {
            number: '02',
            title: 'Logs',
            text: 'Look for application errors and startup messages.',
          },
          {
            number: '03',
            title: 'Inspect',
            text: 'Check ports, environment variables, mounts, and networks.',
          },
          {
            number: '04',
            title: 'Fix',
            text: 'Correct the configuration and recreate the container if necessary.',
          },
        ],
        visual: {
          type: 'docker-flow',
          title: 'TROUBLESHOOTING FLOW',
          icon: 'route',
          center: 'FIX IT',
          items: [
            { title: 'Status', icon: 'list' },
            { title: 'Logs', icon: 'description' },
            { title: 'Inspect', icon: 'manage_search' },
            { title: 'Fix & Recreate', icon: 'build' },
          ],
        },
      },
      {
        type: 'summary',
        title: 'Troubleshooting Recap',
        points: [
          'Start with docker ps.',
          'Use docker logs to investigate application output.',
          'Use docker inspect for detailed configuration.',
          'Check ports, networks, volumes, and environment variables.',
        ],
        visual: {
          type: 'docker-flow',
          title: 'DIAGNOSE → FIX',
          icon: 'bug_report',
          center: 'TROUBLESHOOT',
          items: [
            { title: 'ps', icon: 'list' },
            { title: 'logs', icon: 'description' },
            { title: 'inspect', icon: 'manage_search' },
            { title: 'fix', icon: 'build' },
          ],
        },
      },
    ],
  },

  {
    id: 15,
    title: 'Docker in Production & Raspberry Pi',
    subtitle: 'Apply Docker concepts to real deployments and Raspberry Pi servers',
    category: 'Deployment',
    icon: 'memory',
    template: 'dockerRaspberryPi',

    slides: [
      {
        type: 'hero',
        title: 'Docker on Raspberry Pi',
        subtitle: 'Using containers to build portable and manageable services on ARM-based systems',
      },
      {
        type: 'concept',
        title: 'Why Docker on Raspberry Pi?',
        content:
          'Docker can make Raspberry Pi deployments easier to reproduce by packaging applications and their dependencies into containers.',
        points: [
          'Portable application environments',
          'Simplified service management',
          'Isolated applications',
          'Easy recreation of services',
          'Useful for small server projects',
        ],
        visual: {
          type: 'raspberry-pi',
          title: 'DOCKER ON RASPBERRY PI',
          items: [
            { title: 'Ubuntu Server', icon: 'terminal' },
            { title: 'Docker Engine', icon: 'inventory_2' },
            { title: 'App Containers', icon: 'view_in_ar' },
            { title: 'Network', icon: 'lan' },
          ],
        },
      },
      {
        type: 'architecture',
        title: 'Raspberry Pi Docker Stack',
        layers: [
          {
            title: 'Raspberry Pi',
            text: 'Physical ARM-based computer running the operating system.',
          },
          {
            title: 'Docker Engine',
            text: 'Container runtime installed on the Raspberry Pi.',
          },
          {
            title: 'Application Containers',
            text: 'Frontend, backend, database, or other services.',
          },
          {
            title: 'Network & Storage',
            text: 'Connect services and persist important application data.',
          },
        ],
        visual: {
          type: 'raspberry-pi',
          title: 'PI DOCKER STACK',
          items: [
            { title: 'Vue Frontend', icon: 'web' },
            { title: 'Django Backend', icon: 'api' },
            { title: 'MySQL + Volume', icon: 'storage' },
            { title: 'Docker Network', icon: 'hub' },
          ],
        },
      },
      {
        type: 'comparison',
        title: 'Development vs Deployment',
        left: {
          title: 'Development Machine',
          points: [
            'Build and test application',
            'Create Docker images',
            'Test Compose configuration',
            'Debug application issues',
          ],
        },
        right: {
          title: 'Raspberry Pi Server',
          points: [
            'Run production-like services',
            'Use persistent storage',
            'Expose required network services',
            'Monitor system resources',
          ],
        },
        visual: {
          type: 'docker-flow',
          title: 'LAPTOP → RASPBERRY PI',
          icon: 'swap_horiz',
          center: 'DEPLOYMENT',
          items: [
            { title: 'Develop', text: 'On your laptop', icon: 'laptop' },
            { title: 'Build & Test', text: 'Docker images', icon: 'build' },
            { title: 'Transfer', text: 'To the Pi', icon: 'send' },
            { title: 'Run', text: 'Compose on the Pi', icon: 'memory' },
          ],
        },
      },
      {
        type: 'cards',
        title: 'Raspberry Pi Considerations',
        cards: [
          {
            title: 'CPU',
            icon: 'memory',
            text: 'ARM processors have different architecture requirements than traditional x86 systems.',
          },
          {
            title: 'Memory',
            icon: 'developer_board',
            text: 'Limited RAM means applications should be configured efficiently.',
          },
          {
            title: 'Storage',
            icon: 'sd_storage',
            text: 'Use reliable storage and protect important persistent data.',
          },
          {
            title: 'Cooling',
            icon: 'ac_unit',
            text: 'Sustained workloads may require appropriate cooling and airflow.',
          },
        ],
        visual: {
          type: 'raspberry-pi',
          title: 'HARDWARE LIMITS',
          items: [
            { title: 'ARM CPU', icon: 'memory' },
            { title: 'Limited RAM', icon: 'developer_board' },
            { title: 'SD / SSD Storage', icon: 'sd_storage' },
            { title: 'Cooling', icon: 'ac_unit' },
          ],
        },
      },
      {
        type: 'technical',
        title: 'ARM Compatibility',
        content:
          'Raspberry Pi systems commonly use ARM processors. Docker images must support the architecture of the target system.',
        points: [
          'Check image architecture support',
          'Prefer multi-platform images',
          'Build compatible images when necessary',
          'Test containers directly on the target hardware',
        ],
        visual: {
          type: 'docker-flow',
          title: 'x86 vs ARM IMAGES',
          icon: 'memory',
          center: 'ARCHITECTURE',
          items: [
            { title: 'amd64 Image', text: 'Desktop / server PCs', icon: 'computer' },
            { title: 'arm64 Image', text: 'Raspberry Pi', icon: 'memory' },
            { title: 'Multi-platform', text: 'Works on both', icon: 'devices' },
            { title: 'Wrong Arch', text: 'Container fails', icon: 'error' },
          ],
        },
      },
      {
        type: 'process',
        title: 'Deployment Workflow',
        steps: [
          {
            number: '01',
            title: 'Develop',
            text: 'Build the application and create its Docker configuration.',
          },
          {
            number: '02',
            title: 'Build',
            text: 'Create compatible container images.',
          },
          {
            number: '03',
            title: 'Transfer',
            text: 'Move images or project configuration to the Raspberry Pi.',
          },
          {
            number: '04',
            title: 'Deploy',
            text: 'Start the services using Docker Compose or Docker commands.',
          },
          {
            number: '05',
            title: 'Monitor',
            text: 'Check logs, resource usage, storage, and service availability.',
          },
        ],
        visual: {
          type: 'docker-flow',
          title: 'DEPLOYMENT PIPELINE',
          icon: 'rocket_launch',
          center: 'DEPLOY',
          items: [
            { title: 'Develop', icon: 'code' },
            { title: 'Build', icon: 'build' },
            { title: 'Transfer', icon: 'send' },
            { title: 'Deploy', icon: 'rocket_launch' },
            { title: 'Monitor', icon: 'monitor_heart' },
          ],
        },
      },
      {
        type: 'command',
        title: 'Start a Raspberry Pi Stack',
        command: 'docker compose up -d',
        explanation:
          'Starts the services defined in the Compose configuration on the Raspberry Pi, in the background. Each line shows one resource being created or started.',
        example: `[+] Running 4/4
 ✔ Network pi-stack_default       Created    0.1s
 ✔ Container pi-stack-mysql-1     Started    1.6s
 ✔ Container pi-stack-backend-1   Started    2.2s
 ✔ Container pi-stack-frontend-1  Started    2.5s`,
        visual: {
          type: 'raspberry-pi',
          title: 'SERVICES STARTED ON THE PI',
          items: [
            { title: 'Network Created', icon: 'hub' },
            { title: 'MySQL Started', icon: 'storage' },
            { title: 'Backend Started', icon: 'api' },
            { title: 'Frontend Started', icon: 'web' },
          ],
        },
      },
      {
        type: 'scenario',
        title: 'Raspberry Pi Server Example',
        scenario:
          'A Raspberry Pi is being used as a small web server. The project contains a Vue frontend, Django backend, and MySQL database.',
        solution:
          'Use Docker containers to separate the application services, Docker networking for communication, and persistent volumes for database storage.',
        visual: {
          type: 'raspberry-pi',
          title: 'PROJECT ON THE PI',
          items: [
            { title: 'Vue Container', icon: 'web' },
            { title: 'Django Container', icon: 'api' },
            { title: 'MySQL Container', icon: 'storage' },
            { title: 'Docker Network', icon: 'hub' },
            { title: 'Persistent Volume', icon: 'save' },
          ],
        },
      },
      {
        type: 'summary',
        title: 'Docker Deployment Recap',
        points: [
          'Docker can simplify application deployment on Raspberry Pi.',
          'Always consider ARM architecture compatibility.',
          'Use persistent storage for important data.',
          'Monitor CPU, memory, storage, and container logs.',
          'Docker Compose can manage the complete application stack.',
        ],
        visual: {
          type: 'raspberry-pi',
          title: 'DOCKER ON RASPBERRY PI',
          items: [
            { title: 'Docker Engine', icon: 'inventory_2' },
            { title: 'App Containers', icon: 'view_in_ar' },
            { title: 'Persistent Data', icon: 'storage' },
            { title: 'Network', icon: 'lan' },
          ],
        },
      },
    ],
  },
]
