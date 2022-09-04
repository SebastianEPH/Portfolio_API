import {NextFunction, Request, Response} from "express";
class Middleware {
    async getURL(req: Request, res: Response, next: NextFunction){
        try{
            req.baseUrl= String(req.hostname + req.originalUrl)
        }catch (errors){
            console.log( errors)
        }
        next()
    }

}
const middleware =  new Middleware();
export default middleware