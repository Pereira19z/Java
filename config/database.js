const { Sequelize } = require('sequelize');

// Configuração do banco de dados H2 (usando SQLite por simplicidade)
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite', // ou se preferir em memória: ':memory:'
});

sequelize.authenticate()
    .then(() => {
        console.log('Conexão bem-sucedida!');
    })
    .catch((error) => {
        console.error('Não foi possível conectar ao banco de dados:', error);
    });

module.exports = sequelize;
