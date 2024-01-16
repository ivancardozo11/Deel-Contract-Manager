import { Sequelize } from 'sequelize';
import databaseConfig from '../config/databaseConfig.js';

const sequelize = new Sequelize(databaseConfig);

export { sequelize };
