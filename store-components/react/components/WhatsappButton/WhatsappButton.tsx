import React from 'react';
import { useCssHandles } from 'vtex.css-handles';
import classNames from 'classnames';

import WhatsappButtonHandles from './WhatsappButton.handles';
import WhatsappIcon from '../Icons/WhatsappIcon';

function WhatsappButton() {
  const { handles } = useCssHandles(WhatsappButtonHandles);

  return (
    <div className={classNames(handles.whatsappButton)}>
      <a
        href="http://wa.me/5511991142203?text=Olá!&amp;utmi_p=_&amp;utmi_pc=Html&amp;utmi_cp=whatsAppFloat"
        target="_blank"
        rel="external noreferrer"
      >
        <WhatsappIcon className={classNames(handles.whatsappButtonIcon)} />
      </a>
    </div>
  );
}

export default WhatsappButton;
