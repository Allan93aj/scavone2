export const updateSearchBar = () => {
  let attempts = 0;
  const maxAttempts = 20;
  const interval = setInterval(() => {
    const searchContainer = document.querySelector(
      '.vtex-store-components-3-x-searchBarInnerContainer',
    );

    if (searchContainer || attempts >= maxAttempts) {
      clearInterval(interval);
      if (!searchContainer) return;

      const searchInput = searchContainer.querySelector('input');
      const searchButton = searchContainer.querySelector('button');

      const addActions = () => {
        if (searchButton && searchInput) {
          searchButton.addEventListener('click', (event) => {
            if (!searchInput.value.trim()) {
              event.preventDefault();
              searchInput.focus();
            }
          });
        }
      };

      addActions();

      let resizeTimeout;

      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(addActions, 200);
      });
    }

    attempts += 1;
  }, 500);
};
