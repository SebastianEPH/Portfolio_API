const express = require('express');
const routes = express.Router();

const data = require("../controller/controller_data")
// const accessToken = require('../middleware/index')
// const {verifyToken} = require ("../middleware/index")

// data
routes.get('/my', data.getAll)
    // routes.get('/my/project/:project_id', person.getProjectOnly)

routes.get('/my/language', data.getLanguage)

routes.get('/my/tools', data.getTools)

// routes.post('/myuser', accessToken.verifyToken, (req, res)=>{

// })

module.exports = routes;
