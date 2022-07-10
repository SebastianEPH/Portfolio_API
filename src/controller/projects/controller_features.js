const pool = require("../../database/database");
const {trimBody} = require("../../helpers/helpers");
const {check} = require("express-validator");
const checkFields= require("../../midlewares/checkFields")
const responseMessage = require("../../helpers/responseMessage");

feature = {};
feature.getAll= async(req, res)=>{
    const {projects_id} = req.params
    const projectsFeatures = await pool.query(`call sp_getProjects_featuresAll(?);`,[projects_id])
    const {status, data} = responseMessage.get(projectsFeatures);
    res.status(status).json(data);
}
feature.getOnly= async(req, res)=>{
    const {projects_id,features_id} = req.params
    const projectsFeatures = await pool.query(`call sp_getProjects_features(?,?);`,[projects_id, features_id])
    const {status, data} = responseMessage.getOnly(projectsFeatures);
    res.status(status).json(data);
}
feature.addVerifyFields = [
    trimBody,
    check("feature").not()
        .isEmpty()
        .withMessage('El Nombre es obligatorio')
        .isLength({min:1, max:150})
        .withMessage('El nombre debe ser mayor que 2 y menor que 70 caracteres después '),
    check("img", "Debe ser un URL que contenga una imagen").not()
        .isNumeric()
        .withMessage('No puede sernumeros')
        .isLength({max:1024})
        .withMessage('el link no puede ser mayor que 1024 caracteres ')
        .custom(checkFields.isLinkImg)
]
feature.add= async(req, res, next)=>{
    const {projects_id} = req.params
    const data = [
        projects_id ,
        req.body.feature ,
        req.body.img || null,
        req.body.description || null
    ]
    try{
        const query = await pool.query('call sp_addProjects_features(?,?,?,?);', data)
        const {status, msg, ok } =  responseMessage.add(query);
        return res.status(status).json({ok, msg})
    }catch (E){
        const {ok, errors} =  responseMessage.err(E);
        return res.status(400).json({ok,errors})
    }
}
feature.update = async(req, res)=>{
    const {projects_id, features_id} = req.params
    const data = [
        projects_id ,
        features_id ,
        req.body.feature ,
        req.body.img || null,
        req.body.description || null
    ]
    try{
        const query = await pool.query(`call sp_updProjects_features(?,?,?,?,?);`,data)
        const {status, msg, ok } = responseMessage.update(query);
        res.status(status).json({ok, msg});
    }catch (E){
        const {ok, errors} =  responseMessage.err(E);
        return res.status(400).json({ok,errors})
    }
}

feature.remove = async(req, res)=>{
    const {projects_id, features_id} = req.params
    try{
        const query = await pool.query(`call sp_delProjects_features(?,?);`,[projects_id , features_id])
        const {status, msg, ok }  = responseMessage.remove(query);
        res.status(status).json({ok, msg})
    }catch (E){
        const {ok, errors} =  responseMessage.err(E);
        return res.status(400).json({ok,errors})
    }
}
module.exports = feature;