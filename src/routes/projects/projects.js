const express  =  require('express');
const routes = express.Router();
const projects =  require("../../controller/controller_project");
const {projects_id} = require("../../midlewares/valide");


routes.get("/my/projects", projects.getAllProjects)
routes.get("/my/projects_short/", projects.getAllProjectsShort)

routes.get('/my/projects/:projects_id', [projects_id],  projects.getOnlyProjects)
routes.get('/my/projects_short/:projects_id', [projects_id], projects.getOnlyProjectsShort)


module.exports = routes;