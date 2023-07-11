const restify = require('restify');
const mysql = require('mysql');

const servidor = restify.createServer({
    name: 'clima_tempo',
    version: '1.0.0'
});

servidor.use(restify.plugins.acceptParser(servidor.acceptable));
servidor.use(restify.plugins.queryParser());
servidor.use(restify.plugins.bodyParser());

servidor.listen(8080, function () {
    console.log("%s executando em %s", servidor.name, servidor.url);
});

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'clima_tempo'
    }
});

servidor.get('/todososdados', (req, res, next) => {
    knex('dados_tempo')
        .select('chuva', 'temperatura', 'precipitacao')
        .then((rows) => {
            console.log(rows);
            res.send(rows);
        })
        .catch((error) => {
            console.error(error);
            res.send(error);
        });
});

servidor.get('/dadospordia/:id', (req, res, next) => {
    const idDia = req.params.id;
    knex('dados_tempo')
        .where('id', idDia)
        .first()
        .then((dados) => {
            if (!dados || dados === "") {
                return res.send(new errors.BadRequestError('Dia não encontrado'));
            }
            res.send(dados);
        })
        .catch((error) => {
            console.error(error);
            res.send(error);
        });
});