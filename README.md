# NOZ — Semana Santa 2026

Site de encomendas para a campanha de Semana Santa 2026 do NOZ Comida Afetiva.

Baseado em: [-NOZ-Ceia2025](https://github.com/dudupmoreira/-NOZ-Ceia2025)

## Cardápio

| Prato | 500g | 1kg |
|---|---|---|
| Torta Capixaba | R$ 140,00 | R$ 250,00 |
| Torta de Bacalhau | R$ 130,00 | R$ 240,00 |
| Bacalhau com Natas | R$ 130,00 | R$ 240,00 |

## Datas de Retirada

- **03/04/2026** — Quinta-feira Santa
- **04/04/2026** — Sexta-feira Santa
- **05/04/2026** — Sábado de Aleluia

**Encerramento de pedidos: 30/03/2026**

## Status do Projeto

### ✅ Concluído

- [x] Repositório criado e code base adaptado da Ceia 2025
- [x] Imagens KV convertidas para WebP e adicionadas (`imagens/`)
- [x] `js/cardapio.js` — 3 pratos com preços e descrições corretas
- [x] `css/styles.css` — paleta creme/dourado quente (moodboard Semana Santa)
- [x] `js/app.js` — datas, prefixo de pedido `NOZ-SS26-`, webhook URL, date picker
- [x] `index.html` — conteúdo, fontes (Cormorant Garamond + Jost), hero, datas
- [x] `admin.html` — senha, cores, pipeline ID e stage IDs reais
- [x] Deploy na Vercel: https://noz-semana-santa-2026.vercel.app
- [x] `HIGHLEVEL_API_TOKEN` configurado na Vercel
- [x] Pipeline "Pedidos Semana Santa 2026" criado no Homio
- [x] Webhook trigger criado no Homio e URL configurada no `app.js`
- [x] Workflow Homio configurado (criar contato + criar oportunidade)
- [x] Integração validada via API — oportunidade criada com todos os 7 custom fields

### ⏳ Pendente

- [ ] **Domínio** — adicionar `semanasanta.nozcomidaafetiva.com.br` na Vercel + CNAME no DNS
- [ ] **Limpar testes** — deletar contatos/oportunidades de teste criados no Homio
- [ ] **Fotos reais** — substituir KVs de IA pelas fotos reais dos pratos (~25/02)
- [ ] **Teste ponta a ponta** — fazer pedido real no site e validar fluxo completo

---

## Estrutura do Projeto

```
-NOZ-SemanaSanta2026/
├── index.html              # Página principal (pedidos)
├── admin.html              # Painel administrativo
├── vercel.json             # Configuração Vercel
├── css/
│   └── styles.css          # Estilos (paleta Semana Santa)
├── js/
│   ├── app.js              # Lógica principal e carrinho
│   ├── cardapio.js         # Dados do cardápio (3 pratos)
│   └── tracking.js         # Sistema de rastreamento de eventos
├── imagens/
│   ├── kv-hero.webp        # Hero da campanha (KV IA — substituir)
│   ├── kv-torta-capixaba.webp  # (KV IA — substituir)
│   ├── kv-torta-bacalhau.webp  # (KV IA — substituir)
│   ├── kv-bacalhau-natas.webp  # (KV IA — substituir)
│   ├── kv-origem.webp
│   ├── kv-cardapio.webp
│   ├── kv-detail-1.webp
│   ├── kv-detail-2.webp
│   └── logo-noz-*.webp
└── api/
    ├── contacts/[id].js    # Proxy Homio contacts
    └── opportunities/
        ├── [id].js         # Proxy Homio opportunities update
        └── search.js       # Proxy Homio opportunities search
```

---

## Configuração Homio

### IDs de Produção

```javascript
locationId:  'iuYB2N2aOtvi7dlzJ1sQ'
pipelineId:  'UXDH7uCV0M5zCAK7WEk1'  // Pedidos Semana Santa 2026

// Estágios
aguardando:  '6a2651cb-91b6-403f-be37-e4d777dcdac9'  // Aguardando PIX
pago:        'e1cc970d-baf4-45ed-bb60-79cc4f14ce3a'  // PIX Confirmado
pronto:      '68ab1ea7-12d5-47bb-bfb3-f714975ef17c'  // Pedido Pronto
entregue:    '75c7a3fa-6ec1-4546-8d0a-faea5ef8ce50'  // Pedido Entregue
cancelado:   '31baae50-52a4-43dc-b9c0-de01d8b036a1'  // Cancelado

// Custom fields de oportunidade (account-scoped, mesmos da Ceia)
valor_entrada:  '2SV51sUefbrpE6j54idA'
data_retirada:  '8onjX8uBLwCOGns5rt2Y'
numero_pedido:  'JZ4QzbdK3QSFQUT8b6OY'
produtos:       'KjW6kvcr3bfEhHeMOGFt'
observacoes:    'VAhkeO8SWwSiSqJG88is'
valor_total:    'VpeiHn8nXzv4QWiCf9pl'
status_pedido:  'tQP5XogWJYh0MbKAYjOm'
```

### Webhook

```
Workflow: "Webhook Recebido Semana Santa 2026 Novo Pedido"
URL: https://services.leadconnectorhq.com/hooks/iuYB2N2aOtvi7dlzJ1sQ/webhook-trigger/91d1cc9f-a08c-435e-ba37-905a4bf9fdd5
```

### Payload enviado pelo site

Campos disponíveis em `{{inboundWebhookRequest.*}}` no workflow:

| Campo | Tipo | Exemplo |
|---|---|---|
| `numero_pedido` | string | `NOZ-SS26-7842` |
| `data_retirada` | string ISO | `2026-04-03` |
| `nome` | string | `João Silva` |
| `telefone` | string (só dígitos) | `27999991234` |
| `email` | string | `joao@email.com` |
| `observacoes` | string | `Sem cebola` |
| `produtos_pedido` | string (texto) | `1x Torta Capixaba 500g - R$ 140,00` |
| `produtos_json` | string JSON | `[{id, nome, peso, qtd, preco_unit, subtotal}]` |
| `valor_total` | number | `380` |
| `valor_entrada` | number | `190` |
| `status_pedido` | string | `Aguardando PIX` |
| `created_at` | string ISO | `2026-02-23T12:00:00.000Z` |
| `utm_source` | string | `instagram` |
| `utm_medium` | string | `social` |
| `utm_campaign` | string | `semanasanta2026` |
| `utm_term` | string | — |
| `utm_content` | string | `feed_post` |
| `landing_page` | string URL | URL completa com UTMs |
| `first_visit` | string ISO | Timestamp do primeiro acesso |

---

## Variáveis de Ambiente (Vercel)

```
HIGHLEVEL_API_TOKEN=pit-02f3d266-e844-431f-88eb-774c878529f1
```

## Admin Panel

URL: `/admin`
Senha: `nozsemanasanta2026`

## Deploy

Domínio: `semanasanta.nozcomidaafetiva.com.br`

DNS: CNAME `semanasanta` → `cname.vercel-dns.com`

```bash
# Deploy manual
vercel --prod
```

## Desenvolvimento Local

```bash
python3 -m http.server 8000
# ou
npx serve .
```

---

**Criado:** Fevereiro/2026
**Restaurante:** Noz Comida Afetiva — Vitória, ES
**Contato:** (27) 99701-6929 | @nozcomidaafetiva
**Agência:** Chuva Comunica
