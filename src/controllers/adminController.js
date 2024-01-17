import { getBestProfession, getBestClients } from '../services/adminService.js';

export const bestProfession = async (req, res) => {
    try {
        const { start, end } = req.query;
        const profession = await getBestProfession(start, end);

        if (!profession) {
            return res.status(404).json({ message: 'No profession found.' });
        }

        return res.status(200).json({ bestProfession: profession });
    } catch (error) {
        console.error('Error in bestProfession:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

export const bestClients = async (req, res) => {
    try {
        const { start, end, limit = 2 } = req.query; // Limit default a 2
        const clients = await getBestClients(start, end, limit);

        return res.status(200).json({ bestClients: clients });
    } catch (error) {
        console.error('Error in bestClients:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};
