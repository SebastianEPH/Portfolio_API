import mongoose from 'mongoose';
import {
    DATABASE_NAME,
    DB_URL,
} from '../utils/constants';

mongoose.Promise = global.Promise;
let isAuthConnected;

export const projectInstance = new mongoose.Mongoose();
const mongoProperties = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    dbName: DATABASE_NAME,
    sslValidate: false,
    retryWrites: false,
    maxPoolSize: 100,
    socketTimeoutMS: 35000, // Close sockets after 35 seconds of inactivity
    bufferCommands: false, // Disable mongoose buffering
};

export const connectToProjectDatabase = () => {
    if (isAuthConnected) {
        return Promise.resolve();
    }
    console.log('=> using new auth database connection', DB_URL);
    return projectInstance.connect(DB_URL, mongoProperties).then((db) => {
        isAuthConnected = db.connections[0].readyState;
        console.log('runing databse')
    }).catch((err) => {
        console.error(err);
        throw err;
    });
};
