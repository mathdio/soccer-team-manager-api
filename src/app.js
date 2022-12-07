const express = require('express');

const app = express();

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

// Listando times por meio do método GET
app.get('/teams', (req, res) => res.status(200).json({ teams }));

// Cadastrando times por meio do método POST
app.post('/teams', (req, res) => {
  const newTeam = { ...req.body };
  teams.push(newTeam);
  res.status(201).json({ team: newTeam });
});

// Editando times por meio do método PUT
app.put('/teams/:id', (req, res) => {
  const { id } = req.params;
  const { name, initials } = req.body;

  const updateTeam = teams.find((team) => team.id === Number(id));

  if (!updateTeam) {
    res.status(404).json({ message: 'Team not found' });
  }

  updateTeam.name = name;
  updateTeam.initials = initials;
  res.status(200).json({ updateTeam });
});

// Deletando times por meio do método DELETE

app.delete('/teams/:id', (req, res) => {
  const { id } = req.params;
  const arrayPosition = teams.findIndex((team) => team.id === Number(id));

  teams.splice(arrayPosition, 1);
  res.status(200).end();
});

// Para fixar
// Que tal treinar seus conhecimentos e listar um time pelo seu id? Crie um endpoint do tipo GET com a rota /teams/:id.

app.get('/teams/:id', (req, res) => {
  const { id } = req.params;
  const team = teams.find((e) => e.id === Number(id));
  res.status(200).json({ team });
});

app.get('/', (req, res) => res.status(200).json({ message: 'Olá Mundo!' }));

module.exports = app;