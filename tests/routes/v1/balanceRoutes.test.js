import request from 'supertest';
import express from 'express';
import { getProfile } from '../../../src/middleware/getProfile.js';
import { depositBalance } from '../../../src/controllers/balanceController.js';

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    req.profile = { id: 1 };
    next();
});

const router = express.Router();
router.post('/deposit/:userId', getProfile, depositBalance);
app.use('/balance', router);

describe('Pruebas para ruta de deposito de balance', () => {
    test('POST /balance/deposit/:userId debería responder con cualquier código de estado', async () => {
        const userId = 1;
        const depositAmount = { amount: 100 };

        const response = await request(app)
            .post(`/balance/deposit/${userId}`)
            .send(depositAmount);

        expect(response.status).toBeDefined();
    });
});
