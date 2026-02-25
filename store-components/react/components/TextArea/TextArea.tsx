import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { applyModifiers, useCssHandles } from 'vtex.css-handles';
import classNames from 'classnames';

import TextAreaHandles from './TextArea.handles';
import type { TextAreaProps } from './TextArea.types';

function Input({ name, label, ...rest }: TextAreaProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { fieldName, defaultValue = '', registerField, error } = useField(
    name ?? '',
  );

  const { handles } = useCssHandles(TextAreaHandles);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.value;
      },
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: (ref) => {
        ref.current.value = '';
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
      <textarea
        className={classNames(
          applyModifiers(handles.textarea, error ? 'has-error' : ''),
          't-body',
        )}
        name={name}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
      {error && (
        <span className={handles.error} style={{ color: 'red' }}>
          {error}
        </span>
      )}
    </div>
  );
}

export default Input;
