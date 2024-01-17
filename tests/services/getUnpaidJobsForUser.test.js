import * as jobService from '../../src/services/jobService';

jest.mock('../../src/services/jobService', () => ({
    getUnpaidJobsForUser: jest.fn(),
    payForJob: jest.fn()
}));

describe('Job Service', () => {
    it('should return unpaid jobs for a given user', async () => {
        const mockUnpaidJobs = [{ id: 1, ContractId: 1, paid: false }];
        jobService.getUnpaidJobsForUser.mockResolvedValue(mockUnpaidJobs);

        const profileId = 1;
        const unpaidJobs = await jobService.getUnpaidJobsForUser(profileId);

        expect(jobService.getUnpaidJobsForUser).toHaveBeenCalledWith(profileId);
        expect(unpaidJobs).toEqual(mockUnpaidJobs);
    });
});
