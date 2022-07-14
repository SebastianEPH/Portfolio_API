const express  =  require('express');
const routes = express.Router();
const {valideFields} = require("../../midlewares/helpers");
const {getAll,
        getOnly,
        projects_id} =  require("../../controller/controller_project");

routes.get("/my/projects", getAll)
routes.get('/my/projects/:projects_id', [projects_id,valideFields], getOnly)

module.exports = routes;