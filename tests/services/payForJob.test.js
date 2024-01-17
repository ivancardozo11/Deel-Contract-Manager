import { payForJob } from '../../src/services/jobService';

jest.mock('../../src/services/jobService', () => ({
    payForJob: jest.fn()
}));

describe('payForJob Service', () => {
    it('should successfully pay for a job', async () => {
        const jobId = 1;
        const profileId = 2;

        payForJob.mockResolvedValue({ success: true });

        const result = await payForJob(jobId, profileId);

        expect(payForJob).toHaveBeenCalledWith(jobId, profileId);
        expect(result).toEqual({ success: true });
    });

    it('should handle errors', async () => {
        const jobId = 1;
        const profileId = 2;
        const errorMessage = 'Error occurred';

        payForJob.mockRejectedValue(new Error(errorMessage));

        try {
            await payForJob(jobId, profileId);
        } catch (error) {
            expect(error.message).toEqual(errorMessage);
        }

        expect(payForJob).toHaveBeenCalledWith(jobId, profileId);
    });
});
