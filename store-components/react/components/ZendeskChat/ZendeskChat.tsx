import React from 'react';
import { Helmet } from 'vtex.render-runtime';

/**
 * Even removing the component references, it still renders.
 *
 * This method ensures so that the chat is hidden on mobile.
 */
function hideChatOnMobile() {
  const styleTag = document.querySelector('style');

  if (!styleTag) return;

  styleTag.insertAdjacentText(
    'beforeend',
    `
      @media(max-width: 1024px){
        .zopim {
          display: none !important;
        }
      }
    `,
  );
}

function ZendeskChat() {
  React.useEffect(() => {
    const script = document.createElement('script');

    script.type = 'text/javascript';
    script.defer = true;
    script.innerHTML = `
    window.$zopim||function(b,e){var a=$zopim=function(d){a._.push(d)},c=a.s=b.createElement(e);b=b.getElementsByTagName(e)[0];a.set=function(d){a.set._.push(d)};a._=[];a.set._=[];c.async=!0;c.setAttribute("charset","utf-8");c.src="https://v2.zopim.com/?5mfMUfC2rFe5HrsyVfOs12PTGBBjVz5E";a.t=+new Date;c.type="text/javascript";b.parentNode.insertBefore(c,b)}(document,"script");
    `;
    document.head.appendChild(script);

    hideChatOnMobile();
  }, []);

  return (
    <Helmet>
      <script
        defer
        async
        charSet="utf-8"
        src="https://v2.zopim.com/?5mfMUfC2rFe5HrsyVfOs12PTGBBjVz5E"
        type="text/javascript"
      />
    </Helmet>
  );
}

export default ZendeskChat;
