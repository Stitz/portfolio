import type { TrackId } from './tracks'

export type PreviewKind = 'store' | 'shopify' | 'app' | 'flow' | 'crm' | 'assistant'

export interface Project {
  id: string
  category: string
  sector: string
  tracks: TrackId[]
  preview: PreviewKind
  summary: string
  brief: string
  approach: string[]
  shows: string[]
  stack: string[]
}

export const projects: Project[] = [
  {
    id: 'ecommerce-website',
    category: 'E-Commerce Website',
    sector: 'Retail · Leather goods',
    tracks: ['ecommerce', 'web'],
    preview: 'store',
    summary: 'Product-first layout, a single-page bag and a checkout with no surprises.',
    brief:
      'A small workshop selling bags and wallets online. The brief: a storefront that feels like walking into the shop — unhurried, material-focused — while keeping the path to checkout short.',
    approach: [
      'Three-column catalog with generous image space and price always visible',
      'Add-to-bag without leaving the page, so browsing isn’t interrupted',
      'Shipping cost shown before checkout, the biggest cause of drop-off',
    ],
    shows: ['Catalog and product card system', 'Instant bag updates', 'Mobile-first grid'],
    stack: ['Shopify', 'Liquid', 'Stripe'],
  },
  {
    id: 'shopify-store',
    category: 'Shopify Store',
    sector: 'Surf & outdoor',
    tracks: ['ecommerce', 'web'],
    preview: 'shopify',
    summary: 'Online Store 2.0 theme with custom sections, metafield filters and a cart that sells the add-on.',
    brief:
      'A surf shop outgrowing a free theme. Wetsuits come in dozens of thickness, zip and size combinations, and customers were bouncing between product pages trying to compare them. The team also wanted to launch seasonal campaigns without calling a developer.',
    approach: [
      'Custom Online Store 2.0 theme built from a clean base, every block a reusable section',
      'Product metafields for thickness, zip style and water temperature, exposed as Search & Discovery filters',
      'Cart drawer with free-shipping progress and one relevant add-on',
      'Scheduled sections so summer and winter campaigns switch over by themselves',
    ],
    shows: ['Shopify theme architecture', 'Metafield-driven filtering', 'Merchant-editable sections', 'Mobile-first PDP'],
    stack: ['Shopify', 'Liquid', 'Online Store 2.0', 'Metafields', 'Search & Discovery'],
  },
  {
    id: 'web-mobile-app',
    category: 'Web + Mobile App',
    sector: 'Grocery delivery',
    tracks: ['app', 'ecommerce', 'web'],
    preview: 'app',
    summary: 'A shared catalog and cart behind a website and an iOS / Android app.',
    brief:
      'A neighbourhood grocer moving from phone orders to online. Regulars order from their phones; office customers from a laptop. Both needed the same basket.',
    approach: [
      'Headless catalog feeding both the website and the app',
      'Category tabs and quantity steppers built for one-handed use',
      'Running basket total always on screen',
    ],
    shows: ['Mobile app UI', 'Quantity steppers and live totals', 'Category browsing'],
    stack: ['React Native', 'Expo', 'Next.js', 'Headless commerce'],
  },
  {
    id: 'ai-virtual-assistant',
    category: 'AI Virtual Assistant',
    sector: 'Real estate · n8n + AI',
    tracks: ['assistant', 'automation', 'web'],
    preview: 'assistant',
    summary: 'An n8n AI assistant on website chat and messaging that knows every listing and books viewings into agents’ calendars.',
    brief:
      'A small agency missing enquiries in the evenings and on weekends — exactly when most buyers browse. They wanted every question answered instantly and accurately from current listings, with a real agent stepping in when it mattered.',
    approach: [
      'One n8n AI Agent workflow behind both the website chat widget and the messaging channel',
      'Tools the assistant can call: search live listings, check agent calendars, book a viewing, create a CRM lead',
      'Guardrails: answers only from the listings sheet and FAQ; pricing negotiation and complaints go to a person',
      'Every conversation logged, with a morning summary sent to the team',
    ],
    shows: ['Conversational UI', 'AI agent with tool calls', 'Human handoff', 'Booking into calendars'],
    stack: ['n8n', 'AI Agent', 'OpenAI / Claude', 'Google Sheets', 'Google Calendar', 'Webhooks'],
  },
  {
    id: 'n8n-automation',
    category: 'n8n Automation',
    sector: 'Healthcare clinic',
    tracks: ['automation', 'crm', 'assistant'],
    preview: 'flow',
    summary: 'Form → enrichment → qualification → booking or nurture, with the team notified.',
    brief:
      'A clinic losing enquiries that arrived after hours. The goal: reply instantly, book qualified patients straight into the calendar, and keep everyone else warm.',
    approach: [
      'Webhook from the site form triggers an n8n workflow',
      'Lead is enriched and checked against booking rules',
      'Qualified leads become GoHighLevel opportunities; the rest join a nurture sequence',
      'Front desk gets a Slack message with everything they need',
    ],
    shows: ['Branching workflow logic', 'Step-by-step execution log', 'Hand-off between n8n and GHL'],
    stack: ['n8n', 'GoHighLevel', 'Slack', 'Webhooks'],
  },
  {
    id: 'crm-web-app',
    category: 'CRM Web App',
    sector: 'Solar installer',
    tracks: ['crm', 'app', 'web'],
    preview: 'crm',
    summary: 'Stages mirror the real job: enquiry, qualified, site survey, signed — with a mobile app for surveyors.',
    brief:
      'An installer whose sales process lived in a spreadsheet and three inboxes. They needed one place to see every job and what it was waiting on.',
    approach: [
      'Stages named after what happens on site, not generic sales jargon',
      'Pipeline value per stage, visible at a glance',
      'One click to move a job forward, with the history kept',
      'Savings calculator on the public site feeds pre-sized leads straight in',
    ],
    shows: ['Kanban pipeline', 'Per-stage value roll-up', 'Stage progression'],
    stack: ['React', 'React Native', 'PostgreSQL', 'GoHighLevel'],
  },
]
