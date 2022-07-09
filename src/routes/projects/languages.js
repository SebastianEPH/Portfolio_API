const express  =  require('express');
const routes = express.Router();
const {getAll, getOnly} = require("../../controller/projects/controller_languages");
const {projects_id,languages_id} = require("../../midlewares/valide");

routes.get('/my/projects/:projects_id/languages',[projects_id],getAll)
routes.get('/my/projects/:projects_id/languages/:languages_id',[projects_id,languages_id],getOnly)
routes.post('/my/projects/:projects_id/languages',[projects_id])
routes.put('/my/projects/:projects_id/languages/:languages_id',[projects_id,languages_id])
routes.delete('/my/projects/:projects_id/languages/:languages_id',[projects_id,languages_id])

module.exports = routes;