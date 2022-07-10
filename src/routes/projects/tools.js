const express  =  require('express');
const routes = express.Router();
const {getAll,getOnly, add,update, remove, addFields} = require("../../controller/projects/controller_tools");
const {projects_id, tools_id, valideFields} = require("../../midlewares/valide");

routes.get('/my/projects/:projects_id/tools', [projects_id], getAll)
routes.get('/my/projects/:projects_id/tools/:tools_id', [projects_id],getOnly)
routes.post('/my/projects/:projects_id/tools', [projects_id], addFields,valideFields, add)
routes.put('/my/projects/:projects_id/tools/:tools_id', [projects_id],addFields,valideFields, update)
routes.delete('/my/projects/:projects_id/tools/:tools_id', [projects_id, tools_id], remove)

module.exports = routes;