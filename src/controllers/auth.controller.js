import { compare } from "../common/bcrypt.js";
import logger from "../logs/logger.js";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import { Status } from "../constants/index.js";

async function login(req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({
                where: { username, status:Status.ACTIVE },
            });

        if (!user) {
            return res.status(404).json({
                message: 'User not found' 
            });
        }

        if(!(await compare(password, user.password))) {
            res.status(403).json({ 
                message: 'User not authorized'
            });
        }

        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {
            expiresIn: eval(process.env.JWT_EXPIRES_TIME),
        } );

        res.json({ token});

    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ 
            message: error.message
        });
    }
}

export default { login };