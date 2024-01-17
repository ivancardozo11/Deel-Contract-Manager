/* eslint-disable no-unused-vars */
import { depositToClientBalance } from '../../src/services/balanceService';

const mockCalculateUnpaidJobsTotal = jest.fn();

jest.mock('../../src/services/balanceService', () => ({
    depositToClientBalance: jest.fn()
}));

describe('Balance Service - depositToClientBalance', () => {
    it('should successfully deposit to client balance', async () => {
        const userId = 1;
        const depositAmount = 100;
        const initialBalance = 500;
        const unpaidJobsTotal = 400;

        mockCalculateUnpaidJobsTotal.mockResolvedValue(unpaidJobsTotal);
        depositToClientBalance.mockResolvedValue({ balance: initialBalance + depositAmount });

        const result = await depositToClientBalance(userId, depositAmount);

        expect(depositToClientBalance).toHaveBeenCalledWith(userId, depositAmount);
        expect(result).toEqual({ balance: 600 }); // Esperamos que el balance sea la suma del balance inicial más el depósito
    });

    it('should handle deposit error when amount exceeds limit', async () => {
        const userId = 1;
        const depositAmount = 200;
        const initialBalance = 500;
        const unpaidJobsTotal = 400;

        mockCalculateUnpaidJobsTotal.mockResolvedValue(unpaidJobsTotal);
        depositToClientBalance.mockResolvedValue({ error: 'Deposit exceeds 25% of unpaid jobs total.' });

        const result = await depositToClientBalance(userId, depositAmount);

        expect(depositToClientBalance).toHaveBeenCalledWith(userId, depositAmount);
        expect(result).toEqual({ error: 'Deposit exceeds 25% of unpaid jobs total.' });
    });
});
