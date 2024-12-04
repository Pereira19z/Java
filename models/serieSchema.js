const Joi = require('joi');

const serieSchema = Joi.object({
    nome: Joi.string().min(3).required(),
    genero: Joi.string().min(3).required(),
    anoLancamento: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
    quantidadeTemporadas: Joi.number().integer().min(1).required(),
    classificacao: Joi.string().valid('Livre', '12+', '16+', '18+').required(),
});

module.exports = serieSchema;
