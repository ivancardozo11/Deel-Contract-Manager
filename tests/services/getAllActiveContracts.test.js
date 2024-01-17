import { Contract } from '../../src/models/Contract';
import { getAllActiveContracts } from '../../src/services/contractService';
import { Op } from 'sequelize';

jest.mock('../../src/models/Contract');

describe('getAllActiveContracts', () => {
    test('should return all active contracts', async () => {
        const mockContracts = [{ id: 1, status: 'in_progress' }, { id: 2, status: 'new' }];
        Contract.findAll.mockResolvedValue(mockContracts);

        const contracts = await getAllActiveContracts();

        expect(Contract.findAll).toHaveBeenCalledWith({
            where: {
                status: { [Op.ne]: 'terminated' }
            }
        });
        expect(contracts).toEqual(mockContracts);
    });

    test('should return empty array if no active contracts', async () => {
        Contract.findAll.mockResolvedValue([]);

        const contracts = await getAllActiveContracts();

        expect(contracts).toEqual([]);
    });
});
