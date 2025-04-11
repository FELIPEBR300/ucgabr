const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PictureSchema = new Schema({
  name: { type: String, required: true },
  Image: {type: Buffer, required: true},
  // campo que armazena o tipo de conteudo da imagem
  contentType: { type: String, required: true}
});

module.exports = mongoose.model("Picture", PictureSchema);
