const { request, response } = require('express');
const express = require('express');

const app = express();

//metodos HTTP
//GET: le/busca infos do backend
//POST: cria infos no backend
//PUT/PATCH: altera infos no backend. Put em bloco; Patch de forma especifica

app.get('/projects', (request, response) => { //o que vem após a / chama-se recurso/resource
  return response.json([
    'prjeto 1',
    'prjeto 2'
  ]);
});

app.listen(3333, () => {
  console.log('Back-end started');
});
