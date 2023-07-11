const restify = require('restify')
const errors = require('restify-errors')

const corsMiddleware = require('restify-cors-middleware2');

const cors = corsMiddleware({
  origins: ['*'],
});


const servidor = restify.createServer({
    name:'clima_tempo',
    version: '1.0.0'
});

servidor.use(restify.plugins.acceptParser(servidor.acceptable));
servidor.use(restify.plugins.queryParser());
servidor.use(restify.plugins.bodyParser());

servidor.listen(8080), function() {
    console.log("% executando em %s", servidor.name, servidor.url)
}

var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'clima_tempo'
    }
});


servidor.get('/',  (req, res, next) => {
    res.send('Bem-Vindo(a) ao Clima Tempo! ' );
});  

servidor.get( '/todosdados' , (req, res, next) => {
    knex('dados_tempo')
  .select('chuva', 'temperatura', 'precipitacao')
  .then((rows) => {
    console.log(rows);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    knex.destroy();
  });

});

servidor.get( '/dadospordia' , (req, res, next) => {
    const idDia = req.params.id;
    knex('dados_clima')
        .where( 'id' , idDia)
        .first()
        .then( (dados) =>{
            if( !dados || dados =="" ){
                return res.send(
                    new errors.BadRequestError('Dia não encontrado'));
            }
            res.send( dados );
        }, next) ; 
});
