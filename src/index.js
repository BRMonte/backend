const { request, response } = require('express');
const { uuid } = require('uuidv4'); //biblioteca importada para criar ID's (univers. uniq id)

const express = require('express');

const app = express();

app.use(express.json()); //essa linha permite que o express leia JSONS ao requisitarmos o body params no metodo post

//metodos HTTP
//GET: le/busca infos do backend
//POST: cria infos no backend
//PUT/PATCH: altera infos no backend. Put em bloco; Patch de forma especifica

// tipos de parametros
// Query params: usado principalmente para filtros e paginaçao
// Route params: usado p identificar resources na hora de atualizar ou deletar
// Request body: conteudo na hora de criar ou atualizar/editar um resourcer no backend

const projects = []; //exerce papel de um DB simples neste inicio de curso

app.get('/projects', (request, response) => { //o que vem após a / chama-se recurso/resource
  // const query = request.query;

  // console.log(query);

  return response.json(projects);
});

app.post('/projects', (request, response) => {
  const { title, owner } = request.body;

  const project = { id: uuid(), title, owner };

  projects.push(project); //add o projeto ao DB

  return response.json(project); //exibe o projeto criado no formato json
});

app.put('/projects/:id', (request, response) => { //p deletar ou atualizar preciso passar o ID
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex(project => project.id === id); //essa linha faz a busca para atualizar

  if (projectIndex < 0) { //esse bloco faz a verificação. Se o projeto n existir, projectIndex vai retornar 0 ou -1. Então damos feedback
    return response.status(400).json({ error: 'Project not found' })
  };

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project;

  return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex(project => project.id === id); //essa linha faz a busca para atualizar

  if (projectIndex < 0) { //esse bloco faz a verificação. Se o projeto n existir, projectIndex vai retornar 0 ou -1. Então damos feedback
    return response.status(400).json({ error: 'Project not found' })
  };

  projects.splice(projectIndex, 1); //remove o item selecionado

  return response.status(204).send(); //retorna em branco apos deletar
});

app.listen(3333, () => {
  console.log('Back-end started');
});
