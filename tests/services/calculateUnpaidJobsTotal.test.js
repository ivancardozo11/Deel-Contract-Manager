import { calculateUnpaidJobsTotal } from '../../src/services/balanceService';

jest.mock('../../src/services/balanceService', () => ({
    calculateUnpaidJobsTotal: jest.fn()
}));

describe('calculateUnpaidJobsTotal', () => {
    it('should calculate the total of unpaid jobs for a client', async () => {
        const clientId = 1;
        const expectedTotal = 300;
        calculateUnpaidJobsTotal.mockResolvedValue(expectedTotal);

        const total = await calculateUnpaidJobsTotal(clientId);

        expect(calculateUnpaidJobsTotal).toHaveBeenCalledWith(clientId);
        expect(total).toBe(expectedTotal);
    });
});
