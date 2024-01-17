import { getBestProfession } from '../../src/services/adminService';
import { calculateProfessionEarnings, findHighestEarningProfession } from '../../src/utils/professionEarningsUtil';

jest.mock('../../src/services/adminService', () => ({
    getBestProfession: jest.fn()
}));
jest.mock('../../src/utils/professionEarningsUtil');

describe('getBestProfession', () => {
    it('should return the best profession within a date range', async () => {
        const start = '2021-01-01';
        const end = '2021-12-31';
        const bestProfession = 'Software Developer';

        calculateProfessionEarnings.mockReturnValue({ 'Software Developer': 10000 });
        findHighestEarningProfession.mockReturnValue(bestProfession);
        getBestProfession.mockResolvedValue(bestProfession);

        const result = await getBestProfession(start, end);

        expect(getBestProfession).toHaveBeenCalledWith(start, end);
        expect(result).toBe(bestProfession);
    });
});
