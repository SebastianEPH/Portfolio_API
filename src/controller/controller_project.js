const {parse, DB} = require("../helpers/helpers");
const pool = require("../database/database");
const project = {}


project.getAllProjects = async(req, res)=>{

    const responseProjects  = await pool.query(`call sp_getAllProjects();`);
    const projects = responseProjects[0]

    for (let i = 0; i < projects.length; i++) {
        const programming_tools = await pool.query(`call sp_getProjects_programmingTools(${projects[i].id});`)
        projects[i].tools = programming_tools[0];

        const programming_language = await pool.query(`call sp_getProjects_programmingLanguage(${projects[i].id});`)
        projects[i].languages = programming_language[0];

        const projects_features = await pool.query(`call sp_getProjects_features(${projects[i].id});`)
        projects[i].features = projects_features[0];

        const projects_screenshot= await pool.query(`call sp_getProjects_screenshot(${projects[i].id});`)
        projects[i].screenshots = projects_screenshot[0];

    }
    return res.json(projects)
}
project.getOnlyProject = async(req, res)=>{
    console.log("only")
    const {project_id} = req.params
    //parse IDs from params
    const parseIds = parse.IdForDB([project_id])
    if(!parseIds.passed){return res.status(parseIds.status).json({message:parseIds.message})}

    let responseProject = await pool.query(`call sp_getProjects(${project_id});`)
    let project = responseProject[0][0];

    const programming_tools = await pool.query(`call sp_getProjects_programmingTools(${project_id});`)
    project.tools = programming_tools[0];

    const programming_language = await pool.query(`call sp_getProjects_programmingLanguage(${project_id});`)
    project.languages = programming_language[0];

    const project_features = await pool.query(`call sp_getProjects_features(${project_id});`)
    project.features = project_features[0];

    const project_screenshot= await pool.query(`call sp_getProjects_screenshot(${project_id});`)
    project.screenshots = project_screenshot[0];

    res.json(project)
}
project.getAllProjectsShort = async(req, res)=>{
    const responseProjects  = await pool.query(`call sp_getAllProjects();`);
    const projects = responseProjects[0]
    console.log("all")
    return res.json(projects)
}
project.getOnlyProjectShort = async(req, res)=>{
    const {project_id} = req.params
    //parse IDs from params
    const parseIds = parse.IdForDB([project_id])
    if(!parseIds.passed){return res.status(parseIds.status).json({message:parseIds.message})}

    let responseProject = await pool.query(`call sp_getProjects(${project_id});`)
    let project = responseProject[0][0];

    res.json(project)
}

project.AddFeature= async(req, res)=>{
    const {project_id} = req.params
    //parse IDs from params
    const parseIds = parse.IdForDB([project_id])
    if(!parseIds.passed){return res.status(parseIds.status).json({message:parseIds.message})}

    // chack if the object data matches
    const parseBody= parse.ObjDB({...req.body,  project_id},["feature", "description", "img"], [], ["project_id"])
    if(!parseBody.passed){return res.status(parseBody.status).json({message:parseBody.message})}

    console.log("esto es el parse ",parseBody)
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

project.updateFeature = async(req, res)=>{
    const {project_id} = req.params
    //parse IDs from params
    const parseIds = parse.IdForDB([project_id, req.body.id])
    if(!parseIds.passed){return res.status(parseIds.status).json({message:parseIds.message})}

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

project.deleteFeature = async(req, res)=>{
    const {project_id, feature_id} = req.params
    //parse IDs from params
    const parseIds = parse.IdForDB([project_id, feature_id])
    if(!parseIds.passed){return res.status(parseIds.status).json({message:parseIds.message})}

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


project.AddScreenshot = async(req, res)=>{
    const {project_id} = req.params
    //parse IDs from params
    const parseIds = parse.IdForDB([project_id])
    if(!parseIds.passed){return res.status(parseIds.status).json({message:parseIds.message})}

    // chack if the object data matches
    const parseBody= parse.ObjDB({...req.body,  project_id},["screenshot", "details", "number"], [], ["project_id"])
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

project.updateScreenshot = async(req, res)=>{
    const {project_id} = req.params
    //parse IDs from params
    const parseIds = parse.IdForDB([project_id, req.body.id])
    if(!parseIds.passed){return res.status(parseIds.status).json({message:parseIds.message})}

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
   
        `,[parseBody.data, req.body.id, project_id])
        const response =  DB.responseUpd(query)
        // console.log("query maquillado ",response)
        console.log("query ",query)
        return res.status(response.status).json({message:response.message})
    }catch (E){
        console.log(E)
        return res.status(400).json({message:"Error fatal, No se pudo procesar la consulta"})
    }

}

project.deleteScreenshot = async(req, res)=>{
    const {project_id, screenshot_id} = req.params
    //parse IDs from params
    const parseIds = parse.IdForDB([project_id, screenshot_id])
    if(!parseIds.passed){return res.status(parseIds.status).json({message:parseIds.message})}

    try{ // try connection
        console.log("las params son", project_id, screenshot_id)
        const query = await pool.query(`
            DELETE FROM project_screenshot
            WHERE project_id = ? 
            AND 
            id = ?
        `,[project_id,screenshot_id])
        console.log("delete ",query)
        const response =  DB.responseDel(query)
        return res.status(response.status).json({message:response.message})
    }catch (E){
        return res.status(400).json({message:"Hubo un error al procesar los datos"})
    }
}

project.deleteLanguage = async(req, res)=>{
    const {project_id, language_id} = req.params
    //parse IDs from params
    const parseIds = parse.IdForDB([project_id, language_id])
    if(!parseIds.passed){return res.status(parseIds.status).json({message:parseIds.message})}

    try{ // try connection
        console.log("las params son", project_id, language_id)
        const query = await pool.query(`
            DELETE FROM project_language
            WHERE project_id = ? 
            AND 
            id = ?
        `,[project_id,language_id])
        console.log("delete ",query)
        const response =  DB.responseDel(query)
        return res.status(response.status).json({message:response.message})
    }catch (E){
        return res.status(400).json({message:"Hubo un error al procesar los datos"})
    }
}
project.addLanguage = async(req, res)=>{
    const {project_id} = req.params
    //parse IDs from params
    const parseIds = parse.IdForDB([project_id, req.body.language])
    if(!parseIds.passed){return res.status(parseIds.status).json({message:parseIds.message})}

    // chack if the object data matches
    const parseBody= parse.ObjDB({...req.body,  project_id},[], [], ["project_id", "language"])
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

project.addTools = async(req, res)=>{
    const {project_id} = req.params
    //parse IDs from params
    const parseIds = parse.IdForDB([project_id, req.body.tools])
    if(!parseIds.passed){return res.status(parseIds.status).json({message:parseIds.message})}

    // chack if the object data matches
    const parseBody= parse.ObjDB({...req.body,  project_id},[], [], ["project_id", "tools"])
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
    const {project_id,  tools_id} = req.params
    console.log("estos son los paremetros", req.params)
    //parse IDs from params
    const parseIds = parse.IdForDB([project_id, tools_id])
    if(!parseIds.passed){return res.status(parseIds.status).json({message:parseIds.message})}

    try{ // try connection
        console.log("las params son", project_id, tools_id)
        const query = await pool.query(`
            DELETE FROM project_tools
            WHERE project_id = ? 
            AND 
            id = ?
        `,[project_id,tools_id])
        console.log("delete ",query)
        const response =  DB.responseDel(query)
        return res.status(response.status).json({message:response.message})
    }catch (E){
        return res.status(400).json({message:"Hubo un error al procesar los datos"})
    }
}






module.exports = project;