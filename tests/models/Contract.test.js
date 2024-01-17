import { sequelize } from '../../src/database/index.js';
import Contract from '../../src/models/Contract.js';
import Profile from '../../src/models/Profile.js'; // Importa el modelo Profile

describe('Contract Model', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
        await Profile.create({ id: 1, firstName: 'John', lastName: 'Doe', profession: 'Tester', balance: 100.00, type: 'client' });
        await Profile.create({ id: 2, firstName: 'Jane', lastName: 'Doe', profession: 'Developer', balance: 150.00, type: 'contractor' });
    });

    test('should create a new contract', async () => {
        const contractData = {
            terms: 'Test contract terms',
            status: 'new',
            ContractorId: 1,
            ClientId: 2
        };

        const contract = await Contract.create(contractData);
        expect(contract.terms).toBe(contractData.terms);
        expect(contract.status).toBe('new');
        expect(contract.ContractorId).toBe(1);
        expect(contract.ClientId).toBe(2);
    });

    afterAll(async () => {
        await sequelize.close();
    });
});
