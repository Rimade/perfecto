import type { StateSchema } from 'app/providers/StoreProvider';
import type { DeepPartial } from '@reduxjs/toolkit';

import { getLoginUsername } from './getLoginUsername';

describe('getLoginUsername', () => {
  test('должен возвращать имя пользователя', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        username: 'username',
      },
    };
    expect(getLoginUsername(state as StateSchema)).toEqual('username');
  });

  test('должен работать с пустым стейтом', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoginUsername(state as StateSchema)).toEqual('');
  });
});
