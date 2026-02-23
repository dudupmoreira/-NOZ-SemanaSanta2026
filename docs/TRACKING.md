# 📊 Guia de Rastreamento de Eventos - Ceia do Noz

## ✅ Implementação Concluída

### Arquivos Criados/Modificados
- ✅ **`js/tracking.js`** - Sistema de rastreamento criado
- ✅ **`js/app.js`** - Eventos integrados nas ações do usuário
- ✅ **`index.html`** - Script de tracking incluído

---

## 🎯 Eventos Implementados

| Evento | Quando Dispara | Plataformas |
|--------|----------------|-------------|
| **ViewContent** | Ao clicar para ampliar imagem do produto | Meta Pixel, GA4, GTM |
| **AddToCart** | Ao adicionar item ao carrinho | Meta Pixel, GA4, GTM |
| **RemoveFromCart** | Ao remover item do carrinho | Meta Pixel, GA4, GTM |
| **InitiateCheckout** | Ao abrir o modal do carrinho | Meta Pixel, GA4, GTM |
| **AddPaymentInfo** | Ao preencher o nome (4+ caracteres) | Meta Pixel, GA4, GTM |
| **Purchase** ⭐ | Ao finalizar pedido | Meta Pixel, GA4, GTM |

---

## 🔍 Como Testar

### 1. Verificar no Console do Navegador

1. Abra o site em modo de desenvolvimento
2. Abra o Console (F12 → Console)
3. Faça ações no site
4. Veja os logs: `📊 Track: [NomeEvento]`

**Exemplo de logs esperados:**
```
📊 Track: AddToCart - Salada de Bacalhau x 1
📊 Track: InitiateCheckout - R$ 125.00 - 1 itens
📊 Track: AddPaymentInfo - Cliente: João Silva
🎉 Track: Purchase - Pedido NOZ-2025-1234 - R$ 125.00
```

### 2. Testar com Meta Events Manager

1. Acesse: https://business.facebook.com/events_manager2
2. Selecione seu Pixel (1549972042823192)
3. Vá em **"Test Events"**
4. Abra o site em outra aba
5. Faça ações no site e veja eventos aparecerem em tempo real

**Eventos que você deve ver:**
- PageView (já existente)
- ViewContent
- AddToCart
- InitiateCheckout
- AddPaymentInfo
- **Purchase** (evento principal) ⭐

### 3. Testar com Google Tag Manager Preview

1. Acesse: https://tagmanager.google.com
2. Selecione seu container (GTM-M2TM3LP9)
3. Clique em **"Preview"** (modo de visualização)
4. Insira a URL do site
5. Navegue pelo site e veja eventos no painel

**No GTM você verá:**
- `view_item` (ViewContent)
- `add_to_cart`
- `remove_from_cart`
- `begin_checkout` (InitiateCheckout)
- `add_payment_info`
- `purchase` ⭐

### 4. Testar com Google Analytics 4

1. Acesse: https://analytics.google.com
2. Vá em **Realtime** → **Events**
3. Abra o site em outra aba
4. Faça ações e veja eventos aparecerem em tempo real

---

## 📦 Dados Enviados no Evento Purchase (Principal)

### Meta Pixel
```javascript
{
  content_type: 'product',
  value: 535.00,              // Valor total do pedido
  currency: 'BRL',
  num_items: 3,               // Quantidade de itens
  contents: [
    { id: 'chester-peru', quantity: 1, item_price: 535 }
  ],
  order_id: 'NOZ-2025-1234',  // Número único do pedido
  predicted_ltv: 535.00
}
```

### Google Analytics 4
```javascript
{
  transaction_id: 'NOZ-2025-1234',
  value: 535.00,
  currency: 'BRL',
  tax: 0,
  shipping: 0,
  items: [{
    item_id: 'chester-peru',
    item_name: 'Chester ou Peru Assado',
    item_category: 'Proteínas',
    item_variant: '~4,5kg',
    price: 535.00,
    quantity: 1
  }]
}
```

### GTM DataLayer
```javascript
{
  event: 'purchase',
  ecommerce: {
    transaction_id: 'NOZ-2025-1234',
    value: 535.00,
    currency: 'BRL',
    items: [...]
  },
  purchase_details: {
    order_number: 'NOZ-2025-1234',
    total_value: 535.00,
    entry_value: 267.50,        // 50% entrada
    pickup_date: '24/12',
    customer_name: 'João Silva',
    customer_phone: '27999999999',
    customer_email: 'joao@email.com',
    payment_method: 'pix'
  }
}
```

