const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PictureSchema = new Schema({
  name: { type: String, required: true },
  image: { type: Buffer, required: true },
  // Campo que armazena o tipo de conteúdo da imagem
  contentType: { type: String, required: true }
});

module.exports = mongoose.model("Picture", PictureSchema);
