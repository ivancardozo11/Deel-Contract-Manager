import { getProfile } from '../../src/middleware/getProfile.js';
import { Profile } from '../../src/models/Profile.js';

jest.mock('../../src/models/Profile.js', () => ({
    Profile: {
        findOne: jest.fn()
    }
}));

describe('getProfile Middleware', () => {
    let mockReq, mockRes, mockNext;

    beforeEach(() => {
        mockReq = { get: jest.fn() };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        mockNext = jest.fn();
    });

    test('should send 400 if no profile ID provided', async () => {
        mockReq.get.mockReturnValueOnce(null);

        await getProfile(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'No profile ID provided' });
    });

    test('should send 404 if profile not found', async () => {
        mockReq.get.mockReturnValueOnce('1');
        Profile.findOne.mockResolvedValueOnce(null);

        await getProfile(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'Profile not found' });
    });

    test('should call next() with a profile in req object', async () => {
        const profileData = { id: '1', name: 'John Doe' };
        mockReq.get.mockReturnValueOnce('1');
        Profile.findOne.mockResolvedValueOnce(profileData);

        await getProfile(mockReq, mockRes, mockNext);

        expect(mockReq.profile).toEqual(profileData);
        expect(mockNext).toHaveBeenCalled();
    });
});
