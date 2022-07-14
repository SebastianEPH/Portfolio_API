const express = require('express');
const morgan = require('morgan');
const path = require('path');
const env = require("dotenv")
const cors = require('cors')

module.exports = (app) => {
    env.config()

    // settings
    app.set('port', process.env.PORT || 5000);

    app.use(cors())

    app.use(morgan('dev'));
    app.use(express.urlencoded({
        extended: false
    }));
    app.use(express.json());

    //Routers
    const baseApi = `/api/${process.env.VERSION_API}`;

    app.use(baseApi, require('../routes/data'));
    app.use(baseApi, require('../routes/projects/projects'));

    app.use(baseApi, require('../routes/projects/languages'));
    app.use(baseApi, require('../routes/projects/screenshots'));
    app.use(baseApi, require('../routes/projects/features'));
    app.use(baseApi, require('../routes/projects/tools'));

    // Static files
    app.use('/public', express.static(path.join(__dirname, '../public')));
    return app;
};