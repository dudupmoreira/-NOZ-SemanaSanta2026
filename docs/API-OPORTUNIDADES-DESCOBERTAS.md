# 📊 Descobertas da API de Oportunidades - Homio

## ✅ Resumo

Com a nova chave API com escopo completo, **conseguimos acesso total à API de Oportunidades!**

---

## 🔑 Endpoints Funcionais

### 1. Listar Pipelines
```bash
GET /opportunities/pipelines?locationId=iuYB2N2aOtvi7dlzJ1sQ
```

**Resposta:** Lista todos os pipelines com seus estágios

### 2. Buscar Oportunidades
```bash
GET /opportunities/search?location_id=iuYB2N2aOtvi7dlzJ1sQ&limit=100
```

**Resposta:** Lista todas as oportunidades com dados completos

---

## 📋 Dados do Pipeline "Pedidos Ceia"

### ID do Pipeline
```
pwmwfFN1OoHoRpu70uY2
```

### Estágios e IDs

| Posição | Nome | ID do Estágio |
|---------|------|---------------|
| 0 | Aguardando Pagamento | `a6b0ad85-0fc1-4f8c-abb8-8942e402e685` |
| 1 | Pago | `f03fdf22-edd1-4c47-bdf7-56a3b51e5b62` |
| 2 | Pronto | `61a9a4f3-d168-4c92-bd85-1d7d4876ec29` |
| 3 | Entregue | `69ad13db-bc91-43af-b576-a5003e309520` |
| 4 | Cancelado | `10fa68b8-7b55-4059-8a02-65e8cdce2ecc` |

---

## 🗂️ Estrutura da Oportunidade

```javascript
{
  "id": "2ZZxMeUq8OiaBDOQrOjU",
  "name": "Ana Paula Tomasi Scardua  - NOZ-2025-7483",
  "monetaryValue": 975,
  "pipelineId": "pwmwfFN1OoHoRpu70uY2",
  "pipelineStageId": "a6b0ad85-0fc1-4f8c-abb8-8942e402e685",
  "status": "open",
  "source": "direto",
  "createdAt": "2025-12-16T13:42:01.332Z",
  "updatedAt": "2025-12-16T13:42:01.332Z",
  "contactId": "qwENe1iWpERkJV35rUdV",
  
  // Campos Personalizados
  "customFields": [
    {
      "id": "2SV51sUefbrpE6j54idA",
      "type": "number",
      "fieldValueNumber": 487.5  // Valor Entrada
    },
    {
      "id": "8onjX8uBLwCOGns5rt2Y",
      "type": "date",
      "fieldValueDate": 1766534400000  // Data Retirada (timestamp)
    },
    {
      "id": "JZ4QzbdK3QSFQUT8b6OY",
      "type": "string",
      "fieldValueString": "NOZ-2025-7483"  // Número do Pedido
    },
    {
      "id": "KjW6kvcr3bfEhHeMOGFt",
      "type": "string",
      "fieldValueString": "1x Salada..."  // Produtos
    },
    {
      "id": "VpeiHn8nXzv4QWiCf9pl",
      "type": "number",
      "fieldValueNumber": 975  // Valor Total
    },
    {
      "id": "tQP5XogWJYh0MbKAYjOm",
      "type": "array",
      "fieldValueArray": ["Aguardando PIX"]  // Status do Pedido
    }
  ],
  
  // Dados do Contato Vinculado
  "contact": {
    "id": "qwENe1iWpERkJV35rUdV",
    "name": "Ana Paula Tomasi Scardua",
    "email": "anapaulatscardua@gmail.com",
    "phone": "+5527981459720",
    "tags": ["ceia-2025", "aguardando-pagamento"]
  }
}
```

---

## 🎯 Mapeamento de Campos Personalizados

| Campo | ID | Tipo | Exemplo |
|-------|-----|------|---------|
| **Valor Entrada** | `2SV51sUefbrpE6j54idA` | number | 487.5 |
| **Data Retirada** | `8onjX8uBLwCOGns5rt2Y` | date | 1766534400000 |
| **Número do Pedido** | `JZ4QzbdK3QSFQUT8b6OY` | string | "NOZ-2025-7483" |
| **Produtos** | `KjW6kvcr3bfEhHeMOGFt` | string | "1x Salada..." |
| **Observações** | `VAhkeO8SWwSiSqJG88is` | string | "Sem glúten..." |
| **Valor Total** | `VpeiHn8nXzv4QWiCf9pl` | number | 975 |
| **Status do Pedido** | `tQP5XogWJYh0MbKAYjOm` | array | ["Aguardando PIX"] |

---

## 💡 Vantagens de Usar Oportunidades

### ✅ Problemas Resolvidos

1. **Múltiplos Pedidos por Cliente**
   - Cada pedido = 1 oportunidade independente
   - Cliente pode ter N oportunidades no mesmo pipeline
   - Admin lista PEDIDOS e não CLIENTES

