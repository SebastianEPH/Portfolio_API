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
project.getOnlyProjects = async(req, res)=>{
    const {projects_id} = req.params

    const responseProjects = await pool.query(`call sp_getProjects(${projects_id});`)

    const tools = await pool.query(`call sp_getProjects_tools(${projects_id});`)
    const languages = await pool.query(`call sp_getProjects_languages(${projects_id});`)
    const project_features = await pool.query(`call sp_getProjects_features(${projects_id});`)
    const project_screenshot= await pool.query(`call sp_getProjects_screenshots(${projects_id});`)

    let project = responseProjects[0][0];
    project.screenshots = project_screenshot[0];
    project.tools = tools[0];
    project.features = project_features[0];

    project.languages = languages[0];

    res.json(project)

}
project.getAllProjectsShort = async(req, res)=>{
    const responseProjects  = await pool.query(`call sp_getAllProjects();`);
    const projects = responseProjects[0]
    return res.json(projects)
}
project.getOnlyProjectsShort = async(req, res)=>{
    const {projects_id} = req.params
        console.log('hola=> ', req.params)
    let responseProjects = await pool.query(`call sp_getProjects(${projects_id});`)
    let project = responseProjects[0][0];
    // console.log(" response projects =>",responseProjects)
    // console.log('projects=> ',project || [])
    res.json(project || [])
}

module.exports = project;