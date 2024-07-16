import app from './app.js';
import 'dotenv/config';
import logger from './logs/logger.js';
import { sequelize } from './database/database.js';


async function main(){
    //initialize sequelize
    await sequelize.sync({force: false});

    const port = process.env.PORT;
    app.listen(port);
    //console.log(`Servidor corriendo en el puerto: ${port}`);
    logger.info(`Servidor corriendo en el puerto: ${port}`);
}

main();