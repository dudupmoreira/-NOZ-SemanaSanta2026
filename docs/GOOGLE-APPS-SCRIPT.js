/**
 * Google Apps Script - Webhook para Ceia Noz 2025
 * 
 * Este script recebe os dados dos pedidos via POST e salva em duas abas:
 * 1. "Pedidos" - Aba original com UTMs
 * 2. "Pedido - Ana" - Nova aba com formato personalizado
 * 
 * COMO USAR:
 * 1. Copie este código
 * 2. Abra sua planilha no Google Sheets
 * 3. Vá em: Extensões → Apps Script
 * 4. Cole este código (substitua tudo)
 * 5. Clique em "Implantar" → "Gerenciar implantações"
 * 6. Clique no ícone de lápis (editar) da implantação ativa
 * 7. Em "Versão", selecione "Nova versão"
 * 8. Clique em "Implantar"
 * 9. Pronto! A URL continua a mesma
 */

function doPost(e) {
  try {
    // Pegar a planilha ativa
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Parse dos dados recebidos
    const data = JSON.parse(e.postData.contents);
    
    // Timestamp atual
    const timestamp = new Date();
    
    // ========================================
    // ABA 1: "Pedidos" (Original com UTMs)
    // ========================================
    const sheet1 = spreadsheet.getSheetByName('Pedidos');
    if (sheet1) {
      const row1 = [
        timestamp,                         // Timestamp
        data.numero_pedido || '',          // Número do Pedido
        data.nome || '',                   // Nome
        data.telefone || '',               // Telefone
        data.email || '',                  // Email
        data.produtos_pedido || '',        // Produtos
        data.valor_total || 0,             // Valor Total
        data.valor_entrada || 0,           // Valor Entrada
        data.data_retirada || '',          // Data Retirada
        data.status_pedido || '',          // Status
        data.utm_source || 'direto',       // UTM Source
        data.utm_medium || 'none',         // UTM Medium
        data.utm_campaign || '',           // UTM Campaign
        data.utm_term || '',               // UTM Term
        data.utm_content || ''             // UTM Content
      ];
      
      sheet1.appendRow(row1);
      Logger.log('✅ Dados salvos na aba "Pedidos"');
    } else {
      Logger.log('⚠️ Aba "Pedidos" não encontrada');
    }
    
    // ========================================
    // ABA 2: "Pedido - Ana" (Nova personalizada)
    // Colunas: Name | Phone | email | Created | Tags | Valor Total | 
    //          Produtos do Pedido | Valor Entrada (50%) | Data Retirada | 
    //          Status do Pedido | Número do Pedido | Observações
    // ========================================
    const sheet2 = spreadsheet.getSheetByName('Pedido - Ana');
    if (sheet2) {
      const row2 = [
        data.nome || '',                   // Name
        data.telefone || '',               // Phone
        data.email || '',                  // email
        timestamp,                         // Created
        'ceia-2025, aguardando-pagamento', // Tags
        data.valor_total || 0,             // Valor Total
        data.produtos_pedido || '',        // Produtos do Pedido
        data.valor_entrada || 0,           // Valor Entrada (50%)
        data.data_retirada || '',          // Data Retirada
        data.status_pedido || '',          // Status do Pedido
        data.numero_pedido || '',          // Número do Pedido
        data.observacoes || ''             // Observações
      ];
      
      sheet2.appendRow(row2);
      Logger.log('✅ Dados salvos na aba "Pedido - Ana"');
    } else {
      Logger.log('⚠️ Aba "Pedido - Ana" não encontrada');
    }
    
    // Retornar sucesso
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true,
        message: 'Dados salvos com sucesso!'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log do erro
    Logger.log('❌ Erro: ' + error.toString());
    
    // Retornar erro
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Função de teste (opcional)
 * Para testar, clique em "Executar" com esta função selecionada
 */
function testPost() {
  const testData = {
    numero_pedido: 'TEST-9999',
    nome: 'Cliente Teste',
    telefone: '27997016929',
    email: 'teste@email.com',
    produtos_pedido: '1x Chester ~4,5kg - R$ 535,00\n1x Farofa Natalina 500g - R$ 60,00',
    valor_total: 595.00,
    valor_entrada: 297.50,
    data_retirada: '2025-12-24',
    status_pedido: 'Aguardando PIX',
    observacoes: 'Cliente teste',
    utm_source: 'instagram',
    utm_medium: 'paid',
    utm_campaign: 'natal2025',
    utm_term: 'ceia+vitoria',
    utm_content: 'banner_a'
  };
  
  const e = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(e);
  Logger.log('Resultado: ' + result.getContent());
}

/**
 * Função para criar os cabeçalhos automaticamente
 * Execute UMA VEZ para criar as abas com cabeçalhos
 */
function criarCabecalhos() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  // Aba "Pedidos"
  let sheet1 = spreadsheet.getSheetByName('Pedidos');
  if (!sheet1) {
    sheet1 = spreadsheet.insertSheet('Pedidos');
    sheet1.appendRow([
      'Timestamp', 'Número Pedido', 'Nome', 'Telefone', 'Email', 
      'Produtos', 'Valor Total', 'Valor Entrada', 'Data Retirada', 
      'Status', 'UTM Source', 'UTM Medium', 'UTM Campaign', 'UTM Term', 'UTM Content'
    ]);
    Logger.log('✅ Aba "Pedidos" criada com cabeçalhos');
  }
  
  // Aba "Pedido - Ana"
  let sheet2 = spreadsheet.getSheetByName('Pedido - Ana');
  if (!sheet2) {
    sheet2 = spreadsheet.insertSheet('Pedido - Ana');
    sheet2.appendRow([
      'Name', 'Phone', 'email', 'Created', 'Tags', 'Valor Total',
      'Produtos do Pedido', 'Valor Entrada (50%)', 'Data Retirada',
      'Status do Pedido', 'Número do Pedido', 'Observações'
    ]);
    Logger.log('✅ Aba "Pedido - Ana" criada com cabeçalhos');
  }
  
  Logger.log('✅ Configuração concluída!');
}
