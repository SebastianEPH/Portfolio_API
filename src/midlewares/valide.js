const { validationResult } = require('express-validator');

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
function errorResponse(nameParams, dataParams){
    return {
        ok:false,
        errors: {
            name:{
                msg:"El parametro ["+nameParams+"] ID enviado no es válido",
                param:nameParams,
                param_data: dataParams+ '',
                location:"params"
            }}
    }
}

const valideIDSQL ={}

valideIDSQL.valideFields = (req, res, next)=>{
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
valideIDSQL.projects_id = (req, res, next)=>{
    const nameParams = 'projects_id';
    const dataParams = (req.params)[nameParams]
    if(!isIDSQL(dataParams)){
        return res.status(402).json(errorResponse(nameParams, dataParams))
    }
    next();
}
valideIDSQL.features_id = (req, res, next)=>{
    const nameParams = 'features_id';
    const dataParams = (req.params)[nameParams]
    if(!isIDSQL(dataParams)){
        return res.status(402).json(errorResponse(nameParams, dataParams))
    }
    next();
}
valideIDSQL.languages_id = (req, res, next)=>{
    const nameParams = 'languages_id';
    const dataParams = (req.params)[nameParams]
    if(!isIDSQL(dataParams)){
        return res.status(402).json(errorResponse(nameParams, dataParams))
    }
    next();
}
valideIDSQL.screenshots_id = (req, res, next)=>{
    const nameParams = 'screenshots_id';
    const dataParams = (req.params)[nameParams]
    if(!isIDSQL(dataParams)){
        return res.status(402).json(errorResponse(nameParams, dataParams))
    }
    next();
}
valideIDSQL.tools_id = (req, res, next)=>{
    const nameParams = 'tools_id';
    const dataParams = (req.params)[nameParams]
    if(!isIDSQL(dataParams)){
        return res.status(402).json(errorResponse(nameParams, dataParams))
    }
    next();
}
valideIDSQL.isLink = (req, res)=>{
    // debe verificar que sea un  link
    console.log("Esto son los parametros "+req.params)
    return true;
}
valideIDSQL.AceptarParseNull = (value, {req, res, next})=>{ // lo de ariba no es necesario , tampoc el value , ya que previamente ya se va enviando
    // if (value !== req.body.password) {
        throw new Error('mensaje personalizado, pero dentor ');


    // O debe terornar false tambien,



    // }
    console.log('esto paso??');
    // Indicates the success of this synchronous custom validator
    return false;
}


module.exports = valideIDSQL;
