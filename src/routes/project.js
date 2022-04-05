const express = require('express');
const routes = express.Router();

const project = require("../controller/controller_project")
// const accessToken = require('../middleware/index')
// const {verifyToken} = require ("../middleware/index")

// data
routes.get('/my/project/:project_id', project.getProjectOnly)

routes.put('/my/project/:project_id/feature', project.UpdateFeature)
routes.post('/my/project/:project_id/feature', project.AddFeature)
routes.delete('/my/project/:project_id/feature/:feature_id', project.deleteFeature)
// routes.post('/myuser', accessToken.verifyToken, (req, res)=>{

// })

module.exports = routes;
