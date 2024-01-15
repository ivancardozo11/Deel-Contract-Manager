import { Model } from 'sequelize';
import sequelize from '../database/index.js';

export class Profile extends Model {}

Profile.init({
    firstName: {
        type: sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: sequelize.STRING,
        allowNull: false
    },
    profession: {
        type: sequelize.STRING,
        allowNull: false
    },
    balance: {
        type: sequelize.DECIMAL(12, 2)
    },
    type: {
        type: sequelize.ENUM('client', 'contractor')
    }
}, {
    sequelize,
    modelName: 'Profile'
});

export default Profile;
