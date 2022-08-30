import express, {Application} from "express"
import cors from "cors"
import 'dotenv/config'
import morgan from "morgan";
import connection from "./database/Connection";

class Server{
    public app:Application
    constructor() {
        this.app =  express()
        this.app.use(cors())
        this.app.use(morgan("dev"))
        this.app.use(express.json());
        this.app.use(express.urlencoded({
            extended:false
        }))
        this.config()
        this.routes()
        connection()
    }
    config():void{
        this.app.set("port", process.env.SERVER_PORT)
        this.app.set("version", process.env.SERVER_VERSION)
    }
    routes():void{

    }
    start():void{
        this.app.listen(this.app.get("port"), () =>{
            console.log("server ",this.app.get("version")," on PORT", this.app.get("port"));
        })
    }
}
const server = new Server()
server.start();