import {Router} from "express";
import {userController as user} from '../controllers';
import check from '../middleware/CheckField';

class AuthRouter {
    public router: Router = Router()

    constructor() {
        this.config()
    }

    config(): void {
        const {valide, users_id} = check;

        this.router.post('/users', user.fieldsNew, valide, user.addNew);
        this.router.get('/users', user.queryGetAll,valide, user.getAll);
        this.router.get('/users/:users_id',users_id,valide ,user.getOne);
    }
}

const authRouter = new AuthRouter()
export default authRouter.router;
