// ============================================
// SISTEMA DE RASTREAMENTO DE EVENTOS
// Meta Pixel + Google Analytics 4 + GTM
// ============================================

// ============================================
// CAPTURA DE UTMs
// ============================================
function captureUTMs() {
  const params = new URLSearchParams(window.location.search);
  const utmData = {
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
    utm_term: params.get('utm_term') || '',
    utm_content: params.get('utm_content') || '',
    landing_page: window.location.href,
    first_visit: new Date().toISOString()
  };
  
  // Só salva se tiver alguma UTM na URL
  if (utmData.utm_source || utmData.utm_medium || utmData.utm_campaign) {
    sessionStorage.setItem('utmData', JSON.stringify(utmData));
    console.log('📊 UTMs capturadas:', utmData);
  }
  
  return utmData;
}

function getUTMs() {
  const saved = sessionStorage.getItem('utmData');
  return saved ? JSON.parse(saved) : null;
}

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

// Função auxiliar para verificar se o pixel está carregado
function isPixelLoaded() {
  return typeof fbq !== 'undefined';
}

// Função auxiliar para verificar se o GA4 está carregado
function isGA4Loaded() {
  return typeof gtag !== 'undefined';
}

// Função auxiliar para verificar se o GTM está carregado
function isGTMLoaded() {
  return typeof dataLayer !== 'undefined';
}

// ============================================
// EVENTO: View Content (Visualizar Produto)
// ============================================
function trackViewContent(productData) {
  const { id, nome, preco, categoria } = productData;

  // Meta Pixel
  if (isPixelLoaded()) {
    fbq('track', 'ViewContent', {
      content_ids: [id],
      content_name: nome,
      content_type: 'product',
      content_category: categoria,
      value: preco,
      currency: 'BRL'
    });
  }

  // Google Analytics 4
  if (isGA4Loaded()) {
    gtag('event', 'view_item', {
      currency: 'BRL',
      value: preco,
      items: [{
        item_id: id,
        item_name: nome,
        item_category: categoria,
        price: preco
      }]
    });
  }

  // Google Tag Manager / DataLayer
  if (isGTMLoaded()) {
    dataLayer.push({
      event: 'view_item',
      ecommerce: {
        currency: 'BRL',
        value: preco,
        items: [{
          item_id: id,
          item_name: nome,
          item_category: categoria,
          price: preco
        }]
      }
    });
  }

  console.log('📊 Track: ViewContent -', nome);
}

// ============================================
// EVENTO: Add to Cart (Adicionar ao Carrinho)
// ============================================
function trackAddToCart(productData) {
  const { id, nome, preco, quantidade, peso, categoria } = productData;

  // Meta Pixel
  if (isPixelLoaded()) {
    fbq('track', 'AddToCart', {
      content_ids: [id],
      content_name: nome,
      content_type: 'product',
      content_category: categoria,
      value: preco * quantidade,
      currency: 'BRL',
      contents: [{
        id: id,
        quantity: quantidade,
        item_price: preco
      }]
    });
  }

  // Google Analytics 4
  if (isGA4Loaded()) {
    gtag('event', 'add_to_cart', {
      currency: 'BRL',
      value: preco * quantidade,
      items: [{
        item_id: id,
        item_name: nome,
        item_category: categoria,
        item_variant: peso,
        price: preco,
        quantity: quantidade
      }]
    });
  }

  // Google Tag Manager / DataLayer
  if (isGTMLoaded()) {
    dataLayer.push({
      event: 'add_to_cart',
      ecommerce: {
        currency: 'BRL',
        value: preco * quantidade,
        items: [{
          item_id: id,
          item_name: nome,
          item_category: categoria,
          item_variant: peso,
          price: preco,
          quantity: quantidade
        }]
      }
    });
  }

  console.log('📊 Track: AddToCart -', nome, 'x', quantidade);
}

// ============================================
// EVENTO: Remove from Cart (Remover do Carrinho)
// ============================================
function trackRemoveFromCart(productData) {
  const { id, nome, preco, quantidade, peso, categoria } = productData;

  // Meta Pixel (não tem evento padrão, usamos custom event)
  if (isPixelLoaded()) {
    fbq('trackCustom', 'RemoveFromCart', {
      content_ids: [id],
      content_name: nome,
      content_type: 'product',
      content_category: categoria,
      value: preco * quantidade,
      currency: 'BRL'
    });
  }

  // Google Analytics 4
  if (isGA4Loaded()) {
    gtag('event', 'remove_from_cart', {
      currency: 'BRL',
      value: preco * quantidade,
      items: [{
        item_id: id,
        item_name: nome,
        item_category: categoria,
        item_variant: peso,
        price: preco,
        quantity: quantidade
      }]
    });
  }

  // Google Tag Manager / DataLayer
  if (isGTMLoaded()) {
    dataLayer.push({
      event: 'remove_from_cart',
      ecommerce: {
        currency: 'BRL',
        value: preco * quantidade,
        items: [{
          item_id: id,
          item_name: nome,
          item_category: categoria,
          item_variant: peso,
          price: preco,
          quantity: quantidade
        }]
      }
    });
  }

  console.log('📊 Track: RemoveFromCart -', nome, 'x', quantidade);
}

