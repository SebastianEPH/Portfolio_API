import mongoose from 'mongoose';
import {
    DB_URL,
} from '../utils/constants';
// import {mongoProperties} from './mongoProperties';

let conn: any = null;

export const connectDatabase = async () => {
    if (conn === null) {
        console.log('Creating new connection to the database....', DB_URL);
        conn = await mongoose.connect(DB_URL,
            // mongoProperties
            {
                serverSelectionTimeoutMS: 5000,
            }
        );
        return conn;
    }
    console.log(
        'Connection already established, reusing the existing connection'
    );
};
