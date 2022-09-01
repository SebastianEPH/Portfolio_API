import {Response, Request, NextFunction} from "express";
import {body, param, query, validationResult} from "express-validator";

import util from "../helpers/Util";
import ResponseDB from "../models/ResponseDB";

class CheckField {
    public users_id = param('users_id','El UUID no es válido').trim().isMongoId()

    public emailRequired = body("email",
        'Es obligatorio y debe tener un mínimo de 5 y un máximo de 150').trim().not()
        .isEmpty()
        .isLength({min:5, max:150})
        .isEmail()
        .withMessage('Valor invalido')
        .toLowerCase()
        .custom(util.isEmail)

    public passwordRequired = body("password",
        'Es obligatorio y debe tener un mínimo de 5 y un máximo 200').trim().not()
        .isEmpty()
        .isLength({min:5, max:200})

    public usernameRequired = body('username').not()
        .isEmpty()
        .isLength({min:3, max:50})
        .withMessage('Es obligatorio y debe tener un mínimo de 5 y un máximo 50')
        .toLowerCase()
        .custom(util.isTextCommon)

    public name = body('name','Debe tener un máximo de 50 caracteres')
        .isLength({max:50}).toLowerCase()

    public lastname = body('lastname','Debe tener un máximo de 50 caracteres')
        .isLength({max:50}).toLowerCase()

    public offset = query('offset', "Debe ser un número positivo").toInt()
        .custom(util.isNumber);
    public limit = query('limit', "Debe ser un número positivo").toInt()
        .custom(util.isNumber);



    public valide(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(new ResponseDB({
                status:400,
                data:null,
                errors:errors.mapped()
            }).send())
        }
        next();
    }

}

const checkField = new CheckField()
export default checkField;