import { Sequelize } from 'sequelize';
import databaseConfig from '../config/databaseConfig.js';
import { Profile } from '../models/Profile.js';
import { Contract } from '../models/Contract.js';
import { Job } from '../models/Job.js';

const sequelize = new Sequelize(databaseConfig);

Profile.hasMany(Contract, { as: 'Contractor', foreignKey: 'ContractorId' });
Contract.belongsTo(Profile, { as: 'Contractor' });
Profile.hasMany(Contract, { as: 'Client', foreignKey: 'ClientId' });
Contract.belongsTo(Profile, { as: 'Client' });
Contract.hasMany(Job);
Job.belongsTo(Contract);

export { sequelize, Profile, Contract, Job };
