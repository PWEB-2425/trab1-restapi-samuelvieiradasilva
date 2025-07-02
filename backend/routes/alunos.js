const express = require('express');
const router = express.Router();
const Aluno = require('../models/Aluno');

// GET todos os alunos
router.get('/', async (req, res) => {
  try {
    const alunos = await Aluno.find();
    res.json(alunos);
  } catch (error) {
    console.error('Erro ao buscar alunos:', error);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
});

// GET aluno por ID
router.get('/:id', async (req, res) => {
    const aluno = await Aluno.findById(req.params.id);
    res.json(aluno);
});

// POST novo aluno
router.post('/', async (req, res) => {
    const novoAluno = new Aluno(req.body);
    await novoAluno.save();
    res.status(201).json(novoAluno);
});

// PUT atualizar aluno
router.put('/:id', async (req, res) => {
    const alunoAtualizado = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(alunoAtualizado);
});

// DELETE aluno
router.delete('/:id', async (req, res) => {
    await Aluno.findByIdAndDelete(req.params.id);
    res.status(204).end();
});

module.exports = router;