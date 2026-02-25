import React from 'react';
import { Helmet } from 'vtex.render-runtime';

function OneTrust() {
  return (
    <Helmet>
      <script
        defer
        src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
        data-document-language="true"
        type="text/javascript"
        charSet="UTF-8"
        data-domain-script="ca46ed8b-4226-4c6a-8f54-746527cc15ee"
      />
      <script type="text/javascript">function OptanonWrapper() {}</script>
    </Helmet>
  );
}

export default OneTrust;
