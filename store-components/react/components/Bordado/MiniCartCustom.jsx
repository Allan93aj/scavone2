import React, { useState } from 'react';

import { useCssHandles } from "vtex.css-handles";

import { OrderForm } from "vtex.order-manager";
import { useOrderItems } from 'vtex.order-items/OrderItems';

import './minicart.css';

const CSS_HANDLES = [
    'cartListContainer',
    'customProductImageContainer',
    'customizationSection',
    'customizationHeader',
    'customizationHeaderText',
    'customizationToggleIcon',
    'customizationContent',
    'customizationItem',
    'customizationLabel',
    'customizationValue'
];


export default function MiniCartCustom() {

    const { handles } = useCssHandles(CSS_HANDLES);

    const { useOrderForm } = OrderForm;
    const { orderForm, setOrderForm } = useOrderForm();

    const { updateQuantity } = useOrderItems();

    const [removingItems, setRemovingItems] = useState({});
    const [updatingQuantity, setUpdatingQuantity] = useState({});
    const [expandedSections, setExpandedSections] = useState({});

    // ID do produto de personalização (bordado por caractere)
    const customizationSkus = [1680850];

    // PASSO 1: Processar items do orderForm
    const processOrderItems = () => {
        if (!orderForm?.items || orderForm.items.length === 0) {
            return [];
        }

        const processedItems = [];
        const customizationItems = [];

        // Primeiro, separar produtos normais e personalizações
        orderForm.items.forEach(item => {
            // Converter item.id para número para garantir comparação correta
            const itemIdNumber = Number(item.id);
            const isCustomization = customizationSkus.includes(itemIdNumber);

            if (isCustomization) {
                customizationItems.push(item);
            }
        });

        // Processar cada produto de personalização
        customizationItems.forEach(customization => {
            const attachmentData = customization.attachments?.[0];
            const mainProductReference = attachmentData?.content?.['Referência'];

            // Buscar o produto principal pela referência
            const mainProduct = orderForm.items.find(item => {
                const itemIdNumber = Number(item.id);
                const match = item.skuName === mainProductReference && !customizationSkus.includes(itemIdNumber);
                return match;
            });

            if (mainProduct) {
                // Criar um item customizado para cada personalização
                processedItems.push({
                    type: 'customized',
                    mainProduct: mainProduct,
                    customization: customization,
                    quantity: 1  // Sempre 1 no minicart
                });
            } else {
                // Se não encontrou o produto principal, adicionar como órfão (não deveria acontecer)
            }
        });

        // Adicionar produtos normais (que não têm personalização)
        orderForm.items.forEach(item => {
            // Se não é produto de personalização (converter para número)
            const itemIdNumber = Number(item.id);
            if (!customizationSkus.includes(itemIdNumber)) {
                // Verificar se este produto tem personalizações usando skuName
                const customizationsCount = customizationItems.filter(custom => {
                    const ref = custom.attachments?.[0]?.content?.['Referência'];
                    const matches = ref === item.skuName;
                    return matches;
                }).length;

                const normalQuantity = item.quantity - customizationsCount;

                if (normalQuantity > 0) {
                    processedItems.push({
                        type: 'normal',
                        product: item,
                        quantity: normalQuantity
                    });
                }
            }
        });

        return processedItems;
    };

    // Chamar a função para processar os items
    const processedItems = processOrderItems();

    // Função para atualizar quantidade
    const handleUpdateQuantity = async (item, newQuantity) => {
        if (newQuantity < 0) return; // Não permite quantidade negativa

        try {
            setUpdatingQuantity(prev => ({ ...prev, [item.uniqueId]: true }));

            await updateQuantity({
                uniqueId: item.uniqueId,
                quantity: newQuantity
            });
        } catch (error) {
            alert('Erro ao atualizar quantidade. Tente novamente.');
        } finally {
            setUpdatingQuantity(prev => {
                const next = { ...prev };
                delete next[item.uniqueId];
                return next;
            });
        }
    };

    // Função para remover item
    const handleRemoveItem = async (item, index) => {
        try {
            setRemovingItems(prev => ({ ...prev, [item.uniqueId]: true }));

            await updateQuantity({
                uniqueId: item.uniqueId,
                quantity: 0
            });
        } catch (error) {
            alert('Erro ao remover item. Tente novamente.');
        } finally {
            setRemovingItems(prev => {
                const next = { ...prev };
                delete next[item.uniqueId];
                return next;
            });
        }
    };

    // Função para remover item customizado (produto principal + personalização)
    const handleRemoveCustomizedItem = async (mainProduct, customization) => {
        try {
            setRemovingItems(prev => ({
                ...prev,
                [mainProduct.uniqueId]: true,
                [customization.uniqueId]: true
            }));

            // 1. Remover o produto de personalização (qty = 0)
            await updateQuantity({
                uniqueId: customization.uniqueId,
                quantity: 0
            });

            // 2. Decrementar 1 na quantidade do produto principal
            const newMainProductQty = mainProduct.quantity - 1;

            await updateQuantity({
                uniqueId: mainProduct.uniqueId,
                quantity: newMainProductQty
            });
        } catch (error) {
            alert('Erro ao remover item customizado. Tente novamente.');
        } finally {
            setRemovingItems(prev => {
                const next = { ...prev };
                delete next[mainProduct.uniqueId];
                delete next[customization.uniqueId];
                return next;
            });
        }
    };

    // Formatar preço
    const formatPrice = (price) => {
        const priceInReais = price / 100;
        return priceInReais.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    // PASSO 2: Renderizar item customizado (principal + personalização)
    const renderCustomizedItem = (processedItem, index) => {
        const { mainProduct, customization } = processedItem;

        // Validação: se não encontrou o produto principal, não renderizar
        if (!mainProduct) {
            return null;
        }

        const imageUrl = mainProduct.imageUrl || mainProduct.imageUrls?.at1x || '';
        const productUrl = mainProduct.detailUrl || '#';
        const attachmentData = customization.attachments?.[0];

        // ID único para a seção de personalização
        const sectionId = `${mainProduct.uniqueId}-${customization.uniqueId}-${index}`;
        const isExpanded = expandedSections[sectionId] || false;

        // Toggle expand/collapse
        const toggleSection = () => {
            setExpandedSections(prev => ({
                ...prev,
                [sectionId]: !prev[sectionId]
            }));
        };

        return (
            <div key={`customized-${mainProduct.uniqueId}-${customization.uniqueId}-${index}`} className={`vtex-flex-layout-0-x-flexRow vtex-flex-layout-0-x-flexRow--product-list-container`} aria-label="Linha de sessão">
                <div className="flex mt0 mb0 pt0 pb0 justify-start vtex-flex-layout-0-x-flexRowContent vtex-flex-layout-0-x-flexRowContent--product-list-container items-stretch w-100">
                    {/* Imagem */}
                    <div className="pr0 vtex-flex-layout-0-x-stretchChildrenWidth flex">
                        <div id={`image-${mainProduct.id}`} className={`vtex-product-list-0-x-productImageContainer ${handles.customProductImageContainer}`}>
                            <a className="vtex-product-list-0-x-productImageAnchor" href={productUrl}>
                                <img
                                    className="vtex-product-list-0-x-productImage br2"
                                    loading="lazy"
                                    alt={mainProduct.name}
                                    width="100%"
                                    src={imageUrl.replace('-55-auto', '-96-auto')}
                                />
                            </a>
                        </div>
                    </div>

                    {/* Informações do Produto */}
                    <div className="pr0 vtex-flex-layout-0-x-stretchChildrenWidth flex">
                        <div className="vtex-flex-layout-0-x-flexCol vtex-flex-layout-0-x-flexCol--minicart-product-infos ml0 mr0 pl0 pr0 flex flex-column h-100 w-100">

                            {/* Nome e botão remover */}
                            <div className="vtex-flex-layout-0-x-flexColChild vtex-flex-layout-0-x-flexColChild--minicart-product-infos pb0">
                                <div className="vtex-flex-layout-0-x-flexRow vtex-flex-layout-0-x-flexRow--minicart-product-name-container" aria-label="Linha de sessão">
                                    <div className="flex mt0 mb0 pt0 pb0 justify-start vtex-flex-layout-0-x-flexRowContent vtex-flex-layout-0-x-flexRowContent--minicart-product-name-container items-stretch w-100">
                                        <div className="pr0 items-stretch flex">
                                            <a
                                                id={`name-${mainProduct.id}`}
                                                className="c-on-base t-title lh-copy fw6 no-underline fw5-m vtex-product-list-0-x-productName"
                                                href={productUrl}
                                            >
                                                {mainProduct.name}
                                            </a>
                                        </div>
                                        <div className="pr0 items-stretch flex">
                                            <div className="vtex-product-list-0-x-removeButtonContainer vtex-product-list-0-x-item">
                                                <button
                                                    id={`remove-button-${mainProduct.id}`}
                                                    className="vtex-product-list-0-x-removeButton pointer bg-transparent bn pa2"
                                                    title="remove"
                                                    onClick={() => handleRemoveCustomizedItem(mainProduct, customization)}
                                                    disabled={removingItems[mainProduct.uniqueId] || removingItems[customization.uniqueId]}
                                                    style={{ opacity: (removingItems[mainProduct.uniqueId] || removingItems[customization.uniqueId]) ? 0.5 : 1 }}
                                                >
                                                    {(removingItems[mainProduct.uniqueId] || removingItems[customization.uniqueId]) ? (
                                                        <span>...</span>
                                                    ) : (
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Variações (SKU) */}
                            {mainProduct.skuSpecifications && mainProduct.skuSpecifications.length > 0 && (
                                <div className="vtex-flex-layout-0-x-flexColChild vtex-flex-layout-0-x-flexColChild--minicart-product-infos pb0">
                                    <div className="c-muted-1 f6 lh-copy vtex-product-list-0-x-productVariationsContainer">
                                        {mainProduct.skuSpecifications.map((spec, specIndex) => (
                                            <div
                                                key={specIndex}
                                                className="vtex-product-list-0-x-productVariationsItem"
                                                id={`specification-${mainProduct.id}-${spec.fieldName}`}
                                            >
                                                {spec.fieldName}: {spec.fieldValues[0]}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}


                            {/* Quantidade (sempre 1) e Preço */}
                            <div className="vtex-flex-layout-0-x-flexColChild vtex-flex-layout-0-x-flexColChild--minicart-product-infos pb0">
                                <div className="vtex-flex-layout-0-x-flexRow vtex-flex-layout-0-x-flexRow--quantity-price-container" aria-label="Linha de sessão">
                                    <div className="flex mt0 mb0 pt0 pb0 justify-start vtex-flex-layout-0-x-flexRowContent vtex-flex-layout-0-x-flexRowContent--quantity-price-container items-stretch w-100">

                                        {/* Seletor de Quantidade - SEMPRE 1 */}
                                        <div className="pr0 items-stretch flex">
                                            <div className="vtex-product-list-0-x-quantitySelectorContainer vtex-product-list-0-x-quantity vtex-product-list-0-x-quantityStepper vtex-product-list-0-x-quantitySelector">
                                                <div className="flex vtex-product-list-0-x-quantitySelectorWrapper">
                                                    <button
                                                        className="vtex-product-list-0-x-quantitySelectorButton vtex-product-list-0-x-quantitySelectorDecrease pa4 ba br2 br--left flex items-center justify-center c-muted-1 b--muted-4 hover-b--muted-3 bg-muted-5 hover-bg-muted-4 pointer"
                                                        aria-label="Diminuir quantidade"
                                                        disabled={true}
                                                        style={{ opacity: 0.5 }}
                                                    >
                                                        <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M1.333 9.334h13.334V7.11H1.333v2.223z" fill="currentColor"></path>
                                                        </svg>
                                                    </button>
                                                    <div className="vtex-product-list-0-x-inputContainer flex-auto flex-shrink-0 flex items-center pv1 bt bb ph5 b--muted-4 hover-b--muted-3">
                                                        <input
                                                            className="flex-auto h-100 bn bg-transparent tc"
                                                            id={`product-list-quantity-stepper-${mainProduct.id}`}
                                                            value={1}
                                                            readOnly
                                                        />
                                                    </div>
                                                    <button
                                                        className="vtex-product-list-0-x-quantitySelectorButton vtex-product-list-0-x-quantitySelectorIncrease pa4 ba br2 br--right flex items-center justify-center c-action-primary b--muted-4 hover-b--muted-3 bg-base hover-bg-muted-5 pointer"
                                                        aria-label="Aumentar quantidade"
                                                        disabled={true}
                                                        style={{ opacity: 0.5 }}
                                                    >
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M14.6666 6.88905H9.11103V1.3335H6.88881V6.88905H1.33325V9.11127H6.88881V14.6668H9.11103V9.11127H14.6666V6.88905Z" fill="currentColor"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Preço */}
                                        <div className="pr0 items-stretch flex">
                                            <div className="vtex-product-list-0-x-price vtex-product-list-0-x-productPriceContainer tl">
                                                {mainProduct.listPrice > mainProduct.sellingPrice && (
                                                    <div className="vtex-product-list-0-x-productPriceCurrency c-muted-1 strike t-mini mb2">
                                                        R$ {formatPrice(mainProduct.listPrice)}
                                                    </div>
                                                )}
                                                <div className="vtex-product-list-0-x-productPrice div fw6 fw5-m">
                                                    <div className="vtex-product-list-0-x-price">
                                                        R$&nbsp;{formatPrice(mainProduct.sellingPrice)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {/* Seção de Personalizações */}
                            {attachmentData && attachmentData.content && (
                                <div className="vtex-flex-layout-0-x-flexColChild vtex-flex-layout-0-x-flexColChild--minicart-product-infos pb0">
                                    <div className={handles.customizationSection}>
                                        {/* Header clicável */}
                                        <div
                                            onClick={toggleSection}
                                            className={handles.customizationHeader}
                                        >
                                            <span className={handles.customizationHeaderText}>
                                                Personalizações ({Object.keys(attachmentData.content).filter(k => k !== 'Referência').length}) + R$ {formatPrice(customization.sellingPrice * customization.quantity)}
                                            </span>
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className={handles.customizationToggleIcon}
                                                style={{
                                                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                                                }}
                                            >
                                                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            </svg>
                                        </div>

                                        {/* Conteúdo colapsável */}
                                        <div
                                            className={handles.customizationContent}
                                            style={{
                                                maxHeight: isExpanded ? '500px' : '0',
                                                marginTop: isExpanded ? '8px' : '0'
                                            }}
                                        >
                                            {Object.entries(attachmentData.content)
                                                .filter(([key]) => key !== 'Referência')
                                                .map(([key, value], i) => (
                                                    <div
                                                        key={i}
                                                        className={handles.customizationItem}
                                                        style={{ borderTop: i > 0 ? '1px solid #ddd' : 'none' }}
                                                    >
                                                        <span className={handles.customizationLabel}>{key}:</span>
                                                        <span className={handles.customizationValue}>{value}</span>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Renderizar cada item do carrinho
    const renderItem = (item, index, customQuantity = null) => {
        const imageUrl = item.imageUrl || item.imageUrls?.at1x || '';
        const productUrl = item.detailUrl || '#';
        const quantity = customQuantity !== null ? customQuantity : item.quantity;

        return (
            <div key={item.uniqueId || index} className={`vtex-flex-layout-0-x-flexRow vtex-flex-layout-0-x-flexRow--product-list-container`} aria-label="Linha de sessão" >
                <div className="flex mt0 mb0 pt0 pb0 justify-start vtex-flex-layout-0-x-flexRowContent vtex-flex-layout-0-x-flexRowContent--product-list-container items-stretch w-100">
                    {/* Imagem */}
                    <div className="pr0 vtex-flex-layout-0-x-stretchChildrenWidth flex">
                        <div id={`image-${item.id}`} className={`vtex-product-list-0-x-productImageContainer ${handles.customProductImageContainer}`}>
                            <a className="vtex-product-list-0-x-productImageAnchor" href={productUrl}>
                                <img
                                    className="vtex-product-list-0-x-productImage br2"
                                    loading="lazy"
                                    alt={item.name}
                                    width="100%"
                                    src={imageUrl.replace('-55-auto', '-96-auto')}
                                />
                            </a>
                        </div>
                    </div>

                    {/* Informações do Produto */}
                    <div className="pr0 vtex-flex-layout-0-x-stretchChildrenWidth flex">
                        <div className="vtex-flex-layout-0-x-flexCol vtex-flex-layout-0-x-flexCol--minicart-product-infos ml0 mr0 pl0 pr0 flex flex-column h-100 w-100">

                            {/* Nome e botão remover */}
                            <div className="vtex-flex-layout-0-x-flexColChild vtex-flex-layout-0-x-flexColChild--minicart-product-infos pb0">
                                <div className="vtex-flex-layout-0-x-flexRow vtex-flex-layout-0-x-flexRow--minicart-product-name-container" aria-label="Linha de sessão">
                                    <div className="flex mt0 mb0 pt0 pb0 justify-start vtex-flex-layout-0-x-flexRowContent vtex-flex-layout-0-x-flexRowContent--minicart-product-name-container items-stretch w-100">
                                        <div className="pr0 items-stretch flex">
                                            <a
                                                id={`name-${item.id}`}
                                                className="c-on-base t-title lh-copy fw6 no-underline fw5-m vtex-product-list-0-x-productName"
                                                href={productUrl}
                                            >
                                                {item.name}
                                            </a>
                                        </div>
                                        <div className="pr0 items-stretch flex">
                                            <div className="vtex-product-list-0-x-removeButtonContainer vtex-product-list-0-x-item">
                                                <button
                                                    id={`remove-button-${item.id}`}
                                                    className="vtex-product-list-0-x-removeButton pointer bg-transparent bn pa2"
                                                    title="remove"
                                                    onClick={() => handleRemoveItem(item, index)}
                                                    disabled={removingItems[item.uniqueId]}
                                                    style={{ opacity: removingItems[item.uniqueId] ? 0.5 : 1 }}
                                                >
                                                    {removingItems[item.uniqueId] ? (
                                                        <span>...</span>
                                                    ) : (
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Variações (SKU) */}
                            {item.skuSpecifications && item.skuSpecifications.length > 0 && (
                                <div className="vtex-flex-layout-0-x-flexColChild vtex-flex-layout-0-x-flexColChild--minicart-product-infos pb0">
                                    <div className="c-muted-1 f6 lh-copy vtex-product-list-0-x-productVariationsContainer">
                                        {item.skuSpecifications.map((spec, specIndex) => (
                                            <div
                                                key={specIndex}
                                                className="vtex-product-list-0-x-productVariationsItem"
                                                id={`specification-${item.id}-${spec.fieldName}`}
                                            >
                                                {spec.fieldName}: {spec.fieldValues[0]}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Quantidade e Preço */}
                            <div className="vtex-flex-layout-0-x-flexColChild vtex-flex-layout-0-x-flexColChild--minicart-product-infos pb0">
                                <div className="vtex-flex-layout-0-x-flexRow vtex-flex-layout-0-x-flexRow--quantity-price-container" aria-label="Linha de sessão">
                                    <div className="flex mt0 mb0 pt0 pb0 justify-start vtex-flex-layout-0-x-flexRowContent vtex-flex-layout-0-x-flexRowContent--quantity-price-container items-stretch w-100">

                                        {/* Seletor de Quantidade */}
                                        <div className="pr0 items-stretch flex">
                                            <div className="vtex-product-list-0-x-quantitySelectorContainer vtex-product-list-0-x-quantity vtex-product-list-0-x-quantityStepper vtex-product-list-0-x-quantitySelector">
                                                <div className="flex vtex-product-list-0-x-quantitySelectorWrapper">
                                                    <button
                                                        className="vtex-product-list-0-x-quantitySelectorButton vtex-product-list-0-x-quantitySelectorDecrease pa4 ba br2 br--left flex items-center justify-center c-muted-1 b--muted-4 hover-b--muted-3 bg-muted-5 hover-bg-muted-4 pointer"
                                                        aria-label="Diminuir quantidade"
                                                        onClick={() => handleUpdateQuantity(item, quantity - 1)}
                                                        disabled={updatingQuantity[item.uniqueId] || quantity <= 1}
                                                        style={{ opacity: updatingQuantity[item.uniqueId] || quantity <= 1 ? 0.5 : 1 }}
                                                    >
                                                        <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M1.333 9.334h13.334V7.11H1.333v2.223z" fill="currentColor"></path>
                                                        </svg>
                                                    </button>
                                                    <div className="vtex-product-list-0-x-inputContainer flex-auto flex-shrink-0 flex items-center pv1 bt bb ph5 b--muted-4 hover-b--muted-3">
                                                        <input
                                                            className="flex-auto h-100 bn bg-transparent tc"
                                                            id={`product-list-quantity-stepper-${item.id}`}
                                                            value={quantity}
                                                            readOnly
                                                        />
                                                    </div>
                                                    <button
                                                        className="vtex-product-list-0-x-quantitySelectorButton vtex-product-list-0-x-quantitySelectorIncrease pa4 ba br2 br--right flex items-center justify-center c-action-primary b--muted-4 hover-b--muted-3 bg-base hover-bg-muted-5 pointer"
                                                        aria-label="Aumentar quantidade"
                                                        onClick={() => handleUpdateQuantity(item, quantity + 1)}
                                                        disabled={updatingQuantity[item.uniqueId]}
                                                        style={{ opacity: updatingQuantity[item.uniqueId] ? 0.5 : 1 }}
                                                    >
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M14.6666 6.88905H9.11103V1.3335H6.88881V6.88905H1.33325V9.11127H6.88881V14.6668H9.11103V9.11127H14.6666V6.88905Z" fill="currentColor"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Preço */}
                                        <div className="pr0 items-stretch flex">
                                            <div className="vtex-product-list-0-x-price vtex-product-list-0-x-productPriceContainer tl">
                                                {item.listPrice > item.sellingPrice && (
                                                    <div className="vtex-product-list-0-x-productPriceCurrency c-muted-1 strike t-mini mb2">
                                                        R$ {formatPrice(item.listPrice)}
                                                    </div>
                                                )}
                                                <div className="vtex-product-list-0-x-productPrice div fw6 fw5-m">
                                                    <div className="vtex-product-list-0-x-price">
                                                        R$&nbsp;{formatPrice(item.sellingPrice)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div >
        );
    };

    return (
        <div className={`vtex-minicart-2-x-minicartProductListContainer w-100 h-100 overflow-y-auto ph4 ph6-l ${handles.cartListContainer}`}>
            {processedItems.map((processedItem, index) => {
                if (processedItem.type === 'normal') {
                    // Renderizar produto normal com quantidade ajustada
                    return renderItem(processedItem.product, index, processedItem.quantity);
                } else if (processedItem.type === 'customized') {
                    // Renderizar produto customizado (produto principal + personalização)
                    return renderCustomizedItem(processedItem, index);
                }
                return null;
            })}
        </div>
    );
}


