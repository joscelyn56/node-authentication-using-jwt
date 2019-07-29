const express = require('express')
const app = express()

const http = require('http').createServer(app) // create server using express

const jwt = require('jsonwebtoken')
const config = require('./config') // jwt secret config file
const authJwt = require('./authJwt') // jwt authentication methods

const router = express.Router()

app.use(router);

// New endpoint to generate token for new user
router.get('/get-key', function(req, res) {
    let user = 'this is your secret key'

    // Generate a new token for user using the secret from the config file
    let token = jwt.sign({
            key: user
        },
        config.secret, {
            expiresIn: 86400 // expires in 24 hours
        }
    )

    return res.status(200).send({
        accessToken: token
    })
})

// verifyToken method is called from the authJWT file and added as a middleware to the end point
router.get('/check-key', authJwt.verifyToken, function(req, res) {
    let secret = 'Welcome to node express authentication'
    return res.status(200).send(secret)
})

http.listen(3001, function() {
    console.log("Server running");
});