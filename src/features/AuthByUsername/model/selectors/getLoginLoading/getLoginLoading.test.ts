import type { StateSchema } from 'app/providers/StoreProvider';
import type { DeepPartial } from '@reduxjs/toolkit';

import { getLoginLoading } from './getLoginLoading';

describe('getLoginLoading', () => {
  test('должен возвращать true', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        isLoading: true,
      },
    };
    expect(getLoginLoading(state as StateSchema)).toEqual(true);
  });

  test('должен работать с пустым стейтом', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoginLoading(state as StateSchema)).toEqual(false);
  });
});
