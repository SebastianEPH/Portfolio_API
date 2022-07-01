const express = require('express');
const routes = express.Router();
const data = require("../controller/controller_data")

routes.get('/my', data.getAll)
routes.get('/my/short', data.getAllShort)

routes.get('/my/language', data.getLanguage)

routes.get('/my/tools', data.getTools)

// routes.post('/myuser', accessToken.verifyToken, (req, res)=>{

// })

module.exports = routes;
