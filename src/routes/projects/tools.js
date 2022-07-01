const express  =  require('express');
const routes = express.Router();
const project = require("../../controller/projects/controller_tools");
const {project_id, tools_id} = require("../../midlewares/valide");

routes.get('/my/projects/:projects_id/tools', [project_id],project.getTools)
routes.post('/my/projects/:projects_id/tools', [project_id],project.addTools)
routes.delete('/my/projects/:projects_id/tools/:tools_id', [project_id, tools_id],project.deleteTools)

module.exports = routes;