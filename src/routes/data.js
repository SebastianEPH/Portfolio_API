const express = require('express');
const routes = express.Router();
const {getAll,
        getEmails,
        getPhones,
        getLanguages,
        getProgrammingTools,
        getProgrammingLanguages,
        getExtraKnowledge,
        getSocialNetworks} = require("../controller/controller_data");

routes.get('/my', getAll);
routes.get('/my/languages', getLanguages);

routes.get('/my/emails', getEmails);
routes.get('/my/phone', getPhones);

routes.get('/my/programming_tools', getProgrammingTools);
routes.get('/my/programming_languages', getProgrammingLanguages);
routes.get('/my/extra_knowledge', getExtraKnowledge);
routes.get('/my/social_networks', getSocialNetworks);

module.exports = routes;