-- Conexão com o servidor MySQL
USE Banco_Tempo;

-- Criação da tabela
CREATE TABLE informacoesCidades (
    idCiades INT PRIMARY KEY,
    nome VARCHAR(100)
);


-- Criação da tabela
CREATE TABLE dadosClimatologicos (
    chuva INT,
    temperatura VARCHAR(100),
    precipitacao INT,
    sensacaoTermica INT,
    previsaoVento INT,
    alertas VARCHAR(100)


);