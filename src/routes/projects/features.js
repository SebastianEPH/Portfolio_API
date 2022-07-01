const express  =  require('express');
const routes = express.Router();
const project = require("../../controller/projects/controller_features");
const {project_id, features_id} =  require("../../midlewares/valide");


routes.get('/my/projects/:projects_id/features',[project_id], project.getFeatures)
routes.post('/my/projects/:projects_id/features', [project_id],project.addFeatures)
routes.put('/my/projects/:projects_id/features', [project_id],project.updateFeatures)
routes.delete('/my/projects/:projects_id/features/:features_id', [project_id,features_id],project.deleteFeatures)


module.exports = routes;
