const express  =  require('express');
const routes = express.Router();
const {valideFields} =  require("../../midlewares/helpers");
const {getAll,
    getOnly,
    add,
    update,
    remove,
    addVerifyFields,
    projects_id,
    features_id } = require("../../controller/projects/controller_features");

routes.get('/my/projects/:projects_id/features',[projects_id, valideFields], getAll)
routes.get('/my/projects/:projects_id/features/:features_id',[projects_id, features_id, valideFields], getOnly)
routes.post('/my/projects/:projects_id/features', [projects_id, addVerifyFields, valideFields], add)
routes.put('/my/projects/:projects_id/features/:features_id', [projects_id, features_id, addVerifyFields, valideFields], update)
routes.delete('/my/projects/:projects_id/features/:features_id', [projects_id, features_id, valideFields], remove)

module.exports = routes;