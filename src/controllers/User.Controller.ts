import {NextFunction, Request, Response} from 'express';
import check from '../middleware/CheckField';
import User from "../models/User";
import ResponseDB from "../models/ResponseDB";

class UserController {

    queryGetAll = [
        check.offset,
        check.limit
    ]
    public async getAll(req: Request, res: Response) {
        try {
            const {offset, limit} = req.query
            console.log("son los 2 ",offset, limit)
            const users = await User.find()
                .limit(Number(limit || 100))
                .skip(Number(offset || 1))

            res.status(200).json({metadata: {status: 200, messages: "All users successfully"}, data: users})
        } catch (errors) {
            res.status(500).json(new ResponseDB({status: 500, errors, data: null}).send())
        }
    }

    public async getOne(req: Request, res: Response) {
        try {
            const user = await User.findById(req.params.users_id);
            if (!user) return res.status(404).json(new ResponseDB({status: 404, data: user}).send())
            res.status(200).json(new ResponseDB({status: 200, data: user}).send())
        } catch (errors) {
            res.status(500).json(new ResponseDB({status: 500, errors, data: null}).send())
        }
    }

    public fieldsNew = [
        check.emailRequired,
        check.passwordRequired,
        check.usernameRequired,
        check.name,
        check.lastname
    ]

    public async addNew(req: Request, res: Response, next: NextFunction) {
        try {
            const {name, lastname, email, password} = req.body
            const user_ = await User.findOne({email})
            if(user_){
                return res.status(400).json(new ResponseDB({status: 400, errors:{msg:'El Email ya existe'},data: null}).send())
            }

            const username = 'user_' + email.split('@', 1)[0]
            const user = new User({
                name, lastname, username, email, password
            })
            await user.save({});
            res.status(200).json(new ResponseDB({status: 200, data: user}).send())
        } catch (errors) {
            res.status(500).json(new ResponseDB({status: 500, errors, data: null}).send())
        }
    }
}

const userController = new UserController();
export default userController;