import { sequelize } from '../../src/database/index.js';
import Profile from '../../src/models/Profile.js';

describe('Profile Model', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    test('should create a new profile', async () => {
        const profileData = {
            firstName: 'John',
            lastName: 'Doe',
            profession: 'Software Engineer',
            balance: 1000.00,
            type: 'client'
        };

        const profile = await Profile.create(profileData);
        expect(profile.firstName).toBe(profileData.firstName);
        expect(profile.lastName).toBe(profileData.lastName);
    });
});
