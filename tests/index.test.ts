// ── External Dependencies & Registrations
import { describe, expect, it } from 'vitest';

// ── Local Framework
import config from '~/config.json';
import { Connector } from '@/index';
import { name as packageName } from '~/package.json';

// ── Tests ────────────────────────────────────────────────────────────────────────────────────────────────────────────

// The app reads 'config.json' to decide which actions it can ask the connector for.
describe('config', () => {
    it('lists no actions, because the connector implements none yet', () => {
        const actionNames = Object.getOwnPropertyNames(Connector.prototype).filter((name) => name !== 'constructor');

        expect(actionNames).toEqual([]);
        expect(config.actionNames).toEqual([]);
    });

    it('is identified by the package name, without its scope', () => {
        expect(config.id).toBe(packageName.replace('@dpuse/', ''));
    });
});
