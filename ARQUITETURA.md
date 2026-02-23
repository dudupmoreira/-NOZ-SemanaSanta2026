# 🏗️ Arquitetura Técnica - Ceia do Noz 2025

## Visão Geral

Sistema web para gerenciamento de pedidos da Ceia de Natal 2025 do Restaurante Noz Comida Afetiva, com integração completa ao CRM Homio/LeadConnector e sistema de tracking de conversões.

### Stack Tecnológica

| Camada | Tecnologia | Justificativa |
|--------|------------|---------------|
| **Frontend** | HTML5, CSS3, JavaScript Vanilla | Performance, sem dependências, fácil manutenção |
| **Estilização** | CSS Grid, Flexbox, CSS Variables | Responsivo, moderno, sem frameworks |
| **API/CRM** | LeadConnector/Homio API | Gestão de contatos e automações |
| **Tracking** | Meta Pixel, GA4, GTM | Rastreamento de conversões e ROI |
| **Hospedagem** | Vercel | Deploy automático, SSL, CDN global |
| **Imagens** | WebP | Otimização (94% redução de tamanho) |
| **Versionamento** | Git + GitHub | Controle de versão e colaboração |

### Status de Implementação

#### ✅ Funcionalidades Completas
- Site principal com carrinho de compras interativo
- Painel administrativo com filtros avançados
- Integração completa com LeadConnector/Homio API
- Sistema de confirmação via PIX
- Tracking de eventos (Meta Pixel, GA4, GTM)
- Captura automática de UTMs
- Otimização de imagens (WebP)
- Deploy automático no Vercel
- Correção de fuso horário (UTC-3)
- URL compartilhável de pedidos

#### 🔄 Em Evolução
- Sistema de relatórios e analytics
- Notificações em tempo real
- Busca avançada no painel admin



## Arquitetura de Dados

### Cardápio (cardapio.js)

```javascript
const cardapio = {
  entradas: [
    {
      id: "salada-bacalhau",
      nome: "Salada de Bacalhau e Grão de Bico",
      descricao: "Lascas de bacalhau gadus morhua, grão de bico, tomate, cebola roxa, azeitona preta, coentro, limão e azeite",
      imagem: "/images/salada-bacalhau.jpg",
      opcoes: [
        { peso: "1kg", preco: 220 },
        { peso: "500g", preco: 125 }
      ]
    },
    {
      id: "vinagrete-polvo",
      nome: "Vinagrete de Polvo",
      descricao: "Polvo, feijão fradinho, cebola roxa, tomate, pimentão amarelo, pimentão vermelho, coentro, limão e azeite",
      imagem: "/images/vinagrete-polvo.jpg",
      opcoes: [
        { peso: "1kg", preco: 220 },
        { peso: "500g", preco: 125 }
      ]
    },
    {
      id: "maionese-camarao",
      nome: "Maionese de Camarão",
      descricao: "Batata em cubos, camarão VG, cebola roxa, aioli de alho assado com páprica, cebolinha e limão",
      imagem: "/images/maionese-camarao.jpg",
      opcoes: [
        { peso: "1kg", preco: 220 },
        { peso: "500g", preco: 125 }
      ]
    },
    {
      id: "salpicao-defumado",
      nome: "Salpicão Defumado",
      descricao: "Frango defumado na casa com lenha de macieira, cebola, ervilha, aioli de alho assado e páprica, cenoura, uva passas e batata palha da casa",
      imagem: "/images/salpicao.jpg",
      opcoes: [
        { peso: "1kg", preco: 155 },
        { peso: "500g", preco: 95 }
      ]
    },
    {
      id: "terrine-porco",
      nome: "Terrine de Porco",
      descricao: "Joelho e pernil de porco, pistache, picles de pepino e cranberry, envolto no bacon. Aprox. 1kg a peça",
      imagem: "/images/terrine.jpg",
      opcoes: [
        { peso: "~1kg", preco: 170 }
      ]
    }
  ],
  proteinas: [
    {
      id: "chester-peru",
      nome: "Chester ou Peru Assado",
      descricao: "Acompanha batata bolinha e farofa natalina. Aproximadamente 4,5kg o prato completo",
      imagem: "/images/chester-peru.jpg",
      opcoes: [
        { peso: "~4,5kg", preco: 535 }
      ]
    },
    {
      id: "beef-wellington",
      nome: "Beef Wellington",
      descricao: "Peça de filé mignon envolto no presunto de parma, creme de cogumelos e massa folhada. Aprox. 2kg",
      imagem: "/images/beef-wellington.jpg",
      opcoes: [
        { peso: "~2kg", preco: 395 }
      ]
    },
    {
      id: "pernil-cordeiro",
      nome: "Pernil de Cordeiro",
      descricao: "Acompanha molho do próprio assado com vinho tinto. Aproximadamente 1,8kg",
      imagem: "/images/pernil-cordeiro.jpg",
      opcoes: [
        { peso: "~1,8kg", preco: 380 }
      ]
    },
    {
      id: "rosbife",
      nome: "Rosbife",
      descricao: "Com molho de cogumelos (shimeji, Paris e funghi), conhaque e creme de leite fresco",
      imagem: "/images/rosbife.jpg",
      opcoes: [
        { peso: "1kg", preco: 275 },
        { peso: "500g", preco: 150 }
      ]
    },
    {
      id: "bacalhau-natas",
      nome: "Bacalhau com Natas",
      descricao: "Lascas de bacalhau gadus morhua, batata e nata. Gratinado com parmesão",
      imagem: "/images/bacalhau-natas.jpg",
      opcoes: [
        { peso: "1kg", preco: 220 },
        { peso: "500g", preco: 125 }
      ]
    }
  ],
  acompanhamentos: [
    {
      id: "arroz-amendoas",
      nome: "Arroz com Amêndoas",
      descricao: "Arroz aromático com amêndoas tostadas",
      imagem: "/images/arroz-amendoas.jpg",
      opcoes: [
        { peso: "1kg", preco: 95 },
        { peso: "500g", preco: 55 }
      ]
    },
    {
      id: "arroz-lentilha",
      nome: "Arroz com Lentilha",
      descricao: "Arroz com lentilha e cebola caramelizada",
      imagem: "/images/arroz-lentilha.jpg",
      opcoes: [
        { peso: "1kg", preco: 90 },
        { peso: "500g", preco: 50 }
      ]
    },
    {
      id: "farofa-natalina",
      nome: "Farofa Natalina",
      descricao: "Bacon, castanha, amêndoa, banana frita, cebola, alho e passas",
      imagem: "/images/farofa.jpg",
      opcoes: [
        { peso: "1kg", preco: 105 },
        { peso: "500g", preco: 60 }
      ]
    },
    {
      id: "batata-bolinha",
      nome: "Batata Bolinha",
      descricao: "Assada com alecrim e manteiga",
      imagem: "/images/batata-bolinha.jpg",
      opcoes: [
        { peso: "1kg", preco: 65 },
        { peso: "500g", preco: 35 }
      ]
    }
  ],
  sobremesas: [
    {
      id: "mousse-chocolate",
      nome: "Mousse de Chocolate e Avelã",
      descricao: "Mousse cremoso de chocolate meio amargo com avelãs",
      imagem: "/images/mousse.jpg",
      opcoes: [
        { peso: "500g", preco: 110 }
      ]
    }
  ]
};
```


