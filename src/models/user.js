import { DataTypes } from "sequelize";
import { Status } from "../constants/index.js";
import { sequelize } from "../database/database.js";
import { Task } from "./task.js";
import { encrypt } from "../common/bcrypt.js";

import logger from "../logs/logger.js";

export const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            notNull: {
                msg: 'The user name is not null',
            },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull: {
                msg: 'The password is not null',
            },
        }, 
    },

    status: {
        type: DataTypes.STRING,
        defaultValue: Status.ACTIVE,
        validate:{
            isIn:{
                args: [[Status.ACTIVE, Status.INACTIVE]],
                msg: 'The status must be Active or Inactive',
            },
        },
    },

});

//Relacion automatica
User.hasMany(Task);
Task.belongsTo(User);

User.beforeCreate(async (user) => {
    try {
        user.password = await encrypt(user.password)
    } catch (error) {
        logger.error(error.message);
        throw new Error('Error al encriptar la contraseña');
    }
});

User.beforeUpdate(async (user) => {
    try {
        user.password = await encrypt(user.password)
    } catch (error) {
        logger.error(error.message);
        throw new Error('Error al encriptar la contraseña');
    }
});

//Relacion manuak
/*
User.hasMany(Task, {
    foreignKey: 'user_id',
    sourceKey: 'id',
});

Task.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: 'id',
});
*/