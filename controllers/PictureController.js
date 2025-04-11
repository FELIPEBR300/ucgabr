// Importa o modelo Picture que é a interação do banco de dados
const Picture = require("../models/Picture");


// Função para criar uma nova imagem no banco de dados
exports.create = async (req, res) => {
  try {
    // Pega a informação do nome do arquivo enviado pela requisição
    const { name } = req.body;

    // Obtém o arquivo da req. (Via multer)
    const file = req.file;

    // Cria uma nova instância do modelo Picture com o nome da img e caminho
    const picture = new Picture({
      name,
      image: file.buffer,
      contentType: file.mimetype,
    });

    // Aqui envia para o banco ou seja salva a img no DB
    await picture.save();

    // Retorna a resposta com os dados da img salva
    res.json({ picture, msg: "Imagem salva com sucesso!" });
  } catch (err) {
    // Caso tenha erro durante o processo, retorna a mensagem ao usuário
    res.status(500).json({ message: "Erro ao salvar!" });
  }
};

// Função para encontrar todas as imagens no banco de dados
exports.findAll = async (req, res) => {
  try {
    // Busca todas as imagens no banco de dados
    const pictures = await Picture.find();

    // Retorna todas as imagens do DB
    res.json({ pictures, msg: "Imagens buscadas com sucesso!" });
  } catch (err) {
    // Em caso de erro, retorna uma resposta de erro com código 500
    res.status(500).json({ message: "Erro ao buscar imagens!" });
  }
};

// Função para obter uma imagem especifica
exports.getImage = async (req, res) => {
  try {
    // Buscando a img. pelo ID fornecido pelo DB
    const picture = await Picture.findById(req.params.id);

    // Se a img. não for encontrada, retorna erro
    if (!picture) {
      return res.status(404).json({ message: "Imagem não encontrada!" });
    }

    // Define a resposta para o tipo da imagem
    res.set("Content-Type", picture.contentType);

    // Mostra a imagem na resposta
    res.send(picture.image);
  } catch (error) {
    // Em caso de erro, retorna erro
    res.status(500).json({ message: "Erro ao buscar Imagem!" });
  }
};
