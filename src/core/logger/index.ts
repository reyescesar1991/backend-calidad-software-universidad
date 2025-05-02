import winston from 'winston';
import 'winston-daily-rotate-file';

export const logger = winston.createLogger({

    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.json(),
        winston.format.errors({ stack: process.env.NODE_ENV !== 'production' }),
    ),
    transports: [new winston.transports.Console(

        {
            format: process.env.NODE_ENV === 'production'
                ? winston.format.json()
                : winston.format.combine(
                    winston.format.colorize(),
                    winston.format.printf(({ timestamp, level, message, ...meta }) => {
                        return `[${timestamp}] ${level}: ${message} ${JSON.stringify(meta)}`;
                    })
                )
        }
    ),
    // Rotación de archivos (evita archivos gigantes)
    new winston.transports.DailyRotateFile({
        filename: 'logs/application-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        maxSize: '20m',
        maxFiles: '30d',
        level: 'info'
    }),
    new winston.transports.DailyRotateFile({
        filename: 'logs/error-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        maxSize: '20m',
        maxFiles: '30d',
        level: 'error'
    })
    ],
    exceptionHandlers : [

        new winston.transports.DailyRotateFile({

            filename : 'logs/exceptions-%DATE%.log',
            datePattern : 'YYYY-MM-DD',
            maxSize : '20m',
            maxFiles : '30d',
        })
    ]
});