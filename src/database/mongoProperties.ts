import {DATABASE_NAME} from '../utils/constants';

export const mongoProperties = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    dbName: DATABASE_NAME,
    sslValidate: false,
    retryWrites: false,
    maxPoolSize: 100,
    socketTimeoutMS: 35000, // Close sockets after 35 seconds of inactivity
    bufferCommands: false, // Disable mongoose buffering
};