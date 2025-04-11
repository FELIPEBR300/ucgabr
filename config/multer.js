// importando para uplods de arquivos
const multer = require("multer");

const storage = multer.memoryStorage();

// configure o multer
const upload = multer({
  storage,
  limits: {
    fieldSize: 5 * 1024 * 1024 // limite de 5md
  }
});

// exporta para utilzar em outros arquivos 
module.exports = upload;