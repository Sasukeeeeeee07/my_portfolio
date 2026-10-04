// Chirag Yadav Portfolio — Personal Data Architecture
// Written in authentic first-person voice with Chirag's verified background

export const person = {
  name: {
    first: 'Chirag',
    last: 'Yadav',
    full: 'Chirag Yadav',
  },
  titles: ['Software Engineer', 'Builder', 'AI Explorer'],
  tagline: 'Software Engineer · Builder · AI Explorer',
  bio: {
    short: 'I am a software engineer and MCA graduate building scalable backend architectures, cloud infrastructure on AWS, and agentic AI systems.',
    long: `I am a software engineer whose career took shape in the machinery of real systems. 
    Having scored 80% in HSC, completed my BSc IT, and recently completed my MCA while securing the 14th Rank across the University, I bridge deep theoretical computer science with hands-on production engineering.
    From a remote engineering internship at !404 Developers to joining Smmart on 10 November 2025, my work spans enterprise CRM ecosystems, AWS cloud infrastructure, real-time Meta API webhooks, and IoT firmware.
    I build with first-principles discipline and a drive toward production-grade AI systems.`,
  },
  // Fill these in and the matching buttons appear in the Contact section.
  // Anything left empty is simply not shown, so no placeholder text ever ships.
  //   email:    'you@example.com'
  //   linkedin: 'https://www.linkedin.com/in/your-handle'
  //   github:   'https://github.com/your-handle'
  //   resume:   '/Chirag-Yadav-Resume.pdf'   (put the PDF in /public)
  contact: {
    email: '',
    linkedin: '',
    github: '',
    resume: '',
  },
  interests: ['Cricket', 'Virat Kohli', 'Fitness & Discipline', 'Building systems', 'Continuous Learning'],
  philosophy: 'Master the underlying mechanics first; speed and scale naturally follow.',
};

export const education = [
  {
    id: 'mca',
    degree: 'Master of Computer Applications (MCA)',
    institution: 'AIMSR — Aditya Institute of Management Studies and Research',
    duration: { start: 'Completed' },
    status: 'completed',
    notes: 'Recently completed MCA. Secured 14th Rank across the entire University cohort.',
    highlights: ['University Rank Holder — 14th Rank', 'Completed with Distinction'],
  },
  {
    id: 'bsc-it',
    degree: 'BSc Information Technology',
    institution: 'University of Mumbai',
    duration: { start: 'Completed' },
    status: 'completed',
    notes: 'Undergraduate foundation in software engineering, database internals, and algorithms.',
    highlights: ['Undergraduate IT Foundation'],
  },
  {
    id: 'hsc',
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'Junior College',
    score: '80%',
    status: 'completed',
    notes: 'Secured 80% in HSC with a focus on science and mathematics.',
    highlights: ['80% in HSC'],
  },
];

export const achievements = [
  {
    id: 'rank-holder',
    title: 'University Rank Holder',
    detail: 'Secured 14th Rank across the University in Master of Computer Applications (MCA).',
    program: 'MCA',
    university: 'University of Mumbai',
    type: 'academic',
  },
  {
    id: 'hsc-merit',
    title: '80% in Higher Secondary Certificate (HSC)',
    detail: 'Strong academic foundation establishing the path into computer science and software systems.',
    program: 'HSC',
    type: 'academic',
  },
];

export const experience = [
  {
    id: 'smmart',
    company: 'Smmart Training Consultancy and Services',
    role: 'Software Engineer',
    startDate: '10 Nov 2025',
    durationLabel: '10 Nov 2025 — Present',
    type: 'full-time',
    summary: `I am embedded within Smmart's technology ecosystem, architecting and maintaining the customized CRM platform that powers the company's multi-city sales, training, and operational pipelines.`,
    description: `At Smmart, my engineering responsibilities encompass extending our core CRM platform (CodeIgniter & Perfex), integrating real-world Meta/Facebook Lead Ads webhooks, managing production AWS EC2 and RDS instances, and architecting the SPANCO sales pipeline.
    
    I handle live database migrations, resolve critical RDS connectivity issues, manage CI/CD deployment through GitHub Actions, and write backend services that handle active business revenue daily.`,
    technologies: [
      'PHP', 'CodeIgniter 3', 'MySQL', 'Perfex CRM',
      'AWS', 'EC2', 'RDS', 'Linux',
      'GitHub Actions', 'REST APIs',
      'Facebook Graph API', 'Webhooks', 'JavaScript',
    ],
    modules: [
      'Lead Management', 'SPANCO Pipeline', 'Review Module',
      'Training Courses', 'HRMS', 'Timesheets',
      'Facebook Leads Integration', 'Billing & Invoicing',
      'Analytics', 'Enrollment Workflows',
    ],
  },
  {
    id: '404-developers',
    company: '!404 Developers',
    role: 'Software Engineering Intern',
    startDate: 'June 2025',
    endDate: 'August 2025',
    durationLabel: 'June 2025 — Aug 2025 (3 Months)',
    type: 'remote-internship',
    summary: `Remote software development internship where I collaborated in an agile team environment, engineered features, and strengthened full-stack engineering practices.`,
    description: `During this 3-month intensive remote internship, I worked alongside senior engineers building web applications, designing RESTful API endpoints, optimizing database queries, and participating in code reviews and sprint planning.`,
    technologies: [
      'JavaScript', 'Node.js', 'React', 'Git', 'REST APIs', 'Agile / Scrum'
    ],
  },
];

