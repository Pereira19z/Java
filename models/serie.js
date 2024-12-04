const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Aqui você conecta ao banco

const Serie = sequelize.define('Serie', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    genero: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    anoLancamento: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantidadeTemporadas: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
        },
    },
    classificacao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Serie;
