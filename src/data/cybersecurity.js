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

        visual: {
          type: 'security',
          title: 'Cybersecurity Protection',
          icon: 'security',
          caption:
            'Cybersecurity protects digital systems, networks, applications, devices, and data from threats.',
        },
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

        visual: {
          type: 'security',
          title: 'What We Protect',
          icon: 'shield',
          items: [
            { title: 'Accounts', icon: 'person' },
            { title: 'Data', icon: 'storage' },
            { title: 'Servers', icon: 'dns' },
            { title: 'Networks', icon: 'lan' },
            { title: 'Applications', icon: 'apps' },
            { title: 'Services', icon: 'cloud_done' },
          ],
          caption: 'Different layers of digital resources require different security controls.',
        },
      },

      {
        title: 'Why is it important?',
        content:
          'A security incident can expose sensitive information, interrupt services, damage systems, or affect the availability of important resources. Cybersecurity helps reduce these risks through prevention, detection, response, and recovery.',

        visual: {
          type: 'lifecycle',
          title: 'SECURITY LIFECYCLE',
          icon: 'autorenew',
          center: 'RISK REDUCTION',
          items: [
            { title: 'Prevention', text: 'Block threats early', icon: 'block' },
            { title: 'Detection', text: 'Spot unusual activity', icon: 'visibility' },
            { title: 'Response', text: 'Contain the incident', icon: 'flash_on' },
            { title: 'Recovery', text: 'Restore services', icon: 'restore' },
          ],
        },
      },
    ],

    example: {
      title: 'Practical Example',
      content:
        'A Raspberry Pi server hosting a web application can be protected by using strong authentication, limiting exposed ports, keeping the operating system updated, securing SSH access, and monitoring system logs.',

      visual: {
        type: 'raspberry-pi',
        title: 'Protected Raspberry Pi',
        items: [
          { title: 'Strong Auth', icon: 'password' },
          { title: 'Limited Ports', icon: 'lan' },
          { title: 'OS Updates', icon: 'update' },
          { title: 'SSH Security', icon: 'terminal' },
          { title: 'Log Monitoring', icon: 'monitor_heart' },
        ],
      },
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

        visual: {
          type: 'security',
          title: 'Protecting Information',
          icon: 'lock',
          items: [
            { title: 'Credentials', icon: 'key' },
            { title: 'Documents', icon: 'description' },
            { title: 'Customer Records', icon: 'groups' },
            { title: 'Configuration', icon: 'settings' },
          ],
          caption:
            'Security controls help keep sensitive information accessible only to authorized users.',
        },
      },

      {
        title: 'Maintaining Availability',
        content:
          'Security is not only about preventing data theft. Systems must also remain available to legitimate users. Attacks such as denial-of-service can interrupt access to services.',

        visual: {
          type: 'network-firewall',
          title: 'Keeping Services Available',
          icon: 'cloud_done',
          caption:
            'Security controls help protect services from unauthorized and disruptive traffic.',
        },
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

        visual: {
          type: 'security',
          title: 'Risk Reduction Controls',
          icon: 'verified',
          items: [
            { title: 'Strong Auth', icon: 'verified_user' },
            { title: 'Updates', icon: 'update' },
            { title: 'Fewer Services', icon: 'tune' },
            { title: 'Monitoring', icon: 'monitor_heart' },
            { title: 'Backups', icon: 'backup' },
          ],
        },
      },
    ],

    example: {
      title: 'Raspberry Pi Example',
      content:
        'If a Raspberry Pi server exposes unnecessary services to a network, each service can increase the potential attack surface. Disabling services that are not required helps reduce unnecessary exposure.',

      visual: {
        type: 'attack-surface',
        title: 'ATTACK SURFACE',
        icon: 'radar',
        center: 'RASPBERRY PI',
        items: [
          { title: 'SSH', text: 'Needed, restrict it', icon: 'terminal' },
          { title: 'HTTPS', text: 'Needed for the app', icon: 'https' },
          { title: 'Unused FTP', text: 'Disable it', icon: 'block' },
          { title: 'Unused Service', text: 'Remove exposure', icon: 'power_off' },
        ],
      },
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

        visual: {
          type: 'cia-triad',
          title: 'Confidentiality',
          icon: 'lock',
          items: [
            { title: 'Confidentiality', text: 'Authorized access only.', icon: 'lock' },
            { title: 'Integrity', text: 'Data stays accurate.', icon: 'verified' },
            { title: 'Availability', text: 'Systems stay accessible.', icon: 'bolt' },
          ],
          caption: 'Information should only be accessible to authorized users or systems.',
        },
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

        visual: {
          type: 'cia-triad',
          title: 'Integrity',
          icon: 'verified',
          items: [
            { title: 'Hashes', text: 'Detect changed files.', icon: 'tag' },
            { title: 'Signatures', text: 'Prove authenticity.', icon: 'draw' },
            { title: 'Monitoring', text: 'Watch for changes.', icon: 'visibility' },
          ],
          caption:
            'Information should remain accurate, complete, and protected from unauthorized modification.',
        },
      },

      {
        title: 'Availability',
        content:
          'Availability means that authorized users should be able to access systems and information when they are needed.',

        bullets: ['Backups', 'Redundancy', 'System monitoring', 'Service recovery'],

        visual: {
          type: 'cia-triad',
          title: 'Availability',
          icon: 'cloud_done',
          items: [
            { title: 'Backups', text: 'Recover lost data.', icon: 'backup' },
            { title: 'Redundancy', text: 'Avoid single failure.', icon: 'content_copy' },
            { title: 'Monitoring', text: 'Catch outages fast.', icon: 'monitor_heart' },
          ],
          caption: 'Authorized users should be able to access systems and information when needed.',
        },
      },
    ],

    example: {
      title: 'Simple Example',
      content:
        'For a web server: authentication helps protect confidentiality, file integrity checks help protect integrity, and backups plus monitoring help maintain availability.',

      visual: {
        type: 'cia-map',
        title: 'WEB SERVER & CIA',
        icon: 'dns',
        center: 'WEB SERVER',
        items: [
          { title: 'Confidentiality', text: 'Authentication', icon: 'lock' },
          { title: 'Integrity', text: 'File integrity checks', icon: 'verified' },
          { title: 'Availability', text: 'Backups + monitoring', icon: 'bolt' },
        ],
      },
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

        visual: {
          type: 'threats',
          title: 'MALWARE INFECTION PATH',
          items: [
            { title: 'Malicious File', text: 'Unsafe download', icon: 'insert_drive_file' },
            { title: 'Execution', text: 'User runs it', icon: 'play_arrow' },
            { title: 'Damage', text: 'Data theft / disruption', icon: 'bug_report' },
            { title: 'Updates', text: 'Patch & scan', icon: 'security' },
          ],
        },
      },

      {
        title: 'Phishing',
        content:
          'Phishing uses deceptive messages, websites, or other communication methods to convince users to reveal sensitive information or perform unsafe actions.',

        visual: {
          type: 'threats',
          title: 'PHISHING FLOW',
          items: [
            { title: 'Fake Email', text: 'Looks legitimate', icon: 'mail' },
            { title: 'Click Link', text: 'Pressure to act', icon: 'link' },
            { title: 'Fake Login', text: 'Copies a real site', icon: 'language' },
            { title: 'Verify Sender', text: 'Use the official site', icon: 'verified_user' },
          ],
        },
      },

      {
        title: 'Brute Force',
        content:
          'Brute-force attacks repeatedly attempt credentials until a valid combination is discovered. Strong passwords, account protections, and multi-factor authentication can reduce this risk.',

        visual: {
          type: 'threats',
          title: 'BRUTE FORCE ATTACK',
          items: [
            { title: 'Many Guesses', text: 'Automated attempts', icon: 'repeat' },
            { title: 'Login Form', text: 'Targeted account', icon: 'login' },
            { title: 'Weak Password', text: 'Gets cracked', icon: 'lock_open' },
            { title: 'MFA + Lockout', text: 'Stops the attack', icon: 'verified_user' },
          ],
        },
      },

      {
        title: 'Denial-of-Service',
        content:
          'Denial-of-Service attacks attempt to make a service unavailable by overwhelming or exhausting its resources.',

        visual: {
          type: 'threats',
          title: 'Common Cyber Threats',
          icon: 'bug_report',
          items: [
            { title: 'Flood Traffic', text: 'Massive requests', icon: 'waves' },
            { title: 'Resource Exhaustion', text: 'CPU / RAM / bandwidth', icon: 'memory' },
            { title: 'Service Down', text: 'Users locked out', icon: 'cloud_off' },
            { title: 'Rate Limiting', text: 'Filter the traffic', icon: 'speed' },
          ],
          caption:
            'Attackers can target users, applications, systems, networks, and services using different techniques.',
        },
      },
    ],

    example: {
      title: 'Security Awareness',
      content:
        'A suspicious login message requesting your password should be treated carefully. Verify the sender and access the service through its official website instead of blindly following an unknown link.',

      visual: {
        type: 'threats',
        title: 'SUSPICIOUS MESSAGE CHECK',
        items: [
          { title: 'Unknown Message', text: 'Asks for password', icon: 'mark_email_unread' },
          { title: 'Do Not Click', text: 'Avoid unknown links', icon: 'link_off' },
          { title: 'Verify Sender', text: 'Check the source', icon: 'person_search' },
          { title: 'Official Site', text: 'Log in directly', icon: 'verified' },
        ],
      },
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

        visual: {
          type: 'network-firewall',
          title: 'Network Firewall',
          icon: 'security',
          caption: 'A firewall filters network traffic according to configured security rules.',
        },
      },

      {
        title: 'Ports and Services',
        content:
          'Network services commonly listen on specific TCP or UDP ports. Understanding which ports are required helps administrators reduce unnecessary exposure.',

        visual: {
          type: 'network-firewall',
          title: 'PORTS & SERVICES',
          ports: ['22 SSH', '80 HTTP', '443 HTTPS', '3306 MySQL'],
        },
      },

      {
        title: 'Network Segmentation',
        content:
          'Network segmentation separates systems or services into different network areas. This can help limit the impact of a compromised device.',

        visual: {
          type: 'segmentation',
          title: 'NETWORK SEGMENTATION',
          icon: 'lan',
          center: 'NETWORK ZONES',
          items: [
            { title: 'Public Zone', text: 'Web-facing services', icon: 'public' },
            { title: 'Application Zone', text: 'Backend / API', icon: 'api' },
            { title: 'Database Zone', text: 'Private data', icon: 'storage' },
            { title: 'Admin Zone', text: 'Trusted access only', icon: 'admin_panel_settings' },
          ],
        },
      },
    ],

    code: {
      title: 'Example: Check Listening Ports',
      language: 'bash',
      content: 'sudo ss -tulpn',
      example: `Netid  State   Recv-Q  Send-Q  Local Address:Port  Peer Address:Port  Process
udp    UNCONN  0       0       127.0.0.53%lo:53    0.0.0.0:*          users:(("systemd-resolve",pid=612,fd=13))
tcp    LISTEN  0       128     0.0.0.0:22          0.0.0.0:*          users:(("sshd",pid=845,fd=3))
tcp    LISTEN  0       4096    0.0.0.0:80          0.0.0.0:*          users:(("docker-proxy",pid=1320,fd=4))
tcp    LISTEN  0       4096    0.0.0.0:443         0.0.0.0:*          users:(("docker-proxy",pid=1342,fd=4))
tcp    LISTEN  0       151     127.0.0.1:3306      0.0.0.0:*          users:(("mysqld",pid=1105,fd=21))`,
      explanation:
        'Lists every service listening for connections. -t = TCP, -u = UDP, -l = listening only, -p = show the process, -n = numeric ports. Ports 22, 80, and 443 are reachable from the network, while MySQL (3306) is bound to 127.0.0.1, so it is only reachable from the server itself.',

      visual: {
        type: 'linux-server',
        title: 'LISTENING SERVICES',
        items: [
          { title: 'TCP', icon: 'swap_horiz' },
          { title: 'UDP', icon: 'swap_vert' },
          { title: 'Listening', icon: 'hearing' },
          { title: 'Processes', icon: 'memory' },
          { title: 'Ports', icon: 'lan' },
        ],
      },
    },

    example: {
      title: 'Raspberry Pi Application',
      content:
        'A Raspberry Pi web server may need HTTP or HTTPS access while SSH should be restricted to trusted users or networks. Reviewing listening services helps identify unnecessary exposure.',

      visual: {
        type: 'raspberry-pi',
        title: 'PI NETWORK EXPOSURE',
        items: [
          { title: 'HTTP / HTTPS', icon: 'language' },
          { title: 'SSH (Restricted)', icon: 'terminal' },
          { title: 'Review Ports', icon: 'fact_check' },
          { title: 'Close Unused', icon: 'block' },
        ],
      },
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

        visual: {
          type: 'network-firewall',
          title: 'Ports and Firewall Rules',
          icon: 'lan',
          ports: ['22 SSH', '80 HTTP', '443 HTTPS'],
          caption: 'Only the network services required by a server should normally be exposed.',
        },
      },

      {
        title: 'Why Ports Matter',
        content:
          'Every exposed service can represent an additional attack surface. Only required services should normally be exposed.',

        visual: {
          type: 'threats',
          title: 'PORT EXPOSURE → DEFENSE',
          items: [
            { title: 'Open Port', text: 'Reachable from network', icon: 'lan' },
            { title: 'Running Service', text: 'Software listening', icon: 'dns' },
            { title: 'Attack Surface', text: 'More exposure', icon: 'warning' },
            { title: 'Close Unused', text: 'Reduce exposure', icon: 'security' },
          ],
        },
      },
    ],

    code: {
      title: 'Check UFW Status',
      language: 'bash',
      content: 'sudo ufw status',
      example: `Status: active

To                         Action      From
--                         ------      ----
22/tcp                     LIMIT       192.168.1.0/24
80/tcp                     ALLOW       Anywhere
443/tcp                    ALLOW       Anywhere
80/tcp (v6)                ALLOW       Anywhere (v6)
443/tcp (v6)               ALLOW       Anywhere (v6)`,
      explanation:
        'Shows whether the firewall is active and which rules are loaded. Here web traffic (80, 443) is allowed from anywhere, SSH (22) is rate-limited and only accepted from the local network, and every other incoming port is blocked by default.',

      visual: {
        type: 'network-firewall',
        title: 'UFW FIREWALL RULES',
        ports: ['ALLOW 80', 'ALLOW 443', 'LIMIT 22', 'DENY OTHER'],
      },
    },

    example: {
      title: 'Server Security',
      content:
        'A server hosting a web application may allow web traffic while restricting administrative services such as SSH to trusted sources.',

      visual: {
        type: 'security',
        title: 'SERVER ACCESS POLICY',
        icon: 'dns',
        items: [
          { title: 'Web: Allowed', icon: 'language' },
          { title: 'SSH: Trusted Only', icon: 'terminal' },
          { title: 'Others: Blocked', icon: 'block' },
          { title: 'Rules Reviewed', icon: 'fact_check' },
        ],
      },
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

        visual: {
          type: 'authentication',
          title: 'Authentication',
          icon: 'person',
          items: [
            { title: 'Password', icon: 'password' },
            { title: 'Security Key', icon: 'key' },
            { title: 'Biometrics', icon: 'fingerprint' },
            { title: 'One-Time Code', icon: 'pin' },
          ],
          caption: 'Authentication verifies the identity of a user before access is granted.',
        },
      },

      {
        title: 'Authorization',
        content:
          'Authorization answers the question: “What are you allowed to do?” Permissions and roles are commonly used to control access.',

        visual: {
          type: 'authentication',
          title: 'AUTHORIZATION FLOW',
          items: [
            { title: 'Verified User', icon: 'person' },
            { title: 'Role', icon: 'badge' },
            { title: 'Permissions', icon: 'admin_panel_settings' },
            { title: 'Resource', icon: 'dns' },
          ],
        },
      },

      {
        title: 'Least Privilege',
        content:
          'The principle of least privilege means users and services should receive only the permissions necessary to perform their required tasks.',

        visual: {
          type: 'security',
          title: 'LEAST PRIVILEGE',
          icon: 'admin_panel_settings',
          items: [
            { title: 'Users', icon: 'person' },
            { title: 'Services', icon: 'settings' },
            { title: 'Only Needed Access', icon: 'rule' },
            { title: 'Less Damage if Hacked', icon: 'shield' },
          ],
        },
      },
    ],

    example: {
      title: 'Linux Example',
      content:
        'A regular application user should not automatically receive unrestricted administrative privileges. Administrative actions can instead require controlled elevation through sudo.',

      visual: {
        type: 'linux-server',
        title: 'CONTROLLED ELEVATION',
        items: [
          { title: 'Regular User', icon: 'person' },
          { title: 'sudo', icon: 'terminal' },
          { title: 'Permissions', icon: 'admin_panel_settings' },
          { title: 'Audit Logs', icon: 'description' },
          { title: 'Admin Task', icon: 'settings' },
        ],
      },
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

        visual: {
          type: 'security',
          title: 'Strong Password Protection',
          icon: 'password',
          items: [
            { title: 'Long', icon: 'straighten' },
            { title: 'Unpredictable', icon: 'shuffle' },
            { title: 'Unique', icon: 'fingerprint' },
            { title: 'Password Manager', icon: 'enhanced_encryption' },
          ],
          caption: 'Strong and unique credentials reduce the risk of account compromise.',
        },
      },

      {
        title: 'Password Storage',
        content:
          'Applications should not store user passwords as plain text. Secure password hashing mechanisms are used to protect stored credentials.',

        visual: {
          type: 'authentication',
          title: 'SECURE PASSWORD STORAGE',
          items: [
            { title: 'User Password', icon: 'password' },
            { title: 'Hashing', icon: 'tag' },
            { title: 'Stored Hash', icon: 'storage' },
            { title: 'Compare at Login', icon: 'compare_arrows' },
          ],
        },
      },
    ],

    example: {
      title: 'Good Practice',
      content:
        'Use a unique password for an important account and enable multi-factor authentication when available.',

      visual: {
        type: 'mfa',
        title: 'PASSWORD + MFA',
        items: [
          { title: 'Unique Password', icon: 'password' },
          { title: 'Authenticator App', icon: 'smartphone' },
          { title: 'Account Protected', icon: 'verified_user' },
        ],
      },
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

        visual: {
          type: 'mfa',
          title: 'Multi-Factor Authentication',
          icon: 'verified_user',
          caption:
            'Multiple authentication factors create additional protection around an account.',
        },
      },

      {
        title: 'Why MFA Helps',
        content:
          'If a password is compromised, an additional authentication factor can provide another barrier before an attacker can access the account.',

        visual: {
          type: 'threats',
          title: 'MFA BLOCKS STOLEN PASSWORDS',
          items: [
            { title: 'Password Stolen', text: 'Attacker has it', icon: 'key_off' },
            { title: 'Login Attempt', text: 'Correct password', icon: 'login' },
            { title: 'MFA Challenge', text: 'Second factor needed', icon: 'smartphone' },
            { title: 'Access Denied', text: 'Account stays safe', icon: 'verified_user' },
          ],
        },
      },
    ],

    example: {
      title: 'Example',
      content:
        'A user enters a password and then confirms the login using an authentication application or security key.',

      visual: {
        type: 'authentication',
        title: 'LOGIN WITH MFA',
        items: [
          { title: 'Enter Password', icon: 'password' },
          { title: 'Open Auth App', icon: 'smartphone' },
          { title: 'Confirm Code / Key', icon: 'key' },
          { title: 'Access Granted', icon: 'verified' },
        ],
      },
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

        visual: {
          type: 'threats',
          title: 'Web Application Security',
          icon: 'language',
          items: [
            { title: 'Injection', text: 'Malicious input', icon: 'code' },
            { title: 'XSS', text: 'Script in pages', icon: 'web' },
            { title: 'Broken Auth', text: 'Weak login logic', icon: 'lock_open' },
            { title: 'Data Exposure', text: 'Leaked secrets', icon: 'visibility' },
            { title: 'Secure Coding', text: 'Defense', icon: 'security' },
          ],
          caption:
            'Web applications need protection across the frontend, backend, APIs, sessions, and data.',
        },
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

        visual: {
          type: 'security',
          title: 'SECURE DEVELOPMENT',
          icon: 'verified',
          items: [
            { title: 'Validate Input', icon: 'rule' },
            { title: 'Secure Auth', icon: 'verified_user' },
            { title: 'Access Control', icon: 'admin_panel_settings' },
            { title: 'Protect Data', icon: 'lock' },
            { title: 'Update Dependencies', icon: 'update' },
          ],
        },
      },
    ],

    example: {
      title: 'Django Application',
      content:
        'A Django backend can apply authentication, permission checks, input validation, CSRF protection, secure configuration, and database protections as part of the application security layer.',

      visual: {
        type: 'security',
        title: 'DJANGO SECURITY LAYERS',
        icon: 'api',
        items: [
          { title: 'Authentication', icon: 'verified_user' },
          { title: 'Permissions', icon: 'admin_panel_settings' },
          { title: 'Input Validation', icon: 'rule' },
          { title: 'CSRF Protection', icon: 'gpp_good' },
          { title: 'Secure Config', icon: 'settings' },
          { title: 'Database', icon: 'storage' },
        ],
      },
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

        visual: {
          type: 'raspberry-pi',
          title: 'Linux Server Security',
          icon: 'computer',
          items: [
            { title: 'Updates', icon: 'update' },
            { title: 'Fewer Services', icon: 'tune' },
            { title: 'Permissions', icon: 'admin_panel_settings' },
            { title: 'Admin Accounts', icon: 'manage_accounts' },
            { title: 'Monitoring', icon: 'monitor_heart' },
          ],
          caption:
            'A secure server combines operating system updates, access control, service management, and monitoring.',
        },
      },
    ],

    code: {
      title: 'Update Ubuntu Packages',
      language: 'bash',
      content: 'sudo apt update\nsudo apt upgrade',
      example: `Hit:1 http://ports.ubuntu.com/ubuntu-ports jammy InRelease
Get:2 http://ports.ubuntu.com/ubuntu-ports jammy-security InRelease [110 kB]
Fetched 1,284 kB in 3s (428 kB/s)
Reading package lists... Done
12 packages can be upgraded. Run 'apt list --upgradable' to see them.

The following packages will be upgraded:
  openssh-server openssl libssl3 linux-raspi ...
12 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
Do you want to continue? [Y/n] y`,
      explanation:
        'apt update refreshes the list of available package versions. apt upgrade then installs the newer versions, including security patches. In the output, 12 packages have updates waiting.',

      visual: {
        type: 'linux-server',
        title: 'PACKAGE UPDATE FLOW',
        items: [
          { title: 'apt update', icon: 'refresh' },
          { title: 'Check Versions', icon: 'fact_check' },
          { title: 'apt upgrade', icon: 'system_update' },
          { title: 'Patched', icon: 'verified' },
          { title: 'Safer', icon: 'security' },
        ],
      },
    },

    example: {
      title: 'Raspberry Pi Server',
      content:
        'Keeping the operating system and installed packages updated helps address known vulnerabilities and maintain a more secure server environment.',

      visual: {
        type: 'threats',
        title: 'UPDATES CLOSE VULNERABILITIES',
        items: [
          { title: 'Known Vulnerability', text: 'Publicly reported', icon: 'bug_report' },
          { title: 'Vendor Patch', text: 'Fix released', icon: 'build' },
          { title: 'Install Update', text: 'On the Pi', icon: 'system_update' },
          { title: 'Safer Server', text: 'Risk reduced', icon: 'verified' },
        ],
      },
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

        visual: {
          type: 'authentication',
          title: 'Secure SSH Access',
          icon: 'terminal',
          items: [
            { title: 'SSH Key', icon: 'key' },
            { title: 'Restricted Users', icon: 'manage_accounts' },
            { title: 'Disable Weak Methods', icon: 'block' },
            { title: 'Auth Logs', icon: 'description' },
          ],
          caption:
            'SSH provides remote administration, so authentication and access controls should be properly protected.',
        },
      },
    ],

    code: {
      title: 'Check SSH Service',
      language: 'bash',
      content: 'sudo systemctl status ssh',
      example: `● ssh.service - OpenBSD Secure Shell server
     Loaded: loaded (/lib/systemd/system/ssh.service; enabled; vendor preset: enabled)
     Active: active (running) since Tue 2026-10-06 08:12:44 PST; 1 day ago
       Docs: man:sshd(8)
             man:sshd_config(5)
   Main PID: 845 (sshd)
      Tasks: 1 (limit: 4915)
     Memory: 5.2M
        CPU: 1.204s
     CGroup: /system.slice/ssh.service
             └─845 "sshd: /usr/sbin/sshd -D [listener]"`,
      explanation:
        'Shows whether the SSH service is installed, enabled at boot, and currently running. "active (running)" means remote login is available, and "enabled" means it will start again after a reboot.',

      visual: {
        type: 'linux-server',
        title: 'SSH SERVICE STATUS',
        items: [
          { title: 'systemctl', icon: 'settings' },
          { title: 'ssh.service', icon: 'terminal' },
          { title: 'Active?', icon: 'check_circle' },
          { title: 'Logs', icon: 'description' },
          { title: 'Port 22', icon: 'lan' },
        ],
      },
    },

    example: {
      title: 'Raspberry Pi',
      content:
        'SSH can be used to administer the Raspberry Pi without directly connecting a monitor and keyboard to the server.',

      visual: {
        type: 'data-flow',
        title: 'REMOTE ADMINISTRATION',
        icon: 'terminal',
        center: 'SSH SESSION',
        items: [
          { title: 'Your Laptop', text: 'SSH client', icon: 'laptop' },
          { title: 'Encrypted Tunnel', text: 'Secure channel', icon: 'lock' },
          { title: 'Raspberry Pi', text: 'SSH server', icon: 'memory' },
          { title: 'No Monitor Needed', text: 'Headless admin', icon: 'desktop_access_disabled' },
        ],
      },
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

        visual: {
          type: 'security',
          title: 'Linux File Permissions',
          icon: 'key',
          items: [
            { title: 'r — Read', icon: 'visibility' },
            { title: 'w — Write', icon: 'edit' },
            { title: 'x — Execute', icon: 'play_arrow' },
          ],
          caption:
            'Linux permissions control which users and groups can read, write, or execute resources.',
        },
      },

      {
        title: 'Ownership',
        content:
          'Files and directories can have an owner and group. Permissions can then be applied based on the owner, group, and other users.',

        visual: {
          type: 'permissions',
          title: 'OWNER / GROUP / OTHERS',
          icon: 'folder_shared',
          center: '-rwxr-x---',
          items: [
            { title: 'Owner', text: 'rwx — full access', icon: 'person' },
            { title: 'Group', text: 'r-x — read & run', icon: 'groups' },
            { title: 'Others', text: '--- — no access', icon: 'public_off' },
          ],
        },
      },
    ],

    code: {
      title: 'View File Permissions',
      language: 'bash',
      content: 'ls -l',
      example: `total 20
drwxr-xr-x 2 tyrone tyrone   4096 Oct  6 09:10 backend
-rwxr-x--- 1 tyrone tyrone    233 Oct  5 18:40 deploy.sh
-rw-r--r-- 1 tyrone tyrone    812 Oct  6 09:12 docker-compose.yml
-rw------- 1 tyrone tyrone    146 Oct  6 09:15 config.env
drwxr-xr-x 2 tyrone www-data 4096 Oct  6 09:11 frontend`,
      explanation:
        'The first column is the permission string: type, then owner, group, and others (rwx each). Example: config.env is -rw------- so only its owner can read or write it, while deploy.sh is -rwxr-x--- so the owner can run it, the group can read and run it, and others get no access.',

      visual: {
        type: 'linux-server',
        title: 'FILE LISTING',
        items: [
          { title: 'Permissions', icon: 'admin_panel_settings' },
          { title: 'Owner', icon: 'person' },
          { title: 'Group', icon: 'groups' },
          { title: 'Size', icon: 'data_usage' },
          { title: 'Name', icon: 'description' },
        ],
      },
    },

    example: {
      title: 'Least Privilege',
      content:
        'Correct permissions can prevent ordinary users or services from modifying sensitive files that they do not need to change.',

      visual: {
        type: 'security',
        title: 'PROTECTED SENSITIVE FILES',
        icon: 'lock',
        items: [
          { title: 'Ordinary User', icon: 'person' },
          { title: 'Read-Only Access', icon: 'visibility' },
          { title: 'Config Protected', icon: 'lock' },
          { title: 'Service Limited', icon: 'settings' },
        ],
      },
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

        visual: {
          type: 'security',
          title: 'System Hardening',
          icon: 'build',
          items: [
            { title: 'Update OS', icon: 'update' },
            { title: 'Remove Software', icon: 'delete' },
            { title: 'Disable Services', icon: 'power_off' },
            { title: 'Restrict Network', icon: 'lan' },
            { title: 'Strong Auth', icon: 'verified_user' },
            { title: 'Enable Logs', icon: 'description' },
          ],
          caption:
            'Hardening reduces unnecessary functionality, permissions, services, and network exposure.',
        },
      },
    ],

    example: {
      title: 'Server Hardening',
      content:
        'A Raspberry Pi used as a web server should run only the services required by the project and should have unnecessary network exposure minimized.',

      visual: {
        type: 'raspberry-pi',
        title: 'HARDENED RASPBERRY PI',
        items: [
          { title: 'Only Needed Services', icon: 'tune' },
          { title: 'Firewall On', icon: 'security' },
          { title: 'SSH Restricted', icon: 'terminal' },
          { title: 'Logging Enabled', icon: 'description' },
        ],
      },
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

        visual: {
          type: 'monitoring',
          title: 'Security Monitoring',
          icon: 'monitor_heart',
          caption:
            'Logs and monitoring help administrators identify unusual activity and investigate security events.',
        },
      },
    ],

    code: {
      title: 'View System Logs',
      language: 'bash',
      content: 'sudo journalctl -xe',
      example: `Oct 07 02:14:31 raspi-server sshd[2210]: Failed password for invalid user admin from 203.0.113.45 port 51822 ssh2
Oct 07 02:14:34 raspi-server sshd[2210]: Failed password for invalid user admin from 203.0.113.45 port 51822 ssh2
Oct 07 02:14:38 raspi-server sshd[2213]: Failed password for root from 203.0.113.45 port 51840 ssh2
Oct 07 02:15:02 raspi-server sudo[2230]: tyrone : TTY=pts/0 ; COMMAND=/usr/bin/systemctl status ssh
Oct 07 02:16:10 raspi-server sshd[2241]: Accepted publickey for tyrone from 192.168.1.20 port 50211 ssh2`,
      explanation:
        'Shows the newest system log entries, with explanations for errors. Here, repeated "Failed password" lines from the same IP suggest a brute-force attempt, while the last line is a normal key-based login by the real user.',

      visual: {
        type: 'monitoring',
        title: 'JOURNAL LOG VIEWER',
      },
    },

    example: {
      title: 'Security Investigation',
      content:
        'Repeated failed SSH authentication attempts may indicate an account attack or an improperly configured client and should be investigated.',

      visual: {
        type: 'threats',
        title: 'FAILED SSH LOGIN INVESTIGATION',
        items: [
          { title: 'Failed Logins', text: 'Repeated attempts', icon: 'login' },
          { title: 'Log Entry', text: 'Recorded in logs', icon: 'description' },
          { title: 'Review Source', text: 'IP & username', icon: 'manage_search' },
          { title: 'Harden Access', text: 'Block / restrict', icon: 'security' },
        ],
      },
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

        visual: {
          type: 'threats',
          title: 'Incident Response',
          icon: 'report_problem',
          items: [
            { title: 'Detect', text: 'Spot the incident', icon: 'visibility' },
            { title: 'Contain', text: 'Limit the spread', icon: 'lock' },
            { title: 'Eradicate', text: 'Remove the cause', icon: 'cleaning_services' },
            { title: 'Recover', text: 'Restore services', icon: 'restore' },
            { title: 'Improve', text: 'Lessons learned', icon: 'school' },
          ],
          caption:
            'Security incidents require an organized process for detection, containment, investigation, and recovery.',
        },
      },
    ],

    example: {
      title: 'Example',
      content:
        'If a server account is suspected of being compromised, administrators may isolate the affected system, review logs, secure credentials, investigate the cause, and restore normal operations.',

      visual: {
        type: 'response-steps',
        title: 'COMPROMISED ACCOUNT RESPONSE',
        icon: 'report_problem',
        center: 'INCIDENT',
        items: [
          { title: 'Isolate System', icon: 'wifi_off' },
          { title: 'Review Logs', icon: 'description' },
          { title: 'Secure Credentials', icon: 'key' },
          { title: 'Find Root Cause', icon: 'manage_search' },
          { title: 'Restore Operations', icon: 'restore' },
        ],
      },
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

        visual: {
          type: 'security',
          title: 'Security Best Practices',
          icon: 'verified',
          items: [
            { title: 'Unique Credentials', icon: 'password' },
            { title: 'Enable MFA', icon: 'verified_user' },
            { title: 'Updates', icon: 'update' },
            { title: 'Backups', icon: 'backup' },
            { title: 'Least Access', icon: 'admin_panel_settings' },
            { title: 'Monitoring', icon: 'monitor_heart' },
          ],
          caption:
            'Effective cybersecurity combines secure configuration, strong authentication, updates, backups, and monitoring.',
        },
      },
    ],

    example: {
      title: 'For This Project',
      content:
        'The Raspberry Pi learning server can apply these principles through controlled access, Docker security, firewall configuration, system updates, monitoring, and secure application configuration.',

      visual: {
        type: 'raspberry-pi',
        title: 'PROJECT SECURITY STACK',
        items: [
          { title: 'Controlled Access', icon: 'admin_panel_settings' },
          { title: 'Docker Security', icon: 'inventory_2' },
          { title: 'Firewall', icon: 'security' },
          { title: 'Updates', icon: 'update' },
          { title: 'Monitoring', icon: 'monitor_heart' },
        ],
      },
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

        visual: {
          type: 'raspberry-pi',
          title: 'Raspberry Pi Security',
          icon: 'memory',
          items: [
            { title: 'SSH Hardening', icon: 'terminal' },
            { title: 'Firewall', icon: 'security' },
            { title: 'Permissions', icon: 'admin_panel_settings' },
            { title: 'Docker Security', icon: 'inventory_2' },
            { title: 'Monitoring', icon: 'monitor_heart' },
          ],
          caption:
            'The Raspberry Pi server combines multiple security layers across the operating system, network, applications, and services.',
        },
      },

      {
        title: 'Defense in Depth',
        content:
          'Security should not depend on a single control. Multiple layers can work together so that the failure of one control does not automatically compromise the entire system.',

        visual: {
          type: 'defense-layers',
          title: 'Defense in Depth',
          icon: 'layers',
          center: 'PROTECTED DATA',
          items: [
            { title: 'Network', text: 'Firewall & ports', icon: 'lan' },
            { title: 'Host', text: 'OS hardening & updates', icon: 'computer' },
            { title: 'Application', text: 'Auth & validation', icon: 'api' },
            { title: 'Data', text: 'Permissions & backups', icon: 'storage' },
          ],
          caption:
            'Multiple security layers can work together to provide stronger overall protection.',
        },
      },
    ],

    example: {
      title: 'Project Architecture',
      content:
        'The Raspberry Pi can run Docker containers for the frontend, Django backend, and MySQL database while network access, authentication, permissions, and monitoring provide additional security layers.',

      visual: {
        type: 'raspberry-pi',
        title: 'PI PROJECT ARCHITECTURE',
        items: [
          { title: 'Frontend Container', icon: 'web' },
          { title: 'Django Backend', icon: 'api' },
          { title: 'MySQL Database', icon: 'storage' },
          { title: 'Firewall & Auth', icon: 'security' },
          { title: 'Monitoring', icon: 'monitor_heart' },
        ],
      },
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

        visual: {
          type: 'security',
          title: 'Cybersecurity Fundamentals',
          icon: 'school',
          items: [
            { title: 'CIA Triad', icon: 'security' },
            { title: 'Threats', icon: 'bug_report' },
            { title: 'Network', icon: 'lan' },
            { title: 'Access Control', icon: 'lock' },
            { title: 'Linux', icon: 'terminal' },
            { title: 'Monitoring', icon: 'monitor_heart' },
          ],
          caption:
            'Cybersecurity brings together multiple security concepts and controls to protect digital resources.',
        },
      },

      {
        title: 'Final Takeaway',
        content:
          'Effective security is an ongoing process. Systems should be designed, configured, monitored, updated, and reviewed continuously.',

        visual: {
          type: 'continuous-process',
          title: 'CONTINUOUS SECURITY',
          icon: 'autorenew',
          center: 'ONGOING PROCESS',
          items: [
            { title: 'Design', icon: 'architecture' },
            { title: 'Configure', icon: 'settings' },
            { title: 'Monitor', icon: 'monitor_heart' },
            { title: 'Update', icon: 'update' },
            { title: 'Review', icon: 'fact_check' },
          ],
        },
      },
    ],

    example: {
      title: 'Next Module',
      content:
        'After learning cybersecurity fundamentals, continue to Docker Commands to understand how containers can be built, managed, secured, and deployed on the Raspberry Pi server.',

      visual: {
        type: 'next-module',
        title: 'NEXT: DOCKER COMMANDS',
        icon: 'inventory_2',
        center: 'LEARNING PATH',
        items: [
          { title: 'Cybersecurity', text: 'Completed', icon: 'check_circle' },
          { title: 'Docker Commands', text: 'Up next', icon: 'inventory_2' },
          { title: 'Raspberry Pi Deploy', text: 'Apply it', icon: 'memory' },
        ],
      },
    },
  },
]
