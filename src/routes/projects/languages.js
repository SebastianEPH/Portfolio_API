const express  =  require('express');
const routes = express.Router();
const {getAll, getOnly,add, update, remove} = require("../../controller/projects/controller_languages");
const {projects_id,languages_id, valideFields} = require("../../midlewares/valide");
const {addVerify} = require("../../controller/projects/controller_languages");

routes.get('/my/projects/:projects_id/languages',[projects_id],getAll)
routes.get('/my/projects/:projects_id/languages/:languages_id',[projects_id,languages_id],getOnly)
routes.post('/my/projects/:projects_id/languages',[projects_id],addVerify, valideFields,add)
routes.put('/my/projects/:projects_id/languages/:languages_id',[projects_id,languages_id],addVerify, valideFields,update)
routes.delete('/my/projects/:projects_id/languages/:languages_id',[projects_id,languages_id], remove)

module.exports = routes;