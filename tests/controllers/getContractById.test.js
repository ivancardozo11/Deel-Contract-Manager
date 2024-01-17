/* eslint-disable no-unused-vars */
import * as contractService from '../../src/services/contractService';
import { getContractById } from '../../src/controllers/contractController';

jest.mock('../../src/services/contractService');

describe('getContractById Controller', () => {
    let mockReq, mockRes, mockNext;

    beforeEach(() => {
        mockReq = { params: {}, profile: { id: 1 } };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        mockNext = jest.fn();
    });

    test('should return the contract if found', async () => {
        const contract = { id: 1, terms: 'Sample Contract' };
        contractService.findContractByIdAndProfile.mockResolvedValue(contract);
        mockReq.params.id = 1;

        await getContractById(mockReq, mockRes);

        expect(mockRes.json).toHaveBeenCalledWith(contract);
    });

    test('should return 404 if contract not found', async () => {
        contractService.findContractByIdAndProfile.mockResolvedValue(null);
        mockReq.params.id = 1;

        await getContractById(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Contract not found or access denied' });
    });
});
