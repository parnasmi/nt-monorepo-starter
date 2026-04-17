// Source: apps/dashboard/src/app/providers/router/components/ScrollContainer/ScrollContainer.tsx
// Target: apps/naiton/src/app/providers/router/components/ScrollContainer/ScrollContainer.tsx

import { FC, ReactNode } from 'react';

type ScrollContainerProps = {
  children: ReactNode;
  mode?: 'inner' | 'page';
};

export const ScrollContainer: FC<ScrollContainerProps> = ({
  children,
  mode = 'inner',
}) => {
  if (mode === 'inner') {
    return <div className="h-[calc(100vh-96px)] overflow-auto">{children}</div>;
  }

  return <>{children}</>;
};
