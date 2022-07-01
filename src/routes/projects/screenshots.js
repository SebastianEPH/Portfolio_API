const express  =  require('express');
const routes = express.Router();
const project = require("../../controller/projects/controller_screnshots");
const {project_id,screenshots_id} = require("../../midlewares/valide");


routes.get('/my/projects/:projects_id/screenshots', [project_id],project.getScreenshots)
routes.post('/my/projects/:projects_id/screenshots',[project_id], project.addScreenshots)
routes.put('/my/projects/:projects_id/screenshots', [project_id],project.updateScreenshots)
routes.delete('/my/projects/:projects_id/screenshots/:screenshots_id',[project_id,screenshots_id ], project.deleteScreenshots)

module.exports = routes;