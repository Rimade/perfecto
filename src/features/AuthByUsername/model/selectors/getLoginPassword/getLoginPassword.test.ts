import type { StateSchema } from 'app/providers/StoreProvider';
import type { DeepPartial } from '@reduxjs/toolkit';

import { getLoginPassword } from './getLoginPassword';

describe('getLoginPassword', () => {
  test('должен возвращать пароль', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        password: 'password',
      },
    };
    expect(getLoginPassword(state as StateSchema)).toEqual('password');
  });

  test('должен работать с пустым стейтом', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoginPassword(state as StateSchema)).toEqual('');
  });
});
