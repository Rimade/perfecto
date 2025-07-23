import type { FC } from 'react';
import { lazy } from 'react';

import type { LoginFormProps } from './LoginForm';

export const LoginFormAsync = lazy<FC<LoginFormProps>>(
  () =>
    new Promise((resolve) => {
      // @ts-ignore
      setTimeout(() => resolve(import('./LoginForm')), 1000);
    }),
);
