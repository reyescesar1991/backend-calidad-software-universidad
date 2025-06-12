// src/core/services/redis.ts
import { Redis } from '@upstash/redis';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Cargar variables de entorno
dotenv.config({ path: resolve(process.cwd(), ".env") });

// Valida que las variables de entorno existan para evitar errores
if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    throw new Error("Las variables de entorno de Upstash Redis no están definidas.");
}

// Crea una única instancia del cliente de Redis
// La librería @upstash/redis sabe exactamente qué hacer con estas variables.
const redisClient = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

console.log("✅ Cliente de Upstash Redis configurado correctamente.");

// Exportamos el cliente para usarlo en otros archivos
export default redisClient;