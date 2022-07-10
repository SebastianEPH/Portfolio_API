const pool = require("../../database/database");
const responseMessage = require("../../helpers/responseMessage");
const {check} = require("express-validator");
const checkFields = require("../../midlewares/checkFields");

language = {};
language.getAll= async(req, res)=>{
    const {projects_id} = req.params
    const response = await pool.query(`call sp_getProjects_languagesAll(?);`,[projects_id])
    const {status, data} = responseMessage.get(response);
    res.status(status).json(data);
}
language.getOnly= async(req, res)=>{
    const {projects_id, languages_id} = req.params
    const response = await pool.query(`call sp_getProjects_languages(?,?);`,[projects_id, languages_id])
    const {status, data} = responseMessage.getOnly(response);
    res.status(status).json(data);
}
language.addVerify = [
    check("languages_id").not() // body
        .isEmpty()
        .withMessage('El ID es obligatorio')
        .isNumeric()
        .withMessage('No pueder ser string, solo deben ser numeros')
        .isLength({min:1, max:10})
        .withMessage('El ID debe ser mayor que 1 y menor que 10')
]
language.add = async (req, res)=>{
    const {projects_id} = req.params
    try{
        const query = await pool.query('call sp_addProjects_languages(?,?);', [projects_id, req.body.languages_id]);
        const {status, msg, ok } =  responseMessage.add(query);
        return res.status(status).json({ok, msg})
    }catch (E){
        const {ok, errors} =  responseMessage.err(E);
        return res.status(400).json({ok,errors})
    }
}
language.update = async(req, res)=>{
    const {projects_id, languages_id} = req.params
    const data = [
        languages_id ,
        projects_id ,
        req.body.languages_id
    ]
    try{
        const query = await pool.query(`call sp_updProjects_languages(?,?,?);`,data)
        const {status, msg, ok } = responseMessage.update(query);
        res.status(status).json({ok, msg});
    }catch (E){
        const {ok, errors} =  responseMessage.err(E);
        return res.status(400).json({ok,errors})
    }
}
language.remove = async(req, res)=>{
    const {projects_id, languages_id} = req.params
    try{
        const query = await pool.query(`call sp_delProjects_languages(?,?);`,[projects_id , languages_id])
        const {status, msg, ok }  = responseMessage.remove(query);
        res.status(status).json({ok, msg})
    }catch (E){
        const {ok, errors} =  responseMessage.err(E);
        return res.status(400).json({ok,errors})
    }
}

module.exports = language;