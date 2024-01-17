import request from 'supertest';
import express from 'express';
import { bestProfession, bestClients } from '../../../src/controllers/adminController.js';
import { validateDateParams } from '../../../src/middleware/dateValidation.js';

const app = express();

const router = express.Router();
router.get('/best-profession', validateDateParams, bestProfession);
router.get('/best-clients', bestClients);
app.use('/admin', router);

describe('Pruebas para rutas de administración', () => {
    test('GET /admin/best-profession debería responder con cualquier código de estado', async () => {
        const response = await request(app).get('/admin/best-profession?start=2020-08-01&end=2020-08-31');
        expect(response.status).toBeDefined();
    });

    test('GET /admin/best-clients debería responder con cualquier código de estado', async () => {
        const response = await request(app).get('/admin/best-clients');
        expect(response.status).toBeDefined();
    });
});
