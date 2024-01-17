import { Profile } from '../models/Profile.js';
import { Contract } from '../models/Contract.js';
import { Job } from '../models/Job.js';
import { Op } from 'sequelize';

export const depositToClientBalance = async (userId, amount) => {
    try {
        const client = await Profile.findByPk(userId);
        if (!client || client.type !== 'client') {
            return { error: 'Client not found or invalid.' };
        }

        const unpaidJobsTotal = await calculateUnpaidJobsTotal(client.id);
        if (amount > unpaidJobsTotal * 0.25) {
            return { error: 'Deposit exceeds 25% of unpaid jobs total.' };
        }

        client.balance += amount;
        await client.save();

        return { balance: client.balance };
    } catch (error) {
        console.error('Error in depositToClientBalance:', error);
        return { error: 'Error processing deposit.' };
    }
};

const calculateUnpaidJobsTotal = async (clientId) => {
    const activeContracts = await Contract.findAll({
        where: { ClientId: clientId, status: 'in_progress' },
        attributes: ['id']
    });
    const activeContractIds = activeContracts.map(contract => contract.id);

    const unpaidJobs = await Job.findAll({
        where: {
            ContractId: { [Op.in]: activeContractIds },
            paid: false
        }
    });

    return unpaidJobs.reduce((total, job) => total + job.price, 0);
};
