import {Response, Request, NextFunction} from "express";
import {check, param} from "express-validator";

const trimBody= async (req:Request, res:Response,next:NextFunction)=>{
    for (let key in (req.body)) {
        // if (typeof (req.body[key]+"") !== 'undefined' || req.body[key] !== undefined|| req.body[key] !== null){}
        req.body[key] = (req.body[key]+'').trim();
    }
    next();
}
// const isMongoId = ()
const checkParams = (nameParams:string)=>
    param(nameParams).not()
        .isEmpty()
        .withMessage('El ID es obligatorio')
        .isNumeric()
        .withMessage('No pueder ser string, solo deben ser numeros')
        .isLength({min:1, max:10})
        .withMessage('El ID debe ser mayor que 1 y menor que 10')

const checkParamsBig = (nameParams:string )=>
    param(nameParams).not()
        .isEmpty()
        .withMessage('El ID es obligatorio')
        .isNumeric()
        .withMessage('No pueder ser string, solo deben ser numeros')
        .isLength({min:1, max:19})
        .withMessage('El ID debe ser mayor que 1 y menor que 19')

const checkEmailRequired = ()=>
    check("email").trim().not()
        .isEmpty()
        .withMessage('El correo es obligatorio')
        .isLength({min:5, max:150})
        .withMessage('El correo debe ser mayor que 5 y menor que 150 caracteres')
        .isEmail()
        .withMessage('El texto ingresado no es un correo')


const checkPasswordRequired = ()=>
    check("password").trim().not()
        .isEmpty()
        .withMessage('La contraseña es obligatoria')
        .isString()
        .withMessage("la contraseña debe tener contener caracteres")
        .isLength({min:8, max:512})
        .withMessage('Debe ser mayor que 8 y menor que 512 caracteres después ')


// regex zone
const baseUrl = /^https|http:\/\//i;
const imgExtension =  /jpg|jpeg|png|bmp|gif|tif|tiff|SVG$/i;

const isLinkImg = (value:string)=>{ // , {req:Request, location, path}
    // const reg = new RegExp("this","gi");
    if (value == null || undefined){return true;}
    const base = baseUrl.test(value)
    const extension = imgExtension.test(value)
    console.log("la base: ", base);
    console.log("la extension", extension)
    return base && extension

}
const isLink = (value:string)=> { // , {req:Request, location, path}
    if (value == null || undefined){ return true;}
    return baseUrl.test(value) ;
}

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

const  generateRandomString = (num:number) => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result= '';
    const charactersLength = characters.length;
    for ( let i = 0; i < num; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
export {
    isIDSQL,
    isLink ,
    isLinkImg,
    checkParams,
    checkEmailRequired,
    checkPasswordRequired,
    trimBody,
    generateRandomString
}