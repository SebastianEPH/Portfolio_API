const express  =  require('express');
const routes = express.Router();
const project = require("../../controller/projects/controller_screnshots");
const verify = require("../../midlewares/valide");

routes.use(verify.checkProjectsID)

routes.get('/projects/:projects_id/screenshots', project.getScreenshots)
routes.post('/projects/:projects_id/screenshots', project.addScreenshots)
routes.put('/projects/:projects_id/screenshots', project.updateScreenshots)
routes.delete('/projects/:projects_id/screenshots/:screenshots_id', project.deleteScreenshots)


module.exports = routes;