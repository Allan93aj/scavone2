$(function () {
  $(document).on('keypress', 'input#ship-number', function (e) {
    if (e.which !== 8 && e.which !== 0 && (e.which < 48 || e.which > 57)) {
      return false;
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('x-cta__fixed');

  function scrollToSection(sectionSelector) {
    const targetSection = document.querySelector(sectionSelector);

    if (targetSection) {
      button.addEventListener('click', () => {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }

  function updateButtonText() {
    const currentHash = window.location.hash;

    switch (currentHash) {
      case '#/profile':
        button.textContent = 'Preencha os dados pessoais';
        button.title = 'Preencha os dados pessoais';
        scrollToSection('#client-profile-data');
        break;

      case '#/shipping':
        validateAndFixShipComplement();
        button.textContent = 'Preencha o local de entrega';
        button.title = 'Preencha o local de entrega';
        scrollToSection('#shipping-data');
        break;

      case '#/payment':
        button.textContent = 'Ir para o pagamento';
        button.title = 'Ir para o pagamento';
        scrollToSection('#payment-data');
        break;

      default:
        button.textContent = 'Finalizar compra';
        button.title = 'Finalizar compra';
        scrollToSection('body');
    }
  }

  updateButtonText();
  window.onhashchange = updateButtonText;
  const primeiroPagamento = document.querySelector('.e-footer-pagamento');
  const segundoPagamento = document.querySelector('.e-footer-pagamento.two');

  if (primeiroPagamento) {
    primeiroPagamento.style.display = 'none';
  }

  if (segundoPagamento) {
    segundoPagamento.style.display = 'flex';
  }
});

function validateAndFixShipComplement() {
  const interval = setInterval(() => {
    const input = document.getElementById('ship-complement');

    if (input) {
      const maxLengthAttr = input.getAttribute('maxlength');

      if (maxLengthAttr && parseInt(maxLengthAttr, 10) > 30) {
        input.setAttribute('maxlength', '30');
      }

      clearInterval(interval);
    }
  }, 1000);
}

function shelfSuggestions() {
  const getProducts = () => {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: '/api/catalog_system/pub/products/search/?fq=C:98558850',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        success: (res) => {
          resolve(res);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  };

  const createShelfContainer = () => {
    $('.e-footer').before(`
      <div class="shelfSuggestions">
          <h3 class="shelfSuggestions__title">Que tal dar uma olhada nesses itens</h3>
          <ul class="shelfSuggestions__list">

          </ul>
      </div>
  `);
  };

  const appendProducts = () => {
    getProducts().then((products) => {
      products.forEach((item) => {
        const productName = item.items[0].nameComplete;
        const defaultPrice = item.items[0].sellers[0].commertialOffer.Price;
        const productImage = item.items[0].images[0].imageUrl;

        const options = () => {
          let html = '';

          item.items.forEach((variation, index) => {
            const variationPrice = variation.sellers[0].commertialOffer.Price; // Preço da variação

            if (index === 0) {
              html += `
                  <option value="${variation.itemId}" data-price="${variationPrice}" selected>${variation.name}</option>
              `;
            } else {
              html += `
                  <option value="${variation.itemId}" data-price="${variationPrice}">${variation.name}</option>
              `;
            }
          });

          return html;
        };

        $('ul.shelfSuggestions__list').append(`
          <li class="shelfSuggestions__item">
            <div class="item__container">
              <div class="item__image">
                <img src="${productImage}" alt="${productName}">
              </div>
              <div class="item__info">
                <h4 class="product-name">${productName}</h4>
                <section class="price-and-addToCart">
                  <span class="price">R$ <strong>${defaultPrice
            .toFixed(2)
            .replace('.', ',')}</strong></span>
                  <button class="addToCart">Adicionar</button>
                </section>
                <select class="variations">
                  ${options()}
                </select>
              </div>
            </div>
          </li>
        `);

        $('select.variations').on('change', function () {
          const selectedOption = $(this).find(':selected');
          const selectedPrice = selectedOption.data('price'); // Obtém o preço da variação

          const priceElement = $(this)
            .closest('.item__info')
            .find('.price strong');

          priceElement.text(selectedPrice.toFixed(2).replace('.', ',')); // Apenas atualiza o valor do preço
        });
      });

      $('.shelfSuggestions__list').slick({
        slidesToShow: 3,
        dots: false,
        responsive: [
          {
            breakpoint: 980,
            settings: {
              slidesToShow: 1,
              dots: true,
              arrows: false,
            },
          },
        ],
      });
    });
  };

  const addToCart = () => {
    $(document).on(
      'click',
      '.shelfSuggestions__item button.addToCart',
      function () {
        const _this = $(this);
        const itemContainer = _this.closest('.item__container');
        const selectedVariationId = itemContainer
          .find('select.variations')
          .val();

        const item = {
          id: selectedVariationId,
          quantity: 1,
          seller: '1',
        };

        _this.addClass('is--loading');
        _this.removeClass('is--added');
        _this.text('Adicionar');

        vtexjs.checkout.addToCart([item]).done(function () {
          _this.removeClass('is--loading');
          _this.addClass('is--added');
          _this.text('Adicionado!');
          setTimeout(function () {
            _this.removeClass('is--added');
            _this.text('Adicionar');
          }, 5000);
        });
      },
    );
  };

  vtexjs.checkout.getOrderForm().then(() => {
    if (window.location.hash === '#/cart') {
      if (window.done !== true) {
        window.done = true;

        createShelfContainer();
        appendProducts();
        addToCart();
      }
    }
  });
}

$(window).load(function () {
  $('head').append(
    '<link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>',
  );
  $('head').append(
    '<script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>',
  );
  shelfSuggestions();

  // Bloquear alteração de quantidade para produtos de bordado (SKU 1680850)
  function lockBordadoQuantity() {
    const bordadoSku = '1680850';
    const bordadoItems = document.querySelectorAll(`tr.product-item[data-sku="${bordadoSku}"]`);

    bordadoItems.forEach(item => {
      // Desabilitar input de quantidade
      const quantityInput = item.querySelector(`#item-quantity-${bordadoSku}`);
      if (quantityInput) {
        quantityInput.setAttribute('disabled', 'disabled');
        quantityInput.style.cursor = 'not-allowed';
        // quantityInput.style.opacity = '0.6';
      }

      // Ocultar botões de incrementar/decrementar
      const incrementBtn = item.querySelector(`#item-quantity-change-increment-${bordadoSku}`);
      const decrementBtn = item.querySelector(`#item-quantity-change-decrement-${bordadoSku}`);

      if (incrementBtn) {
        incrementBtn.style.display = 'none';
      }

      if (decrementBtn) {
        decrementBtn.style.display = 'none';
      }
    });
  }

  // Executar ao carregar
  lockBordadoQuantity();

  // Observar mudanças no DOM (para quando produtos são adicionados/atualizados)
  const cartObserver = new MutationObserver(() => {
    lockBordadoQuantity();
  });

  // Observar mudanças no carrinho
  const cartContainer = document.querySelector('#cart-table, .cart-items, tbody');
  if (cartContainer) {
    cartObserver.observe(cartContainer, {
      childList: true,
      subtree: true
    });
  }

  // aviso sobre o bordado
  function addBordadoWarning() {
    const summaryHolder = document.querySelector('.summary-template-holder');

    if (summaryHolder && !document.querySelector('.custom-component')) {
      const warningHTML = `
        <div class="custom-component">
          <div class="preheader-summary__container" data-bind="visible: hasItems() &amp;&amp; !loading()">
            <div class="custom-accordion preheader-summary__container-item">
              <div class="custom-accordion-title">
                <img src="/arquivos/logo-scavone.png" style="width: 45px;" />
                Tem algum produto Personalizado?
              </div>
              <div class="custom-accordion-body">
                <div>
                  <ul class="preheader-summary__items">
                    <li> - O produto, depois de personalizado, não poderá ser trocado ou devolvido. </li>
                    <li> - O prazo de entrega será de 7 dias a mais do prazo de entrega informado no carrinho, devido a personalização. </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      // Inserir no início do summary-template-holder
      summaryHolder.insertAdjacentHTML('afterbegin', warningHTML);
    }
  }

  // Executar a função
  addBordadoWarning();

  // Observar mudanças para casos onde o summary é carregado dinamicamente
  const summaryObserver = new MutationObserver(() => {
    addBordadoWarning();
  });

  const checkoutContainer = document.querySelector('#orderform-wrapper, .checkout-container');
  if (checkoutContainer) {
    summaryObserver.observe(checkoutContainer, {
      childList: true,
      subtree: true
    });
  }
});

