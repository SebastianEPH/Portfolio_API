const express  =  require('express');
const routes = express.Router();
const projects =  require("../../controller/controller_project");
const verify = require("../../midlewares/valide");


routes.get("/projects", projects.getAllProjects)
routes.get("/projects/short", projects.getAllProjectsShort)

routes.use(verify.checkProjectsID)

routes.get('/projects/:projects_id', projects.getOnlyProject)
routes.get('/projects/short/:projects_id', projects.getOnlyProjectShort)


module.exports = routes;