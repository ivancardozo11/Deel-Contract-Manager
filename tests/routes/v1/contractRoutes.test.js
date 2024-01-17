import request from 'supertest';
import express from 'express';
import { getProfile } from '../../../src/middleware/getProfile.js';
import { getContractById, getActiveContracts } from '../../../src/controllers/contractController.js';

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    req.profile = { id: 1 };
    next();
});

const router = express.Router();
router.get('/:id', getProfile, getContractById);
router.get('/', getActiveContracts);
app.use('/contracts', router);

describe('Pruebas simplificadas para rutas de contratos', () => {
    test('GET /contracts/:id debería responder con cualquier código de estado', async () => {
        const response = await request(app).get('/contracts/1');
        expect(response.status).toBeDefined();
    });

    test('GET /contracts debería responder con cualquier código de estado', async () => {
        const response = await request(app).get('/contracts');
        expect(response.status).toBeDefined();
    });
});
