const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

// Configuração do banco de dados MongoDB
const uri = 'mongodb+srv://dev:PedroKeita@pedrobd.qeibapn.mongodb.net/?retryWrites=true&w=majority'; // Substitua pela URL do seu banco de dados MongoDB
const client = new MongoClient(uri);

// Rota para receber os dados do formulário de contato e salvar no banco de dados
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Conectar ao banco de dados
    await client.connect();

    // Acessar a coleção de contatos
    const collection = client.db('PedroBD').collection('contatos'); 

    // Criar um novo documento de contato
    const newContact = {
      name,
      email,
      phone,
      message
    };

    // Inserir o novo documento na coleção de contatos
    await collection.insertOne(newContact);

    // Fechar a conexão com o banco de dados
    await client.close();

    // Redirecionar para uma página de sucesso ou qualquer outra página desejada
    res.redirect('/contact');
  } catch (error) {
    console.error('Erro ao salvar os dados no banco de dados:', error);
    res.redirect('/erro');
  }
});

module.exports = router;
