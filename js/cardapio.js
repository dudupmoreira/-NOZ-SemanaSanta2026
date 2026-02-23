// ============================================
// DADOS DO CARDÁPIO
// ============================================

const cardapio = {
  entradas: [
    {
      id: "salada-bacalhau",
      nome: "Salada de Bacalhau e Grão de Bico",
      descricao: "Lascas de bacalhau gadus morhua, grão de bico, tomate, cebola roxa, azeitona preta, coentro, limão e azeite",
      imagem: "imagens/Salada de Bacalhau e grão de bico.webp",
      opcoes: [
        { peso: "500g", preco: 125 },
        { peso: "1kg", preco: 220 }
      ]
    },
    {
      id: "vinagrete-polvo",
      nome: "Vinagrete de Polvo",
      descricao: "Polvo, feijão fradinho, cebola roxa, tomate, pimentão amarelo, pimentão vermelho, coentro, limão e azeite",
      imagem: "imagens/Vinagrete de polvo.webp",
      opcoes: [
        { peso: "500g", preco: 125 },
        { peso: "1kg", preco: 220 }
      ]
    },
    {
      id: "maionese-camarao",
      nome: "Maionese de Camarão",
      descricao: "Batata em cubos, camarão VG, cebola roxa, aioli de alho assado com páprica, cebolinha e limão",
      imagem: "imagens/Maionese de camarão.webp",
      opcoes: [
        { peso: "500g", preco: 125 },
        { peso: "1kg", preco: 220 }
      ]
    },
    {
      id: "salpicao-defumado",
      nome: "Salpicão Defumado",
      descricao: "Frango defumado na casa com lenha de macieira, cebola, ervilha, aioli de alho assado e páprica, cenoura, uva passas e batata palha da casa",
      imagem: "imagens/Salpicão defumado.webp",
      opcoes: [
        { peso: "500g", preco: 95 },
        { peso: "1kg", preco: 155 }
      ]
    },
    {
      id: "terrine-porco",
      nome: "Terrine de Porco",
      descricao: "Joelho e pernil de porco, pistache, picles de pepino e cranberry, envolto no bacon. Aprox. 1kg a peça",
      imagem: null,
      opcoes: [
        { peso: "~1kg", preco: 170 }
      ]
    }
  ],
  proteinas: [
    {
      id: "chester-assado",
      nome: "Chester Assado",
      descricao: "Acompanha batata bolinha e farofa natalina. Aproximadamente 4,5kg o prato completo",
      imagem: "imagens/Chester ou Peru assado.webp",
      opcoes: [
        { peso: "~4,5kg", preco: 535 }
      ]
    },
    {
      id: "peru-assado",
      nome: "Peru Assado",
      descricao: "Acompanha batata bolinha e farofa natalina. Aproximadamente 4,5kg o prato completo",
      imagem: "imagens/Chester ou Peru assado.webp",
      opcoes: [
        { peso: "~4,5kg", preco: 535 }
      ]
    },
    {
      id: "beef-wellington",
      nome: "Beef Wellington",
      descricao: "Peça de filé mignon envolto no presunto de parma, creme de cogumelos e massa folhada. Aprox. 2kg",
      imagem: "imagens/Beef Wellington.webp",
      opcoes: [
        { peso: "~2kg", preco: 395 }
      ]
    },
    {
      id: "rosbife",
      nome: "Rosbife",
      descricao: "Com molho de cogumelos (shimeji, Paris e funghi), conhaque e creme de leite fresco",
      imagem: "imagens/Rosbife.webp",
      opcoes: [
        { peso: "500g", preco: 150 },
        { peso: "1kg", preco: 275 }
      ]
    },
    {
      id: "bacalhau-vovo-helia",
      nome: "Bacalhau da Vovó Hélia",
      descricao: "Lombo de Bacalhau gadus morhua, cebola, tomate, alho, batata, azeitona preta, salsa e azeite",
      imagem: null,
      opcoes: [
        { peso: "500g", preco: 150 },
        { peso: "1kg", preco: 260 }
      ]
    },
    {
      id: "bacalhau-natas",
      nome: "Bacalhau com Natas",
      descricao: "Lascas de bacalhau gadus morhua, batata e nata. Gratinado com parmesão",
      imagem: "imagens/Bacalhau com natas.webp",
      opcoes: [
        { peso: "500g", preco: 140 },
        { peso: "1kg", preco: 240 }
      ]
    }
  ],
  acompanhamentos: [
    {
      id: "arroz-amendoas",
      nome: "Arroz com Amêndoas",
      descricao: "",
      imagem: "imagens/Arroz com amêndoas.webp",
      opcoes: [
        { peso: "500g", preco: 55 },
        { peso: "1kg", preco: 95 }
      ]
    },
    {
      id: "arroz-lentilha",
      nome: "Arroz com Lentilha e Cebola Caramelizada",
      descricao: "",
      imagem: "imagens/Arroz com lentilha e cebola caramelizada.webp",
      opcoes: [
        { peso: "500g", preco: 50 },
        { peso: "1kg", preco: 90 }
      ]
    },
    {
      id: "farofa-natalina",
      nome: "Farofa Natalina",
      descricao: "Bacon, castanha, amêndoa, banana frita, cebola, alho e passas",
      imagem: "imagens/Farofa natalina.webp",
      opcoes: [
        { peso: "500g", preco: 60 },
        { peso: "1kg", preco: 105 }
      ]
    },
    {
      id: "batata-bolinha",
      nome: "Batata Bolinha",
      descricao: "Assada com alecrim e manteiga",
      imagem: "imagens/Batata bolinha.webp",
      opcoes: [
        { peso: "500g", preco: 35 },
        { peso: "1kg", preco: 65 }
      ]
    }
  ],
  sobremesas: [
    {
      id: "mousse-chocolate",
      nome: "Mousse de Chocolate e Avelã",
      descricao: "Mousse cremoso de chocolate meio amargo com avelãs",
      imagem: null,
      opcoes: [
        { peso: "500g", preco: 110 }
      ]
    }
  ]
};

const categoryNames = {
  entradas: "Entradas",
  proteinas: "Proteínas",
  acompanhamentos: "Acompanhamentos",
  sobremesas: "Sobremesas"
};
