import { findContractByIdAndProfile, getAllActiveContracts } from '../services/contractService.js';

const getContractById = async (req, res) => {
    try {
        const profileId = req.profile.id;
        const contractId = req.params.id;

        const contract = await findContractByIdAndProfile(contractId, profileId);

        if (!contract) {
            return res.status(404).json({ message: 'Contract not found or access denied' });
        }

        return res.json(contract);
    } catch (error) {
        console.error('Error in getContractById:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getActiveContracts = async (req, res) => {
    try {
        const contracts = await getAllActiveContracts();
        return res.json(contracts);
    } catch (error) {
        console.error('Error in getActiveContracts:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export { getContractById, getActiveContracts };
