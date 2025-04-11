// Importando para uploads de arquivos
const multer = require("multer");

const storage = multer.memoryStorage();

// Configura o Multer
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // Limite de 5MB
  }
});

// Exporta para utilizar em outros arquivos
module.exports = upload;
