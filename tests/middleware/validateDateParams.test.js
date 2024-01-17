import { validateDateParams } from '../../src/middleware/dateValidation.js';

describe('validateDateParams Middleware', () => {
    let mockReq, mockRes, mockNext;

    beforeEach(() => {
        mockReq = { query: {} };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        mockNext = jest.fn();
    });

    test('should call next() when valid date parameters are provided', () => {
        mockReq.query = { start: '2022-01-01', end: '2022-01-31' };

        validateDateParams(mockReq, mockRes, mockNext);

        expect(mockNext).toHaveBeenCalled();
    });

    test('should send 400 if invalid date format is provided', () => {
        mockReq.query = { start: '2022/01/01', end: '2022-01-31' };

        validateDateParams(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Invalid date format. Use YYYY-MM-DD.' });
    });

    test('should send 400 if date is invalid', () => {
        mockReq.query = { start: '2022-01-32', end: '2022-01-31' };

        validateDateParams(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Invalid date format. Use YYYY-MM-DD.' });
    });
});
