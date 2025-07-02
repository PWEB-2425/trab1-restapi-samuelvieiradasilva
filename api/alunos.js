const mongoose = require('mongoose');

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) return cachedDb;
  const conn = await mongoose.connect(process.env.MONGODB_URI);
  cachedDb = conn;
  return conn;
}

export default async function handler(req, res) {
  await connectToDatabase();
  // aqui seu código para lidar com req/res para a rota /api/alunos
  res.status(200).json({ message: "API Alunos funcionando no Vercel" });
}
