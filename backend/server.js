const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/saludar/:nombre', (req, res) => {
  const nombre = req.params.nombre;
  res.send(`¡Hola, ${nombre}!`);
});

app.listen(3000, () => {
  console.log('El servidor está escuchando en el puerto 3000');
});