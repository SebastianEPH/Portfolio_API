const {parse, DB} = require("../helpers/helpers");
const pool = require("../database/database");
const project = {}

project.UpdateFeature = async(req, res)=>{
    const {project_id} = req.params
    //parse IDs from params
    const parseIds = parse.IdForDB([project_id])
    if(!parseIds.passed){return res.status(parseIds.status).json({message:parseIds.message})}

    const response = await pool.query(`
            UPDATE 
                feature, description, img
            FROM project_feature
            WHERE project_id = ?
        `,[project_id])

}
project.AddFeature = async(req, res)=>{
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

project.DeleteFeature= async(req, res)=>{
    const {project_id} = req.params
    //parse IDs from params
    const parseIds = parse.IdForDB([project_id])
    if(!parseIds.passed){return res.status(parseIds.status).json({message:parseIds.message})}


    const response = await pool.query(`
            INSERT INTO
                feature, description, img
            FROM project_feature
            WHERE project_id = ?
        `,[project_id])
    res.json({message: " si se copio pex delete "})
}


project.getProjectOnly = async(req, res)=>{
    const {project_id} = req.params
    //parse IDs from params
    const parseIds = parse.IdForDB([project_id])
    if(!parseIds.passed){return res.status(parseIds.status).json({message:parseIds.message})}

    let project = await pool.query(`
        SELECT
        project.id,
        project.name,
        project.img,
        project.date_init,
        project.date_finish,
        project.web_deploy,
        project.description,
        project.repository,
        project.documentation,
        project_type.project_type as "type",
        project.version,
        project.architecture,
        project.state,
        project.size,
        project.platform,
        project.licence,
        project.ide,
        project_range.range,
        project_range.id as "range_id"
        FROM project
        LEFT JOIN project_type ON project.type_id = project_type.id
        LEFT JOIN project_range ON project.range = project_range.id
        WHERE project.id = ? 
        `,[project_id])

    let tools  = [];
    let language  = [];
    let features = [];
    let screenshot = [];
    const pTools = await pool.query(`
            SELECT
                programming_tools.tools,
                programming_tools.icon
            FROM project_tools
            JOIN programming_tools ON project_tools.tools = programming_tools.id
            WHERE project_id = ?
        `,[project_id])
    const pPerson = await pool.query(`
            SELECT
                *
            FROM person
        `)

    const pLanguage = await pool.query(`
            SELECT
               programming_language.language,
               programming_language.icon
            FROM project_language
            JOIN programming_language ON project_language.language = programming_language.id
            WHERE project_id = ?
        `,[project_id])//   programming_language.lcon

    const pFeatures = await pool.query(`
            SELECT
               *
            FROM project_feature
            WHERE project_id = ?
        `,[project_id])
    const pScreenshot = await pool.query(`
            SELECT
               *
            FROM project_screenshot
            WHERE project_id = ? 
    
        `,[project_id])
    console.log("screenshot pessss *-*****************************", screenshot)

    pScreenshot.map(data=> screenshot.push({
        screenshot: data.screenshot,
        details: data.details,
        number: data.number
    }));
    pFeatures.map(data=> features.push({
        feature: data.feature,
        description: data.description
    }));
    pTools.map(data=> tools.push({
        tools: data.tools,
        icon: data.icon
    }));
    pLanguage.map(data=> language.push({
        language:data.language,
        icon:data.icon
    }))
    project[0].person = pPerson[0];
    project[0].tools = tools;
    project[0].feature = features;
    project[0].screenshot = screenshot;
    project[0].language = language;

    res.json(project[0])


}




module.exports = project;