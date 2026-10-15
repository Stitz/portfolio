import type { PreviewKind } from '../../content/projects'
import { AppPreview } from './AppPreview'
import { AssistantPreview } from './AssistantPreview'
import { CrmPreview } from './CrmPreview'
import { FlowPreview } from './FlowPreview'
import { StorePreview } from './StorePreview'

const map: Record<PreviewKind, () => JSX.Element> = {
  store: () => <StorePreview variant="hearth" />,
  shopify: () => <StorePreview variant="saltline" />,
  app: AppPreview,
  flow: FlowPreview,
  crm: CrmPreview,
  assistant: AssistantPreview,
}

export function Preview({ kind }: { kind: PreviewKind }) {
  const C = map[kind]
  return <C />
}
