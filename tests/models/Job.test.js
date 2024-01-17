import { sequelize } from '../../src/database/index.js';
import Job from '../../src/models/Job.js';
import Profile from '../../src/models/Profile.js';
import Contract from '../../src/models/Contract.js';

describe('Job Model', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });

        const contractor = await Profile.create({ firstName: 'John', lastName: 'Doe', profession: 'Tester', balance: 100.00, type: 'contractor' });
        const client = await Profile.create({ firstName: 'Jane', lastName: 'Smith', profession: 'Developer', balance: 150.00, type: 'client' });

        const contract = await Contract.create({ terms: 'Test contract terms', status: 'new', ContractorId: contractor.id, ClientId: client.id });

        await Job.create({ description: 'Test job', price: 200.00, paid: false, ContractId: contract.id });
    });

    test('should create a new job', async () => {
        const jobData = {
            description: 'Another test job',
            price: 300.00,
            paid: false,
            ContractId: 1
        };

        const job = await Job.create(jobData);
        expect(job.description).toBe(jobData.description);
        expect(job.price).toBe(jobData.price);
        expect(job.paid).toBe(false);
        expect(job.ContractId).toBeDefined();
    });

    afterAll(async () => {
        await sequelize.close();
    });
});
