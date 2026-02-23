# 🎄 Ceia de Natal 2025 - Restaurante Noz

Sistema de pedidos online para a Ceia de Natal do Restaurante Noz Comida Afetiva.

## 🚀 URLs de Produção

- **Site Principal:** [Vercel Deploy]
- **Painel Admin:** [URL]/admin.html
- **Repositórios:**
  - Original: https://github.com/dudupmoreira/-NOZ-Ceia2025 (privado)
  - Deploy: https://github.com/WebChuva/-NOZ-Ceia2025 (privado)

## 📋 Sobre o Projeto

Sistema web para gerenciamento de pedidos da Ceia de Natal, com:
- Interface intuitiva para clientes (estilo iFood)
- Carrinho de compras interativo
- Integração com LeadConnector/Homio via webhook
- Painel administrativo para gestão de pedidos
- Sistema de confirmação via PIX
- Automações de WhatsApp

## 🏗️ Estrutura do Projeto

```
CeiaNoz/
├── index.html              # Página principal (pedidos)
├── admin.html              # Painel administrativo
├── css/
│   └── styles.css          # Estilos do projeto
├── js/
│   ├── app.js              # Lógica principal e carrinho
│   ├── cardapio.js         # Dados do cardápio (produtos)
│   └── tracking.js         # Sistema de rastreamento de eventos
├── imagens/                # Imagens otimizadas (WebP)
│   ├── *.webp              # Produtos e backgrounds
│   ├── logo-*.webp         # Logos do restaurante
│   └── favicon.png
├── docs/                   # 📚 Documentação
│   ├── ADMIN-PANEL.md      # Guia do painel administrativo
│   ├── TRACKING.md         # Rastreamento de eventos (Meta/GA4/GTM)
│   ├── UTMS-SHEETS.md      # UTMs e integração com Google Sheets
│   └── WEBHOOK-HOMIO.md    # Configuração do webhook Homio
├── .gitignore              # Arquivos ignorados pelo Git
├── .vercelignore           # Arquivos ignorados pelo Vercel
├── ARQUITETURA.md          # Documentação técnica detalhada
└── README.md               # Este arquivo
```

## ✨ Funcionalidades Implementadas

### Site Principal (index.html)
- ✅ Seleção de produtos por categoria
- ✅ Carrinho de compras com cálculo automático
- ✅ Seleção de data de retirada (24/12 ou 31/12)
- ✅ Formulário de dados do cliente
- ✅ Geração de número de pedido único
- ✅ Envio de pedido via webhook para Homio
- ✅ Página de confirmação com dados do PIX
- ✅ Botão de compartilhamento via WhatsApp
- ✅ URL compartilhável para restaurar pedido (?pedido=)

### Painel Admin (admin.html) 🆕
- ✅ **Migrado para API de Oportunidades** (suporta múltiplos pedidos por cliente)
- ✅ **Arquitetura Serverless Segura** (API routes protegem token)
- ✅ Listagem de pedidos em cards compactos
- ✅ Grid responsivo (3-4 cards por linha)
- ✅ **Filtros por data de retirada** (24/12, 31/12, Todos)
- ✅ **Filtros por status de pagamento** (Todos, Pagos, Aguardando)
- ✅ **Filtros por estágio do pipeline** (aguardando/pago/pronto/entregue)
- ✅ Filtros combinados (data + status)
- ✅ Badge "PIX Confirmado" para pedidos pagos
- ✅ **Confirmação de PIX** (move estágio + atualiza campo + adiciona tag)
- ✅ **Exibição apenas de pedidos ativos** (status "open")
- ✅ Estatísticas dinâmicas por filtro
- ✅ Botão manual de atualização
- ✅ Correção de fuso horário (UTC-3)
- ✅ Tema claro e UX otimizada
- ✅ Exibição correta de custom fields da API

### Sistema de Rastreamento
- ✅ Tracking de eventos (Meta Pixel, GA4, GTM)
- ✅ Captura de UTMs de origem de tráfego
- ✅ Evento Purchase ao finalizar pedido
- ✅ Evento PurchaseReal ao confirmar PIX no admin
- ✅ Integração com Google Sheets (opcional)

