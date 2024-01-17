import * as jobService from '../../src/services/jobService';
import { payJob } from '../../src/controllers/jobController';

jest.mock('../../src/services/jobService');

describe('payJob Controller', () => {
    let mockReq, mockRes, mockNext;

    beforeEach(() => {
        mockReq = { profile: { id: 1 } };
        mockRes = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        mockNext = jest.fn();
    });

    test('should pay for the job successfully', async () => {
        mockReq.params = { job_id: '1' };
        jobService.payForJob.mockResolvedValue({});

        await payJob(mockReq, mockRes);

        expect(jobService.payForJob).toHaveBeenCalledWith(1, 1);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Payment successful.' });
    });

    test('should return error for invalid job ID', async () => {
        mockReq.params = { job_id: 'invalid' };

        await payJob(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Invalid job ID.' });
    });

    test('should handle service errors', async () => {
        mockReq.params = { job_id: '1' };
        jobService.payForJob.mockResolvedValue({ error: 'Error occurred' });

        await payJob(mockReq, mockRes);

        expect(jobService.payForJob).toHaveBeenCalledWith(1, 1);
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Error occurred' });
    });
});
