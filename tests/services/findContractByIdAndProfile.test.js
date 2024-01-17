import { Contract } from '../../src/models/Contract';
import { findContractByIdAndProfile } from '../../src/services/contractService';
import { Op } from 'sequelize';

jest.mock('../../src/models/Contract');

describe('findContractByIdAndProfile', () => {
    test('should find a contract by id and profile', async () => {
        const contractId = 1;
        const profileId = 1;
        const mockContract = { id: contractId, ContractorId: profileId };
        Contract.findOne.mockResolvedValue(mockContract);

        const contract = await findContractByIdAndProfile(contractId, profileId);

        expect(Contract.findOne).toHaveBeenCalledWith({
            where: {
                id: contractId,
                [Op.or]: [
                    { ContractorId: profileId },
                    { ClientId: profileId }
                ]
            }
        });
        expect(contract).toEqual(mockContract);
    });

    test('should return null if contract is not found', async () => {
        Contract.findOne.mockResolvedValue(null);

        const contract = await findContractByIdAndProfile(2, 1);

        expect(contract).toBeNull();
    });
});
