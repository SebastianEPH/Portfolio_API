const {parse, DB} = require("../helpers/helpers");
const pool = require("../database/database");
const project = {}


project.getAllProjects = async(req, res)=>{

    const responseProjects  = await pool.query(`call sp_getAllProjects();`);
    const projects = responseProjects[0]

    for (let i = 0; i < projects.length; i++) {
        const tools = await pool.query(`call sp_getProjects_tools(${projects[i].id});`)
        projects[i].tools = tools[0];

        const languages = await pool.query(`call sp_getProjects_languages(${projects[i].id});`)
        projects[i].languages = languages[0];

        const projects_features = await pool.query(`call sp_getProjects_features(${projects[i].id});`)
        projects[i].features = projects_features[0];

        const projects_screenshot= await pool.query(`call sp_getProjects_screenshots(${projects[i].id});`)
        projects[i].screenshots = projects_screenshot[0];

    }
    return res.json(projects)
}
project.getOnlyProject = async(req, res)=>{
    const {project_id} = req.params

    let responseProject = await pool.query(`call sp_getProjects(${project_id});`)
    let project = responseProject[0][0];

    const tools = await pool.query(`call sp_getProjects_tools(${project_id});`)
    project.tools = tools[0];

    const languages = await pool.query(`call sp_getProjects_languages;(${project_id});`)
    project.languages = languages[0];

    const project_features = await pool.query(`call sp_getProjects_features(${project_id});`)
    project.features = project_features[0];

    const project_screenshot= await pool.query(`call sp_getProjects_screenshots(${project_id});`)
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

    let responseProject = await pool.query(`call sp_getProjects(${project_id});`)
    let project = responseProject[0][0];

    res.json(project)
}
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

project.deleteFeature = async(req, res)=>{
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
project.getScreenshots= async(req, res)=>{
    const {project_id} = req.params

    const projectsScreenshots = await pool.query(`call sp_getProjects_screenshots(${project_id});`)
    res.json(projectsScreenshots[0])
}

project.addScreenshots = async(req, res)=>{
    const {project_id} = req.params

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

project.updateScreenshots = async(req, res)=>{
    const {project_id} = req.params

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

project.deleteScreenshots = async(req, res)=>{
    const {project_id, screenshot_id} = req.params

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

project.getLanguages = async(req, res)=>{
    const {project_id} = req.params

    const projectsLanguage = await pool.query(`call sp_getProjects_languages(${project_id});`)
    res.json(projectsLanguage[0])
}

project.deleteLanguages = async(req, res)=>{
    const {project_id, language_id} = req.params

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
project.addLanguages = async(req, res)=>{
    const {project_id} = req.params

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
project.getTools = async(req, res)=>{
    const {project_id} = req.params

    const projectsTools = await pool.query(`call sp_getProjects_tools(${project_id});`)
    res.json(projectsTools[0])
}
project.addTools = async(req, res)=>{
    const {project_id} = req.params

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