## Integração com Homio/LeadConnector


### Custom Fields no Contato
| Campo | Key | Tipo |
|-------|-----|------|
| Produtos do Pedido | `produtos_pedido` | Long Text |
| Valor Total | `valor_total` | Number |
| Valor Entrada (50%) | `valor_entrada` | Number |
| Data Retirada | `data_retirada` | Date |
| Status do Pedido | `status_pedido` | Dropdown |
| Número do Pedido | `numero_pedido` | Text |
| Observações | `observacoes_pedido` | Long Text |


### Workflow com Inbound Webhook

**Ver guia completo:** [docs/WEBHOOK-HOMIO.md](docs/WEBHOOK-HOMIO.md)

### Payload do Webhook

```javascript
// POST para: https://services.leadconnectorhq.com/hooks/WEBHOOK_ID

const payload = {
  // Dados do cliente
  nome: "João Silva",
  telefone: "+5527999999999",
  email: "joao@email.com",
  
  // Dados do pedido
  numero_pedido: "NOZ-2025-0042",
  data_retirada: "2025-12-24",
  
  // Produtos (formato legível)
  produtos_pedido: `
    2x Salada de Bacalhau 500g - R$ 250,00
    1x Chester/Peru ~4,5kg - R$ 535,00
    1x Farofa Natalina 1kg - R$ 105,00
  `,
  
  // Produtos (formato JSON para processamento)
  produtos_json: JSON.stringify([
    { id: "salada-bacalhau", nome: "Salada de Bacalhau", peso: "500g", qtd: 2, preco: 125, subtotal: 250 },
    { id: "chester-peru", nome: "Chester/Peru", peso: "~4,5kg", qtd: 1, preco: 535, subtotal: 535 },
    { id: "farofa-natalina", nome: "Farofa Natalina", peso: "1kg", qtd: 1, preco: 105, subtotal: 105 }
  ]),
  
  // Valores
  valor_total: 890,
  valor_entrada: 445,
  
  // Observações
  observacoes: "Sem passas na farofa, por favor",
  
  // Metadata
  status_pedido: "Aguardando PIX",
  created_at: "2025-12-15T14:30:00Z"
};
```


