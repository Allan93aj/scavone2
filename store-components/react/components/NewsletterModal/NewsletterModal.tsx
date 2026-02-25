import React, { useCallback, useRef, useState } from 'react';
import { applyModifiers, useCssHandles } from 'vtex.css-handles';
import classNames from 'classnames';
import { Form } from '@unform/web';
import type { FormHandles, SubmitHandler } from '@unform/core';
import Axios from 'axios';

import NewsletterHandles from './NewsletterModal.handles';
import type { NewsletterModalProps } from './NewsletterModal.types';
import NewsletterModalSchema from './NewsletterModal.schema';
import type { FormData } from '../FormValidations/yup';
import Input from '../Input';
import Spinner from '../Spinner';
import ImageList from '../ImageList';
import Image from '../Image';
import CloseIcon from '../Icons/CloseIcon';
import ValidateForm from '../FormValidations/yup';
import type { IDictionary } from '../FormValidations/validations';
import formatErrorList from '../FormValidations/validations';
import useOneTimeModal from '../../hooks/useOneTimeModal';

function NewsletterModal({
  enabled,
  title,
  subtitle,
  texto,
  socialMedia,
  termos,
  classes,
  banner,
}: NewsletterModalProps) {
  const formRef = useRef<FormHandles>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const { showModal, closeModal } = useOneTimeModal('showNewsletterModal');
  const [message, setMessage] = useState('');
  const [errorForm, setErrorForm] = useState('');

  const { handles } = useCssHandles(NewsletterHandles);

  const handleSubmit: SubmitHandler = useCallback(
    async (data: FormData, { reset }) => {
      formRef.current?.setErrors({});
      setIsLoading(true);

      await ValidateForm.validate(data, {
        abortEarly: false,
      })
        .then(async () => {
          await Axios.post('/api/dataentities/NM/documents', data)
            .then(() => {
              setMessage('Enviado com sucesso!');
              reset();
              setTimeout(() => {
                closeModal();
              }, 1200);
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
    [closeModal],
  );

  if (!enabled) return null;

  return showModal ? (
    <div className={classNames(handles.newsletterModal, 'relative')}>
      <div className={classNames(handles.newsletterModalContainer)}>
        <Image classes={classes} {...banner} />
        <div className={handles.formContainer}>
          <CloseIcon onClick={closeModal} className={handles.closeIcon} />
          <div className={handles.headline}>
            <p
              className={handles.texto}
              dangerouslySetInnerHTML={{ __html: texto ?? '' }}
            />
            <h2
              dangerouslySetInnerHTML={{ __html: title ?? '' }}
              className={handles.title}
            />
            <p
              className={handles.subtitle}
              dangerouslySetInnerHTML={{ __html: subtitle ?? '' }}
            />
          </div>
          <Form className={handles.form} ref={formRef} onSubmit={handleSubmit}>
            <Input
              placeholder="Digite seu e-mail"
              name="email"
              type="Email"
              disabled={isLoading}
              required
            />
            <button
              disabled={isLoading}
              className={classNames(
                applyModifiers(
                  handles.submitButton,
                  isLoading ? 'is-loading' : '',
                ),
              )}
              type="submit"
            >
              {!isLoading ? (
                message || errorForm ? (
                  message || errorForm
                ) : (
                  'inscreva-se'
                )
              ) : (
                <Spinner />
              )}
            </button>

            <div className={handles.termos}>
              <Input
                className={classNames(
                  applyModifiers(handles.checkbox, isAccept ? 'checked' : ''),
                )}
                name="termos"
                type="checkbox"
                onChange={() => setIsAccept(!isAccept)}
                disabled={isLoading}
                required
              />
              <p className={handles.termosText}>{termos}</p>
            </div>
            <ImageList images={socialMedia} />
          </Form>
        </div>
      </div>
    </div>
  ) : null;
}

NewsletterModal.getSchema = () => NewsletterModalSchema;

export default NewsletterModal;
