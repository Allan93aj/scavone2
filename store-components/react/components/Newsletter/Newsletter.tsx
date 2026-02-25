import React, { useRef, useCallback, useState } from 'react';
import { useCssHandles } from 'vtex.css-handles';
import { Form } from '@unform/web';
import type { FormHandles, SubmitHandler } from '@unform/core';
import axios from 'axios';

import type { FormData } from '../FormValidations/yup';
import type { NewsletterProps } from './Newsletter.types';
import Spinner from '../Spinner';
import NewsletterSchema from './Newsletter.schema';
import NewsletterHandles from './Newsletter.handles';
import type { IDictionary } from '../FormValidations/validations';
import formatErrorList from '../FormValidations';
import Input from '../Input';
import ValidateForm from '../FormValidations/yup';
import CheckCircle from '../Icons/CheckCircle';

function Newsletter({ title, subtitle }: NewsletterProps) {
  const { handles } = useCssHandles(NewsletterHandles);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errorForm, setErrorForm] = useState('');
  const formRef = useRef<FormHandles>(null);

  const handleSubmit: SubmitHandler = useCallback(
    async (data: FormData, { reset }) => {
      formRef.current?.setErrors({});
      setIsLoading(true);
      await ValidateForm.validate(data, {
        abortEarly: false,
      })
        .then(async () => {
          await axios
            .post(
              'https://app.econverse.com.br/cliente/scavone/send-conversion.php',
              {
                conversion_identifier: 'newsletter_footer',
                email: data.email,
              },
            )
            .catch(() => {});

          await axios
            .post('/api/dataentities/NL/documents', data)
            .then(() => {
              setMessage('Cadastro realizado com sucesso!');
              setTimeout(() => {
                setMessage('');
              }, 3000);
              reset();
            })
            .catch(() => {
              setErrorForm('Erro ao cadastrar');
            });

          setIsLoading(false);
        })
        .catch((err) => {
          const validationErrors = {} as IDictionary;
          const validateForm = formatErrorList(err);

          if (validateForm) {
            validateForm.forEach((error) => {
              if (error.item) {
                validationErrors[error.item] = error.message;
              }
            });
          }

          setIsLoading(false);
          formRef.current?.setErrors(validationErrors);
        });
    },
    [],
  );

  return (
    <div className={handles.newsletterContainer}>
      <h2 className={handles.newsletterTitle}>{title}</h2>
      {subtitle && <p className={handles.newsletterSubtitle}>{subtitle}</p>}
      <Form
        ref={formRef}
        className={handles.newsletterForm}
        onSubmit={handleSubmit}
      >
        <Input placeholder="Digite seu email" name="email" type="email" />
        <button
          disabled={isLoading}
          className={handles.newsletterSubmitButton}
          title="Enviar"
          type="submit"
        >
          {!isLoading ? 'Enviar' : <Spinner />}
        </button>
        {message && (
          <span className={handles.newsletterMessage}>
            <CheckCircle />
            {message}
          </span>
        )}
        {errorForm && (
          <span className={handles.newsletterError}>{errorForm}</span>
        )}
      </Form>
    </div>
  );
}

Newsletter.getSchema = () => NewsletterSchema;

export default Newsletter;
