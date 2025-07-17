import winston from 'winston';
import 'winston-daily-rotate-file';

export const logger = winston.createLogger({

    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.json(),
        winston.format.errors({ stack: process.env.NODE_ENV !== 'production' })
    ),
    transports: [new winston.transports.Console(
        {
            format: process.env.NODE_ENV === 'production'
                ? winston.format.json()
                : winston.format.combine(
                    winston.format.colorize(),
                    // --- AQUI ESTÁ EL CAMBIO ---
                    winston.format.printf(({ timestamp, level, message, ...meta }: any) => {
                        // Evita serializar las propiedades circulares.  Aquí excluimos 'req' y 'res'
                        // pero puedes ajustar esto según lo que realmente estés logueando.
                        const safeMeta = { ...meta };
                        if (safeMeta.req) safeMeta.req = '[CIRCULAR: Request object excluded]';
                        if (safeMeta.res) safeMeta.res = '[CIRCULAR: Response object excluded]';
                        if (safeMeta.error && safeMeta.error.stack) safeMeta.error = safeMeta.error.stack;

                        // Ahora serializamos solo las propiedades seguras.
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
        level: 'info',
        handleExceptions: true // <--- Manejar excepciones en este transport
    }),
    new winston.transports.DailyRotateFile({
        filename: 'logs/error-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        maxSize: '20m',
        maxFiles: '30d',
        level: 'error'
    }),
    // --- ¡AQUÍ ESTÁ LA MAGIA! ---
    // Nuevo transport para capturar ESPECÍFICAMENTE los logs de debug y superiores en un archivo.
    // Como 'debug' es el nivel más bajo, capturará todo.
    new winston.transports.DailyRotateFile({
        filename: 'logs/debug-%DATE%.log', // Se guardarán en un archivo 'debug-YYYY-MM-DD.log'
        datePattern: 'YYYY-MM-DD',
        maxSize: '20m',
        maxFiles: '14d', // Podemos guardar menos días de logs de debug, ya que pueden ser muy grandes
        level: 'debug' // Le decimos que escuche los logs de nivel 'debug' y superiores
    })
    ]
});