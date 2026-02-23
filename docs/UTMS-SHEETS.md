# 📊 Guia de Configuração - UTMs e Google Sheets

## Sobre este Guia

Este guia explica como o sistema de captura de UTMs funciona e como configurar o Google Sheets para armazenar todos os dados dos pedidos com informações de origem de tráfego.

---

## 🎯 O que são UTMs?

UTMs (Urchin Tracking Module) são parâmetros adicionados às URLs para rastrear a origem do tráfego. Por exemplo:

```
https://ceiadonoz.nozcomidaafetiva.com.br/?utm_source=instagram&utm_medium=paid&utm_campaign=natal2025
```

### Parâmetros UTM capturados:

| Parâmetro | Descrição | Exemplo |
|-----------|-----------|---------|
| **utm_source** | Origem do tráfego | `instagram`, `facebook`, `google` |
| **utm_medium** | Tipo de mídia | `paid`, `organic`, `email`, `social` |
| **utm_campaign** | Nome da campanha | `natal2025`, `black_friday` |
| **utm_term** | Palavra-chave (ads) | `ceia+natal`, `comida+festiva` |
| **utm_content** | Variação do anúncio | `banner_a`, `video_1` |

---

## 🔧 Como o Sistema Funciona

### 1. Captura Automática
Quando um usuário acessa o site com UTMs na URL, o JavaScript captura automaticamente:
- Todos os parâmetros UTM
- URL completa de entrada
- Data e hora da primeira visita

### 2. Armazenamento em Sessão
Os dados são salvos no `sessionStorage` do navegador e permanecem durante toda a navegação.

### 3. Envio no Pedido
Quando o cliente clica em "Finalizar Pedido", as UTMs são incluídas automaticamente no payload enviado para:
- **Webhook Homio** (LeadConnector) - para CRM
- **Webhook Google Sheets** (quando configurado) - para planilha

---

## 📋 Dados Enviados no Pedido

O objeto de pedido agora inclui:

```javascript
{
  // ... dados do pedido (nome, telefone, produtos, etc.)
  
  // UTMs de origem (novos campos)
  "utm_source": "instagram",      // ou "direto" se não tiver UTM
  "utm_medium": "paid",            // ou "none" se não tiver UTM
  "utm_campaign": "natal2025",     // vazio se não tiver
  "utm_term": "ceia+vitoria",      // vazio se não tiver
  "utm_content": "banner_a"        // vazio se não tiver
}
```

---

## 🗂️ Configuração do Google Sheets

### Passo 1: Criar a Planilha

