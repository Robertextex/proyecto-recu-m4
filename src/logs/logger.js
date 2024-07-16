import pino from "pino";

const logger = pino({
    transport: {
        target: "pino-pretty",
        options: {
            translateTime: 'SYS:dd-mm-yyyy HH:mm:ss',
            colorize: true
        }   
    }
});

export default logger;