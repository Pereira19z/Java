const express = require('express');
const { body, validationResult } = require('express-validator');
const Serie = require('../models/serie'); // Certifique-se de que o caminho está correto
const router = express.Router();

// Listar todas as séries com paginação
router.get('/series', async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;
        const series = await Serie.findAll({
            limit: parseInt(limit),
            offset: parseInt(offset)
        });
        res.json(series);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Consultar uma série por ID
router.get('/series/:id', async (req, res) => {
    try {
        const serie = await Serie.findByPk(req.params.id);
        if (!serie) {
            return res.status(404).send('Série não encontrada');
        }
        res.json(serie);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Adicionar uma nova série com validação
router.post('/series', [
    body('nome').notEmpty().withMessage('Nome da série é obrigatório'),
    body('anoLancamento').isInt({ min: 1900, max: new Date().getFullYear() }).withMessage('Ano de lançamento deve ser válido'),
    body('quantidadeTemporadas').isInt({ min: 1 }).withMessage('Quantidade de temporadas deve ser um número positivo'),
    body('classificacao').isIn(['Livre', '10+', '12+', '14+', '16+', '18+']).withMessage('Classificação indicativa inválida')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { nome, genero, anoLancamento, quantidadeTemporadas, classificacao } = req.body;
        const serie = await Serie.create({ nome, genero, anoLancamento, quantidadeTemporadas, classificacao });
        res.status(201).json(serie);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Atualizar uma série existente
router.put('/series/:id', async (req, res) => {
    try {
        const serie = await Serie.findByPk(req.params.id);
        if (!serie) {
            return res.status(404).send('Série não encontrada');
        }
        const { nome, genero, anoLancamento, quantidadeTemporadas, classificacao } = req.body;
        serie.nome = nome;
        serie.genero = genero;
        serie.anoLancamento = anoLancamento;
        serie.quantidadeTemporadas = quantidadeTemporadas;
        serie.classificacao = classificacao;
        await serie.save();
        res.json(serie);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Remover uma série
router.delete('/series/:id', async (req, res) => {
    try {
        const serie = await Serie.findByPk(req.params.id);
        if (!serie) {
            return res.status(404).send('Série não encontrada');
        }
        await serie.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
