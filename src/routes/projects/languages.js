const express  =  require('express');
const routes = express.Router();
const project = require("../../controller/controller_project");
const verify = require("../../midlewares/valide");

routes.use(verify.checkProjectsID)

routes.get('/projects/:project_id/languages', project.getLanguages)
routes.post('/projects/:project_id/languages', project.addLanguages)
routes.delete('/projects/:project_id/languages/:language_id', project.deleteLanguages)


module.exports = routes;