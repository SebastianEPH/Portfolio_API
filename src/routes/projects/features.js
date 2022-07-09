const express  =  require('express');
const routes = express.Router();
const {getAll, getOnly, add, update,remove, addVerifyFields } = require("../../controller/projects/controller_features");
const {projects_id, features_id, valideFields} =  require("../../midlewares/valide");

routes.get('/my/projects/:projects_id/features',[projects_id], getAll)
routes.get('/my/projects/:projects_id/features/:features_id',[projects_id,features_id], getOnly)
routes.post('/my/projects/:projects_id/features', [projects_id] ,addVerifyFields, valideFields,add)
routes.put('/my/projects/:projects_id/features/:features_id', [projects_id,features_id],addVerifyFields, valideFields, update)
routes.delete('/my/projects/:projects_id/features/:features_id', [projects_id,features_id], remove)

module.exports = routes;