const express = require('express');
require('express-async-errors'); 

const validateTeam = require('./middlewares/validateTeam');
const apiCredentials = require('./middlewares/apiCredentials');

const app = express();
app.use(apiCredentials);

app.use(express.json());
// serve para “instalar” algumas coisas que queremos em nossas APIs
// Dentro do app.use(), passamos uma outra função é ela que habilita a possibilidade de recebermos dados pelo corpo (body) de nossa requisição.

const teams = [
  {
    id: 1,
    name: 'São Paulo Futebol Clube',
    initials: 'SPF',
  },
  {
    id: 2,
    name: 'Clube Atlético Mineiro',
    initials: 'CAM',
  },
];
// s4-d4 Para fixar:
// 1 - 🚀 Crie um middleware existingId para garantir que o id passado como parâmetro na rota GET /teams/:id existe no objeto teams. Refatore essa rota para usar o middleware.
// 2 - 🚀 Reaproveite esse middleware e refatore as rotas PUT /teams/:id e DELETE /teams/:id para usarem ele também.
// 3 - 🚀 Mova o middleware validateTeam para o arquivo src/middlewares/validateTeam.js, mas continue usando o middleware nas rotas POST /teams e PUT /teams/:id.

const existingId = (req, res, next) => {
  const id = Number(req.params.id);

  if (teams.some((team) => team.id === id)) {
    next();
  } else {
    res.sendStatus(400);
  }
};

// Listando times por meio do método GET
app.get('/teams', (req, res) => res.status(200).json({ teams }));

// Cadastrando times por meio do método POST
app.post('/teams', validateTeam, (req, res) => {
  const newTeam = { ...req.body };
  teams.push(newTeam);
  res.status(201).json({ team: newTeam });
});

// Editando times por meio do método PUT
app.put('/teams/:id', existingId, validateTeam, (req, res) => {
  const { id } = req.params;
  const { name, initials } = req.body;

  const updateTeam = teams.find((team) => team.id === Number(id));
  const index = teams.indexOf(updateTeam);

  updateTeam.name = name;
  updateTeam.initials = initials;
  teams.splice(index, 1, updateTeam);
  res.status(200).json({ updateTeam });
});

// Deletando times por meio do método DELETE

app.delete('/teams/:id', existingId, (req, res) => {
  const { id } = req.params;
  const arrayPosition = teams.findIndex((team) => team.id === Number(id));

  teams.splice(arrayPosition, 1);
  res.status(200).end();
});

// Para fixar
// Que tal treinar seus conhecimentos e listar um time pelo seu id? Crie um endpoint do tipo GET com a rota /teams/:id.

app.get('/teams/:id', existingId, (req, res) => {
  const { id } = req.params;
  const team = teams.find((e) => e.id === Number(id));
  res.status(200).json({ team });
});

app.get('/', (req, res) => res.status(200).json({ message: 'Olá Mundo!' }));

module.exports = app;