import {Request,Response, NextFunction} from "express";
import {validationResult} from "express-validator";
// import checkFilds from "./checkFilds";


const isNum = (req:Request, res:Response, next:NextFunction)=>{

    console.log("dsgsdgdsfafds verifi ")

    next()
}
const valideIDMongo =  (req:Request, res:Response, next:NextFunction)=>{
    function isIDMongo(id:String){
        if(!id){return false}
        return id.length === 24;
    }
    if(!isIDMongo(req.params.id)){
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
    next()
}
const checkID_SQL = (req:Request, res:Response, next:NextFunction)=>{
    function isIDSQL(id:any){
        if(!id){return false}
        if(id.length< 1 || id.length >8){
            console.log('length', id.length, "el la longitud del id es menor que 1 y mayor que 8 ")
            return false
        }else{
            console.log('El ID SQL se verificó correctamente')
        }

        return !isNaN(id)
    }
    if(!isIDSQL(req.params.id)){
        return res.status(402).json({
            ok:false,
            errors: {
                name:{
                    msg:"El ID enviado no es valido",
                    param:"param id",
                    location:"params"
                }}
        })
    }
    next()
}
const valideFields = (req:Request, res:Response, next:NextFunction)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({
            ok:false,
            errors: errors.mapped()
        })
    }
    next();
}


export {
    valideFields
}