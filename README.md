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
│   ├── kv-hero.webp        # Hero da campanha
│   ├── kv-torta-capixaba.webp
│   ├── kv-torta-bacalhau.webp
│   ├── kv-bacalhau-natas.webp
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

## Variáveis de Ambiente (Vercel)

```
HIGHLEVEL_API_TOKEN=<token da conta Homio/LeadConnector>
```

## Pendências — Setup Homio

Após criar o pipeline "Pedidos Semana Santa 2026" no Homio, substituir os placeholders:

**`js/app.js`** — CONFIG.webhookUrl:
```javascript
webhookUrl: "URL_DO_WEBHOOK_AQUI",
```

**`admin.html`** — API_CONFIG.pipelineId:
```javascript
pipelineId: 'ID_DO_PIPELINE_AQUI'
```

**`admin.html`** — PIPELINE_STAGES (substituir todos os `PLACEHOLDER_STAGE_*`).

> **Nota:** Os custom field IDs em `OPPORTUNITY_FIELD_MAP` são account-scoped no Homio.
> Se for a mesma sub-account da Ceia, podem ser os mesmos IDs. Verificar no painel.

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
