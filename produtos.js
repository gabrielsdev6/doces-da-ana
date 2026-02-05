// 1. Lista de produtos
const produtos = [
    { id: 1, nome: "Brownie Tradicional", preco: 6.00, imagem: "Brownie/b1.jpg" },
    { id: 2, nome: "Bolo de Pote Ninho", preco: 10.00, imagem: "Brownie/b2.jpg" },
    { id: 3, nome: "Bolo de Pote Brigadeiro", preco: 10.00, imagem: "Brownie/b3.jpg" },

];


let carrinho = [];

// 3. Função renderizar os produtos na tela
function renderizarProdutos() {
    const container = document.getElementById('cardapio');
    container.innerHTML = ""; 

    produtos.forEach(p => {
        container.innerHTML += `
            <div class="card">
                <!-- A LINHA ABAIXO ADICIONA A FOTO -->
                <img src="${p.imagem}" alt="${p.nome}" class="foto-produto">
                
                <h3>${p.nome}</h3>
                <p>R$ ${p.preco.toFixed(2)}</p>
                <button onclick="adicionarAoCarrinho(${p.id})">Adicionar</button>
            </div>
        `;
    });
}


function adicionarAoCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    carrinho.push(produto);

    const contador = document.getElementById('cart-count');
    contador.innerText = carrinho.length;

    console.log("Carrinho atual:", carrinho);
}


function finalizarPedido() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem = "Olá Ana! Gostaria de fazer um pedido:\n\n";
    
    // Monta a lista de itens
    carrinho.forEach(item => {
        mensagem += `• ${item.nome} - R$ ${item.preco.toFixed(2)}\n`;
    });
    
    const total = carrinho.reduce((sum, item) => sum + item.preco, 0);
    mensagem += `\n*Total: R$ ${total.toFixed(2)}*`;

    const numero = "+553798122843"; // COLOQUE O NÚMERO DELA AQUI (com DDD)
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    
    window.open(url, '_blank');
}

// Inicializa o site
renderizarProdutos();