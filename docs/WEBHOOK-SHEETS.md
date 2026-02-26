# Webhook do Google Sheets (Semana Santa 2026)

Este projeto possui integração automatizada com o Google Sheets além da Homio, para facilitar a gestão financeira e o controle de produção (quantidade de pratos).

## Como funciona?
Quando um usuário finaliza um pedido na aplicação (Frontend `js/app.js`), o sistema recolhe todas as informações e envia um POST JSON silencioso para a URL de um aplicativo Web implantado no Google Apps Script. 

O script do Google (códgio fonte disponível em `docs/webhook-semana-santa-2026.js`) é responsável por ler esse JSON e distribuir as informações em **três abas diferentes** do Google Sheets.

## Estrutura de Abas na Planilha

Para que o webhook funcione perfeitamente, a planilha deve conter exatamente as seguintes 3 abas, com a respectiva linha de cabeçalho na linha 1:

### 1. `Pedidos`
Aba principal com todos os detalhes e o tracking completo de UTMs para análise de marketing.
**Cabeçalhos recomendados:**
`Timestamp` | `Número Pedido` | `Nome` | `Telefone` | `Email` | `Produtos` | `Valor Total` | `Valor Entrada` | `Data Retirada` | `Status` | `UTM Source` | `UTM Medium` | `UTM Campaign` | `UTM Term` | `UTM Content`

### 2. `Pedido - Ana`
Aba secundária criada para controle financeiro e conferência rápida, gerando totais e com tags específicas.
**Cabeçalho OBRIGATÓRIO:**
`Name` | `Phone` | `email` | `Created` | `Tags` | `Valor Total` | `Produtos do Pedido` | `Valor Entrada (50%)` | `Data Retirada` | `Status do Pedido` | `Número do Pedido` | `Observações`

### 3. `Qtd pratos`
Aba focada na produção da cozinha. Ela recebe múltiplas linhas por pedido (uma linha para cada item do carrinho), facilitando a geração de tabelas dinâmicas para ver o "total geral encomendado" de um prato específico.
**Cabeçalho OBRIGATÓRIO:**
`Timestamp` | `Número Pedido` | `Produto` | `Peso/Opção` | `Qtd` | `Data Retirada`

---

## Atualizando ou Modificando a Planilha

Caso precise trocar a planilha de destino:
1. Abra a nova planilha e vá em **Extensões -> Apps Script**.
2. Copie o conteúdo de `docs/webhook-semana-santa-2026.js` e cole substituindo o código atual.
3. Clique em **Implantar -> Nova implantação** (Tipo Web App, acesso para Qualquer Pessoa).
4. Copie a "URL do app da Web" gerada.
5. No arquivo `js/app.js` do projeto, substitua a constante `googleSheetsUrl` na propriedade `CONFIG` pela nova URL.
