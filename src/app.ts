import express from 'express';


const app = express();

//Middleware base
app.use(express.json());
app.use(express.urlencoded({extend : true}));


export {app}