## 🔧 Tecnologias

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Backend:** Vercel Serverless Functions (API Routes)
- **Estilização:** CSS Grid, Flexbox, CSS Variables
- **Integração:** LeadConnector/Homio API (Opportunities + Contacts)
- **Tracking:** Meta Pixel, Google Analytics 4, Google Tag Manager
- **Hospedagem:** Vercel
- **Segurança:** Environment Variables, API Proxy
- **Imagens:** WebP (otimizado)
- **Versionamento:** Git + GitHub

## 🎨 Performance

- **Otimização de Imagens:** 
  - Conversão de JPG para WebP
  - Redução de ~100MB para ~6MB (94%)
  - 16 imagens de produtos otimizadas
  - 3 backgrounds otimizados

- **Cache Busting:**
  - Versionamento de scripts (v=20251202-2)
  - Garantia de atualização do cache

## 🔐 Variáveis de Ambiente

### Vercel Environment Variables

Configurar no dashboard do Vercel (Settings → Environment Variables):

```
HIGHLEVEL_API_TOKEN=pit-xxxxx-xxxxx-xxxxx
```

⚠️ **Importante**: O token da API **NÃO** deve ser commitado no código. Ele é acessado apenas pelas API routes serverless.

### Custom Fields IDs (Oportunidades)

No `admin.html`, os IDs dos custom fields das oportunidades estão mapeados:

```javascript
const OPPORTUNITY_FIELD_MAP = {
    'valor_entrada': '2SV51sUefbrpE6j54idA',
    'data_retirada': '8onjX8uBLwCOGns5rt2Y',
    'numero_pedido': 'JZ4QzbdK3QSFQUT8b6OY',
    'produtos': 'KjW6kvcr3bfEhHeMOGFt',
    'observacoes': 'VAhkeO8SWwSiSqJG88is',
    'valor_total': 'VpeiHn8nXzv4QWiCf9pl',
    'status_pedido': 'tQP5XogWJYh0MbKAYjOm'
};
```

### Pipeline e Estágios

```javascript
const PIPELINE_STAGES = {
    'aguardando': 'a6b0ad85-0fc1-4f8c-abb8-8942e402e685',
    'pago': 'f03fdf22-edd1-4c47-bdf7-56a3b51e5b62',
    'pronto': '61a9a4f3-d168-4c92-bd85-1d7d4876ec29',
    'entregue': '69ad13db-bc91-43af-b576-a5003e309520',
    'cancelado': '10fa68b8-7b55-4059-8a02-65e8cdce2ecc'
};
```

## 📦 Deploy

### Deploy Automático (Vercel)

O projeto está configurado para deploy automático:

1. Push para `main` no repositório WebChuva
2. Vercel detecta as mudanças
3. Build e deploy automático

### Deploy Manual (Vercel CLI)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Configurações do Vercel

```
Framework Preset: Other
Root Directory: (vazio)
Build Command: (vazio)
Output Directory: .
Install Command: (vazio)
```

## 🛠️ Desenvolvimento Local

1. Clone o repositório:
```bash
git clone https://github.com/WebChuva/-NOZ-Ceia2025.git
cd CeiaNoz
```

2. Abra o `index.html` em um servidor local:
```bash
# Python 3
python -m http.server 8000

# Node.js (http-server)
npx http-server

# PHP
php -S localhost:8000
```

3. Acesse: http://localhost:8000

## 📚 Documentação

### Guias Disponíveis

| Documento | Descrição |
|-----------|-----------|
| [**ADMIN-PANEL.md**](docs/ADMIN-PANEL.md) | Guia completo do painel administrativo |
| [**TRACKING.md**](docs/TRACKING.md) | Sistema de rastreamento de eventos |
| [**UTMS-SHEETS.md**](docs/UTMS-SHEETS.md) | Captura de UTMs e Google Sheets |
| [**WEBHOOK-HOMIO.md**](docs/WEBHOOK-HOMIO.md) | Configuração do webhook |
| [**ARQUITETURA.md**](ARQUITETURA.md) | Arquitetura técnica do sistema |

