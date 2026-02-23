# 🎛️ Painel Administrativo - Ceia do Noz

## Visão Geral

O painel administrativo (`admin.html`) permite à equipe visualizar e gerenciar todos os pedidos da Ceia de Natal em tempo real, com integração direta com a API do LeadConnector/Homio.

**URL:** https://ceiadonoz.nozcomidaafetiva.com.br/admin

---

## 🔐 Acesso

### Senha de Acesso
```javascript
const ADMIN_PASSWORD = 'noz2025';
```

⚠️ **Segurança:** Esta senha está hardcoded no código. Para produção, considere implementar autenticação mais robusta.

---

## 🎯 Funcionalidades

### 1. Listagem de Pedidos

O painel exibe todos os pedidos com as seguintes informações:

| Campo | Descrição |
|-------|-----------|
| **Número do Pedido** | ID único (ex: NOZ-2025-0042) |
| **Nome do Cliente** | Nome completo |
| **Telefone** | Número de contato |
| **Email** | Email do cliente |
| **Data de Retirada** | 24/12 ou 31/12 |
| **Produtos** | Lista de itens do pedido |
| **Valor Total** | Valor completo do pedido |
| **Valor Entrada** | 50% para entrada (PIX) |
| **Status** | Aguardando pagamento ou PIX confirmado |
| **Observações** | Observações do cliente (se houver) |

### 2. Filtros Inteligentes

#### 2.1 Filtro por Data de Retirada
- **Todos** - Exibe todos os pedidos
- **24/12** - Apenas pedidos para retirada no dia 24/12
- **31/12** - Apenas pedidos para retirada no dia 31/12

#### 2.2 Filtro por Status de Pagamento
- **Todos** - Exibe todos os pedidos (pagos e aguardando)
- **Pagos** - Apenas pedidos com PIX confirmado
- **Aguardando** - Apenas pedidos aguardando confirmação

**Combinação de Filtros:** Os filtros funcionam em conjunto, permitindo visualizações como "Apenas pagos do dia 24/12".

### 3. Confirmação de PIX

Botão para confirmar recebimento do PIX:
- Remove a tag `aguardando-pagamento`
- Adiciona a tag `pix-confirmado`
- Dispara evento de tracking **PurchaseReal**
- Desabilita o botão após confirmação
- Exibe badge visual "✅ PIX Confirmado"

### 4. Estatísticas em Tempo Real

Cards de resumo que atualizam automaticamente com base nos filtros:
- **Total de Pedidos** - Quantidade de pedidos na seleção
- **Valor Total** - Soma de todos os valores
- **Total Entrada (50%)** - Soma de todas as entradas

### 5. Atualização Manual

Botão "🔄 Atualizar" para recarregar pedidos da API sem refresh da página.

### 6. Acesso Rápido ao WhatsApp

Botão direto para abrir conversa com o cliente via WhatsApp Web.

---

## 🔌 Integração com API

### Configuração da API

```javascript
const API_CONFIG = {
    baseUrl: 'https://services.leadconnectorhq.com',
    token: 'pit-eb3d06dd-5ec1-4a10-9aba-76b6b8490f1a',
    locationId: 'iuYB2N2aOtvi7dlzJ1sQ',
    version: '2021-07-28'
};
```

### Endpoints Utilizados

#### 1. Listar Contatos
```
GET /contacts/?locationId={locationId}&limit=100
Headers:
  - Authorization: Bearer {token}
  - Version: {version}
  - Accept: application/json
```

**Filtro Aplicado:** Busca apenas contatos com tags `aguardando-pagamento` OU `pix-confirmado`.

#### 2. Buscar Contato Individual
```
GET /contacts/{contactId}
Headers:
  - Authorization: Bearer {token}
  - Version: {version}
  - Accept: application/json
```

Usado antes de confirmar PIX para obter tags atuais.

#### 3. Atualizar Contato (Confirmar PIX)
```
PUT /contacts/{contactId}
Headers:
  - Authorization: Bearer {token}
  - Version: {version}
  - Content-Type: application/json
Body:
  { "tags": ["pix-confirmado", ...outras tags] }
```

