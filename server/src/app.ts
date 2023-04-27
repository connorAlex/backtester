import express from "express";
import { router } from "./api/routes";
import { getConnection } from "./loaders/mongoose";
import { authConfig } from './api/routes/auth';
import cors from 'cors'
// import { auth } from 'express-openid-connect';

const corsOptions = {
    origin: '*',
    credentials: true,
    optionalSuccessStatus: 200
}

const start = async () => {
    // use express to start sever
    const app = express();
    app.use(express.json());
    app.use(cors(corsOptions));

    // routes
    app.use('/', router);
    
    // mongoose 
    await getConnection();    

    // // auth0
    // app.use(auth(authConfig));

    app.listen("8080", () => {
        console.log("Open on port: 8080");
        console.log("http://localhost:8080")
    }).on('error', (error: String) => {
        console.log(error);
    });
    
}

start();
