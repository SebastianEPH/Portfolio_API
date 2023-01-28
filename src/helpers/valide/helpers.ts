import {Request, Response, NextFunction} from "express";

import {validationResult} from "express-validator";
import moment from "moment";

class Valide{
    static valideFields (req:Request, res:Response, next:NextFunction){
        const errors = validationResult(req)
        // manejo de errores de validación
        if (!errors.isEmpty()){
            return res.status(400).json({
                ok:false,
                errors: errors.mapped()
            })
        }
        next();
    }
    static valideIDMongo(req:Request, res:Response, next:NextFunction){
        console.log("ID",req.params.id )
        if(!Valide.isIDMongo(req.params.id)){
            return res.status(402).json({
                ok:false,
                errors: {
                    name:{
                        msg:"El ID debe ser de 24 Caracteres",
                        param:"param id",
                        location:"params"
                    }}
            })
       }
       next();
    }

    static isDate(value:Date){
        if(!value){return false}
        const date = moment(value)
        return date.isValid();
    }
    // static isID(value:String){
    //     if(!value){return false}
    //
    // 626f3408bae43ce5589b641e // 24 caracteres confirmed
    //
    //     return date.isValid();
    // }
    static isIDMongo(id:String){
        if(!id){return false}
        return id.length === 24;
    }
    static parseDB(obj:object, arr:string[]){
        let new_obj:any ={}
        Object.entries(obj).forEach(([key, value]) =>{
            arr.map(word => {
                if(key === word){
                    new_obj[key] = value
                    // console.log("pased: ", key,value)
                }
            })
        })
    }
}

// const valide = new Valide()


export default  Valide


