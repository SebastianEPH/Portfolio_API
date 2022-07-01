const express  =  require('express');
const routes = express.Router();
const project = require("../../controller/projects/controller_features");
const verify =  require("../../midlewares/valide");

routes.use(verify.checkProjectsID);

routes.get('/projects/:projects_id/features', project.getFeatures)
routes.post('/projects/:projects_id/features', project.addFeatures)
routes.put('/projects/:projects_id/features', project.updateFeatures)
routes.delete('/projects/:projects_id/features/:features_id', project.deleteFeatures)


module.exports = routes;