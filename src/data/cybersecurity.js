export const cybersecurityLessons = [
  {
    id: 1,
    title: 'Introduction to Cybersecurity',
    subtitle: 'Understanding the foundation of digital security',
    category: 'Fundamentals',
    icon: 'security',

    overview:
      'Cybersecurity is the practice of protecting systems, networks, applications, devices, and data from unauthorized access, attacks, damage, or disruption.',

    sections: [
      {
        title: 'What is Cybersecurity?',
        content:
          'Cybersecurity combines technologies, processes, and security practices designed to protect digital resources from threats. It applies to personal devices, business systems, cloud services, web applications, servers, and network infrastructure.',
      },

      {
        title: 'What Does Cybersecurity Protect?',
        bullets: [
          'User accounts and identities',
          'Personal and organizational data',
          'Servers and computing devices',
          'Networks and communication systems',
          'Web and mobile applications',
          'Business services and infrastructure',
        ],
      },

      {
        title: 'Why is it important?',
        content:
          'A security incident can expose sensitive information, interrupt services, damage systems, or affect the availability of important resources. Cybersecurity helps reduce these risks through prevention, detection, response, and recovery.',
      },
    ],

    example: {
      title: 'Practical Example',
      content:
        'A Raspberry Pi server hosting a web application can be protected by using strong authentication, limiting exposed ports, keeping the operating system updated, securing SSH access, and monitoring system logs.',
    },
  },

  {
    id: 2,
    title: 'Why Cybersecurity Matters',
    subtitle: 'Understanding the impact of security threats',
    category: 'Fundamentals',
    icon: 'warning',

    overview:
      'Cybersecurity is important because modern systems depend on digital information, network connectivity, and online services.',

    sections: [
      {
        title: 'Protecting Information',
        content:
          'Organizations and individuals store information such as credentials, documents, customer records, and configuration data. Security controls help prevent unauthorized access or modification.',
      },

      {
        title: 'Maintaining Availability',
        content:
          'Security is not only about preventing data theft. Systems must also remain available to legitimate users. Attacks such as denial-of-service can interrupt access to services.',
      },

      {
        title: 'Reducing Risk',
        bullets: [
          'Use strong authentication',
          'Keep software updated',
          'Limit unnecessary services',
          'Monitor suspicious activity',
          'Create reliable backups',
        ],
      },
    ],

    example: {
      title: 'Raspberry Pi Example',
      content:
        'If a Raspberry Pi server exposes unnecessary services to a network, each service can increase the potential attack surface. Disabling services that are not required helps reduce unnecessary exposure.',
    },
  },

  {
    id: 3,
    title: 'CIA Triad',
    subtitle: 'The three fundamental goals of information security',
    category: 'Fundamentals',
    icon: 'security',

    overview:
      'The CIA Triad represents three fundamental security objectives: Confidentiality, Integrity, and Availability.',

    sections: [
      {
        title: 'Confidentiality',
        content:
          'Confidentiality means that information should only be accessible to authorized users or systems.',

        bullets: ['Authentication', 'Access controls', 'Encryption', 'User permissions'],
      },

      {
        title: 'Integrity',
        content:
          'Integrity means that information should remain accurate, complete, and protected from unauthorized modification.',

        bullets: [
          'File permissions',
          'Checksums and hashes',
          'Digital signatures',
          'Change monitoring',
        ],
      },

      {
        title: 'Availability',
        content:
          'Availability means that authorized users should be able to access systems and information when they are needed.',

        bullets: ['Backups', 'Redundancy', 'System monitoring', 'Service recovery'],
      },
    ],

    example: {
      title: 'Simple Example',
      content:
        'For a web server: authentication helps protect confidentiality, file integrity checks help protect integrity, and backups plus monitoring help maintain availability.',
    },
  },

  {
    id: 4,
    title: 'Types of Cyber Threats',
    subtitle: 'Recognizing common methods used by attackers',
    category: 'Threats',
    icon: 'bug_report',

    overview:
      'Cyber threats use different techniques to compromise users, systems, applications, or networks.',

    sections: [
      {
        title: 'Malware',
        content:
          'Malware is malicious software designed to disrupt systems, steal information, damage resources, or provide unauthorized access.',
      },

      {
        title: 'Phishing',
        content:
          'Phishing uses deceptive messages, websites, or other communication methods to convince users to reveal sensitive information or perform unsafe actions.',
      },

      {
        title: 'Brute Force',
        content:
          'Brute-force attacks repeatedly attempt credentials until a valid combination is discovered. Strong passwords, account protections, and multi-factor authentication can reduce this risk.',
      },

      {
        title: 'Denial-of-Service',
        content:
          'Denial-of-Service attacks attempt to make a service unavailable by overwhelming or exhausting its resources.',
      },
    ],

    example: {
      title: 'Security Awareness',
      content:
        'A suspicious login message requesting your password should be treated carefully. Verify the sender and access the service through its official website instead of blindly following an unknown link.',
    },
  },

  {
    id: 5,
    title: 'Network Security',
    subtitle: 'Protecting communication and network infrastructure',
    category: 'Network Security',
    icon: 'lan',

    overview:
      'Network security protects devices, services, and communication channels from unauthorized access and malicious activity.',

    sections: [
      {
        title: 'Firewalls',
        content:
          'Firewalls control network traffic according to defined rules. They can allow legitimate connections while blocking unwanted traffic.',
      },

      {
        title: 'Ports and Services',
        content:
          'Network services commonly listen on specific TCP or UDP ports. Understanding which ports are required helps administrators reduce unnecessary exposure.',
      },

      {
        title: 'Network Segmentation',
        content:
          'Network segmentation separates systems or services into different network areas. This can help limit the impact of a compromised device.',
      },
    ],

    code: {
      title: 'Example: Check Listening Ports',
      language: 'bash',
      content: 'sudo ss -tulpn',
    },

    example: {
      title: 'Raspberry Pi Application',
      content:
        'A Raspberry Pi web server may need HTTP or HTTPS access while SSH should be restricted to trusted users or networks. Reviewing listening services helps identify unnecessary exposure.',
    },
  },

  {
    id: 6,
    title: 'Firewalls and Ports',
    subtitle: 'Controlling which network connections are allowed',
    category: 'Network Security',
    icon: 'security',

    overview:
      'Firewalls provide a layer of network access control by filtering incoming and outgoing traffic.',

    sections: [
      {
        title: 'Common Ports',
        content:
          'Different services commonly use different ports. For example, HTTP commonly uses port 80, HTTPS uses port 443, and SSH commonly uses port 22.',
      },

      {
        title: 'Why Ports Matter',
        content:
          'Every exposed service can represent an additional attack surface. Only required services should normally be exposed.',
      },
    ],

    code: {
      title: 'Check UFW Status',
      language: 'bash',
      content: 'sudo ufw status',
    },

    example: {
      title: 'Server Security',
      content:
        'A server hosting a web application may allow web traffic while restricting administrative services such as SSH to trusted sources.',
    },
  },

  {
    id: 7,
    title: 'Authentication and Authorization',
    subtitle: 'Controlling who can access what',
    category: 'Access Control',
    icon: 'lock',

    overview:
      'Authentication verifies identity, while authorization determines what an authenticated user is allowed to access or perform.',

    sections: [
      {
        title: 'Authentication',
        content:
          'Authentication answers the question: “Who are you?” Common authentication methods include passwords, security keys, biometrics, and one-time codes.',
      },

      {
        title: 'Authorization',
        content:
          'Authorization answers the question: “What are you allowed to do?” Permissions and roles are commonly used to control access.',
      },

      {
        title: 'Least Privilege',
        content:
          'The principle of least privilege means users and services should receive only the permissions necessary to perform their required tasks.',
      },
    ],

    example: {
      title: 'Linux Example',
      content:
        'A regular application user should not automatically receive unrestricted administrative privileges. Administrative actions can instead require controlled elevation through sudo.',
    },
  },

  {
    id: 8,
    title: 'Password Security',
    subtitle: 'Protecting accounts from credential attacks',
    category: 'Access Control',
    icon: 'password',

    overview:
      'Passwords remain an important authentication mechanism, but weak or reused passwords can increase account compromise risk.',

    sections: [
      {
        title: 'Strong Passwords',
        bullets: [
          'Use sufficient length',
          'Avoid predictable information',
          'Avoid password reuse',
          'Use unique passwords for important accounts',
          'Consider using a password manager',
        ],
      },

      {
        title: 'Password Storage',
        content:
          'Applications should not store user passwords as plain text. Secure password hashing mechanisms are used to protect stored credentials.',
      },
    ],

    example: {
      title: 'Good Practice',
      content:
        'Use a unique password for an important account and enable multi-factor authentication when available.',
    },
  },

  {
    id: 9,
    title: 'Multi-Factor Authentication',
    subtitle: 'Adding another layer of account protection',
    category: 'Access Control',
    icon: 'verified_user',

    overview:
      'Multi-factor authentication requires more than one type of authentication factor before access is granted.',

    sections: [
      {
        title: 'Common Factors',
        bullets: [
          'Something you know — password or PIN',
          'Something you have — security key or authentication device',
          'Something you are — biometric characteristic',
        ],
      },

      {
        title: 'Why MFA Helps',
        content:
          'If a password is compromised, an additional authentication factor can provide another barrier before an attacker can access the account.',
      },
    ],

    example: {
      title: 'Example',
      content:
        'A user enters a password and then confirms the login using an authentication application or security key.',
    },
  },

  {
    id: 10,
    title: 'Web Application Security',
    subtitle: 'Protecting applications from common vulnerabilities',
    category: 'Web Security',
    icon: 'language',

    overview:
      'Web application security focuses on protecting websites, APIs, databases, sessions, and application logic.',

    sections: [
      {
        title: 'Common Risks',
        bullets: [
          'Injection attacks',
          'Cross-site scripting',
          'Broken authentication',
          'Insecure access control',
          'Sensitive data exposure',
        ],
      },

      {
        title: 'Secure Development',
        bullets: [
          'Validate input',
          'Use secure authentication',
          'Apply access controls',
          'Protect sensitive data',
          'Keep dependencies updated',
        ],
      },
    ],

    example: {
      title: 'Django Application',
      content:
        'A Django backend can apply authentication, permission checks, input validation, CSRF protection, secure configuration, and database protections as part of the application security layer.',
    },
  },

  {
    id: 11,
    title: 'Linux and Server Security',
    subtitle: 'Protecting the operating system',
    category: 'System Security',
    icon: 'computer',

    overview:
      'Server security focuses on protecting operating systems, accounts, services, files, and system resources.',

    sections: [
      {
        title: 'Important Practices',
        bullets: [
          'Apply security updates',
          'Remove unnecessary services',
          'Use appropriate permissions',
          'Protect administrative accounts',
          'Monitor system activity',
        ],
      },
    ],

    code: {
      title: 'Update Ubuntu Packages',
      language: 'bash',
      content: 'sudo apt update\nsudo apt upgrade',
    },

    example: {
      title: 'Raspberry Pi Server',
      content:
        'Keeping the operating system and installed packages updated helps address known vulnerabilities and maintain a more secure server environment.',
    },
  },

  {
    id: 12,
    title: 'SSH Security',
    subtitle: 'Securing remote server administration',
    category: 'System Security',
    icon: 'terminal',

    overview:
      'SSH provides secure remote access to Linux servers, but administrative access should be properly protected.',

    sections: [
      {
        title: 'Security Measures',
        bullets: [
          'Use strong authentication',
          'Prefer SSH keys where appropriate',
          'Restrict administrative access',
          'Disable unnecessary access methods',
          'Monitor authentication logs',
        ],
      },
    ],

    code: {
      title: 'Check SSH Service',
      language: 'bash',
      content: 'sudo systemctl status ssh',
    },

    example: {
      title: 'Raspberry Pi',
      content:
        'SSH can be used to administer the Raspberry Pi without directly connecting a monitor and keyboard to the server.',
    },
  },

  {
    id: 13,
    title: 'Linux Permissions',
    subtitle: 'Controlling access to files and resources',
    category: 'System Security',
    icon: 'key',

    overview:
      'Linux permissions determine which users and groups can read, write, or execute files and directories.',

    sections: [
      {
        title: 'Permission Types',
        bullets: ['Read', 'Write', 'Execute'],
      },

      {
        title: 'Ownership',
        content:
          'Files and directories can have an owner and group. Permissions can then be applied based on the owner, group, and other users.',
      },
    ],

    code: {
      title: 'View File Permissions',
      language: 'bash',
      content: 'ls -l',
    },

    example: {
      title: 'Least Privilege',
      content:
        'Correct permissions can prevent ordinary users or services from modifying sensitive files that they do not need to change.',
    },
  },

  {
    id: 14,
    title: 'System Hardening',
    subtitle: 'Reducing the attack surface',
    category: 'System Security',
    icon: 'build',

    overview:
      'System hardening reduces unnecessary functionality, services, permissions, and exposure that could be abused by attackers.',

    sections: [
      {
        title: 'Hardening Checklist',
        bullets: [
          'Update the operating system',
          'Remove unnecessary software',
          'Disable unused services',
          'Restrict network access',
          'Use strong authentication',
          'Review permissions',
          'Enable appropriate logging',
        ],
      },
    ],

    example: {
      title: 'Server Hardening',
      content:
        'A Raspberry Pi used as a web server should run only the services required by the project and should have unnecessary network exposure minimized.',
    },
  },

  {
    id: 15,
    title: 'Logging and Monitoring',
    subtitle: 'Detecting unusual system activity',
    category: 'Monitoring',
    icon: 'monitor_heart',

    overview:
      'Logs provide records of system and application activity that can help administrators troubleshoot problems and investigate security events.',

    sections: [
      {
        title: 'What to Monitor',
        bullets: [
          'Authentication attempts',
          'System errors',
          'Service failures',
          'Network activity',
          'Application events',
        ],
      },
    ],

    code: {
      title: 'View System Logs',
      language: 'bash',
      content: 'sudo journalctl -xe',
    },

    example: {
      title: 'Security Investigation',
      content:
        'Repeated failed SSH authentication attempts may indicate an account attack or an improperly configured client and should be investigated.',
    },
  },

  {
    id: 16,
    title: 'Incident Response',
    subtitle: 'Responding to security incidents',
    category: 'Security Operations',
    icon: 'report_problem',

    overview:
      'Incident response is the organized process used to detect, contain, investigate, and recover from security incidents.',

    sections: [
      {
        title: 'Common Stages',
        bullets: [
          'Preparation',
          'Detection and analysis',
          'Containment',
          'Eradication',
          'Recovery',
          'Lessons learned',
        ],
      },
    ],

    example: {
      title: 'Example',
      content:
        'If a server account is suspected of being compromised, administrators may isolate the affected system, review logs, secure credentials, investigate the cause, and restore normal operations.',
    },
  },

  {
    id: 17,
    title: 'Cybersecurity Best Practices',
    subtitle: 'Practical habits for safer systems',
    category: 'Best Practices',
    icon: 'verified',

    overview: 'Good cybersecurity combines technical controls with consistent security practices.',

    sections: [
      {
        title: 'Security Checklist',
        bullets: [
          'Use strong and unique credentials',
          'Enable MFA',
          'Keep systems updated',
          'Back up important data',
          'Restrict unnecessary access',
          'Monitor important systems',
          'Be careful with unexpected messages and links',
        ],
      },
    ],

    example: {
      title: 'For This Project',
      content:
        'The Raspberry Pi learning server can apply these principles through controlled access, Docker security, firewall configuration, system updates, monitoring, and secure application configuration.',
    },
  },

  {
    id: 18,
    title: 'Raspberry Pi Server Security',
    subtitle: 'Applying cybersecurity concepts to the project server',
    category: 'Raspberry Pi',
    icon: 'memory',

    overview:
      'The Raspberry Pi server combines operating system, network, Docker, database, and application security concepts.',

    sections: [
      {
        title: 'Security Areas',
        bullets: [
          'SSH hardening',
          'Firewall configuration',
          'User permissions',
          'Docker security',
          'System updates',
          'Application security',
          'Monitoring and logging',
        ],
      },

      {
        title: 'Defense in Depth',
        content:
          'Security should not depend on a single control. Multiple layers can work together so that the failure of one control does not automatically compromise the entire system.',
      },
    ],

    example: {
      title: 'Project Architecture',
      content:
        'The Raspberry Pi can run Docker containers for the frontend, Django backend, and MySQL database while network access, authentication, permissions, and monitoring provide additional security layers.',
    },
  },

  {
    id: 19,
    title: 'Cybersecurity Summary',
    subtitle: 'Review what you learned',
    category: 'Summary',
    icon: 'school',

    overview:
      'Cybersecurity protects systems, applications, networks, users, and information through multiple layers of security controls.',

    sections: [
      {
        title: 'Key Concepts',
        bullets: [
          'CIA Triad',
          'Cyber threats',
          'Network security',
          'Authentication and authorization',
          'Linux security',
          'Web application security',
          'Logging and monitoring',
          'Incident response',
        ],
      },

      {
        title: 'Final Takeaway',
        content:
          'Effective security is an ongoing process. Systems should be designed, configured, monitored, updated, and reviewed continuously.',
      },
    ],

    example: {
      title: 'Next Module',
      content:
        'After learning cybersecurity fundamentals, continue to Docker Commands to understand how containers can be built, managed, secured, and deployed on the Raspberry Pi server.',
    },
  },
]
