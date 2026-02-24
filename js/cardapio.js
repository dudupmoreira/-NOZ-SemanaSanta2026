// ============================================
// DADOS DO CARDÁPIO — SEMANA SANTA 2026
// ============================================

const cardapio = {
  pratos: [
    {
      id: "torta-capixaba",
      numero: "01",
      nome: "Torta Capixaba",
      nomeComplemento: "Autoral",
      descricao: "Camarão VM, lascas de bacalhau gadus morhua, siri desfiado e palmito fresco",
      descricaoMarketing: "A receita que define o NOZ. Camarões grandes, lascas de lombo de bacalhau e camarão VG finalizando o prato. Construída ao longo do tempo — a versão que você vai provar é a que ficou.",
      origem: "Receita autoral · Desde o início do NOZ",
      imagem: "imagens/kv-torta-capixaba.webp",
      opcoes: [
        { peso: "500g", preco: 140 },
        { peso: "1kg",  preco: 250 }
      ]
    },
    {
      id: "torta-bacalhau",
      numero: "02",
      nome: "Torta de",
      nomeComplemento: "Bacalhau",
      descricao: "Lascas de bacalhau gadus morhua e palmito fresco",
      descricaoMarketing: "Ingredientes frescos e de alta qualidade, selecionados com critério. Uma torta que respeita a tradição do bacalhau na mesa capixaba de Semana Santa.",
      origem: "Ingredientes selecionados · Qualidade premium",
      imagem: "imagens/kv-torta-bacalhau.webp",
      opcoes: [
        { peso: "500g", preco: 130 },
        { peso: "1kg",  preco: 240 }
      ]
    },
    {
      id: "bacalhau-natas",
      numero: "03",
      nome: "Bacalhau",
      nomeComplemento: "com Natas",
      descricao: "Lascas de bacalhau gadus morhua, batata em cubos, natas e queijo parmesão",
      descricaoMarketing: "A versão clássica e reconfortante, feita com o cuidado que o NOZ coloca em cada prato. Para quem quer a Páscoa do jeito que ela foi feita para ser.",
      origem: "Preparo artesanal · Acabamento impecável",
      imagem: "imagens/kv-bacalhau-natas.webp",
      opcoes: [
        { peso: "500g", preco: 130 },
        { peso: "1kg",  preco: 240 }
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
        { peso: "Porção", preco: 18 }
      ]
    }
  ]
};

const categoryNames = {
  pratos: "Cardápio de Encomendas"
};
