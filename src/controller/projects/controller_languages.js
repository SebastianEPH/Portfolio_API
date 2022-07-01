const pool = require("../../database/database");
const {DB, parse} = require("../../helpers/helpers");

project = {};
project.getLanguages = async(req, res)=>{
    const {projects_id} = req.params

    const projectsLanguage = await pool.query(`call sp_getProjects_languages(${projects_id});`)
    res.json(projectsLanguage[0])
}

project.deleteLanguages = async(req, res)=>{
    const {projects_id, languages_id} = req.params

    try{ // try connection
        console.log("las params son", projects_id, languages_id)
        const query = await pool.query(`
            DELETE FROM project_language
            WHERE project_id = ? 
            AND 
            id = ?
        `,[projects_id,languages_id])
        console.log("delete ",query)
        const response =  DB.responseDel(query)
        return res.status(response.status).json({message:response.message})
    }catch (E){
        return res.status(400).json({message:"Hubo un error al procesar los datos"})
    }
}
project.addLanguages = async(req, res)=>{
    const {projects_id} = req.params

    // chack if the object data matches
    const parseBody= parse.ObjDB({...req.body,  projects_id},[], [], ["projects_id", "language"])
    if(!parseBody.passed){return res.status(parseBody.status).json({message:parseBody.message})}

    console.log("esto es el parse ",parseBody)
    try{ // try connection
        const query = await pool.query(`
             INSERT INTO 
             project_language
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

module.exports = project;