export const projects = [
  {
    id: 'smmart-crm',
    name: 'SMMART CRM Ecosystem',
    tag: 'PRODUCTION / CLOUD & BACKEND',
    type: 'Professional',
    problem: 'A multi-city enterprise required a unified platform to capture leads, drive them through a custom SPANCO pipeline, automate Facebook Ads lead capture, and manage billing and HR.',
    myRole: 'As Software Engineer at Smmart, I engineered core modules, maintained AWS EC2 & RDS infrastructure, and built live automated lead pipelines.',
    architecture: {
      stack: ['CodeIgniter 3', 'PHP', 'MySQL', 'Perfex CRM', 'Bootstrap'],
      infrastructure: ['AWS EC2', 'AWS RDS', 'GitHub Actions', 'Linux'],
      integrations: ['Meta/Facebook Lead Ads API', 'Facebook Graph API', 'Webhooks', 'REST APIs'],
    },
    challenges: [
      'Extending enterprise CodeIgniter backend without disrupting active live sales pipelines',
      'Debugging live MySQL database connections and permission pools on AWS RDS',
      'Ingesting Facebook webhooks reliably with idempotent token signature validation',
      'Deploying zero-downtime updates through GitHub Actions CI/CD to AWS EC2',
    ],
    modules: [
      'Lead Management', 'SPANCO Pipeline', 'Review Module',
      'Training Courses', 'HRMS', 'Timesheets',
      'Facebook Leads Integration', 'Billing & Invoicing',
    ],
    spanco: ['Suspecting', 'Prospecting', 'Approach', 'Negotiation', 'Closing', 'Order'],
    spancoNotes: [
      'A lead lands in the CRM from a form, a call or a Meta ad.',
      'It is qualified and given an owner in the right city team.',
      'First contact is logged and a follow-up is scheduled.',
      'Proposal, objections and pricing are tracked on the record.',
      'The deal is won and enrolment and billing are triggered.',
      'The order is booked and handed to delivery and training.',
    ],
  },
  {
    id: 'meta-integration',
    name: 'Facebook / Meta Lead Ads Gateway',
    tag: 'API ENGINEERING / WEBHOOKS',
    type: 'Professional',
    problem: 'Paid marketing campaigns on Meta were generating leads that previously suffered delay and manual entry friction before reaching the sales team.',
    myRole: 'I built an automated, real-time webhook ingestion gateway directly connecting Meta Graph API v18+ with our CRM database.',
    architecture: {
      flow: [
        { step: '01', label: 'Source', name: 'Facebook Lead Ads', sub: 'Ad Campaign Trigger' },
        { step: '02', label: 'Trigger', name: 'Meta Webhook', sub: 'Real-time Event Payload' },
        { step: '03', label: 'Auth', name: 'Graph API Token', sub: 'Signature Verification' },
        { step: '04', label: 'Ingest', name: 'Custom API Endpoint', sub: 'Payload Validation' },
        { step: '05', label: 'Process', name: 'CRM Database Ingestion', sub: 'Idempotent Storage' },
        { step: '06', label: 'Pipeline', name: 'SPANCO Assignment', sub: 'Instant Sales Alert' },
      ],
    },
    technologies: ['Meta Lead Ads', 'Facebook Graph API', 'Webhooks', 'PHP', 'CodeIgniter', 'MySQL'],
  },
  {
    id: 'smartdesk',
    name: 'SmartDesk IoT System',
    tag: 'HARDWARE / FIRMWARE',
    type: 'Personal Engineering Project',
    problem: 'I wanted to solve occupancy and posture tracking non-intrusively without privacy-invasive cameras.',
    myRole: 'I designed the firmware and circuit using an ESP32-S3 microcontroller, PIR motion sensors, and an SPI TFT display.',
    hardware: {
      primary: 'ESP32-S3 Microcontroller',
      display: '2.8" SPI TFT Screen',
      touch: 'XPT2046 Controller',
      sensors: ['PIR Motion Sensor', 'Time-of-Flight (ToF)', 'Ambient Sensors'],
      connectivity: ['Wi-Fi Telemetry', 'Bluetooth Low Energy'],
    },
    libraries: ['Adafruit GFX', 'TFT_eSPI', 'FreeRTOS', 'Arduino / C++'],
  },
  {
    id: 'ai-rag',
    name: 'Autonomous AI & RAG Systems',
    tag: 'EXPLORATION / AI SYSTEMS',
    type: 'AI Systems Engineering',
    problem: 'Exploring how to take LLMs beyond chat into autonomous deterministic tools with local context and private inference.',
    myRole: 'I build experimental RAG pipelines, local LLM serving with Ollama (Llama 3.2), MCP server integrations, and Whisper audio pipelines.',
    areas: [
      'Retrieval-Augmented Generation (RAG)',
      'Agentic Tool Calling & MCP Protocol',
      'Local LLM inference via Ollama',
      'Whisper Speech-to-Text pipelines',
      'n8n Event-driven agentic workflows',
      'Claude Code integration & development',
    ],
  },
];

