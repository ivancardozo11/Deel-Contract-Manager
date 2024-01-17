import { sortAndLimitClients } from '../../src/utils/clientEarningsUtil.js';

describe('sortAndLimitClients', () => {
    test('should correctly sort and limit client payments', () => {
        const clientPayments = {
            'John Doe': { clientId: 1, name: 'John Doe', paid: 300.00 },
            'Jane Smith': { clientId: 2, name: 'Jane Smith', paid: 150.00 },
            'Alice Johnson': { clientId: 3, name: 'Alice Johnson', paid: 250.00 }
        };

        const limit = 2;
        const expectedSortedClients = [
            { clientId: 1, name: 'John Doe', paid: 300.00 },
            { clientId: 3, name: 'Alice Johnson', paid: 250.00 }
        ];

        const sortedClients = sortAndLimitClients(clientPayments, limit);
        expect(sortedClients).toEqual(expectedSortedClients);
    });
});
