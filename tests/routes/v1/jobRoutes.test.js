import express from 'express';
import request from 'supertest';
import jobRoutes from '../../../src/routes/v1/jobRoutes.js';

describe('jobRoutes', () => {
    const app = express();
    app.use(express.json());
    app.use('/jobs', jobRoutes);

    const authenticatedUser = {
        profile_id: 1
    };

    test('GET /jobs/unpaid should return 200', async () => {
        const response = await request(app)
            .get('/jobs/unpaid')
            .set('profile_id', authenticatedUser.profile_id);
        expect(response.status).toBe(200);
    });
});
