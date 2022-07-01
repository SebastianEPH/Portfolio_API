const express  =  require('express');
const routes = express.Router();
const project = require("../../controller/controller_project");
const verify = require("../../midlewares/valide");

routes.use(verify.checkProjectsID)

routes.get('/projects/:project_id/tools', project.getTools)
routes.post('/projects/:project_id/tools', project.addTools)
routes.delete('/projects/:project_id/tools/:tools_id', project.deleteTools)


module.exports = routes;