export const skills = {
  backend: {
    label: 'Backend & Systems',
    items: [
      { name: 'PHP / CodeIgniter', level: 'strong' },
      { name: 'REST API Architecture', level: 'strong' },
      { name: 'Node.js', level: 'working' },
      { name: 'Java', level: 'working' },
      { name: 'ASP.NET', level: 'working' },
    ],
  },
  cloud: {
    label: 'Cloud & Infrastructure',
    items: [
      { name: 'AWS (EC2, RDS)', level: 'strong' },
      { name: 'MySQL Database Internals', level: 'strong' },
      { name: 'GitHub Actions / CI-CD', level: 'working' },
      { name: 'Linux Server Administration', level: 'working' },
      { name: 'Git Version Control', level: 'strong' },
    ],
  },
  frontend: {
    label: 'Frontend & UI',
    items: [
      { name: 'JavaScript (ES6+)', level: 'strong' },
      { name: 'React', level: 'working' },
      { name: 'HTML5 / CSS3', level: 'strong' },
      { name: 'React Native', level: 'working' },
    ],
  },
  ai: {
    label: 'AI & Emerging',
    items: [
      { name: 'RAG & Vector Context', level: 'exploring' },
      { name: 'Local LLMs (Ollama)', level: 'exploring' },
      { name: 'MCP (Model Context Protocol)', level: 'exploring' },
      { name: 'Whisper Speech Models', level: 'exploring' },
      { name: 'Agentic Workflows (n8n)', level: 'exploring' },
    ],
  },
  hardware: {
    label: 'Embedded & Hardware',
    items: [
      { name: 'ESP32-S3 Firmware', level: 'exploring' },
      { name: 'C / C++ (Arduino)', level: 'working' },
      { name: 'TFT SPI Displays', level: 'exploring' },
      { name: 'Sensor Telemetry', level: 'exploring' },
    ],
  },
};

export const events = [
  {
    id: 'nasscom-2024',
    event: 'NASSCOM Technology Confluence 2024',
    role: 'Volunteer',
    location: 'Mumbai',
    date: '19 November 2024',
    description: 'Volunteered at India\'s premier technology summit, gaining valuable firsthand exposure to national tech leaders, enterprise architectures, and cloud modernization strategies.',
  },
  {
    id: 'aimsr-tech-fest',
    event: 'AIMSR Tech Fest',
    role: 'Technical Volunteer',
    location: 'AIMSR, Mumbai',
    date: 'College Tech Summit',
    description: 'Helped coordinate technical competitions and logistics for students and visiting tech practitioners.',
  },
];

export const currentFocus = [
  'Production backend performance & AWS cloud scaling',
  'Agentic AI workflows & Model Context Protocol (MCP)',
  'System design fundamentals & high-throughput concurrency',
  'Deepening Java language mastery for large-scale enterprise services',
  'Continuous mental conditioning and physical fitness',
];

export const futureGoals = [
  'Architecting mission-critical distributed backend platforms',
  'Building autonomous production-grade AI systems',
  'Scaling cloud-native microservices on AWS/Kubernetes',
  'Contributing meaningfully to open-source systems',
];
