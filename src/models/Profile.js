import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/index.js';

export class Profile extends Model {}

Profile.init({
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profession: {
        type: DataTypes.STRING,
        allowNull: false
    },
    balance: {
        type: DataTypes.DECIMAL(12, 2)
    },
    type: {
        type: DataTypes.ENUM('client', 'contractor')
    }
}, {
    sequelize,
    modelName: 'Profile'
});

export default Profile;
