// Lista principal de amigos
let listaDeAmigos = [];
// Lista auxiliar para controlar quem já foi sorteado
let amigosSorteados = [];

// Função para adicionar um amigo à lista
function adicionarAmigo() {
    const input = document.querySelector('#amigo'); 
    const nome = input.value.trim();

    // Verificar se o campo está vazio
    if (nome === '') {
        alert('Por favor, insira um nome.');
        input.focus();
        return;
    }

    // Verificar duplicados (ignora maiúsculas/minúsculas)
    if (listaDeAmigos.some(a => a.toLowerCase() === nome.toLowerCase())) {
        alert('Este nome de amigo já foi adicionado.');
        return;
    }

    // Adiciona o nome no array
    listaDeAmigos.push(nome);

    // Limpa e volta o foco para o input
    input.value = '';
    input.focus();

    atualizarListaDeAmigos();
}

// Atualiza a lista visível na tela
function atualizarListaDeAmigos() {
    const lista = document.querySelector('#listaAmigos');
    lista.innerHTML = '';

    listaDeAmigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.textContent = amigo + " ";

        // Criar botão "x" para remover
        const btnRemover = document.createElement('button');
        btnRemover.textContent = 'x';
        btnRemover.classList.add("remove-btn"); // adiciona a classe CSS
        btnRemover.onclick = () => removerAmigo(index);

        li.appendChild(btnRemover);
        lista.appendChild(li);
    });
}

// Remove amigo da lista (e da lista de sorteados)
function removerAmigo(index) {
    const removido = listaDeAmigos[index];
    listaDeAmigos.splice(index, 1);
    amigosSorteados = amigosSorteados.filter(a => a !== removido);
    atualizarListaDeAmigos();
}

// Permitir adicionar pressionando "Enter"
document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector("#amigo");

    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            adicionarAmigo();
        }
    });
});

// Função para sortear amigo
function sortearAmigo() {
    const input = document.querySelector('#amigo');
    const resultado = document.querySelector('#resultado');
        
    // Garantir que existam pelo menos 3 pessoas.
    if (listaDeAmigos.length < 3) {
        alert('Adicione pelo menos 3 pessoas antes de sortear.');
        input.focus();
        return;
    }

    // Filtra apenas os amigos que ainda não foram sorteados
    const disponiveis = listaDeAmigos.filter(a => !amigosSorteados.includes(a));

    // Se todos já foram sorteados, avisa
    if (disponiveis.length === 0) {
        alert('Todos os amigos já foram sorteados!');
        return;
    }

    // Escolhe um amigo aleatório da lista disponível
    const indice = Math.floor(Math.random() * disponiveis.length);
    const sorteado = disponiveis[indice];

    // Registra no array de sorteados
    amigosSorteados.push(sorteado);

    // Mostra o resultado na tela
    resultado.innerHTML = `<li>O amigo sorteado foi: ${sorteado}</li>`;

    // Limpa o input e volta o foco
    input.value = '';
    input.focus();
}

// Função para resetar a lista completa
function resetarLista() {
    listaDeAmigos = [];
    amigosSorteados = [];
    atualizarListaDeAmigos();

    const resultado = document.querySelector('#resultado');
    resultado.innerHTML = '';
}