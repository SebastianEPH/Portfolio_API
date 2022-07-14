const express  =  require('express');
const routes = express.Router();
const {valideFields} = require("../../midlewares/helpers");
const {getAll,
        getOnly,
        add,
        update,
        remove,
        addFields,
        projects_id,
        tools_id} = require("../../controller/projects/controller_tools");

routes.get('/my/projects/:projects_id/tools', [projects_id,valideFields], getAll)
routes.get('/my/projects/:projects_id/tools/:tools_id', [projects_id,valideFields],getOnly)
routes.post('/my/projects/:projects_id/tools', [projects_id, addFields,valideFields], add)
routes.put('/my/projects/:projects_id/tools/:tools_id', [projects_id,addFields,valideFields], update)
routes.delete('/my/projects/:projects_id/tools/:tools_id', [projects_id, tools_id,valideFields], remove)

module.exports = routes;