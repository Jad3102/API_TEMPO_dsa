const express = require('express');
var http = require('http');
const app = express();
const jwt = require('jsonwebtoken');

function generateToken(user) {
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
  }

function authenticateToken(req, res, next) {
const authHeader = req.headers.authorization;
const token = authHeader && authHeader.split(' ')[1];
if (token == null) {
    return res.sendStatus(401);
}

jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
    return res.sendStatus(403);
    }
    req.user = user;
    next();
});
}

app.get('/home',(req,res) => {
    res.status(200).send("Bem-vindo a nossa API do tempo!");
});

http.createServer(app).listen(8080, () => {
    console.log('Servidor iniciado em http://localhost:8080/home')
})
