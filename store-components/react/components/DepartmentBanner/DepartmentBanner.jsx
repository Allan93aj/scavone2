import { useEffect } from 'react';
import PropTypes from 'prop-types';

import styles from './DepartmentBanner.css';

const DepartmentBanner = ({ showBanner, desktopBannerImage, categoryName }) => {
  useEffect(() => {
    const existingBanner = document.querySelector(
      `.${styles['banner-wrapper']}`,
    );

    if (existingBanner) {
      existingBanner.remove();
    }

    if (!showBanner || !desktopBannerImage) return;

    const targetDiv = document.querySelector(
      '.vtex-store-components-3-x-container.ph3.ph5-m.ph2-xl.mw9.center.vtex-search-result-3-x-searchResultContainer.pt3-m.pt5-l',
    );

    // eslint-disable-next-line vtex/prefer-early-return
    if (targetDiv) {
      const bannerWrapper = document.createElement('div');

      bannerWrapper.classList.add(styles['banner-wrapper']);

      const bannerImage = document.createElement('img');

      bannerImage.classList.add(styles['banner-image']);
      bannerImage.src = desktopBannerImage;
      bannerImage.alt = 'Banner da categoria';
      bannerWrapper.appendChild(bannerImage);

      // Agora como H1 + classe própria
      if (categoryName && categoryName.trim()) {
        const categoryText = document.createElement('h1');

        categoryText.classList.add(styles['category-text']); // classe antiga
        categoryText.classList.add(styles['banner-title']); // nova classe
        categoryText.textContent = categoryName;
        bannerWrapper.appendChild(categoryText);
      }

      targetDiv.parentNode.insertBefore(bannerWrapper, targetDiv);
    }
  }, [showBanner, desktopBannerImage, categoryName]);

  return null;
};

DepartmentBanner.propTypes = {
  showBanner: PropTypes.bool,
  desktopBannerImage: PropTypes.string,
  categoryName: PropTypes.string,
};

DepartmentBanner.defaultProps = {
  showBanner: false,
  desktopBannerImage: '',
  categoryName: '',
};

const schema = {
  title: 'Banner de Categoria Desktop',
  type: 'object',
  properties: {
    showBanner: {
      type: 'boolean',
      title: 'Mostrar Banner',
      default: false,
    },
    desktopBannerImage: {
      type: 'string',
      title: 'Imagem do Banner para Desktop',
      widget: {
        'ui:widget': 'image-uploader',
      },
      default: '',
    },
    categoryName: {
      type: 'string',
      title: 'Nome da Categoria',
      description: 'Digite o nome da categoria que aparecerá no banner',
      default: '',
    },
  },
};

DepartmentBanner.schema = schema;

export default DepartmentBanner;
