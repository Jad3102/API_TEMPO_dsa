const express = require('express');
var http = require('http');
const app = express();

app.get('/home',(req,res) => {
    res.status(200).send("Bem-vindo a nossa API do tempo!");
});

http.createServer(app).listen(8080, () => {
    console.log('Servidor iniciado em http://localhost:8080')
})
