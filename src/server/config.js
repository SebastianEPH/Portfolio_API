const express = require('express');
const morgan = require('morgan');
const path = require('path');
// const session = require('express-session')
// const MysqlStore = require('express-mysql-session')
// const auth = require('../routes/auth')
// const passport = require('passport')
const env = require("dotenv")
const cors = require('cors')

module.exports = (app) => {

    // settings
    app.set('port', process.env.PORT || 5000);

    app.use(express.urlencoded({
        extended: false  // Los datos que se enviarán son muy sencillas
    }));

    env.config()

    // Meddlewares
    // app.use(session({
    //     secret: 'texto_session',    // Cómo guardara las sesiones
    //     resave: false, // false: para que no se vuelva a renovar la sesión
    //     saveUninitialized: false, // false: para que no se vuelva a establecer la sesión
    //     store: new MysqlStore(database) //  No guardar los datos dentro del servidor, si no dentro de la base de datos
    // }))
    // app.use(passport.initialize());
    // app.use(passport.session());
    //

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

    app.use(baseApi, require('../routes/projects/features')); // only projects
    app.use(baseApi, require('../routes/projects/projects')); // only projects

    // app.use(baseApi, require('../routes/project'));
    // app.use('/api/auth/', auth);
    // app.use(routers_index);
    // app.use('/task',routers_index);
    // routers(app);

    // Static files
    app.use('/public', express.static(path.join(__dirname, '../public')));
    return app;
};