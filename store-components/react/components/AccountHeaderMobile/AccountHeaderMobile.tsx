import React from 'react';
import { OrderForm } from 'vtex.order-manager';
import { useCssHandles } from 'vtex.css-handles';

import Link from '../Link';
import AccountHeaderMobileHandle from './AccountHeaderMobile.handles';

function AccountHeaderMobile() {
  const { orderForm } = OrderForm.useOrderForm();
  const { handles } = useCssHandles(AccountHeaderMobileHandle);

  return (
    <>
      {orderForm.loggedIn ? (
        <div className={handles.logged}>
          <span className={handles.loggedTitle}>Olá, </span>
          <strong className={handles.loggedName}>
            {orderForm.clientProfileData.firstName ||
              orderForm.clientProfileData.email}
            !
          </strong>
        </div>
      ) : (
        <div className={handles.notLogged}>
          <span className={handles.notLoggedName}>
            Olá,{' '}
            <strong className={handles.notLoggedNameBold}>Visitante!</strong>
          </span>
          <span className={handles.notLoggedName}>
            <Link href="/login" className={handles.notLoggedNameOtherColor}>
              Entre
            </Link>{' '}
            ou{' '}
            <Link href="/login" className={handles.notLoggedNameOtherColor}>
              Cadastre-se
            </Link>
          </span>
        </div>
      )}
    </>
  );
}

export default AccountHeaderMobile;
