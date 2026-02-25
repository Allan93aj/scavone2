# 📝 Documentação - Sistema de Personalização de Bordado - Atualizado

## 🎯 Resumo Executivo

O **Sistema de Personalização de Bordado** é uma solução completa para e-commerce VTEX que permite personalização de produtos com bordados. Desenvolvido para a loja Scavone, o sistema oferece uma experiência intuitiva com preview em tempo real e cobrança inteligente por caractere.

### **Principais Características**
- ✅ Cobrança por caractere (R$ 5,00/caractere) via SKU único (1680850)
- ✅ Monogramas de 1, 2 ou 3 letras + Texto Livre (até 12 caracteres)
- ✅ Preview em tempo real sobre imagem do produto
- ✅ Minicart customizado com seções colapsáveis
- ✅ Remoção inteligente (personalização + produto principal sincronizados)
- ✅ Totalmente responsivo (mobile first)

---

## 📊 Sistema de Cobrança (IMPORTANTE)

### **Estratégia Atual: SKU Único com Quantidade Dinâmic**

**SKU de Bordado:** `1680850`  
**Preço Unitário:** R$ 5,00  
**Quantidade:** Número de caracteres (incluindo símbolos formatados)

### **Exemplos de Cálculo:**

| Tipo | Texto Digitado | Formatado | Caracteres | Custo |
|------|---------------|-----------|------------|-------|
| 1 Letra | "A" | "A" | 1 | R$ 5,00 |
| 2 Letras | "AS" | "A&S" | 3 | R$ 15,00 |
| 3 Letras | "ABC" | "A·B·C" | 5 | R$ 25,00 |
| Texto Livre | "Maria" | "Maria" | 5 | R$ 25,00 |
| Texto Livre | "João Paulo" | "João Paulo" | 10 | R$ 50,00 |

### **Lógica de Cálculo:**

```javascript
const getCharacterCount = () => {
  // Texto livre: conta todos os caracteres
  if (selectedMonogram === 'free') {
    return customText.length;
  }

  const monogram = monogramOptions.find(m => m.id === selectedMonogram);
  const textLength = customText.length;

  // Monograma 2 letras: "L&S" = 3 caracteres (2 letras + 1 &)
  if (monogram.maxCharacters === 2 && textLength === 2) {
    return 3;
  }

  // Monograma 3 letras: "A·B·C" = 5 caracteres (3 letras + 2 pontos)
  if (monogram.maxCharacters === 3 && textLength === 3) {
    return 5;
  }

  // Monograma 1 letra: apenas a letra
  return textLength;
};
```

---

## 📦 Estrutura do Projeto

```
store-components/react/components/Bordado/
├── Bordado.jsx              # Modal de personalização (817 linhas)
├── MiniCartCustom.jsx       # Minicart customizado (644 linhas)
├── bordado.css              # Estilos do modal (604 linhas)
├── minicart.css             # Estilos do minicart (59 linhas)
└── README.md                # Documentação completa
```

---

## 🔄 Fluxo Completo

### **1. Ativação**
```javascript
// O componente verifica propriedade do produto:
Nome: "Ativar Personalização Bordado"
Valor: "sim"
```

### **2. Personalização**
```
Usuário → Clica "Personalizar" → Modal abre
  ↓
Seleciona monograma (ou texto livre)
  ↓
Digita texto (validação: apenas letras A-Z, À-ÿ)
  ↓
Escolhe fonte (Google Fonts) + cor
  ↓
Vê preview em tempo real
  ↓
Clica "Finalizar Personalização"
```

### **3. Adição ao Carrinho**
```javascript
// 1. Adiciona produto principal
await addItems([{
  id: selectedItem.itemId,
  quantity: 1,
  seller: '1'
}]);

// 2. Adiciona SKU de bordado (qty = caracteres)
const characterCount = getCharacterCount();  // Ex: 5
await addItems([{
  id: 1680850,
  quantity: characterCount,  // 5 × R$ 5,00 = R$ 25,00
  seller: '1'
}]);

// 3. Cria attachment "Bordado"
await processAttachment(orderItems, {
  monogram: selectedMonogram,
  text: customText,
  font: selectedFont,
  color: selectedColor
});
```

