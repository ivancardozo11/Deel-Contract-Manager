import { depositToClientBalance } from '../services/balanceService.js';

export const depositBalance = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId, 10);
        const { amount } = req.body;

        if (isNaN(userId) || amount <= 0) {
            return res.status(400).json({ message: 'Invalid request parameters.' });
        }

        const result = await depositToClientBalance(userId, amount);

        if (result.error) {
            return res.status(400).json({ message: result.error });
        }

        return res.status(200).json({ message: 'Deposit successful.', balance: result.balance });
    } catch (error) {
        console.error('Error in depositBalance:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};
