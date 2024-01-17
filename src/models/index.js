import { Profile } from './Profile.js';
import { Contract } from './Contract.js';
import { Job } from './Job.js';

Profile.hasMany(Contract, { foreignKey: 'ContractorId' });
Profile.hasMany(Contract, { foreignKey: 'ClientId' });
Contract.belongsTo(Profile, { as: 'Contractor', foreignKey: 'ContractorId' });
Contract.belongsTo(Profile, { as: 'Client', foreignKey: 'ClientId' });
Contract.hasMany(Job, { as: 'Jobs', foreignKey: 'ContractId' });
Job.belongsTo(Contract, { as: 'Contract', foreignKey: 'ContractId' });

export { Profile, Contract, Job };
