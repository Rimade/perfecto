import type { DeepPartial } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import type { StateSchema } from 'app/providers/StoreProvider';
import { StoreProvider } from 'app/providers/StoreProvider';
import { Suspense, type ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import i18nForTests from 'shared/config/i18n/i18nForTests';

export interface componentRenderOptions {
  route?: string;
  initialState?: DeepPartial<StateSchema>;
}

export function componentRender(component: ReactNode, options: componentRenderOptions = {}) {
  const { route = '/', initialState } = options;

  return render(
    <StoreProvider initialState={initialState}>
      <Suspense fallback="">
        <MemoryRouter initialEntries={[route]}>
          <I18nextProvider i18n={i18nForTests}>{component}</I18nextProvider>
        </MemoryRouter>
      </Suspense>
    </StoreProvider>,
  );
}
