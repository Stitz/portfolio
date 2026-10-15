export type TrackId = 'web' | 'ecommerce' | 'app' | 'assistant' | 'automation' | 'crm'

export interface Track {
  id: TrackId
  index: string
  label: string
  headline: [string, string, string]
  intro: string
  deliverables: string[]
  stack: string[]
  timeline: string
}

export const tracks: Track[] = [
  {
    id: 'web',
    index: '01',
    label: 'Website Design & Development',
    headline: ['Websites that look sharp and ', 'load fast', '.'],
    intro:
      'Business sites, landing pages and web apps designed from scratch and built properly — quick on a phone, easy for your team to update, and set up to turn visitors into enquiries.',
    deliverables: [
      'Design direction and page designs, signed off before build',
      'Responsive build in React / Next.js with a CMS',
      'SEO foundations and Core Web Vitals',
      'Forms, booking and analytics wired up',
      'Handover session and written guide',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Headless CMS'],
    timeline: '2 – 5 weeks',
  },
  {
    id: 'ecommerce',
    index: '02',
    label: 'E-Commerce & Shopify',
    headline: ['Online stores that load fast and ', 'sell quietly', '.'],
    intro:
      'A custom Shopify theme or headless storefront your customers trust on the first visit: clear product pages, a checkout without surprises, and an admin your team can run without calling me.',
    deliverables: [
      'Custom Shopify theme or headless storefront',
      'Product, collection and filter setup',
      'Payments, shipping and tax configuration',
      'Cart and checkout tuned for conversion',
      'Analytics and conversion tracking',
    ],
    stack: ['Shopify', 'Liquid', 'Next.js', 'Stripe'],
    timeline: '3 – 6 weeks',
  },
  {
    id: 'app',
    index: '03',
    label: 'Web + Mobile App',
    headline: ['One product, ', 'web and mobile', '.'],
    intro:
      'iOS, Android and web from one codebase — shared accounts, data and design, so nothing has to be built or updated twice.',
    deliverables: [
      'User flows and a clickable prototype',
      'iOS and Android app from one codebase',
      'Web app or admin dashboard',
      'Push notifications and payments',
      'App Store and Play release support',
    ],
    stack: ['React Native', 'Expo', 'Next.js', 'Node.js'],
    timeline: '6 – 12 weeks',
  },
  {
    id: 'assistant',
    index: '04',
    label: 'Virtual Assistant — n8n + AI',
    headline: ['An assistant that answers your customers ', 'at 2am', '.'],
    intro:
      'An AI virtual assistant built in n8n that replies on your website chat and messaging apps, answers from your own information, books appointments, and hands over to a person when it should.',
    deliverables: [
      'Map of the questions, tasks and handoff rules',
      'AI agent in n8n with your data as its knowledge',
      'Website chat widget and messaging channel',
      'Booking, CRM and email actions',
      'Conversation log and daily summary',
    ],
    stack: ['n8n', 'AI Agent', 'OpenAI / Claude', 'Web chat'],
    timeline: '2 – 4 weeks',
  },
  {
    id: 'automation',
    index: '05',
    label: 'Automation — n8n, GHL, Zapier',
    headline: ['Busywork, ', 'wired out', ' of your day.'],
    intro:
      'Leads answered in seconds, bookings that confirm themselves, invoices that chase themselves. I map how work moves today, then automate the steps nobody should be doing by hand.',
    deliverables: [
      'Process map of the current workflow',
      'Workflows in n8n, Zapier or GoHighLevel',
      'Error alerts and retry handling',
      'Recorded walkthrough of every workflow',
      '30 days of tuning after launch',
    ],
    stack: ['n8n', 'GoHighLevel', 'Zapier', 'Webhooks'],
    timeline: '1 – 4 weeks',
  },
  {
    id: 'crm',
    index: '06',
    label: 'CRM & Dashboards',
    headline: ['A CRM shaped around how your team ', 'actually sells', '.'],
    intro:
      'Pipelines, contacts and dashboards modelled on your real process — not the other way around. Built on GoHighLevel or as a custom web app when off-the-shelf stops fitting.',
    deliverables: [
      'Pipeline and stage design workshop',
      'Custom fields, roles and permissions',
      'Lead capture from site, ads and forms',
      'Dashboards the owner will actually open',
      'Data migration from spreadsheets',
    ],
    stack: ['GoHighLevel', 'React', 'PostgreSQL', 'n8n'],
    timeline: '4 – 8 weeks',
  },
]

export const trackById = (id: TrackId | null) => tracks.find((t) => t.id === id) ?? null
