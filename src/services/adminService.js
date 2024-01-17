import { Profile } from '../models/Profile.js';
import { Contract } from '../models/Contract.js';
import { Job } from '../models/Job.js';
import { Op } from 'sequelize';
import { calculateProfessionEarnings, findHighestEarningProfession } from '../utils/professionEarningsUtil.js';
import { calculateClientPayments, sortAndLimitClients } from '../utils/clientEarningsUtil.js';

async function getBestProfession (start, end) {
    try {
        const jobs = await Job.findAll({
            where: {
                paid: true,
                paymentDate: { [Op.between]: [new Date(start), new Date(end)] }
            },
            attributes: ['price', 'ContractId']
        });

        const contractIds = jobs.map(job => job.ContractId);
        const contracts = await Contract.findAll({
            where: { id: { [Op.in]: contractIds } },
            attributes: ['id', 'ContractorId']
        });

        const contractorIds = contracts.map(contract => contract.ContractorId);
        const profiles = await Profile.findAll({
            where: { id: { [Op.in]: contractorIds } },
            attributes: ['id', 'profession']
        });

        const professionEarnings = calculateProfessionEarnings(jobs, contracts, profiles);
        const bestProfession = findHighestEarningProfession(professionEarnings);

        return bestProfession;
    } catch (error) {
        console.error('Error in getBestProfession:', error);
        throw error;
    }
}

async function getBestClients (start, end, limit) {
    const jobs = await Job.findAll({
        where: { paid: true, paymentDate: { [Op.between]: [new Date(start), new Date(end)] } },
        attributes: ['price', 'ContractId']
    });

    const contractIds = jobs.map(job => job.ContractId);
    const contracts = await Contract.findAll({
        where: { id: { [Op.in]: contractIds } },
        attributes: ['id', 'ClientId']
    });

    const clientIds = contracts.map(contract => contract.ClientId);
    const clients = await Profile.findAll({
        where: { id: { [Op.in]: clientIds }, type: 'client' },
        attributes: ['id', 'firstName', 'lastName']
    });

    const clientPayments = calculateClientPayments(jobs, contracts, clients);
    return sortAndLimitClients(clientPayments, limit);
}

export { getBestProfession, getBestClients };
