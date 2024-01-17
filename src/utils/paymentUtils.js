import { Job } from '../models/Job.js';
import { Contract } from '../models/Contract.js';
import { Profile } from '../models/Profile.js';

const findJobAndContract = async (jobId, transaction) => {
    const job = await Job.findByPk(jobId, { transaction });
    if (!job || job.paid) throw new Error('Job not found or already paid.');

    const contract = await Contract.findByPk(job.ContractId, { transaction });
    if (!contract || contract.status !== 'in_progress') throw new Error('Contract not found or not active.');

    return { job, contract };
};

const findClientAndContractor = async (contract, transaction) => {
    const client = await Profile.findByPk(contract.ClientId, { transaction });
    const contractor = await Profile.findByPk(contract.ContractorId, { transaction });

    return { client, contractor };
};

const updateBalancesAndPay = async (job, client, contractor, transaction) => {
    if (client.balance < job.price) throw new Error('Insufficient balance.');

    client.balance -= job.price;
    contractor.balance += job.price;
    job.paid = true;
    job.paymentDate = new Date();

    await client.save({ transaction });
    await contractor.save({ transaction });
    await job.save({ transaction });
};

export { findJobAndContract, findClientAndContractor, updateBalancesAndPay };
