//fluxo do Node e linear. roda linha a linha de cima pra baixo

const { request, response } = require('express');
const { uuid, isUuid } = require('uuidv4'); //biblioteca importada para criar ID's (univers. uniq id)

const express = require('express'); //

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

//MIDDLEWARE
// é um interceptador de requisições
// pode interromper ou altear dados da requisição
// formato do middleware: é sempre uma função que recebe sempre 2 parametros (request e response), as vezes 3 (request, response, next)
// pode-se dizer que as rotas sejam middlewares
// usa-se qnd queremos que um trecho de codigo seja disparado de forma automatica numa rota do app

const projects = []; //exerce papel de um DB simples neste inicio de curso

// INTERCEPTADOR DE REQUISIÇÕES = middleware //

function logRequests(request, response, next) {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.log(logLabel);

  return next(); //chama o proximo middleware, assim nao interrompe a proxima requisição, que seria a GET (pq linearmente está abaixo)
}

function validateProjectId(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({ error: 'Invalid project ID' });
  }

}

app.use(logRequests); // sem o next acima, tudo que viesse depois desta linha n seria executado
//------------------------------//

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

app.delete('/projects/:id', validateProjectId, (request, response) => {
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