1. Acesse [Google Sheets](https://sheets.google.com)
2. Crie uma nova planilha: **"Ceia Noz 2025 - Pedidos"**
3. Na primeira linha (cabeçalho), adicione as colunas:

| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Timestamp | Número Pedido | Nome | Telefone | Email | Produtos | Valor Total | Valor Entrada | Data Retirada | Status | UTM Source | UTM Medium | UTM Campaign | UTM Term | UTM Content |

### Passo 2: Criar o Google Apps Script

1. Na planilha, vá em **Extensões** → **Apps Script**
2. Apague o código padrão e cole este código:

```javascript
function doPost(e) {
  try {
    // Pegar a planilha ativa
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse dos dados recebidos
    const data = JSON.parse(e.postData.contents);
    
    // Preparar linha de dados
    const row = [
      new Date(),                    // Timestamp
      data.numero_pedido || '',      // Número do Pedido
      data.nome || '',               // Nome
      data.telefone || '',           // Telefone
      data.email || '',              // Email
      data.produtos_pedido || '',    // Produtos (texto formatado)
      data.valor_total || 0,         // Valor Total
      data.valor_entrada || 0,       // Valor Entrada
      data.data_retirada || '',      // Data Retirada
      data.status_pedido || '',      // Status
      data.utm_source || 'direto',   // UTM Source
      data.utm_medium || 'none',     // UTM Medium
      data.utm_campaign || '',       // UTM Campaign
      data.utm_term || '',           // UTM Term
      data.utm_content || ''         // UTM Content
    ];
    
    // Adicionar linha na planilha
    sheet.appendRow(row);
    
    // Retornar sucesso
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Retornar erro
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Função de teste (opcional)
function testPost() {
  const testData = {
    numero_pedido: 'TEST-0001',
    nome: 'Cliente Teste',
    telefone: '27997016929',
    email: 'teste@email.com',
    produtos_pedido: '1x Chester ~4,5kg',
    valor_total: 535.00,
    valor_entrada: 267.50,
    data_retirada: '2025-12-24',
    status_pedido: 'Aguardando PIX',
    utm_source: 'instagram',
    utm_medium: 'paid',
    utm_campaign: 'natal2025',
    utm_term: '',
    utm_content: 'banner_a'
  };
  
  const e = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(e);
  Logger.log(result.getContent());
}
```

### Passo 3: Implantar como Web App

1. Clique em **Implantar** → **Nova implantação**
2. Clique no ícone de engrenagem ⚙️ ao lado de "Selecionar tipo"
3. Escolha **Aplicativo da Web**
4. Configure:
   - **Descrição**: "Webhook Ceia Noz 2025"
   - **Executar como**: Eu (seu email)
   - **Quem tem acesso**: Qualquer pessoa
5. Clique em **Implantar**
6. **COPIE A URL** gerada (algo como: `https://script.google.com/macros/s/AKfycbx.../exec`)
7. Clique em **Concluir**

### Passo 4: Testar o Webhook

Você pode testar usando cURL ou [ReqBin](https://reqbin.com/):

```bash
curl -X POST "SUA_URL_DO_GOOGLE_SHEETS_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "numero_pedido": "TEST-0001",
    "nome": "Cliente Teste",
    "telefone": "27997016929",
    "email": "teste@email.com",
    "produtos_pedido": "1x Chester ~4,5kg - R$ 535,00",
    "valor_total": 535.00,
    "valor_entrada": 267.50,
    "data_retirada": "2025-12-24",
    "status_pedido": "Aguardando PIX",
    "utm_source": "instagram",
    "utm_medium": "paid",
    "utm_campaign": "natal2025",
    "utm_term": "",
    "utm_content": "banner_a"
  }'
```

Se funcionou, uma nova linha aparecerá na planilha! ✅

---

## 💻 Adicionar Webhook no Código

Edite o arquivo `js/app.js` e adicione a URL do Google Sheets:

```javascript
const CONFIG = {
  whatsappNumber: "5527997016929",
  webhookUrl: "https://services.leadconnectorhq.com/hooks/.../webhook-trigger/...",
  googleSheetsUrl: "SUA_URL_DO_GOOGLE_SHEETS_AQUI", // ⬅️ ADICIONAR ESTA LINHA
  // ... resto da config
};
```

Depois, na função `finalizarPedido()`, adicione o envio para o Google Sheets:

```javascript
async function finalizarPedido() {
  // ... código existente ...
  
  // Enviar para Homio
  try {
    await fetch(CONFIG.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pedido)
    });
  } catch (error) {
    console.log('Webhook Homio:', error);
  }

  // 📊 ADICIONAR: Enviar para Google Sheets
  if (CONFIG.googleSheetsUrl) {
    try {
      await fetch(CONFIG.googleSheetsUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedido)
      });
      console.log('✅ Dados enviados para Google Sheets');
    } catch (error) {
      console.log('❌ Erro ao enviar para Sheets:', error);
    }
  }
  
  // ... resto do código ...
}
```

---

## 📈 Custom Fields no Homio

Para que o Homio armazene as UTMs, crie estes Custom Fields:

1. Acesse **Settings** → **Custom Fields** no Homio
2. Crie os seguintes campos (tipo: **Text**):

| Nome do Campo | ID Interno | Tipo |
|---------------|------------|------|
| UTM Source | `utm_source` | Text |
| UTM Medium | `utm_medium` | Text |
| UTM Campaign | `utm_campaign` | Text |
| UTM Term | `utm_term` | Text |
| UTM Content | `utm_content` | Text |

3. No Workflow do Homio, mapeie os campos no **Create/Update Contact**:
   - **UTM Source** ← `{{utm_source}}`
   - **UTM Medium** ← `{{utm_medium}}`
   - **UTM Campaign** ← `{{utm_campaign}}`
   - **UTM Term** ← `{{utm_term}}`
   - **UTM Content** ← `{{utm_content}}`

---

## 🔍 Análise de Dados

### Fórmulas Úteis no Google Sheets

**Contar pedidos por origem:**
```
=COUNTIF(K:K,"instagram")
```

**Valor total por campanha:**
```
=SUMIF(M:M,"natal2025",G:G)
```

**Taxa de conversão por mídia:**
```
=COUNTIF(L:L,"paid")/COUNTA(L:L)
```

### Relatório de ROI

Crie uma aba "Análise" com:

| Fonte | Mídia | Campanha | Pedidos | Valor Total | Ticket Médio |
|-------|-------|----------|---------|-------------|--------------|
| =UNIQUE(K:K) | =UNIQUE(L:L) | =UNIQUE(M:M) | =COUNTIFS(...) | =SUMIFS(...) | =AVERAGE(...) |

---

## 🚨 Troubleshooting

### UTMs não estão sendo capturadas
- Verifique se a URL tem os parâmetros: `?utm_source=...`
- Abra o console do navegador (F12) e procure por "📊 UTMs capturadas"
- Se não aparecer, limpe o cache e tente novamente

### Dados não chegam no Google Sheets
- Teste a URL do webhook com cURL
- Verifique se a implantação está com acesso "Qualquer pessoa"
- Veja os logs no Apps Script: **Executar** → **Ver execuções**

### Pedidos aparecem como "direto" mesmo com UTMs
- As UTMs só são capturadas na **primeira visita**
- Se o usuário já estava no site e você adicionou UTMs, ele precisa **abrir em aba anônima**
- Para testar: Limpe sessionStorage ou use modo anônimo

---

## 📚 Recursos Adicionais

- [Campaign URL Builder - Google](https://ga-dev-tools.web.app/campaign-url-builder/)
- [UTM.io - Gerenciador de UTMs](https://utm.io/)
- [Google Apps Script - Documentação](https://developers.google.com/apps-script)

---

## ✅ Checklist de Implementação

- [ ] Planilha criada com as colunas corretas
- [ ] Apps Script configurado e testado
- [ ] URL do webhook copiada
- [ ] Custom Fields criados no Homio
- [ ] Workflow do Homio mapeado com UTMs
- [ ] Código atualizado com URL do Google Sheets
- [ ] Teste realizado com UTMs na URL
- [ ] Verificação de dados no Sheets e Homio

---

*Guia criado em: Dezembro 2025*  
*Para: Noz Comida Afetiva - Ceia de Natal 2025*
