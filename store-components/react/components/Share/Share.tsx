import React, { useCallback, useState } from 'react';
import { canUseDOM } from 'vtex.render-runtime';
import { Image } from 'vtex.store-image';
import classNames from 'classnames';
import { useCssHandles } from 'vtex.css-handles';

import type { ShareProps, ShareOptionProps } from './Share.types';
import ShareIcon from '../Icons/ShareIcon';
import ShareHandles from './Share.handles';
import { ShareSchema } from './Share.schema';

function Share({ options }: ShareProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { handles } = useCssHandles(ShareHandles);

  const renderOption = useCallback(
    (option: ShareOptionProps, index: number) => {
      const pageUrl = window.location.href;
      const size = 42;
      const gap = 7;

      const translate = (size + gap) * (index + 1) * -1;

      const href = option.href.replace('{pageUrl}', pageUrl);

      return (
        <a
          title={option.title}
          href={href}
          target="_blank"
          rel="noreferrer"
          className={classNames(
            handles.shareButton,
            'absolute br-100 flex items-center justify-center z-1',
          )}
          style={{
            transform: `translate(${isOpen ? translate : 0}px, 50%)`,
            left: '86%',
            top: '-35%',
          }}
        >
          <Image src={option.icon} />
        </a>
      );
    },
    [handles.shareButton, isOpen],
  );

  return (
    <>
      <div className={classNames(handles.shareContainer, 'relative')}>
        <div
          className={classNames(handles.optionsContainer, {
            [`${handles['optionsContainer--active']}`]: isOpen,
          })}
        >
          {canUseDOM && options?.map(renderOption)}
        </div>
        <button
          onClick={() => setIsOpen((state) => !state)}
          className={classNames(
            handles.shareToggle,
            { [`${handles['shareToggle--active']}`]: isOpen },
            'relative flex items-center justify-center br-100 bn pointer z-2',
          )}
        >
          <ShareIcon fill={isOpen ? '#ceccc3' : ''} />
        </button>
      </div>
      {isOpen ? (
        <button
          className={handles.shareOverlay}
          onClick={() => setIsOpen((state) => !state)}
        />
      ) : null}
    </>
  );
}

Share.getSchema = () => ShareSchema;

export default Share;
