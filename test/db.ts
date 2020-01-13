import leveldown from 'leveldown'
import levelup from 'levelup'
import { LevelUp } from 'levelup'

describe('leveldb', function () {
    let db: LevelUp;

    beforeAll(function (done) {
        db = levelup(leveldown('.db'), {}, done);
    });
    afterAll(function (done) {
        db.close(done);
    });
    it('put/get', async function () {
        await db.put('k1', 'v1');
        const v: Buffer = await db.get('k1');
        expect(v.toString()).toBe('v1');
    });
    it('batch', async function () {
        await db.batch()
            .put('k2', 'v2')
            .put('k3', 3)
            .write();
        {
            const v: Buffer = await db.get('k2');
            expect(v.toString()).toBe('v2');
        }
        {
            const v: Buffer = await db.get('k3');
            expect(v.toString()).toBe('3');
        }
    });
});