## Fluxo de Automações

**Ver guia completo:** [docs/WEBHOOK-HOMIO.md](docs/WEBHOOK-HOMIO.md)

### Workflows Implementados

1. **Novo Pedido Recebido** - Cria contato, aplica tags, envia confirmação
2. **PIX Confirmado** - Atualiza status, envia confirmação de pagamento
3. **Lembretes Automáticos** - Retirada e pagamento pendente

## Sistema de Tracking

**Ver documentação completa:** [docs/TRACKING.md](docs/TRACKING.md)

### Eventos Rastreados

| Evento | Quando Dispara | Plataformas |
|--------|----------------|-------------|
| ViewContent | Ampliar imagem do produto | Meta, GA4, GTM |
| AddToCart | Adicionar ao carrinho | Meta, GA4, GTM |
| RemoveFromCart | Remover do carrinho | Meta, GA4, GTM |
| InitiateCheckout | Abrir carrinho | Meta, GA4, GTM |
| AddPaymentInfo | Preencher nome | Meta, GA4, GTM |
| Purchase | Finalizar pedido | Meta, GA4, GTM |
| PurchaseReal | Confirmar PIX (admin) | Meta, GA4, GTM |

### Captura de UTMs

**Ver documentação completa:** [docs/UTMS-SHEETS.md](docs/UTMS-SHEETS.md)

O sistema captura automaticamente parâmetros UTM da URL:
- `utm_source` - Origem do tráfego
- `utm_medium` - Tipo de mídia
- `utm_campaign` - Nome da campanha
- `utm_term` - Palavra-chave
- `utm_content` - Variação do anúncio

## Painel Administrativo

**Ver documentação completa:** [docs/ADMIN-PANEL.md](docs/ADMIN-PANEL.md)

### Funcionalidades Principais

- Listagem de pedidos em tempo real
- Filtros por data e status de pagamento
- Confirmação de PIX
- Estatísticas dinâmicas
- Integração direta com API do Homio

### Configuração da API

```javascript
const API_CONFIG = {
    baseUrl: 'https://services.leadconnectorhq.com',
    token: 'pit-eb3d06dd-5ec1-4a10-9aba-76b6b8490f1a',
    locationId: 'iuYB2N2aOtvi7dlzJ1sQ',
    version: '2021-07-28'
};
```

## Performance e Otimização

### Imagens
- **Formato:** WebP
- **Redução:** 94% (de ~100MB para ~6MB)
- **Otimizadas:** 16 produtos + 3 backgrounds

### Cache e Versionamento
- Cache busting com versioning: `?v=20251205`
- Scripts versionados para garantir atualização
- CDN global via Vercel

### Responsividade
- Mobile-first design
- Breakpoints: 768px, 1024px, 1440px
- Grid adaptativo (1-4 colunas)
- Touch-friendly (botões grandes, espaçamento adequado)

## Segurança

⚠️ **Considerações Importantes:**

1. **Tokens expostos:** API tokens estão no código fonte (client-side)
   - **Recomendação:** Mover para backend/proxy em produção
2. **Senha hardcoded:** Senha do admin está no código
   - **Recomendação:** Implementar autenticação server-side
3. **HTTPS Only:** Sempre usar HTTPS em produção
4. **Rate Limiting:** Considerar limitação de requisições à API

## Monitoramento

### Ferramentas Utilizadas
- **Meta Events Manager:** Tracking de conversões Facebook/Instagram
- **Google Analytics 4:** Análise de comportamento e funil
- **Google Tag Manager:** Gestão centralizada de tags
- **Vercel Analytics:** Performance e uptime

### Métricas Principais
- Taxa de conversão do funil
- Origem de tráfego (UTMs)
- Valor médio do pedido
- Taxa de confirmação de PIX
- Performance (Core Web Vitals)

## Documentação Adicional

| Documento | Link |
|-----------|------|
| **Guia do Admin** | [docs/ADMIN-PANEL.md](docs/ADMIN-PANEL.md) |
| **Sistema de Tracking** | [docs/TRACKING.md](docs/TRACKING.md) |
| **UTMs e Google Sheets** | [docs/UTMS-SHEETS.md](docs/UTMS-SHEETS.md) |
| **Webhook Homio** | [docs/WEBHOOK-HOMIO.md](docs/WEBHOOK-HOMIO.md) |
| **README Principal** | [README.md](README.md) |

---

**Última atualização:** 05/12/2025  
**Versão:** 2.0
