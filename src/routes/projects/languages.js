const express  =  require('express');
const routes = express.Router();
const project = require("../../controller/projects/controller_languages");
const verify = require("../../midlewares/valide");

routes.use(verify.checkProjectsID)

routes.get('/projects/:projects_id/languages', project.getLanguages)
routes.post('/projects/:projects_id/languages', project.addLanguages)
routes.delete('/projects/:projects_id/languages/:languages_id', project.deleteLanguages)


module.exports = routes;