const pool = require("../database/database");
const {checkParams} = require("../midlewares/helpers");
const {toBoolean} = require("validator");

const project = {}

project.projects_id = checkParams("projects_id");

project.getAll = async(req, res)=>{
    const {short} = req.query

    const responseProjects  = await pool.query(`call sp_getProjectsAll();`);
    if (toBoolean(short||"false")){
        const myProjects = responseProjects[0];
        return res.json(myProjects);
    }

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
    return res.status(200).json(projects)
}
project.getOnly = async(req, res)=>{
    const {projects_id} = req.params
    const {short} = req.query

    const responseProjects = await pool.query(`call sp_getProjects(${projects_id});`)

    if (toBoolean(short||"false")){
        const myProjects = responseProjects[0];
        return res.json(myProjects);
    }

    const tools = await pool.query(`call sp_getProjects_toolsAll(${projects_id});`)
    const languages = await pool.query(`call sp_getProjects_languagesAll(${projects_id});`)
    const project_features = await pool.query(`call sp_getProjects_featuresAll(${projects_id});`)
    const project_screenshot= await pool.query(`call sp_getProjects_screenshotsAll(${projects_id});`)

    let project = responseProjects[0][0];
    project.screenshots = project_screenshot[0];
    project.tools = tools[0];
    project.features = project_features[0];

    project.languages = languages[0];

    res.json(project)

}
module.exports = project;