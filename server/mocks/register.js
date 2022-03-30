'use strict';

module.exports = function(app) {
    const express = require('express');
    let registerRouter = express.Router();

    registerRouter.post('/', function(request, response) {
        let { username, name, email, password } = request.body;
        if (username && password && name && email) {
            response.status(200).json({ token: 'user token'});
        } else {
            response.status(401).send('Please fill in all fields in the form with valid data!');
        }
    });

    app.use('/api/register', require('body-parser').json());
    app.use('/api/register', registerRouter);
}