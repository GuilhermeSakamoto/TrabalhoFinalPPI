// routes/index.js
const express = require('express');
const router = express.Router();

let usuarios = [];
let mensagens = [];

router.get('/', (req, res) => {
    res.render('menu', { ultimoAcesso: req.session.ultimoAcesso });
});

router.get('/cadastroUsuario', (req, res) => {
    res.render('cadastroUsuario', { usuarios });
});

router.post('/cadastrarUsuario', (req, res) => {
    const { nome, dataNascimento, nickname } = req.body;

    // Validação dos dados
    if (!nome || !dataNascimento || !nickname) {
        return res.render('cadastroUsuario', { usuarios, erro: 'Preencha todos os campos.' });
    }

    // Adiciona o usuário à lista
    usuarios.push({ nome, dataNascimento, nickname });

    // Atualiza a última data de acesso
    req.session.ultimoAcesso = new Date().toLocaleString();

    // Renderiza a página de cadastro com a lista atualizada
    res.render('cadastroUsuario', { usuarios });
});

router.get('/batePapo', (req, res) => {
    res.render('batePapo', { usuarios, mensagens });
});

router.post('/postarMensagem', (req, res) => {
    const { usuario, mensagem } = req.body;

    // Validação dos dados
    if (!usuario || !mensagem) {
        return res.render('batePapo', { usuarios, mensagens, erro: 'Selecione um usuário e preencha a mensagem.' });
    }

    // Adiciona a mensagem à lista
    mensagens.push({ usuario, texto: mensagem, dataHora: new Date().toLocaleString() });

    // Renderiza a página de bate-papo com as mensagens atualizadas
    res.render('batePapo', { usuarios, mensagens });
});

module.exports = router;
