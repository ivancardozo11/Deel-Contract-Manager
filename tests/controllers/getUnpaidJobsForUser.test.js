/* eslint-disable no-unused-vars */
import * as jobService from '../../src/services/jobService';
import { getUnpaidJobs } from '../../src/controllers/jobController';

jest.mock('../../src/services/jobService');

describe('getUnpaidJobs Controller', () => {
    let mockReq, mockRes, mockNext;

    beforeEach(() => {
        mockReq = { profile: { id: 1 } };
        mockRes = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        mockNext = jest.fn();
    });

    test('should return unpaid jobs', async () => {
        const unpaidJobs = [{ id: 1, description: 'Unpaid Job' }];
        jobService.getUnpaidJobsForUser.mockResolvedValue(unpaidJobs);

        await getUnpaidJobs(mockReq, mockRes);

        expect(jobService.getUnpaidJobsForUser).toHaveBeenCalledWith(1);
        expect(mockRes.json).toHaveBeenCalledWith(unpaidJobs);
    });

    test('should return message if no unpaid jobs found', async () => {
        jobService.getUnpaidJobsForUser.mockResolvedValue([]);

        await getUnpaidJobs(mockReq, mockRes);

        expect(jobService.getUnpaidJobsForUser).toHaveBeenCalledWith(1);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'This user has no outstanding unpaid jobs.' });
    });
});
