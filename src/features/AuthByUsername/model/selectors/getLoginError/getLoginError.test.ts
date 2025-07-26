import type { StateSchema } from 'app/providers/StoreProvider';

import { getLoginError } from './getLoginError';

describe('getLoginError', () => {
  test('должен возвращать ошибку', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        error: 'error',
      },
    };
    expect(getLoginError(state as StateSchema)).toEqual('error');
  });

  test('должен работать с пустым стейтом', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoginError(state as StateSchema)).toEqual(undefined);
  });
});
