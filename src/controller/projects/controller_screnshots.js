const pool = require("../../database/database");
const responseMessage = require("../../helpers/responseMessage");
const {trimBody} = require("../../helpers/helpers");
const {check} = require("express-validator");
const checkFields = require("../../midlewares/checkFields");

screenshot = {}
screenshot.getAll= async(req, res)=>{
    const {projects_id} = req.params
    const response = await pool.query(`call sp_getProjects_screenshotsAll(?);`,[projects_id])
    const {status, data} = responseMessage.get(response);
    res.status(status).json(data);
}
screenshot.getOnly= async(req, res)=>{
    const {projects_id, screenshots_id} = req.params
    const response = await pool.query(`call sp_getProjects_screenshots(?,?);`,[projects_id, screenshots_id])
    const {status, data} = responseMessage.getOnly(response);
    res.status(status).json(data);
}
screenshot.addVerifyFields = [
    trimBody,
    check("screenshot", "Debe ser un link").not()
        .isEmpty()
        .withMessage('El link del screenshots es obligatorio')
        .isLength({max:2032})
        .withMessage('el link no puede ser mayor que 2032 caracteres ')
        .custom(checkFields.isLinkImg),
    check("number").not()
        .isEmpty()
        .withMessage('El Number es obligatorio')
        .isNumeric()
        .withMessage('No pueder ser string, solo deben ser numeros')
        .isLength({min:1, max:10})
        .withMessage('El nombre debe ser mayor que 1 y menor que 10 caracteres después ')
]
screenshot.add = async (req, res)=>{
    const {projects_id} = req.params
    const data = [
        projects_id,
        req.body.screenshot,
        req.body.number,
        req.body.description
    ]
    try{
        const query = await pool.query('call sp_addProjects_screenshots(?,?,?,?);', data);
        const {status, msg, ok } =  responseMessage.add(query);
        return res.status(status).json({ok, msg})

    }catch (E){
        const {ok, errors} =  responseMessage.err(E);
        return res.status(400).json({ok,errors})
    }
}
screenshot.update = async(req, res)=>{
    const {projects_id, screenshots_id} = req.params
    const data = [
        projects_id,
        screenshots_id,
        req.body.screenshot,
        req.body.number,
        req.body.description
    ]
    try{
        const query = await pool.query(`call sp_updProjects_screenshots(?,?,?,?,?);`,data)
        const {status, msg, ok } = responseMessage.update(query);
        res.status(status).json({ok, msg});
    }catch (E){
        const {ok, errors} =  responseMessage.err(E);
        return res.status(400).json({ok,errors})
    }
}
screenshot.remove = async(req, res)=>{
    const {projects_id, screenshots_id} = req.params
    try{
        const query = await pool.query(`call sp_delProjects_screenshots(?,?);`,[projects_id , screenshots_id])
        const {status, msg, ok }  = responseMessage.remove(query);
        res.status(status).json({ok, msg})
    }catch (E){
        const {ok, errors} =  responseMessage.err(E);
        return res.status(400).json({ok,errors})
    }
}
module.exports = screenshot;