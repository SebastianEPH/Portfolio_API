const express  =  require('express');
const routes = express.Router();
const {valideFields} = require("../../midlewares/helpers");
const {getAll,
    getOnly,
    add,
    update,
    remove,
    addVerify,
    projects_id,
    languages_id} = require("../../controller/projects/controller_languages");

routes.get('/my/projects/:projects_id/languages',[projects_id, valideFields],getAll)
routes.get('/my/projects/:projects_id/languages/:languages_id',[projects_id, languages_id, valideFields],getOnly)
routes.post('/my/projects/:projects_id/languages',[projects_id, addVerify, valideFields],add)
routes.put('/my/projects/:projects_id/languages/:languages_id',[projects_id,languages_id, addVerify, valideFields],update)
routes.delete('/my/projects/:projects_id/languages/:languages_id',[projects_id,languages_id,valideFields], remove)

module.exports = routes;