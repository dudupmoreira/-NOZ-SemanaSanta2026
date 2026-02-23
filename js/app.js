// ============================================
// CONFIGURAÇÕES
// ============================================
const CONFIG = {
  whatsappNumber: "5527997016929",
  webhookUrl: "https://services.leadconnectorhq.com/hooks/iuYB2N2aOtvi7dlzJ1sQ/webhook-trigger/138b2fb5-81f4-43ba-8dc2-189fddb645c2",
  googleSheetsUrl: "https://script.google.com/macros/s/AKfycbyB620wBS4Sji4SGjJb-Plj3vXBGGREaEn9S5B9xCfYbcu1HixDZEkXg2QYUUllqs2glQ/exec",
  pixCNPJ: "33339742000103",
  pixNome: "NOZ COMIDA AFETIVA",
  pixCidade: "VITORIA",
  restaurantPhone: "(27) 99701-6929",
  restaurantAddress: "Rua Amélia Tartuce Nasser, 865, Loja 10 - Jardim da Penha, Vitória - ES",
  restaurantInstagram: "@nozcomidaafetiva"
};

// ============================================
// ESTADO DA APLICAÇÃO
// ============================================
let cart = [];
let selectedDate = "31/12";
let customerData = {
  nome: "",
  telefone: "",
  email: "",
  observacoes: ""
};

// ============================================
// GERADOR DE PIX
// ============================================
function gerarCodigoPix(valor) {
  function crc16(str) {
    let crc = 0xFFFF;
    for (let i = 0; i < str.length; i++) {
      crc ^= str.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
        if (crc & 0x8000) {
          crc = (crc << 1) ^ 0x1021;
        } else {
          crc <<= 1;
        }
      }
    }
    return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
  }

  function tlv(id, value) {
    const len = value.length.toString().padStart(2, '0');
    return id + len + value;
  }

  const valorStr = valor.toFixed(2);
  const gui = tlv('00', 'br.gov.bcb.pix');
  const chave = tlv('01', CONFIG.pixCNPJ);
  const merchantAccount = tlv('26', gui + chave);

  let payload = '';
  payload += tlv('00', '01');
  payload += merchantAccount;
  payload += tlv('52', '0000');
  payload += tlv('53', '986');
  payload += tlv('54', valorStr);
  payload += tlv('58', 'BR');
  payload += tlv('59', CONFIG.pixNome.substring(0, 25));
  payload += tlv('60', CONFIG.pixCidade.substring(0, 15));
  payload += tlv('62', tlv('05', '***'));
  payload += '6304';

  const crc = crc16(payload);
  return payload + crc;
}

// ============================================
// UTILITÁRIOS
// ============================================
function formatPrice(value) {
  return value.toFixed(2).replace('.', ',');
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('visible');
  setTimeout(() => {
    toast.classList.remove('visible');
  }, 2000);
}

function findProduct(productId) {
  for (const products of Object.values(cardapio)) {
    const product = products.find(p => p.id === productId);
    if (product) return product;
  }
  return null;
}

function getCartTotal() {
  return cart.reduce((sum, item) => {
    const product = findProduct(item.productId);
    const opcao = product.opcoes[item.optionIndex];
    return sum + (opcao.preco * item.quantity);
  }, 0);
}

// ============================================
// RENDERIZAÇÃO DO CARDÁPIO
// ============================================
function renderCardapio() {
  const container = document.getElementById('cardapio');
  let html = '';

  for (const [category, products] of Object.entries(cardapio)) {
    html += `
      <section class="category-section" id="${category}">
        <h3>${categoryNames[category]}</h3>
        <div class="products-grid">
          ${products.map(product => renderProductCard(product, category)).join('')}
        </div>
      </section>
    `;
  }

  container.innerHTML = html;
}

