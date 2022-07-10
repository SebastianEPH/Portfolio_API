const pool = require("../../database/database");
const responseMessage = require("../../helpers/responseMessage");
const {check} = require("express-validator");
tools = {}

tools.getAll = async(req, res)=>{
    const {projects_id} = req.params
    const response = await pool.query(`call sp_getProjects_toolsAll(?);`,[projects_id])
    const {status, data} = responseMessage.get(response);
    res.status(status).json(data);
}
tools.getOnly= async(req, res)=>{
    const {projects_id, tools_id} = req.params
    const response = await pool.query(`call sp_getProjects_tools(?,?);`,[projects_id, tools_id])
    const {status, data} = responseMessage.getOnly(response);
    res.status(status).json(data);
}
tools.addFields = [
    check("tools_id").not() // body
        .isEmpty()
        .withMessage('El ID es obligatorio')
        .isNumeric()
        .withMessage('No pueder ser string, solo deben ser numeros')
        .isLength({min:1, max:10})
        .withMessage('El ID debe ser mayor que 1 y menor que 10')
]
tools.add = async (req, res)=>{
    const {projects_id} = req.params
    try{
        const query = await pool.query('call sp_addProjects_tools(?,?);', [projects_id, req.body.tools_id]);
        const {status, msg, ok } =  responseMessage.add(query);
        return res.status(status).json({ok, msg})
    }catch (E){
        const {ok, errors} =  responseMessage.err(E);
        return res.status(400).json({ok,errors})
    }
}
tools.update = async(req, res)=>{
    const {projects_id, tools_id} = req.params
    const data = [
        tools_id ,
        projects_id ,
        req.body.tools_id
    ]
    try{
        const query = await pool.query(`call sp_updProjects_tools(?,?,?);`,data)
        const {status, msg, ok } = responseMessage.update(query);
        res.status(status).json({ok, msg});
    }catch (E){
        const {ok, errors} =  responseMessage.err(E);
        return res.status(400).json({ok,errors})
    }
}
tools.remove = async(req, res)=>{
    const {projects_id, tools_id} = req.params
    try{
        const query = await pool.query(`call sp_delProjects_tools(?,?);`,[projects_id , tools_id])
        const {status, msg, ok }  = responseMessage.remove(query);
        res.status(status).json({ok, msg})
    }catch (E){
        const {ok, errors} =  responseMessage.err(E);
        return res.status(400).json({ok,errors})
    }
}
module.exports = tools;