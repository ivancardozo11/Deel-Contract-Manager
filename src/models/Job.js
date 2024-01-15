import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/index.js';
import { Contract } from './Contract.js';

export class Job extends Model {}

Job.init({
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false
    },
    paid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    paymentDate: {
        type: DataTypes.DATE
    },
    ContractId: {
        type: DataTypes.INTEGER,
        references: {
            model: Contract,
            key: 'id'
        }
    }
}, { sequelize, modelName: 'Job' });

export default Job;