// ============================================
// EVENTO: Initiate Checkout (Iniciar Checkout)
// ============================================
function trackInitiateCheckout(checkoutData) {
  const { valorTotal, numItens, items } = checkoutData;

  // Meta Pixel
  if (isPixelLoaded()) {
    fbq('track', 'InitiateCheckout', {
      content_type: 'product',
      value: valorTotal,
      currency: 'BRL',
      num_items: numItens,
      contents: items.map(item => ({
        id: item.id,
        quantity: item.quantity,
        item_price: item.preco
      }))
    });
  }

  // Google Analytics 4
  if (isGA4Loaded()) {
    gtag('event', 'begin_checkout', {
      currency: 'BRL',
      value: valorTotal,
      items: items.map(item => ({
        item_id: item.id,
        item_name: item.nome,
        item_category: item.categoria,
        item_variant: item.peso,
        price: item.preco,
        quantity: item.quantity
      }))
    });
  }

  // Google Tag Manager / DataLayer
  if (isGTMLoaded()) {
    dataLayer.push({
      event: 'begin_checkout',
      ecommerce: {
        currency: 'BRL',
        value: valorTotal,
        items: items.map(item => ({
          item_id: item.id,
          item_name: item.nome,
          item_category: item.categoria,
          item_variant: item.peso,
          price: item.preco,
          quantity: item.quantity
        }))
      }
    });
  }

  console.log('📊 Track: InitiateCheckout - R$', valorTotal.toFixed(2), '-', numItens, 'itens');
}

// ============================================
// EVENTO: Add Payment Info (Adicionar Informação de Pagamento)
// ============================================
function trackAddPaymentInfo(paymentData) {
  const { valorTotal, numItens, customerName } = paymentData;

  // Meta Pixel
  if (isPixelLoaded()) {
    fbq('track', 'AddPaymentInfo', {
      content_type: 'product',
      value: valorTotal,
      currency: 'BRL',
      num_items: numItens
    });
  }

  // Google Analytics 4
  if (isGA4Loaded()) {
    gtag('event', 'add_payment_info', {
      currency: 'BRL',
      value: valorTotal,
      payment_type: 'pix'
    });
  }

  // Google Tag Manager / DataLayer
  if (isGTMLoaded()) {
    dataLayer.push({
      event: 'add_payment_info',
      ecommerce: {
        currency: 'BRL',
        value: valorTotal,
        payment_type: 'pix'
      },
      customer_filled: true,
      customer_name: customerName
    });
  }

  console.log('📊 Track: AddPaymentInfo - Cliente:', customerName);
}

// ============================================
// EVENTO: Purchase (Compra Finalizada) ⭐ PRINCIPAL
// ============================================
function trackPurchase(purchaseData) {
  const {
    transactionId,
    valorTotal,
    valorEntrada,
    numItens,
    items,
    customerName,
    customerPhone,
    customerEmail,
    dataRetirada
  } = purchaseData;

  // Meta Pixel
  if (isPixelLoaded()) {
    fbq('track', 'Purchase', {
      content_type: 'product',
      value: valorTotal,
      currency: 'BRL',
      num_items: numItens,
      contents: items.map(item => ({
        id: item.id,
        quantity: item.quantity,
        item_price: item.preco
      })),
      // Dados adicionais
      order_id: transactionId,
      predicted_ltv: valorTotal
    });
  }

  // Google Analytics 4
  if (isGA4Loaded()) {
    gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: valorTotal,
      currency: 'BRL',
      tax: 0,
      shipping: 0,
      items: items.map(item => ({
        item_id: item.id,
        item_name: item.nome,
        item_category: item.categoria,
        item_variant: item.peso,
        price: item.preco,
        quantity: item.quantity
      }))
    });
  }

  // Google Tag Manager / DataLayer
  if (isGTMLoaded()) {
    dataLayer.push({
      event: 'purchase',
      ecommerce: {
        transaction_id: transactionId,
        value: valorTotal,
        tax: 0,
        shipping: 0,
        currency: 'BRL',
        items: items.map(item => ({
          item_id: item.id,
          item_name: item.nome,
          item_category: item.categoria,
          item_variant: item.peso,
          price: item.preco,
          quantity: item.quantity
        }))
      },
      // Dados adicionais customizados
      purchase_details: {
        order_number: transactionId,
        total_value: valorTotal,
        entry_value: valorEntrada,
        pickup_date: dataRetirada,
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_email: customerEmail,
        payment_method: 'pix'
      }
    });
  }

  console.log('🎉 Track: Purchase - Pedido', transactionId, '- R$', valorTotal.toFixed(2));
}

