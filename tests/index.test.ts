import { Connector } from '@/index';
import { describe, expect, it } from 'vitest';

describe('Connector', () => {
    it('abortOperation is a no-op when nothing is running', () => {
        const connector = new Connector({} as never, []);
        expect(() => {
            connector.abortOperation();
        }).not.toThrow();
    });
});
