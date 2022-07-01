data = {}
const pool = require('../database/database')

data.getAll = async(req, res)=>{
    const information = await pool.query(`call sp_getMyInformation();`);
    const socialNetworks = await pool.query(`call sp_getMySocialNetworks();`);
    const languages = await pool.query(`call sp_getMyLanguages();`);
    const extra_knowedger = await pool.query(`call sp_getMyExtraKnowledge();`);
    const programmingLanguages = await pool.query(`call sp_getMyProgrammingLanguages();`);
    const programmingTools = await pool.query(`call sp_getMyProgrammingTools();`);

    let myInformation = information[0][0] ;

    myInformation.social_networks = socialNetworks[0];
    myInformation.languages = languages[0];
    myInformation.extra_knowedger = extra_knowedger[0];
    myInformation.programming_languages = programmingLanguages[0];
    myInformation.programming_tools = programmingTools[0];

    res.json(myInformation)
}
data.getAllShort = async(req, res)=>{
    const information = await pool.query(`call sp_getMyInformation();`);
    let myInformation = information[0][0] ;
    res.json(myInformation)
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