import dotenv from 'dotenv-safe';

dotenv.config({

    allowEmptyValues  : false,
    example : '.env.example',
});

export const config = {

    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_URI: process.env.CONNECTION_STRING || 'mongodb://localhost:27017/mydb'
}