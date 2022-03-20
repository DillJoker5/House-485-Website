'use strict';

module.exports = function(app) {
    const express = require('express');
    let tokenRouter = express.Router();

    tokenRouter.post('/', function(request, response) {
        let { username, password } = request.body;
        if (username == 'dylan' && password == 'admin') {
            response.status(200).json({ token: 'admin token'});
        } else {
            response.status(401).send('Invalid Credentials. Please try again!');
        }
    });

    app.use('/api/token', require('body-parser').json());
    app.use('/api/token', tokenRouter);
}