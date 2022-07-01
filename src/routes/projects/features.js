const express  =  require('express');
const routes = express.Router();
const project = require("../../controller/controller_project");

routes.post('/projects/:project_id/feature', project.addFeatures)
routes.put('/projects/:project_id/feature', project.updateFeatures)
routes.delete('/projects/:project_id/feature/:feature_id', project.deleteFeature)


module.exports = routes;