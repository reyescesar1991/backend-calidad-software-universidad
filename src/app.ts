import express from 'express';


const app = express();

console.log(`Server running on port ${app}"`);

//Middleware base
app.use(express.json());
app.use(express.urlencoded({extend : true}));


export {app}
