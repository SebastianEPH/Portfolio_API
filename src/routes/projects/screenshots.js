const express  =  require('express');
const routes = express.Router();
const {getAll, getOnly, add,update, remove,addVerifyFields} = require("../../controller/projects/controller_screnshots");
const {projects_id,screenshots_id, valideFields} = require("../../midlewares/valide");

routes.get('/my/projects/:projects_id/screenshots', [projects_id], getAll)
routes.get('/my/projects/:projects_id/screenshots/:screenshots_id', [projects_id], getOnly)
routes.post('/my/projects/:projects_id/screenshots',[projects_id],addVerifyFields, valideFields, add)
routes.put('/my/projects/:projects_id/screenshots/:screenshots_id', [projects_id],addVerifyFields, valideFields,update)
routes.delete('/my/projects/:projects_id/screenshots/:screenshots_id',[projects_id,screenshots_id], remove)

module.exports = routes;