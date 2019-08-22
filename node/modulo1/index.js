const express = require('express');

const server = express();

server.get('/users', (req, res) => {
  const { nome } = req.query;
  return res.json({ message: `Nome do usuário é: ${nome}` })
});

server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  return res.json({ message: `Buscando id: ${id}` })
})

server.listen(3000);
