import { bestClients } from '../../src/controllers/adminController.js';
import * as adminService from '../../src/services/adminService.js';

jest.mock('../../src/services/adminService', () => ({
    getBestClients: jest.fn()
}));

describe('bestClients Controller', () => {
    it('should return the best clients', async () => {
        const req = { query: { start: '2022-01-01', end: '2022-01-31', limit: 2 } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        adminService.getBestClients.mockResolvedValue([{ clientId: 1, totalPaid: 500 }]);

        await bestClients(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ bestClients: [{ clientId: 1, totalPaid: 500 }] });
    });
});
