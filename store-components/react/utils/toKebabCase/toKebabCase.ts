import { cleanAccents } from 'econverse-utils';

const regex = /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g;

function toKebabCase(str: string) {
  const cleanStr = cleanAccents(str.toLowerCase());

  const kebab = cleanStr
    ?.match(regex)
    ?.map((x) => x.toLowerCase())
    .join('-');

  return kebab ?? '';
}

export default toKebabCase;
