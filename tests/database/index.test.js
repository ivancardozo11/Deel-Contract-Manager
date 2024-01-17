import { sequelize } from '../../src/database/index.js';

describe('Database Connection', () => {
    test('should connect to the database successfully', async () => {
        await expect(sequelize.authenticate()).resolves.toBeUndefined();
    });

    afterAll(async () => {
        await sequelize.close();
    });
});
