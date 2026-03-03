// ============================================
// DADOS DO CARDÁPIO — SEMANA SANTA 2026
// ============================================

const cardapio = {
  pratos: [
    {
      id: "torta-capixaba",
      numero: "01",
      nome: "Torta Capixaba",
      nomeComplemento: "",
      descricao: "Camarões grandes, lascas de bacalhau Gadus morhua, siri desfiado, bem catado e sem casquinha, e palmito fresco.",
      descricaoMarketing: "Camarões grandes, lascas de bacalhau Gadus morhua, siri desfiado, bem catado e sem casquinha, e palmito fresco.",
      origem: "Receita autoral · Desde o início do NÓZ",
      imagem: "imagens/torta-capixaba.webp",
      opcoes: [
        { peso: "500g", preco: 140 },
        { peso: "1kg", preco: 250 }
      ]
    },
    {
      id: "torta-bacalhau",
      numero: "02",
      nome: "Torta de",
      nomeComplemento: "Bacalhau",
      descricao: "Lascas de bacalhau gadus morhua e palmito fresco.",
      descricaoMarketing: "Lascas de bacalhau gadus morhua e palmito fresco.",
      origem: "Ingredientes selecionados · Qualidade premium",
      imagem: "imagens/torta-bacalhau.webp",
      opcoes: [
        { peso: "500g", preco: 130 },
        { peso: "1kg", preco: 240 }
      ]
    },
    {
      id: "bacalhau-natas",
      numero: "03",
      nome: "Bacalhau",
      nomeComplemento: "com Natas",
      descricao: "Lascas de bacalhau gadus morhua, batata em cubos, natas e queijo parmesão.",
      descricaoMarketing: "Lascas de bacalhau gadus morhua, batata em cubos, natas e queijo parmesão.",
      origem: "Preparo artesanal · Acabamento impecável",
      imagem: "imagens/bacalhau-natas.webp",
      opcoes: [
        { peso: "500g", preco: 130 },
        { peso: "1kg", preco: 240 }
      ]
    },
    {
      id: "arroz",
      numero: "",
      nome: "Acrescentar",
      nomeComplemento: "Arroz",
      descricao: "arroz branco",
      descricaoMarketing: "Arroz branco soltinho para acompanhar os pratos da Semana Santa.",
      origem: "Acompanhamento",
      imagem: null,
      opcoes: [
        { peso: "500g", preco: 20 }
      ]
    }
  ]
};

const categoryNames = {
  pratos: "Cardápio de Encomendas"
};