---

## 🔧 Configuração do GTM (Opcional)

Se quiser criar triggers e tags personalizadas no GTM:

### 1. Criar Trigger para Purchase

1. No GTM, vá em **Triggers** → **New**
2. Nome: `Evento Purchase`
3. Tipo: **Custom Event**
4. Event name: `purchase`
5. Salvar

### 2. Criar Tag para Meta Pixel Purchase

1. Vá em **Tags** → **New**
2. Nome: `Meta Pixel - Purchase`
3. Tipo: **Custom HTML**
4. HTML:
```html
<script>
  fbq('track', 'Purchase', {{ecommerce}});
</script>
```
5. Trigger: Selecione o trigger `Evento Purchase` criado acima
6. Salvar

### 3. Criar Variáveis do DataLayer

Para acessar dados customizados:

1. **Variables** → **New** → **Data Layer Variable**
2. Nome: `DL - Purchase Details`
3. Data Layer Variable Name: `purchase_details`
4. Salvar

Repita para outras variáveis necessárias.

---

## 🎨 Conversões Personalizadas no Meta

### Criar Conversão Custom para Purchase

1. Acesse **Events Manager** → **Custom Conversions**
2. Clique em **"Create Custom Conversion"**
3. Configure:
   - **Nome:** Pedido Ceia Noz
   - **Data Source:** Seu Pixel (1549972042823192)
   - **Event:** Purchase
   - **Conversion Value:** Use o valor do evento
4. Salvar

Agora você pode usar essa conversão nas campanhas do Meta Ads!

---

## 📱 Testes Recomendados

### Fluxo Completo de Teste

1. ✅ **Carregar página** → Verificar PageView
2. ✅ **Clicar em imagem de produto** → Verificar ViewContent
3. ✅ **Adicionar 2 produtos ao carrinho** → Verificar 2x AddToCart
4. ✅ **Abrir carrinho** → Verificar InitiateCheckout
5. ✅ **Remover 1 produto** → Verificar RemoveFromCart
6. ✅ **Preencher nome** → Verificar AddPaymentInfo
7. ✅ **Finalizar pedido** → Verificar **Purchase** ⭐

### Checklist de Validação

- [ ] Todos os eventos aparecem no Console
- [ ] Eventos aparecem no Meta Events Manager (Test Events)
- [ ] Eventos aparecem no GA4 Realtime
- [ ] Dados do Purchase estão completos (valor, itens, número do pedido)
- [ ] Valor da conversão está correto
- [ ] transaction_id é único para cada pedido

---

## 🚨 Troubleshooting

### Eventos não aparecem no Console
**Solução:** Verifique se `tracking.js` foi carregado corretamente. Veja no console se há erros de script.

### Eventos não aparecem no Meta Pixel
**Solução:** Verifique se o Pixel está instalado e o ID está correto (1549972042823192). Use a extensão **Meta Pixel Helper** do Chrome.

### Eventos não aparecem no GA4
**Solução:** Verifique se o ID do GA4 está correto (G-BR3YMR3MLD). Pode levar alguns minutos para aparecer.

### Purchase não está enviando valor
**Solução:** Verifique no console se o valor está sendo calculado corretamente. O evento Purchase só é disparado após sucesso no webhook.

---

## 📈 Próximos Passos

### 1. Configurar Conversões no Meta Ads
- Use o evento **Purchase** como conversão principal
- Configure ROAS (Return on Ad Spend) com base no valor total

### 2. Configurar Conversões no Google Ads
- Importe a conversão `purchase` do GA4 para o Google Ads
- Configure valor de conversão dinâmico

### 3. Criar Audiências
- **Meta:** Criar público de quem fez AddToCart mas não comprou
- **Google:** Criar lista de remarketing de quem iniciou checkout

### 4. Monitoramento
- Acompanhe diariamente os eventos no GA4
- Configure alertas para quedas nos eventos
- Analise taxa de conversão do funil

---

## 📞 Suporte

Se tiver dúvidas ou problemas:
1. Verifique os logs no Console do navegador
2. Use as ferramentas de teste das plataformas
3. Entre em contato com o desenvolvedor

---

**Última atualização:** 04/12/2025  
**Versão dos scripts:** v=20251204
