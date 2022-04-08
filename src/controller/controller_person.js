const {parse} = require("../helpers/helpers")
person = {}
const pool = require('../database/database')

const person_id = 1
person.getAll = async(req, res)=>{
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

    myData = {...person[0]}
    myData.contact = person_contact
    myData.languages = person_languages
    myData.extra_knowledge = extra_knowledge


    console.log(myData)

    res.json(myData)

}


module.exports = person ;