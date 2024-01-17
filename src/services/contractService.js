import { Contract } from '../models/Contract.js';
import { Op } from 'sequelize';

const findContractByIdAndProfile = async (contractId, profileId) => {
    return await Contract.findOne({
        where: {
            id: contractId,
            [Op.or]: [
                { ContractorId: profileId },
                { ClientId: profileId }
            ]
        }
    });
};

const getAllActiveContracts = async () => {
    const contracts = await Contract.findAll({
        where: {
            status: {
                [Op.ne]: 'terminated'
            }
        }
    });

    return contracts;
};

export { findContractByIdAndProfile, getAllActiveContracts };
