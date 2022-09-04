import {Response, Request, NextFunction} from "express";
import {body, param, query, validationResult} from "express-validator";

import util from "../helpers/Util";
import ResponseDB from "../models/ResponseDB";

class CheckField {
    public users_id = param('users_id','El UUID no es válido').trim().isMongoId()
    public projects_id = param('projects_id','El UUID no es válido').trim().isMongoId()

    public email = body("email", 'Debe tener un mínimo de 5 y un máximo de 150').trim().toLowerCase()
        .isLength({min:5, max:150})
        .isEmail()
        .custom(util.isEmail)

    public password = body("password", 'Debe tener un mínimo de 5 y un máximo 200').trim()
        .isLength({min:5, max:200})

    public username = body('username','Debe tener un mínimo de 5 y un máximo 50').toLowerCase()
        .isLength({min:5, max:50})
        .custom(util.isTextCommon)

    public name = body('name','Debe tener un máximo de 100 caracteres').toLowerCase().isLength({max:100})

    public lastname = body('lastname','Debe tener un máximo de 50 caracteres').toLowerCase().isLength({max:100})

    public offset = query('offset', "Debe ser un número positivo").toInt().custom(util.isNumber)

    public limit = query('limit', "Debe ser un número positivo").toInt().custom(util.isNumber)

    public url_deploy = body('url_repository','Debe tener formato de URL').trim().isURL()

    public url_repository = body('url_repository','Debe tener formato de URL').trim().isURL()

    public url_documentation = body('url_documentation','Debe tener formato de URL').trim().isURL()

    public description = body('description','Debe tener un máximo 7000').trim().isLength({ max:7000})

    public description_short = body('description_short','Debe tener un máximo 250').trim().isLength({ max:250})

    public note = body('note','Debe tener un máximo 60').trim().isLength({ max:60})

    public date_start = body('date_start','Debe tener un formato de fecha YYYY-MM-DD').toDate().custom(util.isDate)

    public date_finish = body('date_finish','Debe tener un formato de fecha YYYY-MM-DD').toDate().custom(util.isDate)

    public url_img = body('url_img','Debe tener formato de URL').trim().isURL()

    public current_version = body('current_version','Debe tener un máximo 60').trim().isLength({ max:60})

    public architecture = body('architecture','Debe tener un máximo 60').trim().isLength({ max:60})

    public current_state = body('current_state','Debe tener un máximo 60').trim().isLength({ max:60})

    public size = body('size','Debe tener un máximo 60').trim().isLength({ max:60})

    public platform = body('platform','Debe tener un máximo 60').trim().isLength({ max:60})

    public licence = body('licence','Debe tener un máximo 60').trim().isLength({ max:60})

    public software_editor = body('software_editor','Debe tener un máximo 60').trim().isLength({ max:60})

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