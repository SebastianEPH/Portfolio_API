const express = require('express');
const morgan = require('morgan');
const path = require('path');
const env = require("dotenv")
const cors = require('cors')

module.exports = (app) => {
    // settings
    app.set('port', process.env.PORT || 5000);

    app.use(express.urlencoded({
        extended: false  // Los datos que se enviarán son muy sencillas
    }));

    env.config() // get vars env

    app.use(cors())

    app.use(morgan('dev'));
    app.use(express.urlencoded({
        extended: false  // Los datos que se enviarán son muy sencillas
    }));
    app.use(express.json()); // Acepta json


    // // Global Valiables
    // app.use((req, res, next)=>{
    //     app.locals.user = req.user; // Almacenamos datos del usuario
    //     //app.locals.exam = req.exam; // Almacenamos Preguntas
    //     next();
    // });


    //Routers
    const baseApi = `/api/${process.env.VERSION_API}`;

    app.use(baseApi , require('../routes/data'));

    app.use(baseApi, require('../routes/projects/projects')); // only projects
    app.use(baseApi, require('../routes/projects/languages'));
    app.use(baseApi, require('../routes/projects/features'));
    app.use(baseApi, require('../routes/projects/tools'));

    app.use(baseApi, require('../routes/projects/screenshots'));


    // Static files
    app.use('/public', express.static(path.join(__dirname, '../public')));
    return app;
};