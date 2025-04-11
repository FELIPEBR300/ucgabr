// Elementos da interface (DOM)
const elements = {
  photoGrid: document.getElementById("photoGrid"), //Container da Grade de Fotos
  uploadModal: document.getElementById("uploadModal"), // Modal de Upload
  addPhotoButton: document.getElementById("addPhotoBtn"), // Botão para abrir o Modal
  closeButton: document.querySelector(".close"), // Botão para fechar Modal
  uploadForm: document.getElementById("uploadForm"), // Upload do Formulario
  toast: document.getElementById("toast"), // Elemento para notificação
  nameInput: document.getElementById("name"), // Input nome da Foto
  fileInput: document.getElementById("file"), // Input do arquivo da Foto
};

// Configuração da Aplicação (Back-End)
const config = {
  apiUrl: "http://localhost:4000/pictures", // Endpoint da API
};

// Função de notificação
function showNotification(message, type = "success") {
  const { toast } = elements; // Armarzena o elemento de notificação

  toast.textContent = message; // Define o texto da mensagem
  toast.className = `toast ${type}`; // Aplica a Classe do CSS (Cor)
  toast.style.opacity = "1"; // Torna a notificação visível

  // Configura o tempo para esconder a notificação (3 Seg.)
  setTimeout(() => {
    toast.style.opacity = "0"; // Faz a notificação desaparecer devagar
  }, 3000);
}

// Função de manipulação de fotos
async function fetchPhotos() {
  try {
    // Faz requisição GET para a API
    const response = await fetch(config.apiUrl);

    // Verifica se a resposta foi bem sucedida (Status 200-299)
    if (!response.ok) {
      throw new Error(`Erro na requisição: status ${response.status}`);
    }

    // Converte a resposta para JSON
    const data = await response.json();

    // Retorna o Array de fotos ou um vazio
    return data.pictures || [];
  } catch (error) {
    // Em caso de rro, mostra no console
    console.error("Falha ao carregar fotos", error);
    // Função de notificação sendo chamada para mostrar erro ao User
    showNotification("Falha ao carregar fotos", "error");
    return []; // Retorna um Array vazio ara evitar erros
  }
}

// Renderiza as fotos no grid (Recebe um Array de objetos de fotos)
function renderPhotoGrid(photos) {
  const { photoGrid } = elements;

  photoGrid.innerHTML = ""; // Limpa todo o contéudo atual do Grid

  // Se não houver fotos, exibe mensagem
  if (photos.length === 0) {
    photoGrid.innerHTML = '<p class="no-photos">Nenhuma foto encontrada</p>';
    return;
  }

  // Para cada foto no array, criar um Card e adiciona ao Grid
  photos.forEach((photo) => {
    const photoCard = createPhotoCardElement(photo);
    photoGrid.appendChild(photoCard);
  });
}

// Criar o elemento HTML de um card de Foto (Recebe objeto de foto)
function createPhotoCardElement(photo) {
  const card = document.createElement("div");
  card.className = "photo-card"; // Aplica a classe CSS para estilos

  // Monta URL para a imagem (API + ID da foto + /image)
  const imageUrl = `${config.apiUrl}/${photo._id}/image`;

  // Define o HTML interno do card (Imagem e informação)
  card.innerHTML = `
         <img src="${imageUrl}" alt="${photo.name}"
              onerror="this.onerror=null; this.src='${config.placeholderImage}'">
         <div class="photo-info">
             <div class="photo-name">${photo.name}</div>
         </div>
         `;

  return card;
}

// Envia nova foto para o servidor (Recebe FormDAta com nome e arquivo)
async function uploadNewPhoto(formData) {
  try {
    // Faz requisição POST para API com os dados do formulário
    const response = await fetch(config.apiUrl, {
      method: "POST",
      body: formData,
    });

    // Verifca a resposta
    if (!response.ok) {
      throw new Error("Falha no upload da foto");
    }

    // Notificação de sucesso para o User
    showNotification("Foto enviada com sucesso!");
    closeUploadModal(); // Fechar a tela do Modal
    elements.uploadForm.reset(); // Função de resetar os campos
    loadAndDisplayPhotos(); // Recarrega a lista de fotos (Nova Adição)
  } catch (error) {
    // Mostrar em caso de erro no console
    console.error("Erro no upload:", error);
    // Notificação de Falha para o User
    showNotification("Falha ao enviar foto", "error");
  }
}

// Funcões de controle da Interface

// Abre o model de Upload (Mosta a janela de adicionar foto)
function openUploadModal() {
  elements.uploadModal.style.display = "block"; // Muda o CSS para block (Visivel)
}

// Fecha o modal de Upload (Esconde a Janela)
function closeUploadModal() {
  elements.uploadModal.style.display = "none"; // Muda o CSS para none (Invisivel)
}

// Fecha o modal ao clicar fora dele (event handler para clicks)
function handleOutsideClick(event) {
  // Verifica se o click foi modal (Área escura ao Redor)
  if (event.target === elements.uploadModal) {
    closeUploadModal();
  }
}

// Processa o envio do formulário
function handleFormSubmit(event) {
  event.preventDefault(); // Impede o recarregamento da página

  // Criar um FormData com os valores do formulário
  const formData = new FormData();
  formData.append("name", elements.nameInput.value); // Adiciona o nome da foto
  formData.append("file", elements.fileInput.files[0]); // Adiciona o arquivo selecionado

  uploadNewPhoto(formData); // Chama a funçaõ de Upload
}

// Carrega e exibe todas as fotos (Função assíncrona principal)
async function loadAndDisplayPhotos() {
  const photos = await fetchPhotos(); // Aguarda a busca das fotos
  renderPhotoGrid(photos); // Renderiza as fotos no grid
}

// Configura todos os eventos da Aplicação (Centralizando a configuração)
function setupEventListeners() {
  // Botão "Adicionar foto", abre o modal
  elements.addPhotoButton.addEventListener("click", openUploadModal);
  // Botão "X" fecha o modal
  elements.closeButton.addEventListener("click", closeUploadModal);
  // Click fora do modal, fecha o modal
  window.addEventListener("click", handleOutsideClick);
  // Submit do form. chama a função do upload
  elements.uploadForm.addEventListener("submit", handleFormSubmit);
}

/* Inicialização da aplicação */

// Inicia a aplicação quando o DOM estiver Pronto
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners(); // Configura todos os event
  loadAndDisplayPhotos(); // Carrega e exibe as fotos iniciais
});
