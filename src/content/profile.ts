import type { TrackId } from './tracks'

export const profile = {
  name: 'Mike Robert D Florentino',
  initials: 'Mike',
  title: 'Web, app & AI assistant developer , Network Automation',
  location: 'Asia-Pacific · Remote worldwide',
  availability: 'Booking projects from October 2026',
  email: 'stitz225311@gmail.com',
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/your-handle' },
    { label: 'GitHub', href: 'https://github.com/your-handle' },
    { label: 'Upwork', href: 'https://www.upwork.com/freelancers/your-handle' },
  ],
  intro:
    'I design and build the things your customers actually touch — the website they land on, the store they buy from, the app they reorder in, and the assistant that answers them at 2am.',
}

export interface Role {
  period: string
  role: string
  org: string
  summary: string
  points: string[]
  tracks: TrackId[]
}

export const experience: Role[] = [
  {
    period: '2023 — Now',
    role: 'Web, App & Automation Developer',
    org: 'Freelance · Independent',
    summary:
      'Websites, stores, apps and virtual assistants for small and mid-sized businesses, delivered end to end — from first call to handover docs.',
    points: [
      'Marketing sites and custom Shopify stores, designed and built from scratch',
      'React Native apps sharing one catalog and account system with the website',
      'AI virtual assistants in n8n that answer, qualify and book around the clock',
      'n8n, Zapier and GoHighLevel automations, plus CRMs built around real sales processes',
    ],
    tracks: ['web', 'ecommerce', 'app', 'assistant', 'automation', 'crm'],
  },
  {
    period: '2018 — Now',
    role: 'Systems & Infrastructure Engineer',
    org: 'Enterprise IT · Managed services',
    summary:
      'Years of keeping production systems running. It’s where my habits come from: careful changes, monitoring, and documentation someone else can pick up.',
    points: [
      'Scripted repetitive operations work in Python — the start of my automation work',
      'Built internal dashboards and tools used daily by the operations team',
    ],
    tracks: ['automation'],
  },
]

export interface SkillGroup {
  id: string
  name: string
  tracks: TrackId[]
  items: string[]
}

export const skills: SkillGroup[] = [
  {
    id: 'web',
    name: 'Web development',
    tracks: ['web', 'ecommerce', 'crm'],
    items: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Headless CMS', 'SEO', 'Core Web Vitals'],
  },
  {
    id: 'commerce',
    name: 'E-commerce',
    tracks: ['ecommerce', 'web'],
    items: ['Shopify', 'Liquid', 'Online Store 2.0', 'WooCommerce', 'Stripe', 'Klaviyo'],
  },
  {
    id: 'mobile',
    name: 'Apps & UI',
    tracks: ['app', 'web'],
    items: ['React Native', 'Expo', 'Figma', 'Design systems', 'Push notifications', 'App Store / Play release'],
  },
  {
    id: 'assistant',
    name: 'AI assistants',
    tracks: ['assistant', 'automation'],
    items: ['n8n AI Agent', 'OpenAI & Claude APIs', 'Prompt design', 'Knowledge bases', 'Tool calling', 'Human handoff'],
  },
  {
    id: 'automation',
    name: 'Automation',
    tracks: ['automation', 'assistant', 'crm'],
    items: ['n8n', 'Zapier', 'GoHighLevel', 'Make', 'Webhooks', 'REST APIs', 'Google Workspace'],
  },
  {
    id: 'crm',
    name: 'CRM & data',
    tracks: ['crm', 'automation'],
    items: ['Pipeline design', 'GoHighLevel', 'HubSpot', 'PostgreSQL', 'Dashboards', 'Data migration'],
  },
]
