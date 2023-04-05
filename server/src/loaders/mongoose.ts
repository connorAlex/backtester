import config from '../config';
import mongoose, { Connection, Mongoose } from 'mongoose';
import { Db } from 'mongodb';

const getConnection = async (): Promise<Mongoose> => {

    if (config.db_url === undefined){
        throw new Error(" .env data undefined ");
    }
    const connection = await mongoose.connect(config.db_url);
    return connection;
}

const closeConnection = async (connection: Mongoose) => {
    //...
    connection.connection.close();
    
}

export { getConnection, closeConnection}