const express = require('express');
const configServer = require('./server/config')

// set config
const app = configServer(express());

//starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});
