const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = (req, res, next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).send({error: 'Token não fornecido'});

    const parts = authHeader.split(' ');

    if(!parts.length == 2)
        return res.status(401).send({error: 'Token error'});

    const [schema, token] = parts;

    if(!/^Bearer$/i.test(schema))
        return res.status(401).send({error: 'Formato desconhecido do Token'})
    
    jwt.verify(token, process.env.TOKEN_JWT, (err, decoded)=>{
        if(err) return res.status(401).send({error: 'Token inválido'})

        req.userId = decoded.id;
        return next();
    });
}