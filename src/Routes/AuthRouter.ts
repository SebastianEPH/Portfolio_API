import {Router} from "express";

export class AuthRouter {
    public router:Router =  Router()
    constructor() {
        this.config()
    }
    config():void{
        this.router.get('/auth/renew')
    }
}
const authRouter = new AuthRouter()
export default authRouter ;
