import type * as Yup from 'yup';

type ErrorList = Array<{ item?: string; message: string }>;

export interface IDictionary {
  [index: string]: string;
}
const formatErrorList = (err: Yup.ValidationError) => {
  const errorList = [] as ErrorList;

  err.inner.forEach((item) => {
    const error = {
      item: item.path,
      message: item.errors[0],
    };

    errorList.push(error);
  });

  return errorList;
};

export default formatErrorList;
