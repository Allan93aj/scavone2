function SanitizeMarkup(element) {
  return {
    __html: element,
  };
}

export default SanitizeMarkup;
