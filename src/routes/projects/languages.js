const express  =  require('express');
const routes = express.Router();
const project = require("../../controller/projects/controller_languages");
const {project_id,languages_id} = require("../../midlewares/valide");

routes.get('/my/projects/:projects_id/languages',[project_id], project.getLanguages)
routes.post('/my/projects/:projects_id/languages',[project_id], project.addLanguages)
routes.delete('/my/projects/:projects_id/languages/:languages_id',[project_id,languages_id], project.deleteLanguages)

module.exports = routes;