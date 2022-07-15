data = {}
const pool = require('../database/database')
const {toBoolean} = require("validator");

data.getAll = async(req, res)=>{
    const {short} = req.query

    const information = await pool.query(`call sp_getMyInformation();`);
    if (toBoolean(short||"false")){
        const myInformation = information[0][0];
        return res.json(myInformation);
    }

    const socialNetworks = await pool.query(`call sp_getMySocialNetworks();`);
    const languages = await pool.query(`call sp_getMyLanguages();`);
    const extra_knowledge = await pool.query(`call sp_getMyExtraKnowledge();`);
    const programmingLanguages = await pool.query(`call sp_getMyProgrammingLanguages();`);
    const programmingTools = await pool.query(`call sp_getMyProgrammingTools();`);
    const responseProjects = await pool.query("call sp_getProjectsAll();");

    let myInformation = information[0][0] ;

    myInformation.social_networks = socialNetworks[0];
    myInformation.languages = languages[0];
    myInformation.extra_knowledge = extra_knowledge[0];
    myInformation.programming_languages = programmingLanguages[0];
    myInformation.programming_tools = programmingTools[0];

    const projects = responseProjects[0]

    for (let i = 0; i < projects.length; i++) {
        const tools = await pool.query(`call sp_getProjects_toolsAll(${projects[i].id});`)
        projects[i].tools = tools[0];

        const languages = await pool.query(`call sp_getProjects_languagesAll(${projects[i].id});`)
        projects[i].languages = languages[0];

        const projects_features = await pool.query(`call sp_getProjects_featuresAll(${projects[i].id});`)
        projects[i].features = projects_features[0];

        const projects_screenshot= await pool.query(`call sp_getProjects_screenshotsAll(${projects[i].id});`)
        projects[i].screenshots = projects_screenshot[0];

    }

    myInformation.projects = projects[0];

    res.status(200).json(myInformation);
}

data.getSocialNetworks = async(req, res)=>{
    const socialNetworks = await pool.query(`call sp_getMySocialNetworks();`);
    res.json(socialNetworks[0]);
}
data.getEmails = async(req, res)=>{
    const emails = await pool.query(`call sp_getMyInformation_emails();`);
    res.json(emails[0]);
}
data.getPhones= async(req, res)=>{
    const phones = await pool.query(`call sp_getMyInformation_emails();`);
    res.json(phones[0]);
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