import { Contract } from '../models/Contract.js';
import { Job } from '../models/Job.js';
import { Op } from 'sequelize';

const getUnpaidJobsForUser = async (profileId) => {
    try {
        const activeContracts = await Contract.findAll({
            where: {
                [Op.or]: [
                    { ContractorId: profileId },
                    { ClientId: profileId }
                ],
                status: 'in_progress'
            },
            attributes: ['id']
        });

        const activeContractIds = activeContracts.map(contract => contract.id);

        const unpaidJobs = await Job.findAll({
            where: {
                ContractId: {
                    [Op.in]: activeContractIds
                },
                paid: false
            }
        });

        return unpaidJobs;
    } catch (error) {
        console.error('Error in getUnpaidJobsForUser:', error);
        throw new Error(error.message);
    }
};
const getAllUnpaidJobsForUser = async (profileId) => {
    try {
        const activeContracts = await Contract.findAll({
            where: {
                [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
                status: 'in_progress'
            },
            attributes: ['id']
        });

        const activeContractIds = activeContracts.map(contract => contract.id);

        const unpaidJobs = await Job.findAll({
            where: {
                ContractId: { [Op.in]: activeContractIds },
                paid: false
            }
        });

        return unpaidJobs;
    } catch (error) {
        console.error('Error in getUnpaidJobsForActiveContracts:', error);
        throw new Error(error.message);
    }
};

export { getUnpaidJobsForUser, getAllUnpaidJobsForUser };
