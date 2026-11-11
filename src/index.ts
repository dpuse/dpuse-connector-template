// ── DPUse Framework
import type { ConnectorInterface } from '@dpuse/dpuse-shared';

// ── Connectors ───────────────────────────────────────────────────────────────────────────────────────────────────────

// No action is implemented yet, so 'config.json' lists none and the app offers none. Each action is added as it is
// implemented, following a sibling connector, and listed in 'config.json'.
// eslint-disable-next-line @typescript-eslint/no-extraneous-class -- The engine creates every connector with 'new', so it stays a class.
export class Connector implements ConnectorInterface {}
