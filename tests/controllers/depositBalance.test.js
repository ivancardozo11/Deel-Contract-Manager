import * as balanceService from '../../src/services/balanceService';
import { depositBalance } from '../../src/controllers/balanceController';

jest.mock('../../src/services/balanceService');

describe('depositBalance Controller', () => {
    let mockReq, mockRes, mockNext;

    beforeEach(() => {
        mockReq = { params: {}, body: {} };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        mockNext = jest.fn();
    });

    test('should return 400 for invalid parameters', async () => {
        mockReq.params.userId = 'invalid';
        mockReq.body.amount = -10;

        await depositBalance(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Invalid request parameters.' });
    });

    test('should return 200 for successful deposit', async () => {
        mockReq.params.userId = '1';
        mockReq.body.amount = 100;
        balanceService.depositToClientBalance.mockResolvedValue({ balance: 500 });

        await depositBalance(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Deposit successful.', balance: 500 });
    });

    test('should handle service errors', async () => {
        mockReq.params.userId = '1';
        mockReq.body.amount = 100;
        balanceService.depositToClientBalance.mockResolvedValue({ error: 'Error occurred' });

        await depositBalance(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Error occurred' });
    });
});
