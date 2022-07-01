const express  =  require('express');
const routes = express.Router();
const projects =  require("../../controller/controller_project");

routes.get("/projects", projects.getAllProjects)
routes.get("/projects/short", projects.getAllProjectsShort)

routes.get('/projects/:project_id', projects.getOnlyProject)
routes.get('/projects/short/:project_id', projects.getOnlyProjectShort)


module.exports = routes;