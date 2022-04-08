const {parse, DB} = require("../helpers/helpers");
const pool = require("../database/database");
const project = {}


project.getProjectsAll = async(req, res)=>{
    let projects = []
    let project = await pool.query(`
        SELECT
        project.id,
        project.name,
        project.date_init,
        project.date_finish,
        project.web_deploy,
        project.short_details,
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
        ORDER BY range_id DESC
        `)

    for (let i = 0; i < project.length; i++) {
        let tools  = [];
        let language  = [];
        const pTools = await pool.query(`
                SELECT
                    programming_tools.id as "sdfs",
                    programming_tools.tools,
                    programming_tools.icon
                FROM project_tools
                JOIN programming_tools ON project_tools.tools = programming_tools.id
                WHERE project_id = ${project[i].id}
            `)
        const pLanguage = await pool.query(`
                SELECT
                   programming_language.language,
                   programming_language.icon
                FROM project_language
                JOIN programming_language ON project_language.language = programming_language.id
                WHERE project_id = ${project[i].id}
            `)//   programming_language.lcon
        pTools.map(data=> tools.push({
            tools: data.tools,
            icon: data.icon
        }));
        pLanguage.map(data=> language.push({
            language:data.language,
            icon:data.icon
        }))
        project[i].tools = tools;
        project[i].language = language;

        //programming_tools.tools
        console.log("Esto es lo la consulta tools  ",pTools)

        console.log(i, "<= solo i ")
        console.log(project[i], "<= es el objeto nuevo ")
        console.log(project[i].id, "<= este si es el id ")
    }

    // project.map(async({id: project_id})=>{
    //         const letters = await pool.query(`
    //                 SELECT
    //                    programming_tools.tools
    //                 FROM project_tools
    //                 JOIN programming_tools ON project_tools.tools = programming_tools.id
    //                 WHERE project_id = ${project_id}
    //         `)
    //         let toolse  = []
    //         letters.map((data)=>{
    //                 toolse.push(data.tools)
    //         })
    //         project[project_id].tools = await toolse
    //         console.log(project[project_id], "<= verifica esto wee ")
    //         console.log(letters,"esto es reo ")
    //         console.log("luego de la union", project)
    //         console.log("luego de la union con tools", project)
    // })

    // const project = await pool.query(`
    // SELECT
    //     *
    // FROM project_tools
    // JOIN project  ON project_tools.project_id = project.id
    //
    // `)

    // '(SELECT count(*) FROM person_account WHERE person = person_id) as "accounts" ' +// count account
    //         const project_tools = await pool.query(`
    //                 SELECT
    //                     project_tools.tools
    //                 FROM project_tools
    //                 JOIN programming_tools ON project_tools.tools = programming_tools.id
    //                 WHERE project_id = 2
    //
    //         `)
    // const project = await pool.query(`
    //         SELECT
    //         l.id
    //         FROM project_tools AS pt ,project_language AS pl , programming_language AS l, programming_tools AS t
    //         JOIN l ON pl.language =  l.id
    //
    // `)
    //        LEFT JOIN project_language ON project.project_id = project.id
//         project_tools.project_id,
//         FROM project //, project_tools
    //         project.type_id
    console.log(project[0].id)

//         res.json([project,project_tools])
    return res.json(project)
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
        project.short_details,
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

    // let tools  = [];
    // let language  = [];
    // let features = [];
    // let screenshot = [];
    const pTools = await pool.query(`
            SELECT
                project_tools.id ,
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
               project_language.id,
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
            ORDER BY number ASC;
    
        `,[project_id])
    // console.log("screenshot pessss *-*****************************", screenshot)
    //
    // pScreenshot.map(data=> screenshot.push({
    //     id: data.id,
    //     screenshot: data.screenshot,
    //     details: data.details,
    //     number: data.number
    // }));
    // pFeatures.map(data=> features.push({
    //     id: data.id,
    //     feature: data.feature,
    //     description: data.description,
    //     img: data.img
    // }));
    // pTools.map(data=> tools.push({
    //     id: data.id,
    //     tools: data.tools,
    //     icon: data.icon
    // }));
    // pLanguage.map(data=> language.push({
    //     id:data.id,
    //     language:data.language,
    //     icon:data.icon
    // }))
    project[0].person = pPerson[0];
    project[0].tools = pTools //tools;
    project[0].feature = pFeatures;
    project[0].screenshot = pScreenshot;
    project[0].language = pLanguage//language;

    res.json(project[0])


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