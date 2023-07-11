CREATE DATABASE clima_tempo;

USE clima_tempo;

CREATE TABLE dados_tempo (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
	chuva bool not null,
    temperatura int not null,
	precipitacao FLOAT not null

);

INSERT INTO dados_tempo (chuva, temperatura, precipitacao) VALUES 
(FALSE, 25, 0.5),
(TRUE, 16, 1),
(FALSE, 30, 0.9);

SELECT * FROM dados_tempo;
