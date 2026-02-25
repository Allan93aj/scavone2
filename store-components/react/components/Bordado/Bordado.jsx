import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'vtex.styleguide';
import { useCssHandles } from "vtex.css-handles";
import { useProduct } from "vtex.product-context";

import { OrderForm } from "vtex.order-manager";
import { useOrderItems } from 'vtex.order-items/OrderItems'

import './bordado.css';

const CSS_HANDLES = [
  'modalPersonalization',
  'customizerButton',
  'customizerButtonIcon',
  'modalContainer',
  'modalContent',
  'modalLeft',
  'modalRight',
  'modalTitle',
  'section',
  'sectionTitle',
  'sectionSubtitle',
  'textInput',
  'colorList',
  'colorItem',
  'colorItemSelected',
  'footer',
  'warning',
  'monogramList',
  'monogramItem',
  'monogramItemSelected',
  'monogramImage',
  'monogram_free',
  'monogram_free_text',
  'fontSelect',
  'fonts_and_colors',
  'fontSection',
  "desktopOnly",
  "mobileOnly",
  'buttonClear',
  'imagePreviewContainer',
  'imagePreview',
  'textPreview',
  'textPreviewFree',
  'inputError',
  'openTextFree',
  'monogram_free_header',
  'customMinicartContainer',
  'customizationSection',
  'customizationHeader',
  'customizationContent',
  'customizationItem',
  'toggleIcon',
  'active'
];

