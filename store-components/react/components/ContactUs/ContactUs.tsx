import type { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import Axios from 'axios';
import classNames from 'classnames';
import React, { useCallback, useRef, useState } from 'react';
import { applyModifiers, useCssHandles } from 'vtex.css-handles';

import formatErrorList from '../FormValidations';
import type { IDictionary } from '../FormValidations/validations';
import type { FormData } from '../FormValidations/yup';
import ValidateForm from '../FormValidations/yup';
import CheckCircle from '../Icons/CheckCircle';
import Input from '../Input';
import Spinner from '../Spinner';
import Textarea from '../TextArea';
import ContactUsHandles from './ContactUs.handles';

function ContactUs() {
  const formRef = useRef<FormHandles>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState('');
  const [errorForm, setErrorForm] = useState('');

  const { handles } = useCssHandles(ContactUsHandles);

  const handleSubmit: SubmitHandler = useCallback(
    async (data: FormData, { reset }) => {
      formRef.current?.setErrors({});
      setIsLoading(true);
      await ValidateForm.validate(data, {
        abortEarly: false,
      })
        .then(async () => {
          await Axios.post('/api/dataentities/FL/documents', data)
            .then(() => {
              setMessage('Enviado com sucesso!');
              reset();
            })
            .catch(() => {
              setErrorForm('Erro ao enviar');
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
    <div className={handles.contactusContainer}>
      <Form
        className={handles.contactusForm}
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <Input
          label="Nome*"
          placeholder="Digite seu nome"
          name="name"
          type="text"
          disabled={isLoading}
        />
        <Input
          label="E-mail*"
          placeholder="Digite seu e-mail"
          name="email"
          type="email"
          disabled={isLoading}
        />
        <Input
          label="Celular*"
          placeholder="Digite seu celular"
          name="phone"
          type="text"
          mask="(99) 99999-9999"
          disabled={isLoading}
        />
        <Input
          label="Assunto*"
          placeholder="Assunto..."
          name="subject"
          type="text"
          disabled={isLoading}
        />
        <Textarea
          disabled={isLoading}
          label="No que você está pensando?*"
          name="message"
          placeholder=""
        />
        <button
          title="Enviar"
          disabled={isLoading}
          className={classNames(
            applyModifiers(
              handles.contactusSubmitButton,
              isLoading ? 'is-loading' : '',
            ),
          )}
          type="submit"
        >
          {!isLoading ? 'Enviar' : <Spinner />}
        </button>
        {message && (
          <span className={handles.contactusMessage}>
            <CheckCircle />
            {message}
          </span>
        )}
        {errorForm && (
          <span className={handles.contactusError}>{errorForm}</span>
        )}
      </Form>
    </div>
  );
}

export default ContactUs;
