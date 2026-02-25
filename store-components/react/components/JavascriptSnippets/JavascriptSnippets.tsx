import { useEffect } from 'react';

import { updateSearchBar } from './functions.js';

function JavascriptSnippets() {
  useEffect(() => {
    const snippets = [updateSearchBar()];

    return () => {
      snippets.forEach((snippet) => snippet?.());
    };
  }, []);

  return null;
}

export default JavascriptSnippets;
