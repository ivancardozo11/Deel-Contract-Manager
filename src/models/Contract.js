import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/index.js';

export class Contract extends Model {}

Contract.init({
    terms: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('new', 'in_progress', 'terminated'),
        allowNull: false
    }
}, { sequelize, modelName: 'Contract' });

export default Contract;
