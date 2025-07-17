"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
require("winston-daily-rotate-file");
exports.logger = winston_1.default.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.default.format.json(), winston_1.default.format.errors({ stack: process.env.NODE_ENV !== 'production' })),
    transports: [new winston_1.default.transports.Console({
            format: process.env.NODE_ENV === 'production'
                ? winston_1.default.format.json()
                : winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.printf(({ timestamp, level, message, ...meta }) => {
                    return `[${timestamp}] ${level}: ${message} ${JSON.stringify(meta)}`;
                }))
        }),
        // Rotación de archivos (evita archivos gigantes)
        new winston_1.default.transports.DailyRotateFile({
            filename: 'logs/application-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',
            maxFiles: '30d',
            level: 'info'
        }),
        new winston_1.default.transports.DailyRotateFile({
            filename: 'logs/error-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',
            maxFiles: '30d',
            level: 'error'
        })
    ],
    exceptionHandlers: [
        new winston_1.default.transports.DailyRotateFile({
            filename: 'logs/exceptions-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',
            maxFiles: '30d',
        })
    ]
});
//# sourceMappingURL=index.js.map