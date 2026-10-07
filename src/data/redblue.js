export const redBlueLessons = [
  {
    id: 1,
    title: 'Introduction to Red Team & Blue Team',
    subtitle: 'Understanding offensive and defensive cybersecurity',
    category: 'Red Team & Blue Team',
    template: 'split-command',
    visual: 'redblue-overview',

    overview:
      'Red Teams simulate the actions of attackers while Blue Teams defend systems, detect threats, and respond to security incidents. Together, they help organizations identify weaknesses and improve security.',

    sections: [
      {
        title: 'Red Team',
        content:
          'The Red Team represents the offensive side of cybersecurity. Its goal is to safely simulate realistic attacks and discover weaknesses before real attackers can exploit them.',
        bullets: [
          'Simulates attacker behavior',
          'Identifies security weaknesses',
          'Tests security controls',
          'Provides findings to defenders',
        ],
      },
      {
        title: 'Blue Team',
        content:
          'The Blue Team represents the defensive side. It monitors systems, detects suspicious activity, investigates incidents, and strengthens security controls.',
        bullets: [
          'Monitors systems and networks',
          'Detects suspicious activity',
          'Responds to incidents',
          'Improves defensive controls',
        ],
      },
    ],
  },

  {
    id: 2,
    title: 'What is Red Team?',
    subtitle: 'The offensive security perspective',
    category: 'Red Team',
    template: 'red-team',
    visual: 'red-team',

    overview:
      'A Red Team is an authorized security team that simulates realistic adversary behavior to test how well an organization can protect its systems and data.',

    sections: [
      {
        title: 'Primary Objectives',
        bullets: [
          'Identify weaknesses',
          'Test security controls',
          'Evaluate attack paths',
          'Measure organizational readiness',
        ],
      },
      {
        title: 'Authorization Matters',
        content:
          'Red Team activities must be performed with explicit authorization, defined scope, and rules of engagement. The objective is to improve security, not cause damage.',
      },
    ],
  },

  {
    id: 3,
    title: 'Red Team Roles',
    subtitle: 'People behind offensive security assessments',
    category: 'Red Team',
    template: 'roles',
    visual: 'red-team',

    sections: [
      {
        title: 'Common Roles',
        bullets: [
          'Red Team Operator',
          'Security Tester',
          'Adversary Simulation Specialist',
          'Security Researcher',
          'Red Team Lead',
        ],
      },
      {
        title: 'Team Responsibilities',
        bullets: [
          'Plan authorized simulations',
          'Document findings',
          'Follow engagement rules',
          'Protect sensitive information',
        ],
      },
    ],
  },

  {
    id: 4,
    title: 'Reconnaissance',
    subtitle: 'Understanding the target environment',
    category: 'Red Team',
    template: 'process',
    visual: 'recon',

    sections: [
      {
        title: 'What is Reconnaissance?',
        content:
          'Reconnaissance is the process of gathering information about an authorized target environment before security testing begins.',
        bullets: [
          'Identify systems and services',
          'Understand the environment',
          'Map potential attack surfaces',
          'Prepare the assessment plan',
        ],
      },
    ],
  },

  {
    id: 5,
    title: 'Vulnerability Assessment',
    subtitle: 'Finding weaknesses before attackers do',
    category: 'Red Team',
    template: 'assessment',
    visual: 'vulnerability',

    sections: [
      {
        title: 'What Red Teams Look For',
        bullets: [
          'Misconfigured services',
          'Outdated software',
          'Weak authentication controls',
          'Excessive permissions',
          'Unprotected data',
        ],
      },
      {
        title: 'Goal',
        content:
          'The goal is to determine whether identified weaknesses could create meaningful security risk within the authorized environment.',
      },
    ],
  },

  {
    id: 6,
    title: 'Attack Simulation',
    subtitle: 'Testing security controls safely',
    category: 'Red Team',
    template: 'attack-simulation',
    visual: 'attack-simulation',

    sections: [
      {
        title: 'Controlled Simulation',
        content:
          'Attack simulations reproduce selected attacker behaviors inside an approved scope so organizations can evaluate their defenses.',
        bullets: [
          'Defined scope',
          'Approved techniques',
          'Controlled execution',
          'Documented results',
        ],
      },
      {
        title: 'Why It Matters',
        content:
          'A controlled simulation can reveal gaps that ordinary security checks may not identify.',
      },
    ],
  },

  {
    id: 7,
    title: 'Rules of Engagement',
    subtitle: 'Keeping security testing controlled',
    category: 'Red Team',
    template: 'rules',
    visual: 'roe',

    sections: [
      {
        title: 'Important Rules',
        bullets: [
          'Define the testing scope',
          'Identify authorized systems',
          'Set testing windows',
          'Define emergency contacts',
          'Document prohibited actions',
          'Establish stop conditions',
        ],
      },
      {
        title: 'Remember',
        content:
          'Professional security testing always operates within explicit authorization and agreed boundaries.',
      },
    ],
  },

  {
    id: 8,
    title: 'Red Team Workflow',
    subtitle: 'From planning to reporting',
    category: 'Red Team',
    template: 'workflow',
    visual: 'red-workflow',

    sections: [
      {
        title: 'Typical Workflow',
        bullets: ['Plan', 'Reconnaissance', 'Assess', 'Simulate', 'Document', 'Report'],
      },
    ],
  },

  {
    id: 9,
    title: 'What is Blue Team?',
    subtitle: 'The defensive security perspective',
    category: 'Blue Team',
    template: 'blue-team',
    visual: 'blue-team',

    overview:
      'The Blue Team protects systems, networks, applications, and data by monitoring activity, detecting threats, responding to incidents, and improving defensive controls.',

    sections: [
      {
        title: 'Primary Responsibilities',
        bullets: [
          'Monitor security events',
          'Detect suspicious activity',
          'Investigate incidents',
          'Contain threats',
          'Recover affected systems',
        ],
      },
    ],
  },

  {
    id: 10,
    title: 'Security Monitoring',
    subtitle: 'Watching the environment for suspicious activity',
    category: 'Blue Team',
    template: 'monitoring',
    visual: 'soc',

    sections: [
      {
        title: 'What is Monitored?',
        bullets: [
          'Network traffic',
          'Server activity',
          'Authentication events',
          'Application logs',
          'Endpoint activity',
        ],
      },
      {
        title: 'Objective',
        content:
          'Monitoring helps defenders establish visibility and identify unusual behavior that may indicate a security incident.',
      },
    ],
  },

  {
    id: 11,
    title: 'Detection',
    subtitle: 'Recognizing potential security threats',
    category: 'Blue Team',
    template: 'detection',
    visual: 'detection',

    sections: [
      {
        title: 'Detection Sources',
        bullets: [
          'Security alerts',
          'Log events',
          'Network anomalies',
          'Authentication anomalies',
          'Endpoint alerts',
        ],
      },
      {
        title: 'Detection Process',
        content:
          'Blue Teams analyze available security signals and determine whether activity represents normal behavior or a potential threat.',
      },
    ],
  },

  {
    id: 12,
    title: 'Incident Response',
    subtitle: 'Responding when something goes wrong',
    category: 'Blue Team',
    template: 'incident-response',
    visual: 'incident-response',

    sections: [
      {
        title: 'Response Lifecycle',
        bullets: ['Prepare', 'Detect', 'Analyze', 'Contain', 'Recover', 'Learn'],
      },
      {
        title: 'Goal',
        content:
          'Incident response aims to limit impact, restore normal operations, and use lessons learned to improve future defenses.',
      },
    ],
  },

  {
    id: 13,
    title: 'Threat Hunting',
    subtitle: 'Searching for threats that may have escaped detection',
    category: 'Blue Team',
    template: 'hunting',
    visual: 'threat-hunting',

    sections: [
      {
        title: 'Threat Hunting',
        content:
          'Threat hunting is a proactive defensive activity where analysts search for suspicious patterns that may not have triggered existing security alerts.',
        bullets: [
          'Develop a hypothesis',
          'Review available data',
          'Search for suspicious patterns',
          'Investigate findings',
          'Improve detection rules',
        ],
      },
    ],
  },

  {
    id: 14,
    title: 'Log Analysis',
    subtitle: 'Turning system events into security information',
    category: 'Blue Team',
    template: 'logs',
    visual: 'log-analysis',

    sections: [
      {
        title: 'Useful Log Sources',
        bullets: [
          'Web server logs',
          'Authentication logs',
          'Operating system logs',
          'Application logs',
          'Firewall logs',
        ],
      },
      {
        title: 'Why Logs Matter',
        content:
          'Logs provide evidence of what happened inside a system and help defenders investigate suspicious events.',
      },
    ],
  },

  {
    id: 15,
    title: 'Blue Team Tools',
    subtitle: 'Technology used for defensive operations',
    category: 'Blue Team',
    template: 'tools',
    visual: 'blue-tools',

    sections: [
      {
        title: 'Common Tool Categories',
        bullets: [
          'SIEM platforms',
          'Intrusion Detection Systems',
          'Endpoint Detection and Response',
          'Firewalls',
          'Vulnerability scanners',
          'Log management platforms',
        ],
      },
      {
        title: 'Important Principle',
        content:
          'Tools provide visibility and automation, but effective defense still requires people, processes, analysis, and continuous improvement.',
      },
    ],
  },

  {
    id: 16,
    title: 'Red Team vs Blue Team',
    subtitle: 'Offense meets defense',
    category: 'Red Team & Blue Team',
    template: 'versus',
    visual: 'red-vs-blue',

    sections: [
      {
        title: 'Red Team',
        bullets: [
          'Simulates attackers',
          'Finds weaknesses',
          'Tests defenses',
          'Reports attack paths',
        ],
      },
      {
        title: 'Blue Team',
        bullets: [
          'Defends systems',
          'Detects threats',
          'Responds to incidents',
          'Improves security controls',
        ],
      },
    ],
  },

  {
    id: 17,
    title: 'Purple Team',
    subtitle: 'Connecting offensive and defensive security',
    category: 'Purple Team',
    template: 'purple-team',
    visual: 'purple-team',

    overview:
      'Purple Teaming represents collaboration between Red and Blue Teams. Instead of treating offense and defense as separate activities, both sides work together to improve detection and response.',

    sections: [
      {
        title: 'How They Work Together',
        bullets: [
          'Red Team performs an authorized simulation',
          'Blue Team monitors and detects activity',
          'Both teams review the results',
          'Detection gaps are improved',
          'The process is repeated',
        ],
      },
    ],
  },

  {
    id: 18,
    title: 'Attack → Detection → Response',
    subtitle: 'The complete security cycle',
    category: 'Red Team & Blue Team',
    template: 'cycle',
    visual: 'attack-detection-response',

    sections: [
      {
        title: 'Security Operations Cycle',
        bullets: [
          'Red Team simulates activity',
          'Blue Team observes signals',
          'Security team investigates',
          'Defenders respond',
          'Lessons improve future defenses',
        ],
      },
    ],
  },

  {
    id: 19,
    title: 'Real-World Security Scenario',
    subtitle: 'How Red and Blue Teams can work together',
    category: 'Red Team & Blue Team',
    template: 'scenario',
    visual: 'redblue-scenario',

    sections: [
      {
        title: 'Scenario',
        content:
          'An organization wants to evaluate whether its web application monitoring can detect suspicious activity during an authorized security exercise.',
      },
      {
        title: 'Red Team',
        bullets: [
          'Plans the authorized simulation',
          'Performs approved testing',
          'Documents observed behavior',
        ],
      },
      {
        title: 'Blue Team',
        bullets: [
          'Monitors security signals',
          'Investigates alerts',
          'Responds according to the incident plan',
        ],
      },
      {
        title: 'Result',
        content:
          'The organization identifies detection gaps and improves its monitoring and response procedures.',
      },
    ],
  },

  {
    id: 20,
    title: 'Key Takeaways',
    subtitle: 'Building stronger cybersecurity through teamwork',
    category: 'Red Team & Blue Team',
    template: 'summary',
    visual: 'redblue-summary',

    sections: [
      {
        title: 'Remember',
        bullets: [
          'Red Team = offensive security simulation',
          'Blue Team = defensive security operations',
          'Purple Team = collaboration and improvement',
          'Authorization and scope are essential',
          'The goal is stronger security',
        ],
      },
    ],
  },
]
