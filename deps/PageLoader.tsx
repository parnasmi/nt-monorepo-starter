// Source: apps/dashboard/src/shared/ui/PageLoader/PageLoader.tsx
// Target: packages/ui-kit/src/shared/ui/PageLoader.tsx (or apps/naiton/src/shared/ui/PageLoader/PageLoader.tsx)
// Note: References a Spinner component from the UI kit. Create a simple spinner if not available yet.

import { Spinner } from '../shadcn/ui/spinner';

export const PageLoader = () => {
  return (
    <div
      data-testid="loader"
      className="bg-(--bg-loader-overlay) absolute inset-0 z-50 flex items-center justify-center rounded-lg backdrop-blur-sm"
    >
      <div data-testid="custom-spinner">
        <Spinner size="large" show={true} />
      </div>
    </div>
  );
};
