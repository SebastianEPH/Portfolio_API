const { body, validationResult } = require('express-validator');


const helpers ={}

helpers.valideFields = (req, res, next)=>{
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
helpers.checkIDSQL = (req, res, next)=>{
    console.log("entroi a varificacion");
    function isIDSQL(id){
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
helpers.checkProjectsID = (req, res, next)=>{
    function isIDSQL(id){
        if(!id){return false}
        if(id.length< 1 || id.length >8){
            console.log('length', id.length, "el la longitud del id es menor que 1 y mayor que 8 ")
            return false
        }else{
            console.log('El ID SQL se verificó correctamente')
        }

        return !isNaN(id)
    }
    if(!isIDSQL(req.params.projects_id)){
        return res.status(402).json({
            ok:false,
            errors: {
                name:{
                    msg:"El parametro ID enviado no es válido",
                    param:"projects_id",
                    location:"params"
                }}
        })
    }
    next()
}
module.exports = helpers;
