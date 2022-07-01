const pool = require("../../database/database");
const {parse, DB} = require("../../helpers/helpers");

project = {}
project.getScreenshots= async(req, res)=>{
    const {projects_id} = req.params

    const projectsScreenshots = await pool.query(`call sp_getProjects_screenshots(${projects_id});`)
    res.json(projectsScreenshots[0])
}

project.addScreenshots = async(req, res)=>{
    const {projects_id} = req.params

    // chack if the object data matches
    const parseBody= parse.ObjDB({...req.body,  projects_id},["screenshot", "details", "number"], [], ["project_id"])
    if(!parseBody.passed){return res.status(parseBody.status).json({message:parseBody.message})}

    console.log("esto es el parse ",parseBody)
    try{ // try connection
        const query = await pool.query(`
             INSERT INTO 
             project_screenshot
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

project.updateScreenshots = async(req, res)=>{
    const {projects_id} = req.params

    // chack if the object data matches
    const parseBody= parse.ObjDB(req.body,["screenshot", "details", "number"], [], ["id"])
    if(!parseBody.passed){return res.status(parseBody.status).json({message:parseBody.message})}

    try{ // try connection
        const query = await pool.query(`
             UPDATE 
             project_screenshot
             set ?  
             WHERE id= ? 
             AND project_id = ? 
   
        `,[parseBody.data, req.body.id, projects_id])
        const response =  DB.responseUpd(query)
        // console.log("query maquillado ",response)
        console.log("query ",query)
        return res.status(response.status).json({message:response.message})
    }catch (E){
        console.log(E)
        return res.status(400).json({message:"Error fatal, No se pudo procesar la consulta"})
    }

}

project.deleteScreenshots = async(req, res)=>{
    const {projects_id, screenshots_id} = req.params

    try{ // try connection
        console.log("las params son", projects_id, screenshots_id)
        const query = await pool.query(`
            DELETE FROM project_screenshot
            WHERE project_id = ? 
            AND 
            id = ?
        `,[projects_id,screenshots_id])
        console.log("delete ",query)
        const response =  DB.responseDel(query)
        return res.status(response.status).json({message:response.message})
    }catch (E){
        return res.status(400).json({message:"Hubo un error al procesar los datos"})
    }
}

module.exports = project;