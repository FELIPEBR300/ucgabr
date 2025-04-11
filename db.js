// Importa para interagir com o banco de dadoss
const mongoose = require("mongoose");

// Carrega váriaveis de ambiente do arquivo .ENV
require("dotenv").config();

// Configura o mongoose para permitir  consulta (Restritas)
mongoose.set("strictQuery", true);

// Credenciais
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

// Função para no DB
async function main() {
  await mongoose.connect(
    // Link do Mongo
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.ez6st10.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/`
  );
  // Exibe ao usuario que realizou a conexão
  console.log("Conectou ao banco de dados!");
}
// Exibe a msg ao usuário com erro
main().catch((err) => console.log(err));

// Exportar a função para utilizar em outro arquivo
module.exports = main;
