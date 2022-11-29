'use strict';

// jwt means json web token
const jwt = require('jsonwebtoken');
// jwks = json web ket set
const jwksClient = require('jwks-rsa');
// jwks uri comes from auth0 account page account-advanced settings-endpoints- json webkey set in auth0
const client  = jwksClient({
    jwksUri: process.env.JWKS_URI
});

// get key function so things work
// this scomes from json webtoken docs
function getKey(header, callback) {
    client.getSigningKey(header.kid, function(err, key) {
        var signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
    })
}

function verifyUser(req, errorFirstOrUserCallbackFunction) {
    try {
        const token  = req.headers.authorization.split(' ')[1];
        jwt.verify(token, getKey, {}, errorFirstOrUserCallbackFunction)
    } catch(error) {
        errorFirstOrUserCallbackFunction('Not Authorized');
    }
}

module.export = verifyUser;
