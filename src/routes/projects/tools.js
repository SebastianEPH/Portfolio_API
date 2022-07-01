const express  =  require('express');
const routes = express.Router();
const project = require("../../controller/projects/controller_tools");
const verify = require("../../midlewares/valide");

routes.use(verify.checkProjectsID)

routes.get('/projects/:projects_id/tools', project.getTools)
routes.post('/projects/:projects_id/tools', project.addTools)
routes.delete('/projects/:projects_id/tools/:tools_id', project.deleteTools)


module.exports = routes;