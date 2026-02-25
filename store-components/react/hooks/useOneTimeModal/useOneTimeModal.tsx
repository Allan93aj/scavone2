import { useEffect, useState, useCallback } from 'react';

function useOneTimeModal(key: string) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(key) === 'false') return;

    setShowModal(true);
  }, [key]);

  const closeModal = useCallback(() => {
    localStorage.setItem(key, 'false');

    setShowModal(false);
  }, [key]);

  return { showModal, closeModal };
}

export default useOneTimeModal;
