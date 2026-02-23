# 🔧 Guia de Configuração do Webhook no Homio

## Pré-requisitos

✅ Custom Fields criados
✅ Tags criadas

---

## Passo 1: Criar o Workflow

1. Acesse o **Homio**
2. No menu lateral, vá em **Automação** → **Workflows**
3. Clique em **"+ Criar Workflow"** (ou "Create Workflow")
4. Selecione **"Começar do zero"** (Start from scratch)
5. Dê um nome: `Ceia de Natal 2025 - Novo Pedido`

---

## Passo 2: Configurar o Trigger (Gatilho)

1. Clique em **"Adicionar Trigger"** (Add Trigger)
2. Procure por **"Inbound Webhook"**
3. Selecione **"Inbound Webhook"**

![Trigger Inbound Webhook]

4. Uma URL será gerada automaticamente. Ela terá este formato:
   ```
   https://services.leadconnectorhq.com/hooks/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
   ```

5. **COPIE ESTA URL** - você vai precisar dela para colocar no site

---

## Passo 3: Testar o Webhook (Importante!)

Antes de configurar as ações, precisamos "ensinar" o Homio sobre os dados que o site vai enviar.

### 3.1 Enviar dados de teste

Abra o terminal/prompt ou use uma ferramenta como [Postman](https://www.postman.com/) ou [ReqBin](https://reqbin.com/).

**Opção A - Usando cURL no terminal:**

```bash
curl -X POST "SUA_URL_DO_WEBHOOK_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "numero_pedido": "NOZ-2025-TEST",
    "data_retirada": "2025-12-24",
    "nome": "Cliente Teste",
    "telefone": "5527997016929",
    "email": "teste@email.com",
    "observacoes": "Pedido de teste - pode ignorar",
    "produtos_pedido": "2x Salada de Bacalhau 500g - R$ 250,00\n1x Chester/Peru ~4,5kg - R$ 535,00",
    "produtos_json": "[{\"id\":\"salada-bacalhau\",\"nome\":\"Salada de Bacalhau\",\"peso\":\"500g\",\"qtd\":2}]",
    "valor_total": 785,
    "valor_entrada": 392.5,
    "status_pedido": "Aguardando PIX",
    "created_at": "2025-12-15T14:30:00Z"
  }'
```

**Opção B - Usando ReqBin (mais fácil):**

1. Acesse https://reqbin.com/
2. Selecione **POST**
3. Cole a URL do webhook
4. Clique em **Content** → selecione **JSON**
5. Cole este JSON:

```json
{
  "numero_pedido": "NOZ-2025-TEST",
  "data_retirada": "2025-12-24",
  "nome": "Cliente Teste",
  "telefone": "5527997016929",
  "email": "teste@email.com",
  "observacoes": "Pedido de teste - pode ignorar",
  "produtos_pedido": "2x Salada de Bacalhau 500g - R$ 250,00\n1x Chester/Peru ~4,5kg - R$ 535,00",
  "produtos_json": "[{\"id\":\"salada-bacalhau\",\"nome\":\"Salada de Bacalhau\",\"peso\":\"500g\",\"qtd\":2}]",
  "valor_total": 785,
  "valor_entrada": 392.5,
  "status_pedido": "Aguardando PIX",
  "created_at": "2025-12-15T14:30:00Z"
}
```

6. Clique em **Send**

### 3.2 Capturar os dados no Homio

1. Volte ao Workflow no Homio
2. No trigger "Inbound Webhook", clique em **"Test Trigger"** ou aguarde alguns segundos
3. Os dados enviados devem aparecer como "Sample Data"
4. Selecione os dados recebidos e clique em **"Save"** ou **"Usar estes dados"**

---

## Passo 4: Adicionar Ação - Criar/Atualizar Contato

1. Clique no **"+"** abaixo do trigger para adicionar uma ação
2. Procure por **"Create or Update Contact"** (Criar ou Atualizar Contato)
3. Configure o mapeamento dos campos:

### Campos Padrão:

| Campo no Homio | Valor do Webhook |
|----------------|------------------|
| **First Name** | `{{nome}}` |
| **Phone** | `{{telefone}}` |
| **Email** | `{{email}}` |

### Custom Fields:

| Custom Field | Valor do Webhook |
|--------------|------------------|
| **Número do Pedido** | `{{numero_pedido}}` |
| **Data Retirada** | `{{data_retirada}}` |
| **Produtos do Pedido** | `{{produtos_pedido}}` |
| **Valor Total** | `{{valor_total}}` |
| **Valor Entrada** | `{{valor_entrada}}` |
| **Status do Pedido** | `{{status_pedido}}` |
| **Observações** | `{{observacoes}}` |

### Tags:

Adicione estas tags:
- `ceia-2025`
- `aguardando-pix`

4. Clique em **"Save Action"**

---

## Passo 5: Adicionar Ação - Enviar WhatsApp (Opcional)

Se quiser enviar uma mensagem automática de confirmação:

1. Clique no **"+"** para adicionar outra ação
2. Procure por **"Send WhatsApp"** ou **"WhatsApp"**
3. Configure:

**Número:** `{{telefone}}`

**Mensagem:**
```
Olá, {{nome}}! 🎄

Recebemos seu pedido *{{numero_pedido}}* para a Ceia de Natal!

📋 *Itens:*
{{produtos_pedido}}

💰 *Total:* R$ {{valor_total}}
💳 *Entrada (50%):* R$ {{valor_entrada}}
📅 *Retirada:* {{data_retirada}}

Assim que identificarmos o PIX, confirmaremos seu pedido.

Qualquer dúvida, estamos à disposição! 😊

*Noz Comida Afetiva*
```

4. Clique em **"Save Action"**

---

## Passo 6: Adicionar Ação - Notificação Interna (Opcional)

Para a equipe receber aviso de novo pedido:

1. Clique no **"+"** para adicionar outra ação
2. Procure por **"Internal Notification"** ou **"Send Email"**
3. Configure para enviar para o email da equipe com os dados do pedido

---

## Passo 7: Salvar e Publicar o Workflow

1. Revise todas as ações configuradas
2. Clique em **"Save"** (Salvar)
3. Ative o workflow clicando no toggle **"Publish"** ou **"Active"**

---

## Passo 8: Inserir a URL do Webhook no Site

1. Copie a URL do webhook que você obteve no Passo 2
2. No código do site (`index.html`), localize esta linha:

```javascript
webhookUrl: "https://services.leadconnectorhq.com/hooks/SEU_WEBHOOK_ID",
```

3. Substitua `SEU_WEBHOOK_ID` pela URL completa do seu webhook:

```javascript
webhookUrl: "https://services.leadconnectorhq.com/hooks/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
```

4. Salve o arquivo

---

## Passo 9: Testar o Fluxo Completo

1. Acesse o site da ceia
2. Adicione alguns produtos ao carrinho
3. Preencha os dados (use seu próprio número para teste)
4. Finalize o pedido
5. Verifique no Homio:
   - O contato foi criado?
   - Os custom fields estão preenchidos?
   - As tags foram aplicadas?
   - A mensagem de WhatsApp foi enviada?

---

## Estrutura Final do Workflow

```
┌─────────────────────────────────────┐
│  TRIGGER: Inbound Webhook           │
│  URL: https://services...           │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  ACTION 1: Create/Update Contact    │
│  - Mapear campos do cliente         │
│  - Mapear custom fields do pedido   │
│  - Adicionar tags                   │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  ACTION 2: Send WhatsApp (opcional) │
│  - Mensagem de confirmação          │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  ACTION 3: Internal Notification    │
│  - Avisar equipe (opcional)         │
└─────────────────────────────────────┘
```

---

## Workflows Adicionais (Depois)

Após o workflow principal estar funcionando, você pode criar:

### Workflow: Lembrete de Pagamento
- **Trigger:** Tag Added → `aguardando-pix`
- **Wait:** 24 horas
- **Condition:** Se ainda tem tag `aguardando-pix`
- **Action:** Enviar WhatsApp de lembrete

### Workflow: Confirmação de Pagamento
- **Trigger:** Tag Added → `pix-confirmado`
- **Action:** Remover tag `aguardando-pix`
- **Action:** Atualizar custom field `status_pedido` para "Confirmado"
- **Action:** Enviar WhatsApp de confirmação

### Workflow: Lembrete de Retirada
- **Trigger:** Data de retirada = amanhã
- **Action:** Enviar WhatsApp lembrando da retirada

---

## Troubleshooting

### O webhook não está recebendo dados?
- Verifique se a URL está correta no site
- Verifique se o workflow está **publicado/ativo**
- Teste manualmente com cURL ou ReqBin

### Os custom fields não estão sendo preenchidos?
- Verifique se os nomes dos campos no mapeamento correspondem exatamente aos nomes das variáveis do webhook
- Use a notação `{{nome_do_campo}}` corretamente

### A mensagem de WhatsApp não está sendo enviada?
- Verifique se o número do WhatsApp está conectado no Homio
- Verifique se o formato do telefone está correto (com código do país: 55)

---

## Checklist Final

- [ ] Workflow criado com trigger Inbound Webhook
- [ ] URL do webhook copiada
- [ ] Dados de teste enviados e capturados
- [ ] Ação de criar contato configurada com mapeamento correto
- [ ] Tags configuradas (ceia-2025, aguardando-pix)
- [ ] Workflow publicado/ativo
- [ ] URL do webhook inserida no código do site
- [ ] Teste completo realizado com sucesso

---

*Guia criado em: Dezembro 2025*
*Para: Noz Comida Afetiva - Ceia de Natal 2025*
