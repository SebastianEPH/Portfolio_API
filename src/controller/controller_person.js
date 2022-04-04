const {parse} = require("../helpers/helpers")
person = {}
const pool = require('../database/database')

const person_id = 1
person.getAll = async(req, res)=>{

    // const store = await pool.query('SELECT * from store')
    // console.log('esntro al de store ' +
    //     '/?  ')
    // console.log(store)
    res.json({message:"ok"})

}
person.getProject = async(req, res)=>{
        let projects = []
        let project = await pool.query(`
        SELECT
        project.id,
        project.name,
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
        
        `)

        for (let i = 0; i < project.length; i++) {
            let tools  = [];
            let language  = [];
            const pTools = await pool.query(`
                SELECT
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
person.getProjectOnly = async(req, res)=>{
    const {project_id} = req.params
    //parse IDs from params
    const parseIds = parse.IdForDB([project_id])
    if(!parseIds.passed){return res.status(parseIds.status).json({message:parseIds.message})}

    let project = await pool.query(`
        SELECT
        project.id,
        project.name,
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


module.exports = person ;