2. **Gestão de Status**
   - Cada oportunidade tem seu próprio estágio
   - Movimentação entre estágios: Aguardando → Pago → Pronto → Entregue
   - Fácil visualizar pipeline no Homio

3. **Dados Estruturados**
   - Campos personalizados na oportunidade
   - Valor monetário para relatórios
   - Histórico de mudanças de estágio

4. **Filtros Precisos**
   - Filtrar por estágio
   - Filtrar por data de retirada
   - Filtrar por valor
   - Buscar por número do pedido

---

## 🚀 Plano de Implementação

### 1. Modificar admin.html

**Mudanças principais:**
```javascript
// ANTES: Buscar contatos
const response = await fetch(
  `${API_CONFIG.baseUrl}/contacts/?locationId=${API_CONFIG.locationId}`,
  { headers: {...} }
);

// DEPOIS: Buscar oportunidades
const response = await fetch(
  `${API_CONFIG.baseUrl}/opportunities/search?location_id=${API_CONFIG.locationId}&limit=100`,
  { headers: {...} }
);
```

### 2. Atualizar Mapeamento de Campos

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

const PIPELINE_STAGES = {
  'aguardando': 'a6b0ad85-0fc1-4f8c-abb8-8942e402e685',
  'pago': 'f03fdf22-edd1-4c47-bdf7-56a3b51e5b62',
  'pronto': '61a9a4f3-d168-4c92-bd85-1d7d4876ec29',
  'entregue': '69ad13db-bc91-43af-b576-a5003e309520',
  'cancelado': '10fa68b8-7b55-4059-8a02-65e8cdce2ecc'
};
```

### 3. Nova Função de Confirmação de PIX

**Atualizar oportunidade ao invés de contato:**

```javascript
async function confirmarPix(opportunityId, numeroPedido) {
  if (!confirm(`Confirmar o PIX do pedido #${numeroPedido}?`)) {
    return;
  }

  try {
    // Mover oportunidade para estágio "Pago"
    const response = await fetch(
      `${API_CONFIG.baseUrl}/opportunities/${opportunityId}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${API_CONFIG.token}`,
          'Version': API_CONFIG.version,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pipelineStageId: PIPELINE_STAGES.pago
        })
      }
    );

    if (!response.ok) {
      throw new Error('Erro ao atualizar oportunidade');
    }

    alert(`✅ PIX confirmado para o pedido #${numeroPedido}!`);
    await loadPedidos();
    
  } catch (error) {
    console.error('Erro ao confirmar PIX:', error);
    alert(`❌ Erro ao confirmar PIX: ${error.message}`);
  }
}
```

### 4. Filtros por Estágio

```javascript
// Filtrar oportunidades por estágio
function filterByStage(stage) {
  if (stage === 'todos') {
    displayPedidos(allOportunidades);
  } else if (stage === 'aguardando') {
    const filtered = allOportunidades.filter(opp => 
      opp.pipelineStageId === PIPELINE_STAGES.aguardando
    );
    displayPedidos(filtered);
  } else if (stage === 'pagos') {
    const filtered = allOportunidades.filter(opp => 
      opp.pipelineStageId === PIPELINE_STAGES.pago
    );
    displayPedidos(filtered);
  }
}
```

---

## 📊 Estatísticas Possíveis

Com oportunidades, podemos exibir:

1. **Total de Pedidos** - Count de oportunidades
2. **Valor Total** - Soma de `monetaryValue`
3. **Total de Entradas** - Soma dos campos `valor_entrada`
4. **Pedidos por Estágio**:
   - Aguardando Pagamento: X pedidos
   - Pago: Y pedidos
   - Pronto: Z pedidos
   - Entregue: W pedidos
5. **Pedidos por Data de Retirada**:
   - 24/12: X pedidos
   - 31/12: Y pedidos

---

## 🔒 Segurança da Nova Chave

**Chave API com escopo completo:**
```
pit-81ab916f-2bcf-4381-9157-f381c0a9dc25
```

⚠️ **IMPORTANTE:**
- Esta chave tem permissões completas
- Usar APENAS para consultas (GET)
- Substituir a chave antiga no admin.html
- NÃO commitar a chave no repositório público

---

## ✅ Próximos Passos

1. [ ] Atualizar configuração da API no admin.html
2. [ ] Modificar função `loadPedidos()` para buscar oportunidades
3. [ ] Atualizar função `getCustomField()` para oportunidades
4. [ ] Modificar função `confirmarPix()` para mover estágio
5. [ ] Ajustar filtros para usar estágios
6. [ ] Testar com dados reais
7. [ ] Verificar se workflow Homio precisa ajustes

---

**Data:** 16/12/2025  
**Status:** ✅ API funcional, pronto para implementação