// ============================================
// EVENTO: WhatsApp Click (Clique no WhatsApp)
// ============================================
function trackWhatsAppClick(clickData) {
  const { location, orderNumber, orderValue } = clickData;

  // Meta Pixel - Usar evento Contact
  if (isPixelLoaded()) {
    const pixelData = {
      content_name: 'WhatsApp Contact',
      contact_method: 'whatsapp',
      click_location: location
    };

    // Se for o clique do comprovante, adicionar dados do pedido
    if (orderNumber) {
      pixelData.order_id = orderNumber;
      pixelData.value = orderValue;
      pixelData.currency = 'BRL';
      // Usar evento Lead para tracking de conversão
      fbq('track', 'Lead', pixelData);
    } else {
      // Usar evento Contact para cliques gerais
      fbq('track', 'Contact', pixelData);
    }
  }

  // Google Analytics 4
  if (isGA4Loaded()) {
    const ga4Data = {
      contact_method: 'whatsapp',
      click_location: location
    };

    // Se tiver pedido, enviar como generate_lead com valor
    if (orderNumber) {
      gtag('event', 'generate_lead', {
        ...ga4Data,
        currency: 'BRL',
        value: orderValue,
        order_number: orderNumber
      });
    } else {
      // Clique geral como custom event
      gtag('event', 'contact_click', ga4Data);
    }
  }

  // Google Tag Manager / DataLayer
  if (isGTMLoaded()) {
    const gtmData = {
      event: orderNumber ? 'whatsapp_lead' : 'whatsapp_contact',
      contact_method: 'whatsapp',
      click_location: location
    };

    // Adicionar dados do pedido se disponível
    if (orderNumber) {
      gtmData.order_details = {
        order_number: orderNumber,
        order_value: orderValue,
        currency: 'BRL'
      };
    }

    dataLayer.push(gtmData);
  }

  const logMessage = orderNumber 
    ? `📱 Track: WhatsApp Lead - ${location} - Pedido ${orderNumber}`
    : `📱 Track: WhatsApp Contact - ${location}`;
  
  console.log(logMessage);
}

// ============================================
// EVENTO: Purchase Real (Confirmação PIX no Admin) 💰
// ============================================
function trackPurchaseReal(purchaseData) {
  const {
    transactionId,
    valorTotal,
    valorEntrada,
    customerName,
    customerPhone,
    customerEmail,
    dataRetirada
  } = purchaseData;

  // Meta Pixel - Evento customizado
  if (isPixelLoaded()) {
    fbq('trackCustom', 'PurchaseReal', {
      content_type: 'product',
      value: valorTotal,
      currency: 'BRL',
      order_id: transactionId,
      entry_value: valorEntrada,
      customer_name: customerName,
      customer_phone: customerPhone,
      pickup_date: dataRetirada,
      payment_confirmed: true
    });
  }

  // Google Analytics 4 - Evento customizado
  if (isGA4Loaded()) {
    gtag('event', 'purchase_real', {
      transaction_id: transactionId,
      value: valorTotal,
      currency: 'BRL',
      entry_value: valorEntrada,
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_email: customerEmail,
      pickup_date: dataRetirada,
      payment_method: 'pix',
      payment_confirmed: true
    });
  }

  // Google Tag Manager / DataLayer
  if (isGTMLoaded()) {
    dataLayer.push({
      event: 'purchase_real',
      purchase_confirmed: {
        transaction_id: transactionId,
        value: valorTotal,
        entry_value: valorEntrada,
        currency: 'BRL',
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_email: customerEmail,
        pickup_date: dataRetirada,
        payment_method: 'pix',
        payment_confirmed: true,
        confirmed_at: new Date().toISOString(),
        confirmed_by: 'admin_panel'
      }
    });
  }

  console.log('💰 Track: PurchaseReal - Pedido', transactionId, 'PIX CONFIRMADO - R$', valorTotal.toFixed(2));
}

// ============================================
// UTILITÁRIO: Obter categoria do produto
// ============================================
function getCategoryFromProductId(productId) {
  const categoryMap = {
    'salada-bacalhau': 'Entradas',
    'vinagrete-polvo': 'Entradas',
    'maionese-camarao': 'Entradas',
    'salpicao-defumado': 'Entradas',
    'terrine-porco': 'Entradas',
    'chester-assado': 'Proteínas',
    'peru-assado': 'Proteínas',
    'beef-wellington': 'Proteínas',
    'pernil-cordeiro': 'Proteínas',
    'rosbife': 'Proteínas',
    'bacalhau-vovo-helia': 'Proteínas',
    'bacalhau-natas': 'Proteínas',
    'quiche-bacon': 'Quiches',
    'quiche-brie': 'Quiches',
    'quiche-cogumelo': 'Quiches',
    'arroz-amendoas': 'Acompanhamentos',
    'arroz-lentilha': 'Acompanhamentos',
    'farofa-natalina': 'Acompanhamentos',
    'batata-bolinha': 'Acompanhamentos',
    'mousse-chocolate': 'Sobremesas'
  };
  
  return categoryMap[productId] || 'Outros';
}