function renderProductCard(product, category) {
  const imageHtml = product.imagem 
    ? `<img src="${product.imagem}" alt="${product.nome}" class="product-image" onclick="openImageZoom('${product.imagem}')">`
    : `<div class="product-image-placeholder">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.1 13.34L10.93 10.51L13.76 13.34L18.76 8.34L20.17 9.75L13.76 16.16L10.93 13.34L7.27 17H20V19H4V6H6V14.27L8.1 13.34M6 3V1H8V3H6M11 3V1H13V3H11M16 3V1H18V3H16Z"/>
        </svg>
      </div>`;

  return `
    <div class="product-card" data-product-id="${product.id}">
      <div class="product-image-container">
        ${imageHtml}
      </div>
      <div class="product-info">
        <h4 class="product-name">${product.nome}</h4>
        <p class="product-description">${product.descricao}</p>
        <div class="product-options">
          ${product.opcoes.map((opcao, index) => `
            <div class="product-option">
              <div class="option-info">
                <span class="option-weight">${opcao.peso}</span>
                <span class="option-price">R$ ${formatPrice(opcao.preco)}</span>
              </div>
              ${renderAddButton(product.id, index, opcao)}
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderAddButton(productId, optionIndex, opcao) {
  const cartItem = cart.find(item => item.productId === productId && item.optionIndex === optionIndex);
  
  if (cartItem) {
    return `
      <div class="quantity-control">
        <button onclick="updateQuantity('${productId}', ${optionIndex}, -1)">−</button>
        <span>${cartItem.quantity}</span>
        <button onclick="updateQuantity('${productId}', ${optionIndex}, 1)">+</button>
      </div>
    `;
  }
  
  return `
    <button class="add-btn" onclick="addToCart('${productId}', ${optionIndex})">+</button>
  `;
}

// ============================================
// FUNÇÕES DO CARRINHO
// ============================================
function addToCart(productId, optionIndex) {
  const existingItem = cart.find(item => item.productId === productId && item.optionIndex === optionIndex);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      productId,
      optionIndex,
      quantity: 1
    });
  }

  updateCartUI();
  showToast('Item adicionado!');

  // Tracking: AddToCart
  const product = findProduct(productId);
  const opcao = product.opcoes[optionIndex];
  trackAddToCart({
    id: productId,
    nome: product.nome,
    preco: opcao.preco,
    quantidade: 1,
    peso: opcao.peso,
    categoria: getCategoryFromProductId(productId)
  });
}

function updateQuantity(productId, optionIndex, delta) {
  const itemIndex = cart.findIndex(item => item.productId === productId && item.optionIndex === optionIndex);
  
  if (itemIndex > -1) {
    cart[itemIndex].quantity += delta;
    
    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1);
    }
  }

  updateCartUI();
}

function removeFromCart(productId, optionIndex) {
  // Capturar dados antes de remover para o tracking
  const itemToRemove = cart.find(item => item.productId === productId && item.optionIndex === optionIndex);
  
  if (itemToRemove) {
    const product = findProduct(productId);
    const opcao = product.opcoes[optionIndex];
    
    // Tracking: RemoveFromCart
    trackRemoveFromCart({
      id: productId,
      nome: product.nome,
      preco: opcao.preco,
      quantidade: itemToRemove.quantity,
      peso: opcao.peso,
      categoria: getCategoryFromProductId(productId)
    });
  }

  cart = cart.filter(item => !(item.productId === productId && item.optionIndex === optionIndex));
  updateCartUI();
}

function updateCartUI() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = getCartTotal();
  
  document.getElementById('cartCount').textContent = count;
  document.getElementById('cartTotal').textContent = `R$ ${formatPrice(total)}`;
  
  const cartFloat = document.getElementById('cartFloat');
  if (count > 0) {
    cartFloat.classList.add('visible');
  } else {
    cartFloat.classList.remove('visible');
  }

  renderCardapio();
  
  if (document.getElementById('cartModal').classList.contains('visible')) {
    renderCartBody();
    renderCartFooter();
  }
}

