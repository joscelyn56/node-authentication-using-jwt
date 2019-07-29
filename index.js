const express = require('express')
const app = express()

const http = require('http').createServer(app)

const jwt = require('jsonwebtoken')
const authJwt = require('./authJwt')
const config = require('./config.js')

const router = express.Router()

router.get('/get-key', function(req, res) {
    let secret = 'this is your secret key'
    let token = jwt.sign({
            key: secret
        },
        config.secret, {
            expiresIn: 86400 // expires in 24 hours
        }
    )

    return res.status(200).send({
        accessToken: token
    })
})

router.get('/check-key', authJwt.verifyToken, function(req, res) {
    let secret = req.key

    return res.status(200).send(secret)
})

app.use(router);

http.listen(3001, function() {
    console.log("Server running");
});