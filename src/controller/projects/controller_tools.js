const pool = require("../../database/database");
const {parse, DB} = require("../../helpers/helpers");
project = {}
project.getTools = async(req, res)=>{
    const {projects_id} = req.params

    const projectsTools = await pool.query(`call sp_getProjects_tools(${projects_id});`)
    res.json(projectsTools[0])
}
project.addTools = async(req, res)=>{
    const {projects_id} = req.params

    // chack if the object data matches
    const parseBody= parse.ObjDB({...req.body,  projects_id},[], [], ["projects_id", "tools"])
    if(!parseBody.passed){return res.status(parseBody.status).json({message:parseBody.message})}

    console.log("esto es el parse ",parseBody)
    try{ // try connection
        const query = await pool.query(`
             INSERT INTO 
             project_tools
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

project.deleteTools = async(req, res)=>{
    const {projects_id,  tools_id} = req.params
    //parse IDs from params
    const parseIds = parse.IdForDB([projects_id, tools_id])
    if(!parseIds.passed){return res.status(parseIds.status).json({message:parseIds.message})}

    try{ // try connection
        console.log("las params son", projects_id, tools_id)
        const query = await pool.query(`
            DELETE FROM project_tools
            WHERE project_id = ? 
            AND 
            id = ?
        `,[projects_id,tools_id])
        console.log("delete ",query)
        const response =  DB.responseDel(query)
        return res.status(response.status).json({message:response.message})
    }catch (E){
        return res.status(400).json({message:"Hubo un error al procesar los datos"})
    }
}

module.exports = project;