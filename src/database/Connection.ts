import {connect} from "mongoose";
import 'dotenv/config'

export default async function connection(){
    const db = await connect(process.env.DB_MONGO_URI||'');
    console.log("Connected to: ", db.connection.name);
}