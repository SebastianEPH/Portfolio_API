import {Router} from "express";
import {userController as user} from '../controllers'

class AuthRouter {
    public router:Router =  Router()
    constructor() {
        this.config()
    }
    config():void{
        this.router.post('/users', user.addNew)
        this.router.get('/users', user.getAll)
        this.router.get('/users/:users_id', user.getOne)
    }
}
const authRouter = new AuthRouter()
export default authRouter.router ;
