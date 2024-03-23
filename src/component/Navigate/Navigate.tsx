import Link from 'next/link';
import type { ReactNode } from 'react';
import type { UrlObject } from 'url';
import type { PagesPath } from '../../lib/pathpida/$path';
import { pagesPath } from '../../lib/pathpida/$path';

type Props = {
  href: UrlObject | ((path: PagesPath) => UrlObject);
  children: ReactNode;
};

export const Navigate = ({ href, children }: Props) => {
  return (
    <Link href={typeof href === 'function' ? href(pagesPath) : href} passHref>
      {children}
    </Link>
  );
};
