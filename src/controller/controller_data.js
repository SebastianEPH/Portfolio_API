data = {}
const pool = require('../database/database')

data.getAll = async(req, res)=>{
    let myData = {}
    const person = await pool.query(`
        SELECT * 
        from  person
    `)
    const person_contact = await pool.query(`
        SELECT * 
        from  person_contact
    `)
    const person_languages = await pool.query(`
        SELECT 
        languages.id,
        languages.language,
        languages.dificulty as "dificulty_id",
        dificulty.dificulty
        from  languages
        left join dificulty ON languages.dificulty = dificulty.id
    `)
    const extra_knowledge = await pool.query(`
        SELECT 
        extra_knowledge.id,
        extra_knowledge.knowlegge,
        extra_knowledge.icon,
        dificulty.id as "dificulty_id",
        dificulty.dificulty 
        from  extra_knowledge
        left join dificulty ON extra_knowledge.dificulty = dificulty.id
    `)
    const programming_language = await pool.query(`
        SELECT 
        programming_language.language,
        programming_language.name_short,
        programming_language.icon,
        dificulty.dificulty 
        from  programming_language
        left join dificulty ON programming_language.dificulty = dificulty.id
    `)
    const programming_tools = await pool.query(`
        SELECT 
        programming_tools.tools,
        programming_tools.icon,
        dificulty.dificulty 
        from  programming_tools
        left join dificulty ON programming_tools.dificulty = dificulty.id
        where programming_tools.lib  = 1
    `)

    myData = {...person[0]}
    myData.programming_language = programming_language
    myData.programming_tools = programming_tools
    myData.contact = person_contact
    myData.languages = person_languages
    myData.extra_knowledge = extra_knowledge


    console.log(myData)

    res.json(myData)

}

data.getLanguage = async(req, res)=>{
    const Language = await pool.query(`
            SELECT
               programming_language.id,
               programming_language.language,
               programming_language.icon,
               programming_language.dificulty as "dificulty_id",
               dificulty.dificulty
            FROM programming_language
            left join dificulty ON programming_language.dificulty = dificulty.id
  
        `)//   programming_language.lcon             WHERE project_id = ?
    res.json(Language)
}
data.getTools = async(req, res)=>{
    const Language = await pool.query(`
            SELECT
               programming_tools.id,
               programming_tools.tools,
               programming_tools.icon,
               programming_tools.dificulty as "dificulty_id",
               dificulty.dificulty
            FROM programming_tools
            left join dificulty ON programming_tools.dificulty = dificulty.id
  
        `)//   programming_language.lcon             WHERE project_id = ?
    res.json(Language)
}



module.exports = data ;