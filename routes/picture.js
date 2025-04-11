// Importando o express para manipular as rotas
const express = require("express");

// Criando um arquivo de rotas pelo Express
const router = express.Router();

// Importando o middleware de Upload (Multer)
const upload = require("../config/multer");

// Controlador das imagens funcões lógicas (GET, POST e ETC...)
const PictureController = require("../controllers/PictureController");

// Definindo a rota POST (Upload da Img e Armaz. no DB)
router.post("/", upload.single("file"), PictureController.create);

// Definindo a rota GET (Trazer todas as imagens do DB)
router.get("/", PictureController.findAll);

// Rota para obter uma imagem especifica
router.get("/:id/image", PictureController.getImage);

// Exportando para utilizar em outro arquivo
module.exports = router;
