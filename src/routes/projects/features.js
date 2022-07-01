const express  =  require('express');
const routes = express.Router();
const project = require("../../controller/controller_project");

routes.get('/projects/:project_id/features', project.getFeatures)
routes.post('/projects/:project_id/features', project.addFeatures)
routes.put('/projects/:project_id/features', project.updateFeatures)
routes.delete('/projects/:project_id/features/:feature_id', project.deleteFeature)


module.exports = routes;