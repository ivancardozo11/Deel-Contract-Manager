import { bestProfession } from '../../src/controllers/adminController';
import * as adminService from '../../src/services/adminService';

jest.mock('../../src/services/adminService', () => ({
    getBestProfession: jest.fn()
}));

describe('bestProfession Controller', () => {
    it('should return the best profession', async () => {
        const req = { query: { start: '2022-01-01', end: '2022-01-31' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        adminService.getBestProfession.mockResolvedValue('Software Developer');

        await bestProfession(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ bestProfession: 'Software Developer' });
    });
});
