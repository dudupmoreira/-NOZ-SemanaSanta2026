# 📊 Guia: Atualizar Google Apps Script para Duas Abas

## ✅ O que vai acontecer

Depois de atualizar, **cada pedido será salvo automaticamente em DUAS abas**:

1. **"Pedidos"** - Formato original com UTMs
2. **"Pedido - Ana"** - Formato personalizado

---

## 📝 Passo a Passo

### 1. Abrir o Google Apps Script

1. Abra sua planilha no Google Sheets
2. Clique em **Extensões** → **Apps Script**
3. Uma nova aba vai abrir com o código atual

### 2. Substituir o Código

1. **Selecione TODO o código antigo** (Ctrl+A ou Cmd+A)
2. **Delete** (Backspace ou Delete)
3. Abra o arquivo `docs/GOOGLE-APPS-SCRIPT.js` deste projeto
4. **Copie TODO o conteúdo**
5. **Cole** no Apps Script (Ctrl+V ou Cmd+V)
6. Clique em **💾 Salvar** (ou Ctrl+S / Cmd+S)

### 3. Reimplantar (IMPORTANTE!)

> ⚠️ **ATENÇÃO:** Se você só salvar e não reimplantar, nada vai mudar!

1. Clique em **Implantar** (canto superior direito)
2. Selecione **Gerenciar implantações**
3. Na linha da implantação ativa, clique no **ícone de lápis ✏️** (editar)
4. Em **"Versão"**, clique na setinha e selecione **"Nova versão"**
5. (Opcional) Adicione uma descrição: "Adicionada aba Pedido - Ana"
6. Clique em **"Implantar"**
7. Clique em **"Concluir"**

**A URL continua a mesma!** Não precisa mudar nada no site.

---

## 🧪 Testar (Opcional mas Recomendado)

### Opção 1: Testar dentro do Apps Script

1. No topo do editor, onde diz `function`, selecione **"testPost"**
2. Clique em **▶️ Executar**
3. Primeira vez: vai pedir autorização → clique em **"Revisar permissões"**
4. Escolha sua conta do Google
5. Clique em **"Avançado"** → **"Ir para [nome do projeto] (não seguro)"**
6. Clique em **"Permitir"**
7. Execute novamente
8. Veja os logs: **Exibição** → **Logs** → Deve aparecer "✅ Dados salvos"
9. **Verifique nas duas abas** se apareceu uma linha com "TEST-9999"

### Opção 2: Fazer um pedido teste no site

1. Acesse: https://ceiadonoz.nozcomidaafetiva.com.br
2. Adicione alguns produtos
3. Preencha os dados e finalize
4. Verifique se o pedido apareceu nas **DUAS ABAS**

---

## 🔍 Verificação

Depois de testar, confirme:

- [ ] Aba "Pedidos" tem uma nova linha com todos os dados + UTMs
- [ ] Aba "Pedido - Ana" tem uma nova linha com os dados no formato dela
- [ ] Os dados são os mesmos (nome, telefone, valor, etc.)
- [ ] A coluna "Tags" na aba Ana mostra "ceia-2025, aguardando-pagamento"

---

## 📊 Estrutura das Abas

### Aba "Pedidos" (original)
```
Timestamp | Número Pedido | Nome | Telefone | Email | Produtos | 
Valor Total | Valor Entrada | Data Retirada | Status | 
UTM Source | UTM Medium | UTM Campaign | UTM Term | UTM Content
```

### Aba "Pedido - Ana" (nova)
```
Name | Phone | email | Created | Tags | Valor Total | 
Produtos do Pedido | Valor Entrada (50%) | Data Retirada | 
Status do Pedido | Número do Pedido | Observações
```

---

## 🚨 Troubleshooting

### "Aba 'Pedidos' não encontrada"
- Certifique-se que a aba se chama exatamente **"Pedidos"** (com P maiúsculo)
- Caso contrário, renomeie a aba

### "Aba 'Pedido - Ana' não encontrada"
- Certifique-se que a aba se chama exatamente **"Pedido - Ana"** (com espaço e hífen)
- Verifique se não tem espaços extras

### Dados não aparecem
1. Verifique os logs: No Apps Script → **Exibição** → **Execuções**
2. Veja se há erros em vermelho
3. Clique no erro para ver detalhes

### Pedidos antigos não migraram
- Normal! O script só funciona para **pedidos novos**
- Pedidos antigos continuam apenas na aba original

---

## ✅ Checklist Final

- [ ] Código copiado e colado no Apps Script
- [ ] Código salvo (💾)
- [ ] Reimplantação feita (nova versão criada)
- [ ] Teste realizado (testPost ou pedido real)
- [ ] Dados apareceram nas duas abas
- [ ] Formato dos dados está correto em cada aba

---

## 💡 Dica

Se você quiser apagar a linha de teste (TEST-9999), pode fazer manualmente nas duas abas. Ela não vai atrapalhar nada!

---

**Pronto!** Agora todos os pedidos novos vão automaticamente para as duas abas. 🎉
