const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const seriesRoutes = require('./routes/seriesRoutes'); // Certifique-se de que o caminho está correto

// Middleware para interpretar JSON no corpo das requisições
app.use(bodyParser.json());

// Usando as rotas
app.use('/api', seriesRoutes); // O prefixo '/api' é opcional, você pode usar apenas '/'

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
