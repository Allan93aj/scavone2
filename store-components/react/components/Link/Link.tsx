import React, { useCallback } from 'react';
import { useRuntime } from 'vtex.render-runtime';
import { useCssHandles } from 'vtex.css-handles';
import classNames from 'classnames';

import type { LinkProps } from './Link.types';

function Link({ children, href, className, ...props }: LinkProps) {
  const { navigate } = useRuntime();
  const { handles } = useCssHandles(['link']);

  const handleNavigation = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      navigate({ to: href });
    },
    [navigate, href],
  );

  return (
    <a
      href={href}
      className={classNames(handles.link, className, 'no-underline')}
      {...props}
      onClick={handleNavigation}
    >
      {children}
    </a>
  );
}

export default Link;
