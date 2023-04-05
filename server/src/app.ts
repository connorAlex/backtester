import express from "express";
import {router} from "./api/routes";
import { getConnection } from "./loaders/mongoose";

// this is where we start the server

const start = async () => {
    // use express to start sever
    const app = express();
    app.use('/', router);
    let db = await getConnection();

    app.listen("8080", () => {
        console.log("Open on port: 8080");
    }).on('error', (error: String) => {
        console.log(error);
    });
    

}


start();