export default function EmbroideryCustomizer({
  monogramOptions = [],
  colorOptions = [],
  fontOptions = []
}) {

  const { handles } = useCssHandles(CSS_HANDLES);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedMonogram, setSelectedMonogram] = useState('');
  const [customText, setCustomText] = useState('');
  const [selectedFont, setSelectedFont] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [openTextFree, setOpenTextFree] = useState(false);
  const [inputError, setInputError] = useState('');
  const [loading, setLoading] = useState(false);

  const { product, selectedItem } = useProduct();

  // Verificar se a propriedade "Ativar Personalização Bordado" está definida como "sim"
  const bordadoProperty = product?.properties?.find(
    prop => prop.name === "Ativar Personalização Bordado"
  );

  if (bordadoProperty?.values?.[0] !== "sim") {
    return null; // Não renderiza se a propriedade não estiver ativada
  }

  // Buscar imagem do produto
  const getProductImage = () => {
    if (!selectedItem || !selectedItem.images) return '';

    // Verificar se existe a propriedade "Imagem do bordado" no produto
    const imageBordadoProperty = product?.properties?.find(
      prop => prop.name === "Imagem do bordado"
    );

    // Se existir, usar a URL direta do campo
    if (imageBordadoProperty?.values?.[0] && imageBordadoProperty.values[0].trim() !== '') {
      return imageBordadoProperty.values[0];
    }

    // Fallback: retorna primeira imagem do produto
    return selectedItem.images[0]?.imageUrl || '';
  };

  const productImage = getProductImage();

  const { addItems } = useOrderItems()

  const { useOrderForm } = OrderForm;
  const { orderForm, setOrderForm } = useOrderForm();




  // Importar fontes dinamicamente
  useEffect(() => {
    fontOptions.forEach((font) => {
      if (font.fontUrl && font.fontUrl.trim() !== '') {
        // Verifica se a fonte já foi importada
        const existingLink = document.querySelector(`link[href="${font.fontUrl}"]`);
        if (!existingLink) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = font.fontUrl;
          document.head.appendChild(link);
        }
      }
    });
  }, [fontOptions]);

  // Limpar texto quando mudar de monograma (se ultrapassar o novo limite)
  useEffect(() => {
    if (selectedMonogram && customText.length > getMaxCharacters()) {
      setCustomText('');
    }
  }, [selectedMonogram]);

  // Forçar limite de caracteres (proteção adicional para mobiles problemáticos)
  useEffect(() => {
    const maxChars = getMaxCharacters();
    if (customText.length > maxChars) {
      const truncatedText = customText.substring(0, maxChars);
      setCustomText(truncatedText);
    }
  }, [customText, selectedMonogram]);


  // Função para converter para Title Case (primeira letra maiúscula)
  const toTitleCase = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Função para definir texto com validação de limite
  const setTextWithLimit = (text) => {
    const maxChars = getMaxCharacters();
    const limitedText = text.length > maxChars ? text.substring(0, maxChars) : text;
    setCustomText(limitedText);
  };

  const handleTextChange = (e) => {
    let value = e.target.value;

    // Validar limite de caracteres PRIMEIRO (truncar se necessário)
    const maxChars = getMaxCharacters();
    if (value.length > maxChars) {
      value = value.substring(0, maxChars);
      // Forçar o valor do input para o limite
      e.target.value = value;
    }

    // Validar se contém apenas letras (A-Z, a-z) e espaços
    const validPattern = /^[A-Za-zÀ-ÿ\s]*$/;

    if (validPattern.test(value)) {
      // Se for texto livre, usar Title Case; caso contrário, UPPERCASE
      const formattedText = selectedMonogram === 'free' ? toTitleCase(value) : value.toUpperCase();
      setTextWithLimit(formattedText);
      setInputError(''); // Limpar erro se válido
    } else {
      setInputError('Por favor, insira caracteres válidos: Aa-Zz e espaço.');
    }
  };

  // Função adicional para eventos de input (compatibilidade com teclados móveis)
  const handleInput = (e) => {
    const maxChars = getMaxCharacters();
    if (e.target.value.length > maxChars) {
      e.target.value = e.target.value.substring(0, maxChars);
      // Forçar onChange para sincronizar o state
      const event = new Event('change', { bubbles: true });
      e.target.dispatchEvent(event);
    }
  };

  // Forçar validação a cada tecla pressionada (para teclados problemáticos)
  const handleKeyUp = (e) => {
    const maxChars = getMaxCharacters();
    if (e.target.value.length > maxChars) {
      e.target.value = e.target.value.substring(0, maxChars);
      handleTextChange(e);
    }
  };

  // Obter limite de caracteres do monograma selecionado
  const getMaxCharacters = () => {
    // Se for modo de texto livre, permitir 12 caracteres
    if (selectedMonogram === 'free') {
      return 12;
    }
    const selectedMonogramOption = monogramOptions.find(m => m.id === selectedMonogram);
    return selectedMonogramOption?.maxCharacters || 3; // Default 3
  };

  const handleClear = () => {
    setSelectedMonogram('');
    setCustomText('');
    setSelectedFont('');
    setSelectedColor('');
    setInputError('');
  };

  // Formatar o texto conforme o estilo do monograma
  const formatTextForMonogram = () => {
    if (!customText || !selectedMonogram) return '';

    // Se for modo free, retornar o texto em Title Case (já está formatado)
    if (selectedMonogram === 'free') {
      return customText;
    }

    const monogram = monogramOptions.find(m => m.id === selectedMonogram);
    if (!monogram) return customText;

    const upperText = customText.toUpperCase();
    const chars = upperText.split('');

    // Monograma de 2 letras: formato "L&S"
    if (monogram.maxCharacters === 2 && chars.length === 2) {
      return `${chars[0]}&${chars[1]}`;
    }

    // Monograma de 3 letras: formato "A·B·C" (com ponto centralizado)
    if (monogram.maxCharacters === 3 && chars.length === 3) {
      return `${chars[0]}·${chars[1]}·${chars[2]}`;
    }

    // Monograma de 1 letra ou outros casos: apenas o texto
    return upperText;
  };

  // Verificar se o monograma tem moldura (id 'c')
  const hasFrame = () => {
    const monogram = monogramOptions.find(m => m.id === selectedMonogram);
    return monogram && monogram.id === 'c' && monogram.maxCharacters === 1;
  };

  // Renderizar letra com moldura
  const renderTextWithFrame = () => {
    const currentColor = selectedColor ? (colorOptions.find(c => c.id === selectedColor)?.color || '#000') : '#000';
    const currentFont = selectedFont ? `'${fontOptions.find(f => f.value === selectedFont)?.label}', sans-serif` : 'inherit';

    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 48 48" fill="none" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>
        <mask id="path-1-inside-1_10644_1313" fill="white">
          <path d="M40.0439 0C39.9989 0.315535 39.9736 0.637819 39.9736 0.96582C39.9736 4.70457 43.0044 7.73526 46.7432 7.73535C46.8512 7.73535 46.9587 7.73156 47.0654 7.72656V39.3359C46.9586 39.3309 46.8512 39.3281 46.7432 39.3281C43.0044 39.3281 39.9737 42.3589 39.9736 46.0977C39.9736 46.4263 39.9987 46.7493 40.0439 47.0654H7.02148C7.06673 46.7494 7.09082 46.4262 7.09082 46.0977C7.09073 42.3589 4.06003 39.3281 0.321289 39.3281C0.213582 39.3281 0.106476 39.331 0 39.3359V7.72656C0.106497 7.73154 0.213561 7.73535 0.321289 7.73535C4.06009 7.73535 7.09082 4.70462 7.09082 0.96582C7.09081 0.637851 7.06657 0.315506 7.02148 0H40.0439Z" />
        </mask>
        <path d="M40.0439 0L41.5289 0.212208L41.7735 -1.5H40.0439V0ZM39.9736 0.96582L38.4736 0.965785V0.96582H39.9736ZM46.7432 7.73535L46.7431 9.23535H46.7432V7.73535ZM47.0654 7.72656H48.5654V6.15464L46.9952 6.22821L47.0654 7.72656ZM47.0654 39.3359L46.9952 40.8343L48.5654 40.9079V39.3359H47.0654ZM46.7432 39.3281L46.7432 37.8281H46.7432V39.3281ZM39.9736 46.0977L38.4736 46.0976V46.0977H39.9736ZM40.0439 47.0654V48.5654H41.774L41.5288 46.8529L40.0439 47.0654ZM7.02148 47.0654L5.53662 46.8529L5.29148 48.5654H7.02148V47.0654ZM7.09082 46.0977H8.59082V46.0976L7.09082 46.0977ZM0.321289 39.3281V37.8281H0.321226L0.321289 39.3281ZM0 39.3359H-1.5V40.9077L0.0700746 40.8343L0 39.3359ZM0 7.72656L0.0700604 6.2282L-1.5 6.15479V7.72656H0ZM0.321289 7.73535L0.321254 9.23535H0.321289V7.73535ZM7.09082 0.96582H8.59082V0.965785L7.09082 0.96582ZM7.02148 0V-1.5H5.2919L5.53657 0.212188L7.02148 0ZM40.0439 0L38.559 -0.212208C38.5048 0.167448 38.4736 0.560832 38.4736 0.965785L39.9736 0.96582L41.4736 0.965856C41.4736 0.714807 41.4929 0.463623 41.5289 0.212208L40.0439 0ZM39.9736 0.96582H38.4736C38.4736 5.53303 42.176 9.23524 46.7431 9.23535L46.7432 7.73535L46.7432 6.23535C43.8328 6.23528 41.4736 3.8761 41.4736 0.96582H39.9736ZM46.7432 7.73535V9.23535C46.8848 9.23535 47.0186 9.2304 47.1356 9.22492L47.0654 7.72656L46.9952 6.22821C46.8987 6.23273 46.8175 6.23535 46.7432 6.23535V7.73535ZM47.0654 7.72656H45.5654V39.3359H47.0654H48.5654V7.72656H47.0654ZM47.0654 39.3359L47.1357 37.8376C47.0081 37.8316 46.8771 37.8281 46.7432 37.8281L46.7432 39.3281L46.7432 40.8281C46.8253 40.8281 46.9092 40.8303 46.9952 40.8343L47.0654 39.3359ZM46.7432 39.3281V37.8281C42.176 37.8281 38.4737 41.5305 38.4736 46.0976L39.9736 46.0977L41.4736 46.0977C41.4737 43.1873 43.8329 40.8281 46.7432 40.8281V39.3281ZM39.9736 46.0977H38.4736C38.4736 46.5026 38.5045 46.8969 38.5591 47.278L40.0439 47.0654L41.5288 46.8529C41.4929 46.6018 41.4736 46.3499 41.4736 46.0977H39.9736ZM40.0439 47.0654V45.5654H7.02148V47.0654V48.5654H40.0439V47.0654ZM7.02148 47.0654L8.50635 47.278C8.56134 46.8938 8.59082 46.4997 8.59082 46.0977H7.09082H5.59082C5.59082 46.3528 5.57212 46.6049 5.53662 46.8529L7.02148 47.0654ZM7.09082 46.0977L8.59082 46.0976C8.59071 41.5305 4.88849 37.8281 0.321289 37.8281V39.3281V40.8281C3.23157 40.8281 5.59075 43.1873 5.59082 46.0977L7.09082 46.0977ZM0.321289 39.3281L0.321226 37.8281C0.187369 37.8281 0.0567437 37.8316 -0.0700746 37.8376L0 39.3359L0.0700746 40.8343C0.156209 40.8303 0.239795 40.8281 0.321352 40.8281L0.321289 39.3281ZM0 39.3359H1.5V7.72656H0H-1.5V39.3359H0ZM0 7.72656L-0.0700604 9.22493C0.0461729 9.23036 0.179679 9.23535 0.321254 9.23535L0.321289 7.73535L0.321324 6.23535C0.247444 6.23535 0.166821 6.23272 0.0700604 6.2282L0 7.72656ZM0.321289 7.73535V9.23535C4.88851 9.23535 8.59082 5.53305 8.59082 0.96582H7.09082H5.59082C5.59082 3.87619 3.23166 6.23535 0.321289 6.23535V7.73535ZM7.09082 0.96582L8.59082 0.965785C8.59081 0.563778 8.56109 0.170502 8.5064 -0.212188L7.02148 0L5.53657 0.212188C5.57205 0.460511 5.59081 0.711924 5.59082 0.965856L7.09082 0.96582ZM7.02148 0V1.5H40.0439V0V-1.5H7.02148V0Z" fill={currentColor} mask="url(#path-1-inside-1_10644_1313)" />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill={currentColor}
          fontSize="24"
          fontWeight="600"
          fontFamily={currentFont}
        >
          {formatTextForMonogram()}
        </text>
      </svg>
    );
  };

  const showTextFree = () => {
    setOpenTextFree(!openTextFree);
    // Ativar modo de texto livre e limpar monograma
    setSelectedMonogram('free');
    setCustomText('');
  }


  // Personalização - ADIÇÃO AO CARRINHO

  // SKU único para bordado (R$ 5,00 por caractere)
  const bordadoLetraSku = 1680850;

  // Função para calcular quantidade de caracteres (incluindo símbolos)
  const getCharacterCount = () => {
    if (!customText || !selectedMonogram) return 0;

    // Se for texto livre: conta todos os caracteres (incluindo espaços)
    if (selectedMonogram === 'free') {
      return customText.length;
    }

    // Para monogramas: conta letras + símbolos formatados
    const monogram = monogramOptions.find(m => m.id === selectedMonogram);
    if (!monogram) return customText.length;

    const textLength = customText.length;

    // Monograma de 2 letras: "L&S" = 3 caracteres (2 letras + 1 símbolo &)
    if (monogram.maxCharacters === 2 && textLength === 2) {
      return 3; // 2 letras + 1 &
    }

    // Monograma de 3 letras: "A·B·C" = 5 caracteres (3 letras + 2 pontos ·)
    if (monogram.maxCharacters === 3 && textLength === 3) {
      return 5; // 3 letras + 2 pontos
    }

    // Monograma de 1 letra com moldura (id 'c'): letra + moldura = 2 caracteres
    if (monogram.maxCharacters === 1 && monogram.id === 'c' && textLength === 1) {
      return 2; // 1 letra + 1 moldura
    }

    // Monograma de 1 letra sem moldura: apenas a letra
    return textLength;
  };


  const handleFinalize = async () => {

    // Validação básica
    if (!selectedMonogram || !customText || !selectedFont || !selectedColor) {
      alert('Por favor, preencha todos os campos de personalização.');

      return;
    }

    setLoading(true);

    let productMain = selectedItem?.itemId;

    // Aqui você implementa a lógica para adicionar ao carrinho
    const customizationData = {
      productId: productMain,
      monogram: selectedMonogram,
      text: customText,
      font: selectedFont,
      color: selectedColor,
    };

    await addToCartCustomize(customizationData);

  };

  const addToCartCustomize = async (customizationData) => {

    const seller = selectedItem?.sellers.find(seller => seller.sellerDefault);

    try {

      // Step 1: Add main product
      const mainProduct = [{
        id: parseInt(customizationData.productId),
        quantity: 1,
        seller: seller?.sellerId || '1',
      }];

      await addItems(mainProduct);

      // Step 2 : Add customization SKU com quantidade dinâmica
      if (customizationData.monogram !== "" && customizationData.text !== "" && customizationData.font !== "" && customizationData.color !== "") {

        const characterCount = getCharacterCount();

        const customizationProduct = [{
          id: bordadoLetraSku,
          quantity: characterCount, // Quantidade baseada no número de caracteres
          seller: seller?.sellerId || '1',
        }];

        await addItems(customizationProduct);

      }


      // Get the updated orderForm after adding the item
      const updatedOrderForm = await fetch(`/api/checkout/pub/orderForm/${orderForm.id}`)
        .then(res => res.json());


      // Step 3: Add attachment with customization data
      const finalOrderForm = await processAttachment(updatedOrderForm.items, customizationData);

      // Step 4: Update orderForm context to trigger minicart re-render
      if (finalOrderForm) {
        setOrderForm(finalOrderForm);

        // Step 5: Limpar personalizações
        setSelectedMonogram('');
        setCustomText('');
        setSelectedFont('');
        setSelectedColor('');
        setInputError('');

        // Fechar modal após finalizar
        setIsOpen(false);

        // Step 6: Open minicart after successful addition
        setTimeout(() => {
          document
            .querySelector(
              ".vtex-minicart-2-x-openIconContainer button.c-action-primary"
            )
            ?.click();
        }, 50);
      }

    } catch (error) {
      console.log('Ocorreu um erro ao adicionar a personalização. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }

  }

  const processAttachment = async (orderItems, customizationData) => {

    const currentPersonalization = orderItems.find(item =>
      item.id == bordadoLetraSku && !item.attachments.length
    );

    if (!currentPersonalization) {
      return null;
    }

    const itemPersonalizationIndex = orderItems.indexOf(currentPersonalization);

    const attachmentNameBordado = "Bordado";
    const urlAttachments = `/api/checkout/pub/orderForm/${orderForm.id}/items/${itemPersonalizationIndex}/attachments/${attachmentNameBordado}`;

    const contentBordado = {
      content: {
        "Monograma": customizationData.monogram == "free" ? "Texto livre" : customizationData.monogram,
        "Nome ou iniciais": customizationData.text,
        "Fonte": customizationData.font,
        "Cor": customizationData.color,
        "Referência": selectedItem.name
      },
      noSplitItem: true,
      expectedOrderFormSections: ["items", "totalizers", "clientProfileData"]
    };

    try {
      const response = await fetch(urlAttachments, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contentBordado),
        mode: 'cors',
        credentials: 'include',
      });

      const result = await response.json();

      // Retornar o orderForm atualizado com o attachment processado
      return result;

    } catch (error) {
      return null;
    }
  }

  return (
    <>
      {/* BOTÃO */}
      <button
        className={handles.customizerButton}
        onClick={() => setIsOpen(true)}
      >
        <span className={handles.customizerButtonIcon}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.49902 15.5624C7.49902 15.5624 12.05 7.72076 15.5331 2.69304C15.5331 2.69304 16.7725 0.771755 17.9136 1.35404C17.9136 1.35404 18.8708 2.09804 17.616 3.88328L8.61486 15.9344C8.61486 15.9344 7.61446 16.332 7.49902 15.5624Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6.68066 14.9668C6.68066 14.9668 7.75842 17.4473 10.2513 15.6363" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.08548 17.3477L2.88672 23.0757L7.49872 17.4221L6.08548 17.3477Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M2.2002 3.2002C2.2002 3.2002 3.06872 6.27568 14.1013 4.80272L14.1202 4.8002" stroke="black" stroke-linecap="round" />
            <path d="M14.6807 4.71993C14.6807 4.71993 21.3979 3.53097 21.8407 9.35993" stroke="black" stroke-linecap="round" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.9375 12.1398V12.0654H7.94602V12.1398H5.9375Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.7475 12.1398V12.0654H15.6817V12.1398H13.7475ZM5.8623 17.3471V17.2727H8.09398V17.3471H5.8623ZM9.95371 17.4215V17.3471H11.8879V17.4215H9.95371ZM13.9708 17.3471V17.2727H15.7561V17.3471H13.9708ZM10.772 12.1398V12.0654H12.0366V12.1398H10.772Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1895 3.74797C15.1895 3.74797 15.9791 2.52797 16.9006 2.73573C16.9006 2.73573 17.7169 3.24985 16.3954 4.76185C16.3954 4.76185 15.1327 6.45245 14.5874 6.12269C14.5874 6.12269 13.783 5.85237 15.1895 3.74797Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.12402 9.23767V9.16211H11.1956V9.23767H3.12402Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.748 9.31366V9.23926H18.509V9.31366H13.748Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M18.4346 9.2334H18.509V20.2543H18.4346V9.2334Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M18.4377 20.2432V20.3187H5.20117V20.2432H18.4377Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.29968 20.2432V20.3187H3.18164V20.2432H4.29968Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.11045 20.3271H3.03613V9.16113H3.11053V20.3271H3.11045Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
        <span>Personalize seu produto</span>
      </button>

      {/* MODAL */}
      <Modal
        className={handles.modalPersonalization}
        style={{ maxWidth: '800px', width: '90%' }}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        centered
        closeOnOverlayClick
      >
        <div className={handles.modalContainer}>
          <div className={handles.modalContent}>
            {/* ESQUERDA – IMAGEM DO PRODUTO */}
            <div className={`${handles.modalLeft} ${handles.desktopOnly}`}>
              <div className={handles.imagePreviewContainer}>
                <img
                  src={productImage}
                  alt="Produto"
                  className={handles.imagePreview}
                />
                {customText && selectedMonogram && (
                  hasFrame() ? (
                    <div className={handles.textPreview}>
                      {renderTextWithFrame()}
                    </div>
                  ) : (
                    <div
                      className={`${handles.textPreview} ${selectedMonogram === 'free' ? handles.textPreviewFree : ''}`}
                      style={{
                        fontFamily: selectedFont ? `'${fontOptions.find(f => f.value === selectedFont)?.label}', sans-serif` : 'inherit',
                        color: selectedColor ? (colorOptions.find(c => c.id === selectedColor)?.color || '#000') : '#000'
                      }}
                    >
                      {formatTextForMonogram()}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* DIREITA – PERSONALIZAÇÃO */}
            <div className={handles.modalRight}>
              <h2 className={handles.modalTitle}>Personalize sua peça:</h2>

              {/* 1. MONOGRAMA */}
              <div className={handles.section}>
                <span className={handles.sectionTitle}>
                  1. Escolha um Monograma:
                </span>
                <div className={handles.monogramList}>
                  {monogramOptions.map((option) => (
                    <button
                      key={option.id}
                      className={`${handles.monogramItem} ${selectedMonogram === option.id
                        ? handles.monogramItemSelected
                        : ''
                        }`}
                      onClick={() => {
                        setSelectedMonogram(option.id);
                        setOpenTextFree(false);
                      }}
                    >
                      <img
                        src={option.image}
                        alt={`Monograma ${option.id}`}
                        className={handles.monogramImage}
                      />
                    </button>
                  ))}

                  <div className={`${handles.monogram_free} ${handles.desktopOnly} ${selectedMonogram === 'free' ? handles.active : ''}`} onClick={showTextFree}>
                    <span>PERSONALIZE DO SEU JEITO</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                      <circle cx="8.5" cy="8.5" r="8" stroke="black" />
                      <path d="M7.42529 13V12.2002L8.45996 12.0225V7.11572L7.42529 6.93799V6.13184H9.71045V12.0225L10.7451 12.2002V13H7.42529ZM8.39648 4.43701V3.09766H9.71045V4.43701H8.39648Z" fill="black" />
                    </svg>

                    {openTextFree && (
                      <div className={handles.monogram_free_text} >
                        Ideal para nomes ou palavras curtas. Limite máximo: 12 caracteres
                        (incluindo espaços).
                      </div>
                    )}
                  </div>
                </div>

                <div className={`${handles.monogram_free} ${handles.mobileOnly} ${openTextFree ? handles.openTextFree : ''} ${selectedMonogram === 'free' ? handles.active : ''}`} onClick={showTextFree}>

                  <div className={handles.monogram_free_header}>
                    <span>PERSONALIZE DO SEU JEITO</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                      <circle cx="8.5" cy="8.5" r="8" stroke="black" />
                      <path d="M7.42529 13V12.2002L8.45996 12.0225V7.11572L7.42529 6.93799V6.13184H9.71045V12.0225L10.7451 12.2002V13H7.42529ZM8.39648 4.43701V3.09766H9.71045V4.43701H8.39648Z" fill="black" />
                    </svg>
                  </div>

                  <div>
                    {openTextFree && (
                      <div className={handles.monogram_free_text} >
                        Ideal para nomes ou palavras curtas. Limite máximo: 12 caracteres
                        (incluindo espaços).
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 2. TEXTO */}
              <div className={handles.section}>
                <span className={handles.sectionTitle}>
                  2. Seu nome ou iniciais:
                </span>
                <span className={handles.sectionSubtitle}>
                  {selectedMonogram === 'free'
                    ? 'Limite de 1 a 12 caracteres'
                    : selectedMonogram
                      ? `Limite de ${getMaxCharacters()} ${getMaxCharacters() === 1 ? 'caractere' : 'caracteres'}`
                      : 'Selecione um monograma primeiro'
                  }
                </span>
                <input
                  className={handles.textInput}
                  type="text"
                  maxLength={getMaxCharacters()}
                  value={customText}
                  onChange={handleTextChange}
                  onInput={handleInput}
                  onKeyUp={handleKeyUp}
                  onPaste={(e) => {
                    // Prevenir colar texto que exceda o limite
                    setTimeout(() => {
                      const maxChars = getMaxCharacters();
                      if (e.target.value.length > maxChars) {
                        e.target.value = e.target.value.substring(0, maxChars);
                        handleTextChange(e);
                      }
                    }, 0);
                  }}
                  placeholder=""
                  disabled={!selectedMonogram}
                />
                {inputError && (
                  <span className={handles.inputError} style={{ color: '#d32f2f', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                    {inputError}
                  </span>
                )}
              </div>

              <div className={handles.fonts_and_colors}>
                {/* 3. FONTE */}
                <div className={`${handles.section} ${handles.fontSection}`}>
                  <span className={handles.sectionTitle}>
                    3. Escolha uma Fonte:
                  </span>
                  <select
                    className={handles.fontSelect}
                    value={selectedFont}
                    onChange={(e) => setSelectedFont(e.target.value)}
                    style={selectedFont ? { fontFamily: `'${fontOptions.find(f => f.value === selectedFont)?.label}', sans-serif` } : {}}
                  >
                    {fontOptions.map((option) => (

                      <option
                        key={option.value}
                        value={option.value}
                        style={option.label && option.value !== '' ? { fontFamily: `'${option.label}', sans-serif` } : {}}
                      >
                        {option.label !== 'Selecionar' ? 'Scavone' : option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 4. COR */}
                <div className={handles.section}>
                  <span className={handles.sectionTitle}>
                    4. Escolha a cor do bordado:
                  </span>
                  <div className={handles.colorList}>
                    {colorOptions.map((option) => (
                      <button
                        key={option.id}
                        className={`${handles.colorItem} ${selectedColor === option.id
                          ? handles.colorItemSelected
                          : ''
                          }`}
                        style={{ backgroundColor: option.color }}
                        onClick={() => setSelectedColor(option.id)}
                        title={option.name}
                        aria-label={option.name}
                      />
                    ))}
                  </div>
                </div>

                {/* ESQUERDA – IMAGEM DO PRODUTO */}
                <div className={`${handles.modalLeft} ${handles.mobileOnly}`}>
                  <div className={handles.imagePreviewContainer}>
                    <img
                      src={productImage}
                      alt="Produto"
                      className={handles.imagePreview}
                    />
                    {customText && selectedMonogram && (
                      hasFrame() ? (
                        <div className={`${handles.textPreview} ${selectedMonogram === 'free' ? handles.textPreviewFree : ''}`}>
                          {renderTextWithFrame()}
                        </div>
                      ) : (
                        <div
                          className={`${handles.textPreview} ${selectedMonogram === 'free' ? handles.textPreviewFree : ''}`}
                          style={{
                            fontFamily: selectedFont ? `'${fontOptions.find(f => f.value === selectedFont)?.label}', sans-serif` : 'inherit',
                            color: selectedColor ? (colorOptions.find(c => c.id === selectedColor)?.color || '#000') : '#000'
                          }}
                        >
                          {formatTextForMonogram()}
                        </div>
                      )
                    )}
                  </div>
                </div>



              </div>

              {/* AVISO */}
              <div className={handles.warning}>
                <strong>ATENÇÃO:</strong>
                <br />
                Produtos personalizados <strong>acrescentam 7 dias</strong> na entrega.
              </div>

              {/* FOOTER */}
              <div className={handles.footer}>
                <Button
                  variation="primary"
                  onClick={handleFinalize}
                  disabled={loading}
                >
                  {loading ? 'Adicionando ao carrinho...' : 'Finalizar Personalização'}
                </Button>
              </div>

              <div className={`${handles.buttonClear} ${handles.mobileOnly}`}>
                <button onClick={handleClear}>Limpar</button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

EmbroideryCustomizer.propTypes = {
  monogramOptions: PropTypes.array,
  colorOptions: PropTypes.array,
  fontOptions: PropTypes.array
};

EmbroideryCustomizer.defaultProps = {
  monogramOptions: [],
  colorOptions: [],
  fontOptions: []
};


// Definir o schema para o Site Editor da VTEX
EmbroideryCustomizer.schema = {
  title: 'Configuração de Bordado',
  description: 'Configure as opções de personalização de bordado',
  type: 'object',
  properties: {
    monogramOptions: {
      type: 'array',
      title: 'Opções de Monogramas',
      description: 'Configure os monogramas disponíveis',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            title: 'ID do Monograma',
            description: 'Identificador único do monograma'
          },
          image: {
            type: 'string',
            title: 'Imagem do Monograma',
            description: 'Faça upload da imagem do monograma',
            widget: {
              'ui:widget': 'image-uploader'
            }
          },
          maxCharacters: {
            type: 'number',
            title: 'Número Máximo de Caracteres',
            description: 'Quantidade de letras permitidas (ex: 1, 2 ou 3)'
          }
        }
      }
    },
    colorOptions: {
      type: 'array',
      title: 'Opções de Cores',
      description: 'Configure as cores de bordado disponíveis',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            title: 'ID da Cor',
            description: 'Identificador único da cor'
          },
          color: {
            type: 'string',
            title: 'Código da Cor',
            description: 'Código hexadecimal da cor (ex: #FFFFFF)'
          },
          name: {
            type: 'string',
            title: 'Nome da Cor',
            description: 'Nome exibido da cor'
          }
        }
      }
    },
    fontOptions: {
      type: 'array',
      title: 'Opções de Fontes',
      description: 'Configure as fontes disponíveis para o bordado',
      items: {
        type: 'object',
        properties: {
          value: {
            type: 'string',
            title: 'ID da Fonte',
            description: 'ID técnico da fonte (ex: parisienne)'
          },
          label: {
            type: 'string',
            title: 'Nome da Fonte',
            description: 'Nome da fonte que será exibido e aplicado (ex: Parisienne, Roboto Slab)'
          },
          fontUrl: {
            type: 'string',
            title: 'URL do Google Fonts',
            description: 'URL completa do Google Fonts para importar a fonte (ex: https://fonts.googleapis.com/css2?family=Parisienne&display=swap)'
          }
        }
      }
    }
  }
}