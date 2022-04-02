const express = require('express');
const morgan = require('morgan');
const path = require('path');
const {database} = require('../database/key')
// const session = require('express-session')
// const MysqlStore = require('express-mysql-session')
// const auth = require('../routes/auth')
const data = require('../routes/data')
// const passport = require('passport')
const cors = require('cors')

module.exports = (app) => {

    // settings
    app.set('port', process.env.PORT || 5000);

    app.use(express.urlencoded({
        extended: false  // Los datos que se enviarán son muy sencillas
    }));

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
    app.use('/api/', data);
    // app.use('/api/auth/', auth);
    // app.use(routers_index);
    // app.use('/task',routers_index);
    // routers(app);

    // Static files
    app.use('/public', express.static(path.join(__dirname, '../public')));
    return app;
};