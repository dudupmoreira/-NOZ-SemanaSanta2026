/**
 * Google Apps Script - Webhook para Semana Santa Noz 2026
 * 
 * Este script recebe os dados dos pedidos via POST e salva nas abas:
 * 1. "Pedidos" - Aba com os dados completos do pedido e UTMs
 * 2. "Pedido - Ana" - Aba formatada especialmente
 * 3. "Qtd pratos" - Aba com os itens separados para contagem rápida
 */

function doPost(e) {
    try {
        const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        const data = JSON.parse(e.postData.contents);
        const timestamp = new Date();

        // ========================================
        // ABA 1: "Pedidos"
        // ========================================
        let sheet1 = spreadsheet.getSheetByName('Pedidos') || spreadsheet.getSheetByName('pedidos');

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
        }

        // ========================================
        // ABA 2: "Pedido - Ana"
        // ========================================
        let sheet2 = spreadsheet.getSheetByName('Pedido - Ana');

        if (sheet2) {
            const row2 = [
                data.nome || '',                   // Name
                data.telefone || '',               // Phone
                data.email || '',                  // email
                timestamp,                         // Created
                'semana-santa-2026, aguardando-pagamento', // Tags
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
        }

        // ========================================
        // ABA 3: "Qtd pratos"
        // ========================================
        let sheet3 = spreadsheet.getSheetByName('Qtd pratos');

        if (sheet3 && data.produtos_json) {
            try {
                const itens = JSON.parse(data.produtos_json);

                // Inserir uma linha para cada prato diferente do pedido
                itens.forEach(item => {
                    const row3 = [
                        timestamp,                         // Timestamp
                        data.numero_pedido || '',          // Número do Pedido
                        item.nome || '',                   // Produto
                        item.peso || '',                   // Peso/Opção
                        item.qtd || 1,                     // Qtd
                        data.data_retirada || ''           // Data Retirada
                    ];
                    sheet3.appendRow(row3);
                });
                Logger.log('✅ Dados salvos na aba "Qtd pratos"');
            } catch (e) {
                Logger.log('⚠️ Erro ao salvar na aba "Qtd pratos": ' + e.toString());
            }
        }

        // Retornar sucesso
        return ContentService
            .createTextOutput(JSON.stringify({
                success: true,
                message: 'Dados salvos com sucesso!'
            }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        Logger.log('❌ Erro: ' + error.toString());
        return ContentService
            .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}
