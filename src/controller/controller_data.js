data = {}
const pool = require('../database/database')

data.getAll = async(req, res)=>{
    const information = await pool.query(`call sp_getMyInformation();`);
    const socialNetworks = await pool.query(`call sp_getMySocialNetworks();`);
    const languages = await pool.query(`call sp_getMyLanguages();`);
    const extra_knowledge = await pool.query(`call sp_getMyExtraKnowledge();`);
    const programmingLanguages = await pool.query(`call sp_getMyProgrammingLanguages();`);
    const programmingTools = await pool.query(`call sp_getMyProgrammingTools();`);

    let myInformation = information[0][0] ;

    myInformation.social_networks = socialNetworks[0];
    myInformation.languages = languages[0];
    myInformation.extra_knowledge = extra_knowledge[0];
    myInformation.programming_languages = programmingLanguages[0];
    myInformation.programming_tools = programmingTools[0];

    res.json(myInformation);
}
data.getAllShort = async(req, res)=>{
    const information = await pool.query(`call sp_getMyInformation();`);
    let myInformation = information[0][0] ;
    res.json(myInformation);
}

data.getSocialNetworks = async(req, res)=>{
    const socialNetworks = await pool.query(`call sp_getMySocialNetworks();`);
    res.json(socialNetworks[0]);
}

data.getLanguages = async(req, res)=>{
    const languages = await pool.query(`call sp_getMyLanguages();`);
    res.json(languages[0]);
}
data.getProgrammingTools = async(req, res)=>{
    const programmingTools = await pool.query(`call sp_getMyProgrammingTools();`);
    res.json(programmingTools[0]);
}
data.getProgrammingLanguages = async(req, res)=>{
    const programmingLanguages = await pool.query(`call sp_getMyProgrammingLanguages();`);
    res.json(programmingLanguages[0]);
}
data.getExtraKnowledge = async(req, res)=>{
    const extra_knowledge = await pool.query(`call sp_getMyExtraKnowledge();`);
    res.json(extra_knowledge[0]);
}


module.exports = data ;