## 📝 Configuração Inicial

### 1. Configurar Custom Fields no Homio

Criar os seguintes custom fields em Settings > Custom Fields:

| Nome | Key | Tipo |
|------|-----|------|
| Número do Pedido | numero_pedido | Text |
| Produtos do Pedido | produtos_pedido | Long Text |
| Valor Total | valor_total | Number |
| Valor Entrada | valor_entrada | Number |
| Data Retirada | data_retirada | Date |
| Status do Pedido | status_pedido | Text |
| Observações | observacoes | Long Text |
| UTM Source | utm_source | Text |
| UTM Medium | utm_medium | Text |
| UTM Campaign | utm_campaign | Text |

### 2. Configurar Webhook

Siga o guia completo em: [docs/WEBHOOK-HOMIO.md](docs/WEBHOOK-HOMIO.md)

### 3. Atualizar Credenciais

Edite `admin.html` com suas credenciais da API do Homio.

## 🔄 Fluxo de Pedidos (Atualizado)

```
1. Cliente acessa site
   (UTMs capturadas automaticamente)
    ↓
2. Seleciona produtos e adiciona ao carrinho
   (Evento: AddToCart disparado)
    ↓
3. Preenche dados (nome, telefone, email)
   (Evento: AddPaymentInfo disparado)
    ↓
4. Finaliza pedido
   (Evento: Purchase disparado)
    ↓
5. Webhook envia dados para Homio
   (Oportunidade criada no pipeline "Pedidos Ceia")
   (Estágio inicial: "Aguardando Pagamento")
   (Custom fields preenchidos: produtos, valores, data, etc.)
    ↓
6. Tags aplicadas no contato: "ceia-2025", "aguardando-pagamento"
    ↓
7. Cliente recebe dados do PIX
    ↓
8. Cliente faz pagamento e envia comprovante
    ↓
9. Admin confirma PIX no painel
   → Oportunidade movida para estágio "Pago"
   → Campo "Status do pedido" = "PIX Confirmado"
   → Tag "pix-confirmado" adicionada ao contato
   → Evento: PurchaseReal disparado
    ↓
10. Automação envia confirmação via WhatsApp
    ↓
11. Admin prepara pedido
   → Oportunidade movida para estágio "Pronto"
    ↓
12. Cliente retira pedido
   → Oportunidade movida para estágio "Entregue"
   → Status da oportunidade = "won" (concluído)
```

## 🔒 Segurança

- ✅ Token da API protegido em variáveis de ambiente
- ✅ API routes serverless fazem proxy das chamadas
- ✅ Token nunca exposto no frontend
- ✅ HTTPS obrigatório (Vercel)
- ✅ CORS configurado nas API routes
- ✅ Validação de inputs no backend

## 📞 Contato

**Restaurante Noz Comida Afetiva**
- WhatsApp: (27) 99701-6929
- Instagram: @nozcomidaafetiva
- Endereço: Rua Amélia Tartuce Nasser, 865, Loja 10 - Jardim da Penha, Vitória/ES

## 📄 Licença

Projeto proprietário - Restaurante Noz Comida Afetiva © 2025

## 🎯 Roadmap Futuro

### Curto Prazo
- [ ] Busca por nome/telefone no admin
- [ ] Exportar relatórios em CSV
- [ ] Notificações em tempo real

### Médio Prazo
- [ ] Integração com gateway de pagamento (PIX automático)
- [ ] Dashboard de analytics com gráficos
- [ ] Sistema de cupons de desconto

### Longo Prazo
- [ ] App mobile (PWA)
- [ ] Sistema de rotas de entrega
- [ ] Programa de fidelidade

---

**Última atualização:** 16/12/2025  
**Versão:** 3.0 - Migração para API de Oportunidades + Arquitetura Serverless Segura