### **4. Attachment Criado**
```javascript
{
  content: {
    "Monograma": "a",  // ou "Texto livre"
    "Nome ou iniciais": "AS",
    "Fonte": "Parisienne",
    "Cor": "Preto",
    "Referência": "Nome do SKU"  // Para vincular ao produto
  },
  noSplitItem: true
}
```

### **5. Processamento no Minicart**
```javascript
// MiniCartCustom.jsx separa produtos:
processedItems = [
  {
    type: 'customized',
    mainProduct: { ... },      // Produto principal
    customization: { ... },    // SKU 1680850 + attachment
    quantity: 1                // Sempre 1
  },
  {
    type: 'normal',
    product: { ... },
    quantity: 2                // Ajustado (total - personalizações)
  }
]
```

### **6. Exibição no Minicart**

**Item Customizado:**
- Nome do produto
- Quantidade: 1 (desabilitada)
- Preço: Produto principal apenas
- **Seção colapsável:**
  ```
  ▼ Personalizações (4) + R$ 25,00
      Monograma: a
      Nome ou iniciais: AS
      Fonte: Parisienne
      Cor: Preto
  ```
- Botão X remove personalização + decrementa produto

**Item Normal:**
- Exibição padrão VTEX
- Quantidade editável

---

## ⚙️ Configuração Rápida

### **1. Propriedades do Produto**
```
Admin VTEX → Catálogo → Produtos → Especificações

Adicionar:
- Nome: "Ativar Personalização Bordado"
- Tipo: Lista
- Valores: "sim", "não"

Opcional:
- Nome: "Posição Imagem Bordado"
- Tipo: Texto
- Valor: "2" (posição na galeria)
```

### **2. Site Editor**
```json
// store-theme/store/blocks/product.jsonc
{
  "store.product": {
    "children": [
      "embroidery-customizer",
      ...
    ]
  }
}
```

### **3. Minicart**
```json
// store-theme/store/blocks/minicart.jsonc
{
  "minicart-base-content": {
    "children": [
      "custom-minicart",  // Substitui minicart padrão
      "flex-layout.row#minicart-footer"
    ]
  }
}
```

---

## 🐛 Troubleshooting

### **Botão "Personalizar" não aparece**
```javascript
// Console do navegador:
console.log(product?.properties);

// Deve conter:
{
  name: "Ativar Personalização Bordado",
  values: ["sim"]
}
```

### **Personalização não aparece no minicart**
```javascript
// Console:
console.log('OrderForm:', orderForm);
console.log('Processed Items:', processedItems);

// Verificar se tem items tipo 'customized'
```

### **Cálculo de caracteres incorreto**
```javascript
// No Bordado.jsx:
const count = getCharacterCount();
console.log({
  texto: customText,
  monograma: selectedMonogram,
  caracteres: count
});
```

### **Erro ao adicionar ao carrinho**
```javascript
// Verificar:
1. SKU 1680850 existe no catálogo
2. Attachment "Bordado" está configurado
3. Console do navegador mostra erros
```

---

## 📱 Responsividade

### **Breakpoint:** 992px

| Elemento | Desktop (>992px) | Mobile (≤992px) |
|----------|------------------|-----------------|
| Layout Modal | Grid 2 colunas | Stack vertical |
| Preview | Esquerda | Após cores |
| Cores | 28×28px | 40×40px |
| Botão Personalizar | 75% largura | 100% largura |
| Texto Livre tooltip | Hover | Expansível |

---

## 🎨 Principais Funções

### **Bordado.jsx**

| Função | Descrição |
|--------|-----------|
| `handleTextChange` | Valida entrada (apenas letras) |
| `formatTextForMonogram` | Formata texto ("A·B·C", "L&S") |
| `getCharacterCount` | Calcula caracteres para cobrança |
| `addToCartCustomize` | Adiciona produto + bordado |
| `processAttachment` | Cria attachment no SKU |

### **MiniCartCustom.jsx**

| Função | Descrição |
|--------|-----------|
| `processOrderItems` | Separa customizados/normais |
| `renderCustomizedItem` | Renderiza produto + personalização |
| `handleRemoveCustomizedItem` | Remove personalização + decrementa produto |

---

## �📞 Informações Importantes

- **SKU de Bordado:** 1680850
- **Preço por caractere:** R$ 5,00
- **Attachment:** "Bordado"
- **Propriedade de ativação:** "Ativar Personalização Bordado" = "sim"

**Última atualização:** Fevereiro 2026  
**Versão:** 2.0  