---

## 📊 Custom Fields (Campos Personalizados)

### Mapeamento de IDs

O painel mapeia campos personalizados do Homio usando seus IDs:

```javascript
const CUSTOM_FIELD_MAP = {
    'produtos_pedido': 'If8oqvhkoAYNtGwiecIO',
    'valor_entrada': '6qDwjoJADxN2x5F3zSCg',
    'status_pedido': 'pmxAislCxjvEFYYTup4f',
    'valor_total': 'JMNWXPU15qENbgGhx9SN',
    'numero_pedido': '3IOhOp251a4Y5RW9CsDL',
    'observacoes_pedido': 'hh51SkBndd383fcBr998',
    'data_retirada': 'myBIwy68LfiKwJwFXRKl'
};
```

### Como Obter IDs dos Custom Fields

1. Acesse o Homio/LeadConnector
2. Vá em **Settings** → **Custom Fields**
3. Clique em um campo
4. Copie o ID da URL ou das configurações

---

## 🎨 Interface do Usuário

### Layout

- **Grid Responsivo:** Adapta-se automaticamente ao tamanho da tela
- **Cards Compactos:** Design otimizado para visualizar múltiplos pedidos
- **Cores:** Paleta do restaurante (vinho #5c0f1e, dourado #d4af37)
- **Tipografia:** System fonts para performance

### Estados Visuais

#### Badge de Data
```css
background: #e3f2fd;
color: #1565c0;
```

#### Badge PIX Confirmado
```css
background: #d4edda;
color: #155724;
```

#### Botão Confirmar PIX
- **Ativo:** Verde (#28a745)
- **Desabilitado:** Cinza (#6c757d, opacidade 0.6)

---

## 🔄 Fluxo de Confirmação de PIX

```
1. Cliente faz o pedido no site
   ↓
2. Webhook cria contato no Homio
   Tag: "aguardando-pagamento"
   ↓
3. Cliente faz PIX e envia comprovante
   ↓
4. Admin confirma no painel
   ↓
5. Sistema atualiza contato via API
   Remove: "aguardando-pagamento"
   Adiciona: "pix-confirmado"
   ↓
6. Dispara evento PurchaseReal (tracking)
   ↓
7. Automação do Homio envia confirmação
```

---

## 📱 Responsividade

### Breakpoints

| Dispositivo | Largura | Layout |
|-------------|---------|--------|
| Desktop XL | ≥1440px | 4 cards por linha |
| Desktop | ≥1024px | 3 cards por linha |
| Tablet | ≥768px | 2 cards por linha |
| Mobile | <768px | 1 card por linha |

---

## 🔧 Customização

### Alterar Senha

Edite no início do `<script>` em `admin.html`:

```javascript
const ADMIN_PASSWORD = 'sua_nova_senha';
```

### Alterar Limite de Pedidos

Por padrão, carrega até 100 pedidos:

```javascript
const response = await fetch(
    `${API_CONFIG.baseUrl}/contacts/?locationId=${API_CONFIG.locationId}&limit=100`,
    // ... headers
);
```

Para mais pedidos, aumente o `limit` ou implemente paginação.

### Adicionar Novos Filtros

Para adicionar filtro por valor, categoria, etc., siga o padrão:

1. Adicionar botões no HTML:
```html
<div class="filter-group">
    <button class="filter-btn active" onclick="filterByValue('todos')" data-value-filter="todos">Todos</button>
    <button class="filter-btn" onclick="filterByValue('alto')" data-value-filter="alto">Acima R$ 500</button>
</div>
```

2. Adicionar variável de estado:
```javascript
let currentValueFilter = 'todos';
```

3. Criar função de filtro:
```javascript
function filterByValue(filter) {
    currentValueFilter = filter;
    // ... lógica de ativação do botão
    displayPedidos();
    updateStats();
}
```

4. Aplicar filtro em `displayPedidos()`:
```javascript
if (currentValueFilter === 'alto') {
    pedidosFiltrados = pedidosFiltrados.filter(pedido => {
        const valor = parseFloat(getCustomField(pedido, 'valor_total')) || 0;
        return valor > 500;
    });
}
```

---

## 📊 Tracking de Eventos

### Evento PurchaseReal

Quando o admin confirma um PIX, o sistema dispara o evento `PurchaseReal`:

```javascript
trackPurchaseReal({
    transactionId: 'NOZ-2025-0042',
    valorTotal: 890.00,
    valorEntrada: 445.00,
    customerName: 'João Silva',
    customerPhone: '27999999999',
    customerEmail: 'joao@email.com',
    dataRetirada: '24/12'
});
```

Este evento é enviado para:
- **Meta Pixel** (Facebook Ads)
- **Google Analytics 4**
- **Google Tag Manager**

Ver documentação completa em: [docs/TRACKING.md](TRACKING.md)

---

## 🐛 Troubleshooting

### Pedidos não aparecem

**Possíveis causas:**
1. Token da API expirado ou inválido
2. Location ID incorreto
3. Contatos não têm as tags necessárias
4. Limite de rate da API atingido

**Solução:**
- Abra o Console (F12) e verifique erros
- Confirme as credenciais da API
- Verifique se os contatos têm tags `aguardando-pagamento` ou `pix-confirmado`

### Erro ao confirmar PIX

**Possíveis causas:**
1. Permissões insuficientes do token
2. Contato foi deletado
3. Erro de rede

**Solução:**
- Verifique permissões do token no Homio
- Atualize a lista de pedidos
- Tente novamente

### Custom fields não aparecem

**Possíveis causas:**
1. IDs dos custom fields incorretos
2. Campos não foram preenchidos no pedido original
3. Formato de dados incompatível

**Solução:**
- Confirme os IDs no `CUSTOM_FIELD_MAP`
- Verifique se o webhook está enviando os dados corretamente
- Use `console.log()` para debug dos dados recebidos

### Fuso horário incorreto

O sistema usa UTC-3 (horário de Brasília). Se houver discrepância:

1. Verifique a função `formatarData()`
2. Confirme que timestamps estão em UTC no Homio
3. Ajuste a conversão se necessário

---

## 🔒 Segurança

### Recomendações

1. **Autenticação:** Implementar sistema de login mais robusto (OAuth, JWT)
2. **HTTPS Only:** Garantir que o painel só funcione em HTTPS
3. **Token Rotation:** Rotacionar tokens da API periodicamente
4. **Logs:** Registrar todas as ações administrativas
5. **Permissões:** Limitar acesso apenas a usuários autorizados
6. **Rate Limiting:** Implementar limitação de requisições

### Proteção do Token

⚠️ **IMPORTANTE:** O token da API está visível no código fonte. Para produção:

1. Mova tokens para variáveis de ambiente
2. Use proxy/backend para chamadas à API
3. Implemente autenticação server-side

---

## 📈 Melhorias Futuras

### Curto Prazo
- [ ] Adicionar busca por nome/telefone
- [ ] Exportar relatório em CSV/Excel
- [ ] Filtro por range de valores
- [ ] Ordenação personalizada (valor, data, etc.)

### Médio Prazo
- [ ] Painel de métricas (gráficos)
- [ ] Histórico de alterações
- [ ] Notificações em tempo real
- [ ] Sistema de comentários internos

### Longo Prazo
- [ ] App mobile do admin
- [ ] Integração com impressora térmica
- [ ] Sistema de rotas de entrega
- [ ] Dashboard de analytics completo

---

## 📞 Contato e Suporte

Para dúvidas sobre o painel administrativo:
- Consulte a documentação técnica: [ARQUITETURA.md](../ARQUITETURA.md)
- Veja guias de integração: [docs/](.)

---

**Última atualização:** 05/12/2025  
**Versão:** 2.0 (com filtros de status de pagamento)
