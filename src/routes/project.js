const express = require('express');
const routes = express.Router();

const project = require("../controller/controller_project")


// data
// routes.get('/projects/:project_id', project.getProjectOnly)

// Feature
// routes.get('/projects', project.getProjectsAll)
routes.post('/projects/:project_id/feature', project.AddFeature)
routes.put('/projects/:project_id/feature', project.updateFeature)
routes.delete('/projects/:project_id/feature/:feature_id', project.deleteFeature)

// Screenshot
routes.post('/projects/:project_id/screenshot', project.AddScreenshot)
routes.put('/projects/:project_id/screenshot', project.updateScreenshot)
routes.delete('/projects/:project_id/screenshot/:screenshot_id', project.deleteScreenshot)

// Language
routes.post('/projects/:project_id/language', project.addLanguage)
routes.delete('/projects/:project_id/language/:language_id', project.deleteLanguage)

// Tools
routes.post('/projects/:project_id/tools', project.addTools)
routes.delete('/projects/:project_id/tools/:tools_id', project.deleteTools)



module.exports = routes;