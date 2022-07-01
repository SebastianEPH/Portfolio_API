const express  =  require('express');
const routes = express.Router();
const project = require("../../controller/controller_project");
const verify = require("../../midlewares/valide");

routes.use(verify.checkProjectsID)

routes.get('/projects/:project_id/screenshots', project.getScreenshots)
routes.post('/projects/:project_id/screenshots', project.addScreenshots)
routes.put('/projects/:project_id/screenshots', project.updateScreenshots)
routes.delete('/projects/:project_id/screenshots/:screenshots_id', project.deleteScreenshots)


module.exports = routes;