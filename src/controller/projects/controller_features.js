const pool = require("../../database/database");
const {parse, DB, trimBody} = require("../../helpers/helpers");
const {check} = require("express-validator");
const checkFields= require("../../midlewares/checkFields")
const responseMessage = require("../../helpers/responseMessage");

feature = {};
feature.getAll= async(req, res)=>{
    const {projects_id} = req.params

    const projectsFeatures = await pool.query(`call sp_getProjects_features(${projects_id});`)
    res.json(projectsFeatures[0])
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
        .withMessage('is numeric')
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
        const {status, msg, ok } =  responseMessage.addSP(query);
        return res.status(status).json({ok, msg})
    }catch (E){
        console.log(E)
        return res.status(400).json({message:"The submitted data cannot be processed"})
    }
}

feature.update = async(req, res)=>{
    const {projects_id} = req.params

    // chack if the object data matches
    const parseBody= parse.ObjDB({...req.body},["feature", "description", "img"], [], [])
    if(!parseBody.passed){return res.status(parseBody.status).json({message:parseBody.message})}

    try{ // try connection
        const query = await pool.query(`
             UPDATE 
             project_feature 
             set ?  
             WHERE id= ? 
             AND project_id = ? 
   
        `,[parseBody.data, req.body.id, projects_id])
        const response =  DB.responseUpd(query)
        console.log("query maquillado ",response)
        console.log("query ",query)
        return res.status(response.status).json({message:response.message})
    }catch (E){
        console.log(E)
        return res.status(400).json({message:"Error fatal, No se pudo procesar la consulta"})
    }

}

feature.remove = async(req, res)=>{
    const {projects_id, features_id} = req.params

    try{ // try connection
        console.log("las params son", projects_id, features_id)
        const query = await pool.query(`
            DELETE FROM project_feature
            WHERE project_id = ? 
            AND 
            id = ?
        `,[projects_id,features_id])
        console.log("delete ",query)
        const response =  DB.responseDel(query)
        return res.status(response.status).json({message:response.message})
    }catch (E){
        return res.status(400).json({message:"Hubo un error al procesar los datos"})
    }
}
module.exports = feature;