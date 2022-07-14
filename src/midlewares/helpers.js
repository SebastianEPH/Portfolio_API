const {param, validationResult} = require("express-validator");
helpers = {}
helpers.trimBody= async (req, res,next)=>{
    for (let key in (req.body)) {
        // if (typeof (req.body[key]+"") !== 'undefined' || req.body[key] !== undefined|| req.body[key] !== null){}
        req.body[key] = (req.body[key]+"").trim();
    }
    next();
}
helpers.checkParams = (nameParams )=>
    param(nameParams,"este es el mensaje de erorr peeee").not()
        .isEmpty()
        .withMessage('El ID es obligatorio')
        .isNumeric()
        .withMessage('No pueder ser string, solo deben ser numeros66')
        .isLength({min:1, max:10})
        .withMessage('El ID debe ser mayor que 1 y menor que 10')

helpers.valideFields= (req, res, next)=>{
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
module.exports = helpers;