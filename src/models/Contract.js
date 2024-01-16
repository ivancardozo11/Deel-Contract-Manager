import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/index.js';
import Profile from './Profile.js';

export class Contract extends Model {}

Contract.init({
    terms: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('new', 'in_progress', 'terminated'),
        allowNull: false
    },
    ContractorId: {
        type: DataTypes.INTEGER,
        references: {
            model: Profile,
            key: 'id'
        }
    },
    ClientId: {
        type: DataTypes.INTEGER,
        references: {
            model: Profile,
            key: 'id'
        }
    }
}, { sequelize, modelName: 'Contract' });

export default Contract;
