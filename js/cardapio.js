// ============================================
// DADOS DO CARDÁPIO — SEMANA SANTA 2026
// ============================================

const cardapio = {
  pratos: [
    {
      id: "torta-capixaba",
      nome: "Torta Capixaba",
      descricao: "Camarão VM, lascas de bacalhau gadus morhua, siri desfiado e palmito fresco",
      imagem: "imagens/kv-torta-capixaba.webp",
      opcoes: [
        { peso: "500g", preco: 140 },
        { peso: "1kg",  preco: 250 }
      ]
    },
    {
      id: "torta-bacalhau",
      nome: "Torta de Bacalhau",
      descricao: "Lascas de bacalhau gadus morhua e palmito fresco",
      imagem: "imagens/kv-torta-bacalhau.webp",
      opcoes: [
        { peso: "500g", preco: 130 },
        { peso: "1kg",  preco: 240 }
      ]
    },
    {
      id: "bacalhau-natas",
      nome: "Bacalhau com Natas",
      descricao: "Lascas de bacalhau gadus morhua, batata em cubos, natas e queijo parmesão",
      imagem: "imagens/kv-bacalhau-natas.webp",
      opcoes: [
        { peso: "500g", preco: 130 },
        { peso: "1kg",  preco: 240 }
      ]
    }
  ]
};

const categoryNames = {
  pratos: "Cardápio de Encomendas"
};
