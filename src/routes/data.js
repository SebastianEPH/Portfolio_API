const express = require('express');
const routes = express.Router();
const data = require("../controller/controller_data");

routes.get('/my', data.getAll);
routes.get('/my/short', data.getAllShort);

routes.get('/my/languages', data.getLanguages);
routes.get('/my/programming_tools', data.getProgrammingTools);
routes.get('/my/programming_languages', data.getProgrammingLanguages);
routes.get('/my/extra_knowledge', data.getExtraKnowledge);
routes.get('/my/social_networks', data.getSocialNetworks);

// routes.post('/myuser', accessToken.verifyToken, (req, res)=>{

// })

module.exports = routes;
