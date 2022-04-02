const express = require('express');
const routes = express.Router();

const person = require("../controller/controller_person")
// const accessToken = require('../middleware/index')
// const {verifyToken} = require ("../middleware/index")

// data
routes.get('/my', person.getAll)
routes.get('/my/project', person.getProject)

// routes.post('/myuser', accessToken.verifyToken, (req, res)=>{

// })

module.exports = routes;
