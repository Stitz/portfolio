import { design as brightline } from './brightline'
import { design as casaVerde } from './casa-verde'
import { design as fieldwork } from './fieldwork'
import { design as hearthHide } from './hearth-hide'
import { design as mercato } from './mercato'
import { design as saltline } from './saltline'
import type { Design } from './types'

export const designs: Record<string, Design> = {
  'ecommerce-website': hearthHide,
  'shopify-store': saltline,
  'web-mobile-app': mercato,
  'ai-virtual-assistant': casaVerde,
  'n8n-automation': brightline,
  'crm-web-app': fieldwork,
}
