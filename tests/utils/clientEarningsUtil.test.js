import { calculateClientPayments } from '../../src/utils/clientEarningsUtil.js';

describe('calculateClientPayments', () => {
    test('should correctly calculate client payments', () => {
        const jobs = [
            { price: '100.00', ContractId: 1 },
            { price: '150.00', ContractId: 2 },
            { price: '200.00', ContractId: 1 }
        ];

        const contracts = [
            { id: 1, ClientId: 1 },
            { id: 2, ClientId: 2 }
        ];

        const clients = [
            { id: 1, firstName: 'John', lastName: 'Doe' },
            { id: 2, firstName: 'Jane', lastName: 'Smith' }
        ];

        const expectedClientPayments = {
            'John Doe': { clientId: 1, name: 'John Doe', paid: 300.00 },
            'Jane Smith': { clientId: 2, name: 'Jane Smith', paid: 150.00 }
        };

        const clientPayments = calculateClientPayments(jobs, contracts, clients);
        expect(clientPayments).toEqual(expectedClientPayments);
    });
});
