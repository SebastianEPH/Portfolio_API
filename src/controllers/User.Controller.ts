import { Request, Response } from 'express';

class UserController {

    public async index(req: Request, res: Response) {
        // const books = await BookModel.find({});
        // res.render('books/index', {
        //     title: 'Books',
        //     books
        // });
    }


    public async save(req: Request, res: Response) {
        const { title, author, isbn } = req.body;
        // const newBook: Book = new BookModel({
        //     title,
        //     author,
        //     isbn
        // });
        // await newBook.save();
        // res.redirect('/books');
    }

}

const userController = new UserController();
export default userController;