// ============================================
// MODAL DO CARRINHO
// ============================================
function openCart() {
  document.getElementById('modalOverlay').classList.add('visible');
  document.getElementById('cartModal').classList.add('visible');
  document.body.style.overflow = 'hidden';
  renderCartBody();
  renderCartFooter();

  // Tracking: InitiateCheckout
  if (cart.length > 0) {
    const total = getCartTotal();
    const numItens = cart.reduce((sum, item) => sum + item.quantity, 0);
    const items = cart.map(item => {
      const product = findProduct(item.productId);
      const opcao = product.opcoes[item.optionIndex];
      return {
        id: item.productId,
        nome: product.nome,
        preco: opcao.preco,
        quantity: item.quantity,
        peso: opcao.peso,
        categoria: getCategoryFromProductId(item.productId)
      };
    });

    trackInitiateCheckout({
      valorTotal: total,
      numItens: numItens,
      items: items
    });
  }
}

function closeCart() {
  document.getElementById('modalOverlay').classList.remove('visible');
  document.getElementById('cartModal').classList.remove('visible');
  document.body.style.overflow = '';
}

function selectDate(date) {
  selectedDate = date;
  renderCartBody();
}

function updateCustomerData(field, value) {
  customerData[field] = value;
  renderCartFooter();

  // Tracking: AddPaymentInfo (quando o nome é preenchido)
  if (field === 'nome' && value && value.length > 3) {
    const total = getCartTotal();
    const numItens = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    trackAddPaymentInfo({
      valorTotal: total,
      numItens: numItens,
      customerName: value
    });
  }
}

