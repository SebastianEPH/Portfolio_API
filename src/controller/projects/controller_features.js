const pool = require("../../database/database");
const {parse, DB} = require("../../helpers/helpers");

project = {};
project.getFeatures= async(req, res)=>{
    const {project_id} = req.params

    const projectsFeatures = await pool.query(`call sp_getProjects_features(${project_id});`)
    res.json(projectsFeatures[0])
}
project.addFeatures= async(req, res)=>{
    const {project_id} = req.params

    // chack if the object data matches
    const parseBody= parse.ObjDB({...req.body,  project_id},["feature", "description", "img"], [], ["project_id"])
    if(!parseBody.passed){return res.status(parseBody.status).json({message:parseBody.message})}

    try{ // try connection
        const query = await pool.query(`
             INSERT INTO 
             project_feature 
             set ? 
        `,[parseBody.data])

        const response =  DB.responseAdd(query)
        console.log(response)
        return res.status(response.status).json({message:response.message})
    }catch (E){
        console.log(E)
        return res.status(400).json({message:"The submitted data cannot be processed"})
    }
}

project.updateFeatures = async(req, res)=>{
    const {project_id} = req.params

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
   
        `,[parseBody.data, req.body.id, project_id])
        const response =  DB.responseUpd(query)
        console.log("query maquillado ",response)
        console.log("query ",query)
        return res.status(response.status).json({message:response.message})
    }catch (E){
        console.log(E)
        return res.status(400).json({message:"Error fatal, No se pudo procesar la consulta"})
    }

}

project.deleteFeatures = async(req, res)=>{
    const {project_id, feature_id} = req.params

    try{ // try connection
        console.log("las params son", project_id, feature_id)
        const query = await pool.query(`
            DELETE FROM project_feature
            WHERE project_id = ? 
            AND 
            id = ?
        `,[project_id,feature_id])
        console.log("delete ",query)
        const response =  DB.responseDel(query)
        return res.status(response.status).json({message:response.message})
    }catch (E){
        return res.status(400).json({message:"Hubo un error al procesar los datos"})
    }
}
module.exports = project;