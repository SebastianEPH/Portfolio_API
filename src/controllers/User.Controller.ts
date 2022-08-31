import {Request, Response} from 'express';
import User from '../models/User'
import ResponseDB from "../models/ResponseDB";
class UserController {

    public async save(req: Request, res: Response) {
        const {title, author, isbn} = req.body;
        // const newBook: Book = new BookModel({
        //     title,
        //     author,
        //     isbn
        // });
        // await newBook.save();
        // res.redirect('/books');
    }

    public async getAll(req: Request, res: Response) {
        const users = await User.find();
        res.status(200).json({metadata:{status:200, messages:"All users successfully"}, data:users})
    }

    public async getOne(req: Request, res: Response) {
        const user = await User.findById("6243c83c92f9347aa18db288");
        if(!user){
            return res.status(404).json(new ResponseDB({status:404,data:user}).send())
        }
        res.status(200).json(new ResponseDB({status:200, data:user}).send())

    }

    public async addNew(req: Request, res: Response) {
        const {name, lastname, username, email, password} = req.body
        const user = new User({
            name, lastname, username , email, password
        })
        user.save();
        res.status(200).json({metadata:{status:200, message:"was created successfully"},data:[user]})
    }

}

const userController = new UserController();
export default userController;