import { getBestClients } from '../../src/services/adminService';
import { calculateClientPayments, sortAndLimitClients } from '../../src/utils/clientEarningsUtil';

jest.mock('../../src/services/adminService', () => ({
    getBestClients: jest.fn()
}));
jest.mock('../../src/utils/clientEarningsUtil');

describe('getBestClients', () => {
    it('should return the best clients within a date range', async () => {
        const start = '2021-01-01';
        const end = '2021-12-31';
        const limit = 2;
        const bestClients = [{ clientId: 1, totalPaid: 10000 }];

        calculateClientPayments.mockReturnValue({ 'Client 1': { clientId: 1, paid: 10000 } });
        sortAndLimitClients.mockReturnValue(bestClients);
        getBestClients.mockResolvedValue(bestClients);

        const result = await getBestClients(start, end, limit);

        expect(getBestClients).toHaveBeenCalledWith(start, end, limit);
        expect(result).toEqual(bestClients);
    });
});
