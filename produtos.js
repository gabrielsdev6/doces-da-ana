// 1. BANCO DE DADOS
const produtos = [
    { 
        id: 100, 
        nome: "Combo Degustação DeLaire", 
        preco: 99.00, 
        categoria: "Combos", 
        imagem: "combo/combo.jpeg" // Uma foto com cookies e brownies juntos
    },

    //Cookies
    { id: 1, nome: "Cookie Tradicional", preco: 10.00, categoria: "Cookies", imagem: "cookie/tradicional.jpg" },
    { id: 2, nome: "Cookie de KitKat", preco: 12.00, categoria: "Cookies", imagem: "cookie/kitkat.jpg" },
    { id: 3, nome: "Cookie de Nutella", preco: 15.00, categoria: "Cookies", imagem: "cookie/nutella.jpg" },
    { id: 4, nome: "Cookie de Ovomaltine", preco: 12.00, categoria: "Cookies", imagem: "cookie/ovomaltine.png" },
    { id: 5, nome: "Cookie de Ouro Branco", preco: 12.00, categoria: "Cookies", imagem: "cookie/ourobranco.jpg" },

    // Brownies
    { id: 6, nome: "Brownie de Nutella", preco: 12.00, categoria: "Brownies", imagem: "brownie/bnutella.jpg" },
    { id: 7, nome: "Brownie de Brigadeiro", preco: 12.00, categoria: "Brownies", imagem: "brownie/bbrigadeiro.jpg" },
    { id: 8, nome: "Brownie de Ninho", preco: 12.00, categoria: "Brownies", imagem: "brownie/bninho.jpg" },

];

let carrinho = [];


// 2. RENDERIZAR PRODUTOS
function renderizarProdutos(listaParaExibir = produtos) {
    const container = document.getElementById('cardapio');
    container.innerHTML = ""; 

    listaParaExibir.forEach(p => {
        container.innerHTML += `
            <div class="card" data-categoria="${p.categoria}">
                <span class="categoria-tag">${p.categoria}</span>
                <img src="${p.imagem}" alt="${p.nome}" class="foto-produto">
                <h3>${p.nome}</h3>
                <p>R$ ${p.preco.toFixed(2)}</p>
                <button onclick="adicionarAoCarrinho(${p.id})">Adicionar</button>
            </div>
        `;
    });
}

// 3. ADICIONAR AO CARRINHO
function adicionarAoCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    carrinho.push(produto);

    const contador = document.getElementById('cart-count');
    contador.innerText = carrinho.length;
}

// 4. FILTRAR PRODUTOS 
function filtrarProdutos(categoria) {
    const produtosFiltrados = categoria === 'Todos' 
        ? produtos 
        : produtos.filter(p => p.categoria === categoria);

    // Chama a renderização passando apenas os filtrados
    renderizarProdutos(produtosFiltrados);

    // Estilo visual dos botões
    const botoes = document.querySelectorAll('.filtros button');
    botoes.forEach(btn => {
        btn.classList.remove('active');
        if(btn.innerText === categoria) btn.classList.add('active');
    });
}

// 5. FINALIZAR PEDIDO
function finalizarPedido() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem = "Olá Ana! Gostaria de fazer um pedido na DeLaire:\n\n";
    
    // Lógica para não repetir nomes
    const contagemItens = {};
    carrinho.forEach(item => {
        contagemItens[item.nome] = (contagemItens[item.nome] || 0) + 1;
    });

    for (const nome in contagemItens) {
        mensagem += `• ${contagemItens[nome]}x ${nome}\n`;
    }
    
    const total = carrinho.reduce((sum, item) => sum + item.preco, 0);
    mensagem += `\n*Total: R$ ${total.toFixed(2)}*`;

    const numero = "553798122843"; 
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    
    window.open(url, '_blank');
}

renderizarProdutos();