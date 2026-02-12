const produtos = [
    { id: 1, nome: "Cookie Tradicional", preco: 10.00, imagem: "cookie/tradicional.jpg" },
    { id: 2, nome: "Cookie de Nutella", preco: 15.00, imagem: "cookie/nutella.jpg" },
    { id: 3, nome: "Cookie de Ovomaltine", preco: 12.00, imagem: "cookie/ovomaltine.jpg" },
    { id: 4, nome: "Cookie de KitKat", preco: 12.00, imagem: "cookie/kitkat.jpg" },
    { id: 5, nome: "Cookie de Ouro Branco", preco: 12.00, imagem: "cookie/ourobranco.jpg" },
    

];


let carrinho = [];

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
    
    carrinho.forEach(item => {
        mensagem += `• ${item.nome} - R$ ${item.preco.toFixed(2)}\n`;
    });
    
    const total = carrinho.reduce((sum, item) => sum + item.preco, 0);
    mensagem += `\n*Total: R$ ${total.toFixed(2)}*`;

    const numero = "+553798122843";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    
    window.open(url, '_blank');
}

// Inicializa o site
renderizarProdutos();