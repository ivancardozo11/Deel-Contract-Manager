import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/index.js';

export class Profile extends Model {}

Profile.init(
    {
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      profession: {
        type: Sequelize.STRING,
        allowNull: false
      },
      balance:{
        type:Sequelize.DECIMAL(12,2)
      },
      type: {
        type: Sequelize.ENUM('client', 'contractor')
      }
    },
    {
      sequelize,
      modelName: 'Profile'
    }
  );

export default Profile;