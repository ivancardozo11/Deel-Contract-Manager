import { Profile } from '../../src/models/Profile.js';
import { Contract } from '../../src/models/Contract.js';
import { Job } from '../../src/models/Job.js';
import { findJobAndContract, findClientAndContractor, updateBalancesAndPay } from '../../src/utils/paymentUtils.js';

jest.mock('../../src/models/Job.js');
jest.mock('../../src/models/Profile.js');
jest.mock('../../src/models/Contract.js');

describe('Payment Utils', () => {
    describe('findJobAndContract', () => {
        test('findJobAndContract should find job and contract', async () => {
            const jobId = 1;
            Job.findByPk.mockResolvedValue({ id: jobId, paid: false, ContractId: 2 });
            Contract.findByPk.mockResolvedValue({ id: 2, status: 'in_progress' });

            const { job, contract } = await findJobAndContract(jobId);

            expect(Job.findByPk).toHaveBeenCalledWith(jobId, { transaction: undefined });
            expect(Contract.findByPk).toHaveBeenCalledWith(2, { transaction: undefined });
            expect(job).toBeDefined();
            expect(contract).toBeDefined();
        });
    });

    test('findClientAndContractor should find client and contractor', async () => {
        const contract = { ClientId: 1, ContractorId: 2 };
        Profile.findByPk.mockResolvedValueOnce({ id: 1 }).mockResolvedValueOnce({ id: 2 });

        const { client, contractor } = await findClientAndContractor(contract);

        expect(Profile.findByPk).toHaveBeenCalledWith(1, { transaction: undefined });
        expect(Profile.findByPk).toHaveBeenCalledWith(2, { transaction: undefined });
        expect(client).toBeDefined();
        expect(contractor).toBeDefined();
    });

    describe('updateBalancesAndPay', () => {
        test('updateBalancesAndPay should update balances and mark job as paid', async () => {
            const job = { price: 100, paid: false, save: jest.fn() };
            const client = { balance: 200, save: jest.fn() };
            const contractor = { balance: 100, save: jest.fn() };

            await updateBalancesAndPay(job, client, contractor);

            expect(client.balance).toBe(100);
            expect(contractor.balance).toBe(200);
            expect(job.paid).toBe(true);
            expect(job.save).toHaveBeenCalled();
            expect(client.save).toHaveBeenCalled();
            expect(contractor.save).toHaveBeenCalled();
        });
    });
});
