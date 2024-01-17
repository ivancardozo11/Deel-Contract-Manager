import { getActiveContracts } from '../../src/controllers/contractController';
import * as contractService from '../../src/services/contractService';

jest.mock('../../src/services/contractService');

describe('getActiveContracts Controller', () => {
    let mockReq, mockRes, mockNext;

    beforeEach(() => {
        mockReq = {}; // Simula la solicitud
        mockRes = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        mockNext = jest.fn(); // No es necesario para este controlador, pero se incluye por completitud
    });

    test('should return active contracts', async () => {
        const activeContracts = [{ id: 1, terms: 'Contract 1' }, { id: 2, terms: 'Contract 2' }];
        contractService.getAllActiveContracts.mockResolvedValue(activeContracts);

        await getActiveContracts(mockReq, mockRes, mockNext);

        expect(contractService.getAllActiveContracts).toHaveBeenCalled();
        expect(mockRes.json).toHaveBeenCalledWith(activeContracts);
    });

    test('should handle errors', async () => {
        const errorMessage = 'Internal server error';
        contractService.getAllActiveContracts.mockRejectedValue(new Error(errorMessage));

        await getActiveContracts(mockReq, mockRes, mockNext);

        expect(contractService.getAllActiveContracts).toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({ message: errorMessage });
    });
});
