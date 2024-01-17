import { findHighestEarningProfession } from '../../src/utils/adminUtils.js';

describe('findHighestEarningProfession', () => {
    test('should correctly identify the highest earning profession', () => {
        const earningsByProfession = {
            Programmer: 250.00,
            Designer: 300.00,
            Manager: 150.00
        };

        const expectedProfession = 'Designer';
        const highestEarningProfession = findHighestEarningProfession(earningsByProfession);

        expect(highestEarningProfession).toBe(expectedProfession);
    });

    test('should return null if no professions are provided', () => {
        const earningsByProfession = {};
        const highestEarningProfession = findHighestEarningProfession(earningsByProfession);

        expect(highestEarningProfession).toBeNull();
    });
});
