const { request, response } = require('express');
const express = require('express');

const app = express();

//metodos HTTP
//GET: le/busca infos do backend
//POST: cria infos no backend
//PUT/PATCH: altera infos no backend. Put em bloco; Patch de forma especifica

// tipos de parametros
// Query params: usado principalmente para filtros e paginaçao
// Route params: usado p identificar resources na hora de atualizar ou deletar
// Request body:

app.get('/projects', (request, response) => { //o que vem após a / chama-se recurso/resource
  const query = request.query;

  console.log(query);

  return response.json([
    'prjeto 1',
    'proojeto 2',
  ]);
});

app.post('/projects', (request, response) => {
  return response.json([
    'Projeto 1',
    'Projeto 2',
    'Projeto 3',
  ]);
});

app.put('/projects/:id', (request, response) => { //p deletar ou atualizar preciso passar o ID
  const params = request.params;

  console.log(params);

  return response.json([
    'Projeto 4',
    'Projeto 5',
    'Projeto 3',
  ]);
});

app.delete('/projects/:id', (request, response) => {
  return response.json([
    'Projeto 2',
    'Projeto 3',
  ]);
});

app.listen(3333, () => {
  console.log('Back-end started');
});
