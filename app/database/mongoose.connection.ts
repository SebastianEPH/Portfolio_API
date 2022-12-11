import mongoose from 'mongoose';
import {
    DB_URL,
} from '../utils/constants';
import {mongoProperties} from './mongoProperties';

mongoose.Promise = global.Promise;
let isAuthConnected;

export const projectInstance = new mongoose.Mongoose();

export const connectToProjectDatabase = () => {
    if (isAuthConnected) return Promise.resolve();

    console.log('=> using new auth database connection', DB_URL);
    return projectInstance.connect(DB_URL, mongoProperties).then((db) => {
        isAuthConnected = db.connections[0].readyState;
        console.log('runing databse')
    }).catch((err) => {
        console.error(err);
        throw err;
    });
};
