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
        project.web_deploy,
        project.description,
        project.repository,
        project_type.project_type as "type"
        FROM project
        LEFT JOIN project_type ON project.type_id = project_type.id
        
        `)
        // project.hola = await "hola pex "
        // project.map( async function(p, index){
        //         const letters = await pool.query(`
        //                 SELECT
        //                    programming_tools.tools
        //                 FROM project_tools
        //                 JOIN programming_tools ON project_tools.tools = programming_tools.id
        //                 WHERE project_id = ${p.id}
        //         `)
        //         project.tools = await  letters
        //         console.log(p.id)
        //         console.log(letters,"esto es reo ")
        //         console.log("luego de la union", project)
        //         console.log("luego de la union con tools", project)
        // })
        for (let i = 0; i < project.length; i++) {
            let tools  = [];
            let language  = [];
            const pTools = await pool.query(`
                SELECT
                   programming_tools.tools
                FROM project_tools
                JOIN programming_tools ON project_tools.tools = programming_tools.id
                WHERE project_id = ${project[i].id}
            `)
            const pLanguage = await pool.query(`
                SELECT
                   programming_language.language
                FROM project_language
                JOIN programming_language ON project_language.language = programming_language.id
                WHERE project_id = ${project[i].id}
            `)
            pTools.map(data=> tools.push(data.tools));
            pLanguage.map(data=> language.push(data.language))
            project[i].tools = tools;
            project[i].language = language;



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



module.exports = person ;