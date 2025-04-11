import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Cargar variables de entorno
dotenv.config({ path: resolve(process.cwd(), ".env") });

// Constantes reutilizables
const CONNECTION_STRING = process.env.CONNECTION_STRING;

/**
 * Inicializa las dependencias y la conexión a MongoDB.
 * Úsalo al inicio de cada script de test.
 */
export const initializeTestEnvironment = async () => {
  try {
    // Conexión a MongoDB
    if (mongoose.connection.readyState !== 1) {
      console.log("🔗 Conectando a MongoDB...");
      await mongoose.connect(CONNECTION_STRING);
      console.log('✅ Conexión exitosa');
    }
  } catch (error) {
    console.error("❌ Error al inicializar el entorno:", error);
    process.exit(1);
  }
};