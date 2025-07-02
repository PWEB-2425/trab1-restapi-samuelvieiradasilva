// API real a ser implementada
const PORT = process.env.PORT || 3000;
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const alunosRoutes = require('./routes/alunos');

const app = express();

app.use(cors());
app.use(express.json());

// JtFOBKX61O94wAZX
// Conexão com MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));


// Rota RESTful
app.use('/alunos', alunosRoutes);

app.get('/', (req, res) => {
  res.send('API Alunos está online!');
});


app.listen(PORT, () => {
    console.log(`Servidor ligado na porta ${PORT}`);
});