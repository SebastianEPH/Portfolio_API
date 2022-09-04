import express, {Application, Router} from "express"
import cors from "cors"
import 'dotenv/config'
import morgan from "morgan";
import connection from "./database/Connection";
import {authRouter, projectRouter} from "./routes";

class Server {
    public app: Application

    constructor() {
        this.app = express()
        this.app.use(cors())
        this.app.use(morgan("dev"))
        this.app.use(express.json());
        this.app.use(express.urlencoded({
            extended: false
        }))
        this.config()
        this.routes()
        connection()
    }

    config(): void {
        this.app.set("port", <string>process.env.SERVER_PORT)
        this.app.set("version", <string>process.env.SERVER_VERSION)
    }

    routes(): void {
        const baseApi: string = `/api/${this.app.get("version")}`

        this.app.use( baseApi, projectRouter);
        this.app.use( baseApi, authRouter);
    }

    start(): void {
        this.app.listen(this.app.get("port"), () => {
            console.log("server ", this.app.get("version"), " on PORT", this.app.get("port"));
        })
    }
}

const server = new Server()
server.start();