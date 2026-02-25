import { useEffect } from 'react';
import PropTypes from 'prop-types';

import styles from './DepartmentBannerMobile.css';

const DepartmentBannerMobile = ({ showBannerMob, mobileBannerImage }) => {
  useEffect(() => {
    const existingBannerMobile = document.querySelector(
      `.${styles['banner-wrapper-mobile']}`,
    );

    if (existingBannerMobile) {
      existingBannerMobile.remove();
    }

    if (!showBannerMob || !mobileBannerImage) return;

    const targetDivMob = document.querySelector(
      '.vtex-store-components-3-x-container.ph3.ph5-m.ph2-xl.mw9.center.vtex-search-result-3-x-searchResultContainer.pt3-m.pt5-l',
    );

    // eslint-disable-next-line vtex/prefer-early-return
    if (targetDivMob) {
      const bannerWrapperMob = document.createElement('div');

      bannerWrapperMob.classList.add(styles['banner-wrapper-mobile']);

      const bannerImageMob = document.createElement('img');

      bannerImageMob.classList.add(styles['banner-image-mobile']);
      bannerImageMob.src = mobileBannerImage;
      bannerImageMob.alt = 'Banner da categoria mobile';

      bannerWrapperMob.appendChild(bannerImageMob);
      targetDivMob.parentNode.insertBefore(bannerWrapperMob, targetDivMob);
    }
  }, [showBannerMob, mobileBannerImage]);

  return null;
};

DepartmentBannerMobile.propTypes = {
  showBannerMob: PropTypes.bool,
  mobileBannerImage: PropTypes.string,
};

DepartmentBannerMobile.defaultProps = {
  showBannerMob: false,
  mobileBannerImage: '',
};

const schema = {
  title: 'Banner de Categoria Mobile',
  type: 'object',
  properties: {
    showBannerMob: {
      type: 'boolean',
      title: 'Mostrar Banner',
      default: false,
    },
    mobileBannerImage: {
      type: 'string',
      title: 'Imagem do Banner para Mobile',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
  },
};

DepartmentBannerMobile.schema = schema;

export default DepartmentBannerMobile;
