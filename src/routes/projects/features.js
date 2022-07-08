const express  =  require('express');
const routes = express.Router();
const {getAll, add, update,remove, addVerifyFields } = require("../../controller/projects/controller_features");
const {project_id, features_id, valideFields} =  require("../../midlewares/valide");

routes.get('/my/projects/:projects_id/features',[project_id], getAll)
routes.post('/my/projects/:projects_id/features', [project_id] ,addVerifyFields, valideFields,add)
routes.put('/my/projects/:projects_id/features/:features_id', [project_id,features_id],addVerifyFields, valideFields, update)
routes.delete('/my/projects/:projects_id/features/:features_id', [project_id,features_id], remove)

module.exports = routes;