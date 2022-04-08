const express = require('express');
const routes = express.Router();

const project = require("../controller/controller_project")
// data
routes.get('/my/project/:project_id', project.getProjectOnly)

// Feature
routes.get('/my/projects', project.getProjectsAll)
routes.post('/my/project/:project_id/feature', project.AddFeature)
routes.put('/my/project/:project_id/feature', project.updateFeature)
routes.delete('/my/project/:project_id/feature/:feature_id', project.deleteFeature)

// Screenshot
routes.post('/my/project/:project_id/screenshot', project.AddScreenshot)
routes.put('/my/project/:project_id/screenshot', project.updateScreenshot)
routes.delete('/my/project/:project_id/screenshot/:screenshot_id', project.deleteScreenshot)



module.exports = routes;