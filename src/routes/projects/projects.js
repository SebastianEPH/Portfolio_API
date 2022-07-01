const express  =  require('express');
const routes = express.Router();
const projects =  require("../../controller/controller_project");

routes.get("/projects", projects.getProjectsAll) // all projects
routes.get('/projects/:project_id', projects.getProjectOnly)


module.exports = routes;