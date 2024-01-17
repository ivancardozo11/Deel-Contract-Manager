import { calculateEarningsByProfession } from '../../src/utils/adminUtils.js';

describe('calculateEarningsByProfession', () => {
    test('should correctly calculate earnings by profession', () => {
        const jobs = [
            { price: '100.00', Contract: { Contractor: { profession: 'Programmer' } } },
            { price: '200.00', Contract: { Contractor: { profession: 'Designer' } } },
            { price: '150.00', Contract: { Contractor: { profession: 'Programmer' } } }
        ];

        const expectedEarnings = {
            Programmer: 250.00,
            Designer: 200.00
        };

        const earnings = calculateEarningsByProfession(jobs);
        expect(earnings).toEqual(expectedEarnings);
    });
});
