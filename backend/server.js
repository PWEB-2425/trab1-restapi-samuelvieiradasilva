// API real a ser implementada
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const alunosRoutes = require('./routes/alunos');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Conexão com MongoDB Atlas
mongoose.connect('mongodb+srv://ssamuel:JtFOBKX61O94wAZX@pmongo.p2sejfp.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
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