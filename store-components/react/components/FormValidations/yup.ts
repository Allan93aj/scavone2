import * as Yup from 'yup';

export interface FormData {
  email?: string;
  name?: string;
  phone?: string;
  subject?: string;
  message?: string;
  termos?: string;
}
const ValidateForm = Yup.object().shape(
  {
    email: Yup.string().when('email', {
      is: (exist: boolean) => !!exist,
      then: Yup.string()
        .email('E-mail incorreto.')
        .required('Por favor. Preencha este campo'),
      otherwise: Yup.string(),
    }),

    name: Yup.string().when('name', {
      is: (exist: boolean) => !!exist,
      then: Yup.string()
        .min(2, 'Nome do mínimo 2 caracteres')
        .required('Por favor. Preencha este campo'),
      otherwise: Yup.string(),
    }),
    phone: Yup.string().when('phone', {
      is: (exist: boolean) => !!exist,
      then: Yup.string()
        .min(15, 'Número de celular incorreto')
        .required('Por favor. Preencha este campo'),
      otherwise: Yup.string(),
    }),
    subject: Yup.string().when('subject', {
      is: (exist: boolean) => !!exist,
      then: Yup.string(),
      otherwise: Yup.string(),
    }),
    message: Yup.string().when('message', {
      is: (exist: boolean) => !!exist,
      then: Yup.string().required('Por favor. Preencha este campo'),
    }),
  },
  [
    ['email', 'email'],
    ['name', 'name'],
    ['phone', 'phone'],
    ['subject', 'subject'],
    ['message', 'message'],
  ],
);

export default ValidateForm;
