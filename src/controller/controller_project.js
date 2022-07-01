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
project.getOnlyProject = async(req, res)=>{
    const {project_id} = req.params

    let responseProject = await pool.query(`call sp_getProjects(${project_id});`)
    let project = responseProject[0][0];

    const tools = await pool.query(`call sp_getProjects_tools(${project_id});`)
    project.tools = tools[0];

    const languages = await pool.query(`call sp_getProjects_languages;(${project_id});`)
    project.languages = languages[0];

    const project_features = await pool.query(`call sp_getProjects_features(${project_id});`)
    project.features = project_features[0];

    const project_screenshot= await pool.query(`call sp_getProjects_screenshots(${project_id});`)
    project.screenshots = project_screenshot[0];

    res.json(project)
}
project.getAllProjectsShort = async(req, res)=>{
    const responseProjects  = await pool.query(`call sp_getAllProjects();`);
    const projects = responseProjects[0]
    console.log("all")
    return res.json(projects)
}
project.getOnlyProjectShort = async(req, res)=>{
    const {project_id} = req.params

    let responseProject = await pool.query(`call sp_getProjects(${project_id});`)
    let project = responseProject[0][0];

    res.json(project)
}

module.exports = project;