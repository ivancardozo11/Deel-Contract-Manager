import { Job } from '../models/Job.js';
import { Contract } from '../models/Contract.js';
import { Op } from 'sequelize';
import { sequelize } from '../database/index.js';
import { findJobAndContract, findClientAndContractor, updateBalancesAndPay } from '../utils/paymentUtils.js';

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

const payForJob = async (jobId, profileId) => {
    const transaction = await sequelize.transaction();

    try {
        const { job, contract } = await findJobAndContract(jobId, transaction);
        if (contract.ClientId !== profileId) throw new Error('Not authorized to pay for this job.');

        const { client, contractor } = await findClientAndContractor(contract, transaction);
        await updateBalancesAndPay(job, client, contractor, transaction);

        await transaction.commit();
        return { success: true };
    } catch (error) {
        await transaction.rollback();
        return { error: error.message };
    }
};

export { getUnpaidJobsForUser, payForJob };