function renderCartBody() {
  const body = document.getElementById('cartBody');
  
  if (cart.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 18C15.89 18 15 18.89 15 20C15 20.5304 15.2107 21.0391 15.5858 21.4142C15.9609 21.7893 16.4696 22 17 22C17.5304 22 18.0391 21.7893 18.4142 21.4142C18.7893 21.0391 19 20.5304 19 20C19 18.89 18.1 18 17 18M1 2V4H3L6.6 11.59L5.24 14.04C5.09 14.32 5 14.65 5 15C5 16.1 5.9 17 7 17H19V15H7.42C7.28 15 7.17 14.89 7.17 14.75L7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.58 17.3 11.97L20.88 5.5C20.95 5.34 21 5.17 21 5C21 4.45 20.55 4 20 4H5.21L4.27 2M7 18C5.89 18 5 18.89 5 20C5 21.1 5.89 22 7 22C8.1 22 9 21.1 9 20C9 18.89 8.1 18 7 18Z"/>
          </svg>
        </div>
        <p>Seu carrinho está vazio</p>
        <p>Adicione itens do cardápio para começar</p>
      </div>
    `;
    return;
  }

  let html = `
    <div class="date-picker-section">
      <label>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="display: inline-block; vertical-align: middle; margin-right: 4px;">
          <path d="M19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4M19 20H5V10H19V20M19 8H5V6H19V8M7 12H12V17H7V12Z"/>
        </svg>
        Data de Retirada
      </label>
      <div class="date-options">
        <div class="date-option disabled" style="opacity: 0.5; cursor: not-allowed;">
          <strong>24/12</strong>
          <span>Encomendas Encerradas</span>
        </div>
        <div class="date-option ${selectedDate === '31/12' ? 'selected' : ''}" onclick="selectDate('31/12')">
          <strong>31/12</strong>
          <span>Véspera de Ano Novo</span>
        </div>
      </div>
    </div>

    <div class="cart-items">
      ${cart.map(item => renderCartItem(item)).join('')}
    </div>

    <div class="form-section">
      <h3>Seus Dados</h3>
      <div class="form-group">
        <label>Nome completo *</label>
        <input type="text" id="inputNome" placeholder="Digite seu nome" value="${customerData.nome}" onchange="updateCustomerData('nome', this.value)">
      </div>
      <div class="form-group">
        <label>WhatsApp *</label>
        <input type="tel" id="inputTelefone" placeholder="(27) 99999-9999" value="${customerData.telefone}" onchange="updateCustomerData('telefone', this.value)">
      </div>
      <div class="form-group">
        <label>E-mail</label>
        <input type="email" id="inputEmail" placeholder="seu@email.com" value="${customerData.email}" onchange="updateCustomerData('email', this.value)">
      </div>
      <div class="form-group">
        <label>Observações</label>
        <textarea id="inputObs" placeholder="Alguma restrição alimentar ou pedido especial?" onchange="updateCustomerData('observacoes', this.value)">${customerData.observacoes}</textarea>
      </div>
    </div>
  `;

  body.innerHTML = html;
}

function renderCartItem(item) {
  const product = findProduct(item.productId);
  const opcao = product.opcoes[item.optionIndex];
  const subtotal = opcao.preco * item.quantity;

  const imageHtml = product.imagem
    ? `<img src="${product.imagem}" alt="${product.nome}" class="cart-item-image">`
    : `<div class="cart-item-placeholder">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.1 13.34L10.93 10.51L13.76 13.34L18.76 8.34L20.17 9.75L13.76 16.16L10.93 13.34L7.27 17H20V19H4V6H6V14.27L8.1 13.34M6 3V1H8V3H6M11 3V1H13V3H11M16 3V1H18V3H16Z"/>
        </svg>
      </div>`;

  return `
    <div class="cart-item">
      <div class="cart-item-image-container">
        ${imageHtml}
      </div>
      <div class="cart-item-info">
        <span class="cart-item-name">${product.nome}</span>
        <span class="cart-item-weight">${opcao.peso}</span>
        <span class="cart-item-price">R$ ${formatPrice(subtotal)}</span>
      </div>
      <div class="cart-item-controls">
        <div class="quantity-control">
          <button onclick="updateQuantity('${item.productId}', ${item.optionIndex}, -1)">−</button>
          <span>${item.quantity}</span>
          <button onclick="updateQuantity('${item.productId}', ${item.optionIndex}, 1)">+</button>
        </div>
        <button class="remove-btn" onclick="removeFromCart('${item.productId}', ${item.optionIndex})">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 3V4H4V6H5V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V6H20V4H15V3H9M7 6H17V19H7V6M9 8V17H11V8H9M13 8V17H15V8H13Z"/>
          </svg>
        </button>
      </div>
    </div>
  `;
}

function renderCartFooter() {
  const footer = document.getElementById('cartFooter');
  const total = getCartTotal();
  const entrada = total / 2;
  const isValid = cart.length > 0 && customerData.nome && customerData.telefone;

  footer.innerHTML = `
    <div class="cart-summary">
      <div class="cart-summary-row total">
        <span>Total</span>
        <span>R$ ${formatPrice(total)}</span>
      </div>
      <div class="cart-summary-row highlight">
        <span>Entrada (50%)</span>
        <span>R$ ${formatPrice(entrada)}</span>
      </div>
    </div>
    <button class="checkout-btn" onclick="finalizarPedido()" ${!isValid ? 'disabled' : ''}>
      <span class="checkout-loading" style="display: none;">⏳</span>
      <span class="checkout-text">Finalizar Pedido →</span>
    </button>
    ${!isValid && cart.length > 0 ? '<p style="text-align: center; color: var(--color-texto-claro); font-size: 0.85rem; margin-top: 0.5rem;">Preencha nome e WhatsApp para continuar</p>' : ''}
  `;
}

// ============================================
// FINALIZAÇÃO DO PEDIDO
// ============================================
async function finalizarPedido() {
  // Mostrar loading
  const btn = document.querySelector('.checkout-btn');
  const loadingSpan = btn.querySelector('.checkout-loading');
  const textSpan = btn.querySelector('.checkout-text');
  btn.disabled = true;
  loadingSpan.style.display = 'inline';
  textSpan.textContent = 'Processando...';
  
  const orderNumber = `NOZ-2025-${String(Date.now()).slice(-4)}`;
  const total = getCartTotal();
  const entrada = total / 2;

  // Capturar UTMs salvas
  const utmData = getUTMs() || {};

  const pedido = {
    numero_pedido: orderNumber,
    data_retirada: selectedDate === '24/12' ? '2025-12-24' : '2025-12-31',
    nome: customerData.nome,
    telefone: customerData.telefone.replace(/\D/g, ''),
    email: customerData.email,
    observacoes: customerData.observacoes,
    produtos_pedido: cart.map(item => {
      const product = findProduct(item.productId);
      const opcao = product.opcoes[item.optionIndex];
      return `${item.quantity}x ${product.nome} ${opcao.peso} - R$ ${formatPrice(opcao.preco * item.quantity)}`;
    }).join('\n'),
    produtos_json: JSON.stringify(cart.map(item => {
      const product = findProduct(item.productId);
      const opcao = product.opcoes[item.optionIndex];
      return {
        id: item.productId,
        nome: product.nome,
        peso: opcao.peso,
        qtd: item.quantity,
        preco_unit: opcao.preco,
        subtotal: opcao.preco * item.quantity
      };
    })),
    valor_total: total,
    valor_entrada: entrada,
    status_pedido: "Aguardando PIX",
    created_at: new Date().toISOString(),
    // UTMs de origem
    utm_source: utmData.utm_source || 'direto',
    utm_medium: utmData.utm_medium || 'none',
    utm_campaign: utmData.utm_campaign || '',
    utm_term: utmData.utm_term || '',
    utm_content: utmData.utm_content || ''
  };

  try {
    await fetch(CONFIG.webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pedido)
    });
    console.log('✅ Dados enviados para Homio');
  } catch (error) {
    console.log('❌ Erro ao enviar para Homio:', error);
  }

  // 📊 Enviar para Google Sheets
  if (CONFIG.googleSheetsUrl) {
    try {
      await fetch(CONFIG.googleSheetsUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain'
        },
        body: JSON.stringify(pedido)
      });
      console.log('✅ Dados enviados para Google Sheets');
    } catch (error) {
      console.log('❌ Erro ao enviar para Sheets:', error);
    }
  }

  // ⭐ Tracking: Purchase (EVENTO PRINCIPAL)
  const numItens = cart.reduce((sum, item) => sum + item.quantity, 0);
  const items = cart.map(item => {
    const product = findProduct(item.productId);
    const opcao = product.opcoes[item.optionIndex];
    return {
      id: item.productId,
      nome: product.nome,
      preco: opcao.preco,
      quantity: item.quantity,
      peso: opcao.peso,
      categoria: getCategoryFromProductId(item.productId)
    };
  });

  trackPurchase({
    transactionId: orderNumber,
    valorTotal: total,
    valorEntrada: entrada,
    numItens: numItens,
    items: items,
    customerName: customerData.nome,
    customerPhone: customerData.telefone,
    customerEmail: customerData.email,
    dataRetirada: selectedDate
  });

  showConfirmationPage(pedido);
}

function showConfirmationPage(pedido) {
  const total = pedido.valor_total;
  const entrada = pedido.valor_entrada;

  document.getElementById('orderNumberDisplay').textContent = `#${pedido.numero_pedido}`;

  document.getElementById('orderSummaryItems').innerHTML = cart.map(item => {
    const product = findProduct(item.productId);
    const opcao = product.opcoes[item.optionIndex];
    return `
      <div class="order-item">
        <span>${item.quantity}x ${product.nome} (${opcao.peso})</span>
        <span>R$ ${formatPrice(opcao.preco * item.quantity)}</span>
      </div>
    `;
  }).join('');

  document.getElementById('orderSummaryTotals').innerHTML = `
    <div class="total-row">
      <span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="display: inline-block; vertical-align: middle; margin-right: 4px;">
          <path d="M19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4M19 20H5V10H19V20M19 8H5V6H19V8M7 12H12V17H7V12Z"/>
        </svg>
        Retirada
      </span>
      <span>${selectedDate}/2025</span>
    </div>
    <div class="total-row big">
      <span>Total</span>
      <span>R$ ${formatPrice(total)}</span>
    </div>
    <div class="total-row highlight">
      <span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="display: inline-block; vertical-align: middle; margin-right: 4px;">
          <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2M13.41 18.09V20H10.59V18.09C9.48 17.84 8.47 17.3 7.68 16.54L9.4 14.82C10.01 15.38 10.75 15.8 11.57 16.04V13.26L11.23 13.18C9.15 12.66 7.86 11.85 7.86 10.18C7.86 8.67 9.05 7.53 10.59 7.17V5.26H13.41V7.17C14.5 7.42 15.41 7.93 16.1 8.63L14.42 10.31C13.89 9.82 13.24 9.47 12.57 9.25V12.03L12.91 12.11C15.14 12.66 16.23 13.55 16.23 15.18C16.23 16.73 15.07 17.84 13.41 18.09M11.57 9.18V7.42C10.71 7.58 10.14 8.12 10.14 8.8C10.14 9.38 10.46 9.76 11.57 10.08V9.18M13.41 15.95V17.71C14.27 17.55 14.84 17.03 14.84 16.33C14.84 15.75 14.52 15.37 13.41 15.05V15.95Z"/>
        </svg>
        Entrada (50%)
      </span>
      <span>R$ ${formatPrice(entrada)}</span>
    </div>
  `;

  document.getElementById('pixAmount').textContent = `R$ ${formatPrice(entrada)}`;

  const pixCode = gerarCodigoPix(entrada);
  document.getElementById('pixCode').value = pixCode;

  const qrContainer = document.querySelector('.pix-qrcode');
  qrContainer.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(pixCode)}" alt="QR Code PIX">`;

  const itensResumo = cart.map(item => {
    const product = findProduct(item.productId);
    const opcao = product.opcoes[item.optionIndex];
    return `• ${item.quantity}x ${product.nome} (${opcao.peso})`;
  }).join('\n');

  const mensagemWhatsApp = encodeURIComponent(
    `Olá! Acabei de fazer o pedido *${pedido.numero_pedido}* para a Ceia de Natal.\n\n` +
    `*Itens do pedido:*\n${itensResumo}\n\n` +
    `*Retirada:* ${selectedDate}/2025\n` +
    `*Total:* R$ ${formatPrice(total)}\n` +
    `*Entrada (50%):* R$ ${formatPrice(entrada)}\n\n` +
    `*Nome:* ${pedido.nome}\n\n` +
    `Segue o comprovante do PIX em anexo.`
  );
  document.getElementById('whatsappBtn').onclick = () => {
    // Tracking: WhatsApp Lead (envio de comprovante)
    trackWhatsAppClick({
      location: 'confirmation',
      orderNumber: pedido.numero_pedido,
      orderValue: total
    });
    
    window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${mensagemWhatsApp}`, '_blank');
  };

  // Codificar pedido em base64 para URL compartilhável
  const pedidoCompact = {
    n: pedido.numero_pedido,
    d: selectedDate,
    i: cart.map(item => {
      const product = findProduct(item.productId);
      const opcao = product.opcoes[item.optionIndex];
      return {
        nome: product.nome,
        peso: opcao.peso,
        qtd: item.quantity,
        preco: opcao.preco * item.quantity
      };
    }),
    t: total,
    e: entrada,
    cliente: pedido.nome
  };
  
  const pedidoBase64 = btoa(encodeURIComponent(JSON.stringify(pedidoCompact)));
  history.pushState({}, '', `?pedido=${pedidoBase64}`);
  
  // Transição suave
  const mainPage = document.getElementById('mainPage');
  const confirmPage = document.getElementById('confirmationPage');
  
  mainPage.style.opacity = '0';
  setTimeout(() => {
    mainPage.style.display = 'none';
    confirmPage.classList.add('visible');
    confirmPage.style.opacity = '0';
    setTimeout(() => {
      confirmPage.style.opacity = '1';
    }, 50);
  }, 300);
  
  closeCart();
  window.scrollTo(0, 0);
}

function copyPix() {
  const pixCode = document.getElementById('pixCode');
  pixCode.select();
  document.execCommand('copy');
  showToast('Código PIX copiado!');
}

// ============================================
// ZOOM DE IMAGEM
// ============================================
function openImageZoom(imageSrc) {
  const overlay = document.getElementById('imageZoomOverlay');
  const zoomedImage = document.getElementById('zoomedImage');
  zoomedImage.src = imageSrc;
  overlay.classList.add('visible');
  document.body.style.overflow = 'hidden';

  // Tracking: ViewContent
  // Tentar identificar o produto pela imagem
  for (const [category, products] of Object.entries(cardapio)) {
    const product = products.find(p => p.imagem === imageSrc);
    if (product) {
      const preco = product.opcoes[0].preco; // Pegar primeira opção como referência
      trackViewContent({
        id: product.id,
        nome: product.nome,
        preco: preco,
        categoria: getCategoryFromProductId(product.id)
      });
      break;
    }
  }
}

function closeImageZoom() {
  const overlay = document.getElementById('imageZoomOverlay');
  overlay.classList.remove('visible');
  document.body.style.overflow = '';
}

// ============================================
// NAVEGAÇÃO POR CATEGORIAS
// ============================================
function setupCategoryNav() {
  const buttons = document.querySelectorAll('.category-btn');
  const categoriesNav = document.querySelector('.categories');
  const mainContent = document.querySelector('.main-content');
  const mobileSelect = document.getElementById('categorySelect');
  
  // Navegação desktop
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      scrollToCategory(category);
    });
  });

  // Navegação mobile
  if (mobileSelect) {
    mobileSelect.addEventListener('change', (e) => {
      scrollToCategory(e.target.value);
    });
  }

  // Função auxiliar para scroll
  function scrollToCategory(category) {
    const section = document.getElementById(category);
    const headerHeight = window.innerWidth <= 768 ? 105 : 140;
    const y = section.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.category-section');
    const scrollPos = window.scrollY + 200;

    // Atualizar categoria ativa
    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;

      if (scrollPos >= top && scrollPos < bottom) {
        const category = section.id;
        buttons.forEach(b => {
          b.classList.toggle('active', b.dataset.category === category);
        });
        // Atualizar select mobile
        if (mobileSelect) {
          mobileSelect.value = category;
        }
      }
    });

    // Ocultar menu quando passar da seção de produtos
    if (mainContent) {
      const mainContentBottom = mainContent.offsetTop + mainContent.offsetHeight;
      const currentScroll = window.scrollY + window.innerHeight;
      
      if (currentScroll > mainContentBottom + 100) {
        categoriesNav.classList.add('hidden');
      } else {
        categoriesNav.classList.remove('hidden');
      }
    }
  });
}

// ============================================
// RESTAURAÇÃO DE PEDIDO VIA URL
// ============================================
function checkUrlForOrder() {
  const urlParams = new URLSearchParams(window.location.search);
  const pedidoParam = urlParams.get('pedido');
  
  if (pedidoParam) {
    try {
      const pedidoJson = decodeURIComponent(atob(pedidoParam));
      const pedidoData = JSON.parse(pedidoJson);
      showSharedOrderPage(pedidoData);
      return true;
    } catch (error) {
      console.error('Erro ao decodificar pedido da URL:', error);
      return false;
    }
  }
  return false;
}

function showSharedOrderPage(pedidoData) {
  // Extrair dados do pedido compacto
  const orderNumber = pedidoData.n;
  const selectedDate = pedidoData.d;
  const items = pedidoData.i;
  const total = pedidoData.t;
  const entrada = pedidoData.e;
  const clienteName = pedidoData.cliente;

  document.getElementById('orderNumberDisplay').textContent = `#${orderNumber}`;

  // Renderizar itens
  document.getElementById('orderSummaryItems').innerHTML = items.map(item => `
    <div class="order-item">
      <span>${item.qtd}x ${item.nome} (${item.peso})</span>
      <span>R$ ${formatPrice(item.preco)}</span>
    </div>
  `).join('');

  // Renderizar totais
  document.getElementById('orderSummaryTotals').innerHTML = `
    <div class="total-row">
      <span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="display: inline-block; vertical-align: middle; margin-right: 4px;">
          <path d="M19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4M19 20H5V10H19V20M19 8H5V6H19V8M7 12H12V17H7V12Z"/>
        </svg>
        Retirada
      </span>
      <span>${selectedDate}/2025</span>
    </div>
    <div class="total-row big">
      <span>Total</span>
      <span>R$ ${formatPrice(total)}</span>
    </div>
    <div class="total-row highlight">
      <span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="display: inline-block; vertical-align: middle; margin-right: 4px;">
          <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2M13.41 18.09V20H10.59V18.09C9.48 17.84 8.47 17.3 7.68 16.54L9.4 14.82C10.01 15.38 10.75 15.8 11.57 16.04V13.26L11.23 13.18C9.15 12.66 7.86 11.85 7.86 10.18C7.86 8.67 9.05 7.53 10.59 7.17V5.26H13.41V7.17C14.5 7.42 15.41 7.93 16.1 8.63L14.42 10.31C13.89 9.82 13.24 9.47 12.57 9.25V12.03L12.91 12.11C15.14 12.66 16.23 13.55 16.23 15.18C16.23 16.73 15.07 17.84 13.41 18.09M11.57 9.18V7.42C10.71 7.58 10.14 8.12 10.14 8.8C10.14 9.38 10.46 9.76 11.57 10.08V9.18M13.41 15.95V17.71C14.27 17.55 14.84 17.03 14.84 16.33C14.84 15.75 14.52 15.37 13.41 15.05V15.95Z"/>
        </svg>
        Entrada (50%)
      </span>
      <span>R$ ${formatPrice(entrada)}</span>
    </div>
  `;

  // Configurar PIX
  document.getElementById('pixAmount').textContent = `R$ ${formatPrice(entrada)}`;

  const pixCode = gerarCodigoPix(entrada);
  document.getElementById('pixCode').value = pixCode;

  const qrContainer = document.querySelector('.pix-qrcode');
  qrContainer.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(pixCode)}" alt="QR Code PIX">`;

  // Configurar botão WhatsApp
  const itensResumo = items.map(item => 
    `• ${item.qtd}x ${item.nome} (${item.peso})`
  ).join('\n');

  const mensagemWhatsApp = encodeURIComponent(
    `Olá! Acabei de fazer o pedido *${orderNumber}* para a Ceia de Natal.\n\n` +
    `*Itens do pedido:*\n${itensResumo}\n\n` +
    `*Retirada:* ${selectedDate}/2025\n` +
    `*Total:* R$ ${formatPrice(total)}\n` +
    `*Entrada (50%):* R$ ${formatPrice(entrada)}\n\n` +
    `*Nome:* ${clienteName}\n\n` +
    `Segue o comprovante do PIX em anexo.`
  );
  
  document.getElementById('whatsappBtn').onclick = () => {
    window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${mensagemWhatsApp}`, '_blank');
  };

  // Mostrar página de confirmação
  const mainPage = document.getElementById('mainPage');
  const confirmPage = document.getElementById('confirmationPage');
  
  mainPage.style.display = 'none';
  confirmPage.classList.add('visible');
  confirmPage.style.opacity = '1';
}

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Verificar se há um pedido compartilhado na URL
  const hasSharedOrder = checkUrlForOrder();
  
  // Se não houver pedido compartilhado, inicializar normalmente
  if (!hasSharedOrder) {
    renderCardapio();
    setupCategoryNav();
  }
});
