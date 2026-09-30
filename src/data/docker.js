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
      },
      {
        type: 'scenario',
        title: 'A Common Development Problem',
        scenario:
          'A developer builds a Django application that works correctly on their laptop. When another developer runs it, dependency versions are different and the application fails.',
        solution:
          'Package the application environment into a Docker image so the development environment can be reproduced more consistently.',
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
        subtitle:
          'How Docker components work together to create and manage containers',
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
      },
      {
        type: 'concept',
        title: 'Docker Client',
        content:
          'The Docker CLI is the interface developers commonly use to interact with Docker.',
        points: [
          'docker build',
          'docker run',
          'docker ps',
          'docker images',
          'docker logs',
          'docker compose',
        ],
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
        subtitle:
          'Two of the most important concepts you need to understand before using Docker',
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
      },
      {
        type: 'command',
        title: 'List Docker Images',
        command: 'docker images',
        explanation:
          'Displays Docker images currently stored on the local machine.',
        example: 'docker images',
      },
      {
        type: 'command',
        title: 'List Running Containers',
        command: 'docker ps',
        explanation:
          'Displays currently running Docker containers.',
        example: 'docker ps',
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
      },
    ],
  },

  {
    id: 5,
    title: 'Installing Docker',
    subtitle: 'Setting up Docker on a Linux system',
    category: 'Docker Fundamentals',
    icon: 'download',
    template: 'installation',

    slides: [
      {
        type: 'hero',
        title: 'Installing Docker',
        subtitle:
          'Prepare a Linux system for running containers and Docker-based applications',
      },
      {
        type: 'concept',
        title: 'Before Installation',
        content:
          'Before installing Docker, make sure the operating system is updated and that you have administrator access.',
        points: [
          'Use a supported Linux distribution',
          'Update package information',
          'Have sudo or administrator access',
          'Ensure sufficient storage',
          'Check network connectivity',
        ],
      },
      {
        type: 'process',
        title: 'Installation Workflow',
        steps: [
          {
            number: '01',
            title: 'Update',
            text: 'Update the operating system package information.',
          },
          {
            number: '02',
            title: 'Install',
            text: 'Install Docker Engine and supporting packages.',
          },
          {
            number: '03',
            title: 'Enable',
            text: 'Enable Docker to start with the operating system.',
          },
          {
            number: '04',
            title: 'Verify',
            text: 'Run a test container to confirm Docker works.',
          },
        ],
      },
      {
        type: 'command',
        title: 'Check Docker Version',
        command: 'docker --version',
        explanation:
          'Displays the installed Docker version.',
        example: 'docker --version',
      },
      {
        type: 'command',
        title: 'Run the Hello World Container',
        command: 'docker run hello-world',
        explanation:
          'Downloads the hello-world image if needed and runs a simple test container.',
        example: 'docker run hello-world',
      },
      {
        type: 'technical',
        title: 'Docker Service',
        content:
          'On Linux systems using systemd, Docker can be managed as a system service.',
        points: [
          'Start Docker',
          'Stop Docker',
          'Restart Docker',
          'Check Docker status',
          'Enable Docker at boot',
        ],
      },
      {
        type: 'summary',
        title: 'Installation Complete',
        points: [
          'Docker should be installed on the host system.',
          'The Docker version can be checked from the terminal.',
          'The hello-world image provides a simple installation test.',
          'Docker can now be used to build and run containers.',
        ],
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
        subtitle:
          'The reusable building blocks behind Docker containers',
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
      },
      {
        type: 'concept',
        title: 'Image Tags',
        content:
          'Tags help identify different versions or variants of an image.',
        points: [
          'ubuntu:24.04',
          'python:3.13',
          'mysql:8.4',
          'nginx:latest',
        ],
      },
      {
        type: 'command',
        title: 'List Images',
        command: 'docker images',
        explanation:
          'Shows the images stored locally on the Docker host.',
        example: 'docker images',
      },
      {
        type: 'command',
        title: 'Pull an Image',
        command: 'docker pull nginx:latest',
        explanation:
          'Downloads an image from a Docker registry.',
        example: 'docker pull nginx:latest',
      },
      {
        type: 'command',
        title: 'Remove an Image',
        command: 'docker rmi nginx:latest',
        explanation:
          'Removes a local Docker image that is no longer needed.',
        example: 'docker rmi nginx:latest',
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
        subtitle:
          'Learn how to manage the actual runtime environments created from Docker images',
      },
      {
        type: 'concept',
        title: 'What is a Container?',
        content:
          'A container is an isolated runtime environment created from a Docker image.',
        points: [
          'Containers run application processes',
          'Containers can be started and stopped',
          'Containers have unique names or IDs',
          'Containers can connect to networks',
          'Containers can use persistent volumes',
        ],
      },
      {
        type: 'command',
        title: 'Run a Container',
        command: 'docker run nginx',
        explanation:
          'Creates and starts a new container from the nginx image.',
        example: 'docker run nginx',
      },
      {
        type: 'command',
        title: 'Run in the Background',
        command: 'docker run -d nginx',
        explanation:
          'The -d option runs the container in detached mode.',
        example: 'docker run -d nginx',
      },
      {
        type: 'command',
        title: 'Give a Container a Name',
        command: 'docker run -d --name web-server nginx',
        explanation:
          'Assigns a readable name to the container.',
        example: 'docker run -d --name web-server nginx',
      },
      {
        type: 'command',
        title: 'Stop a Container',
        command: 'docker stop web-server',
        explanation:
          'Stops a running container gracefully.',
        example: 'docker stop web-server',
      },
      {
        type: 'command',
        title: 'Remove a Container',
        command: 'docker rm web-server',
        explanation:
          'Removes a stopped container.',
        example: 'docker rm web-server',
      },
      {
        type: 'technical',
        title: 'Container Lifecycle',
        points: [
          'Created',
          'Running',
          'Stopped',
          'Restarted',
          'Removed',
        ],
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
        subtitle:
          'Define how your application image should be built',
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
      },
      {
        type: 'command',
        title: 'Build an Image',
        command: 'docker build -t my-app:1.0 .',
        explanation:
          'Builds an image from the Dockerfile in the current directory.',
        example: 'docker build -t my-app:1.0 .',
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
        subtitle:
          'Run multiple connected services using a single Compose configuration',
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
        explanation:
          'A Compose file can define multiple services and their configuration.',
      },
      {
        type: 'command',
        title: 'Start the Stack',
        command: 'docker compose up -d',
        explanation:
          'Creates and starts the services defined in the Compose configuration.',
        example: 'docker compose up -d',
      },
      {
        type: 'command',
        title: 'Stop the Stack',
        command: 'docker compose down',
        explanation:
          'Stops and removes the containers and network created by Compose.',
        example: 'docker compose down',
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
        subtitle:
          'Understand how containers communicate with each other and the outside world',
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
      },
      {
        type: 'command',
        title: 'List Networks',
        command: 'docker network ls',
        explanation:
          'Displays Docker networks available on the host.',
        example: 'docker network ls',
      },
      {
        type: 'command',
        title: 'Inspect a Network',
        command: 'docker network inspect my-network',
        explanation:
          'Displays detailed information about a Docker network.',
        example: 'docker network inspect my-network',
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
        subtitle:
          'Understand how Docker stores data that needs to survive container recreation',
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
      },
      {
        type: 'command',
        title: 'Create a Volume',
        command: 'docker volume create app-data',
        explanation:
          'Creates a named Docker volume.',
        example: 'docker volume create app-data',
      },
      {
        type: 'command',
        title: 'Use a Volume',
        command: 'docker run -d --name mysql-db -v mysql-data:/var/lib/mysql mysql:8.4',
        explanation:
          'Mounts the mysql-data volume into the MySQL data directory.',
      },
      {
        type: 'command',
        title: 'List Volumes',
        command: 'docker volume ls',
        explanation:
          'Displays Docker volumes available on the host.',
        example: 'docker volume ls',
      },
      {
        type: 'scenario',
        title: 'Database Example',
        scenario:
          'A MySQL container stores application data. The container is recreated after a configuration change.',
        solution:
          'Mount the database directory to a persistent Docker volume so the database files remain available when the container is recreated.',
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
        subtitle:
          'Understand where Docker images are stored and how they are distributed',
      },
      {
        type: 'concept',
        title: 'What is a Container Registry?',
        content:
          'A container registry is a service used to store and distribute container images.',
        points: [
          'Store images',
          'Download images',
          'Version images with tags',
          'Share application images',
          'Support automated deployment workflows',
        ],
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
      },
      {
        type: 'command',
        title: 'Pull an Image',
        command: 'docker pull nginx:latest',
        explanation:
          'Downloads an image from a configured container registry.',
        example: 'docker pull nginx:latest',
      },
      {
        type: 'command',
        title: 'Tag an Image',
        command: 'docker tag my-app:latest username/my-app:1.0',
        explanation:
          'Creates a registry-compatible tag for an image.',
      },
      {
        type: 'command',
        title: 'Push an Image',
        command: 'docker push username/my-app:1.0',
        explanation:
          'Uploads the tagged image to a container registry.',
      },
      {
        type: 'technical',
        title: 'Image Versioning',
        content:
          'Tags help identify which version of an image should be deployed.',
        points: [
          'latest',
          '1.0',
          '1.1',
          '2.0',
          'production',
          'development',
        ],
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
        subtitle:
          'Build safer containerized applications using isolation and least privilege',
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
      },
      {
        type: 'scenario',
        title: 'Security Scenario',
        scenario:
          'A web application container is configured with administrator privileges and contains database credentials directly inside its Dockerfile.',
        solution:
          'Use a non-root user where practical and provide sensitive configuration through secure environment or secret-management mechanisms rather than baking credentials into the image.',
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
        subtitle:
          'Learn how to inspect containers, read logs, and diagnose common problems',
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
      },
      {
        type: 'command',
        title: 'Check Running Containers',
        command: 'docker ps',
        explanation:
          'Shows currently running containers and their ports and status.',
        example: 'docker ps',
      },
      {
        type: 'command',
        title: 'View Container Logs',
        command: 'docker logs web-server',
        explanation:
          'Displays the standard output and error logs produced by the container.',
        example: 'docker logs web-server',
      },
      {
        type: 'command',
        title: 'Follow Live Logs',
        command: 'docker logs -f web-server',
        explanation:
          'Continuously displays new log output as it is produced.',
        example: 'docker logs -f web-server',
      },
      {
        type: 'command',
        title: 'Inspect a Container',
        command: 'docker inspect web-server',
        explanation:
          'Displays detailed information about the container configuration.',
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
        subtitle:
          'Using containers to build portable and manageable services on ARM-based systems',
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
      },
      {
        type: 'command',
        title: 'Start a Raspberry Pi Stack',
        command: 'docker compose up -d',
        explanation:
          'Starts the services defined in the Compose configuration.',
        example: 'docker compose up -d',
      },
      {
        type: 'scenario',
        title: 'Raspberry Pi Server Example',
        scenario:
          'A Raspberry Pi is being used as a small web server. The project contains a Vue frontend, Django backend, and MySQL database.',
        solution:
          'Use Docker containers to separate the application services, Docker networking for communication, and persistent volumes for database storage.',
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
      },
    ],
  },
]