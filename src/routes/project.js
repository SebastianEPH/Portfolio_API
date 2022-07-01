const express = require('express');
const routes = express.Router();

const project = require("../controller/controller_project")

// Tools
routes.post('/projects/:project_id/tools', project.addTools)
routes.delete('/projects/:project_id/tools/:tools_id', project.deleteTools)



module.exports = routes;