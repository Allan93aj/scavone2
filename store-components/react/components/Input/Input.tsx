import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { applyModifiers, useCssHandles } from 'vtex.css-handles';
import InputMask from 'react-input-mask';
import classNames from 'classnames';

import type { InputProps } from './Input.types';
import InputHandles from './Input.handles';

function Input({ name, label, mask, type, ...rest }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, registerField, error } = useField(
    name ?? '',
  );

  const { handles } = useCssHandles(InputHandles);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        if (ref.current.type === 'checkbox') {
          return ref.current.checked;
        }

        return ref.current.value;
      },
      setValue: (ref, value) => {
        ref.current.value = value;
        if (ref.current.type === 'checkbox') {
          ref.current.checked = true;
        }
      },
      clearValue: (ref) => {
        ref.current.value = '';
        ref.current.checked = false;
      },
    });
  }, [fieldName, registerField]);

  return (
    <div className={handles.formControl}>
      {label && (
        <label className={handles.label} htmlFor={label}>
          {label}
        </label>
      )}
      {mask ? (
        <InputMask
          className={classNames(
            applyModifiers(handles.input, error ? 'has-error' : ''),
            't-body',
          )}
          name={name}
          // eslint-disable-next-line
          // @ts-ignore
          ref={inputRef}
          mask={mask}
          type={type}
          maskChar={null}
          defaultValue={defaultValue}
          {...rest}
        />
      ) : (
        <input
          className={classNames(
            applyModifiers(handles.input, error ? 'has-error' : ''),
            't-body',
          )}
          name={name}
          ref={inputRef}
          type={type}
          defaultValue={defaultValue}
          {...rest}
        />
      )}

      {error && (
        <span className={handles.error} style={{ color: 'red' }}>
          {error}
        </span>
      )}
    </div>
  );
}

export default Input;
