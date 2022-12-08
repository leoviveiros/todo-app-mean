const BaseEntity = require('./base.entity.js');

describe('BaseEntity Tests', () => {
    it('should generate an ID', () => {
        const entity = new BaseEntity();
        const id = entity.generateID();

        expect(id).toBeDefined();
        expect(id.length).toBeGreaterThan(8);
    });
});