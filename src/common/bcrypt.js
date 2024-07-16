import logger from "../logs/logger.js";
import bcrypt from "bcrypt";
import 'dotenv/config.js';

export const encrypt = async (text) => {
    try {
        const saltRounds = +process.env.SALT_ROUNDS;
        return await bcrypt.hash(text, saltRounds);
    } catch (error) {
        logger.error(error.message);
        throw new Error('Error al encriptar');
    }
};

export const compare = async (text, hash) => {
    try {
        return await bcrypt.compare(text, hash);
    } catch (error) {
        logger.error(error.message);
        throw new Error('Error al encriptar');
    }
};