import type { DeepPartial } from '@reduxjs/toolkit';

import { loginReducer, loginActions } from './loginSlice';
import type { LoginSchema } from '../types/loginSchema';
import { loginByUsername } from '../services/loginByUsername/loginByUsername';

describe('loginSlice', () => {
  test('установка имени пользователя', () => {
    const state: DeepPartial<LoginSchema> = { username: '' };
    expect(loginReducer(state as LoginSchema, loginActions.setUsername('admin'))).toEqual({
      username: 'admin',
    });
  });

  test('установка пароля', () => {
    const state: DeepPartial<LoginSchema> = { password: '' };
    expect(loginReducer(state as LoginSchema, loginActions.setPassword('123'))).toEqual({
      password: '123',
    });
  });

  test('установка статуса загрузки', () => {
    const state: DeepPartial<LoginSchema> = { isLoading: false };
    expect(
      loginReducer(
        state as LoginSchema,
        loginByUsername.pending('', { username: '', password: '' }),
      ),
    ).toEqual({
      isLoading: true,
    });
  });

  test('установка ошибки', () => {
    const state: DeepPartial<LoginSchema> = { error: undefined };
    expect(
      loginReducer(
        state as LoginSchema,
        loginByUsername.rejected(new Error(), '', { username: '', password: '' }, 'error'),
      ),
    ).toEqual({
      error: 'error',
      isLoading: false,
    });
  });

  test('обработка pending состояния', () => {
    const state: DeepPartial<LoginSchema> = {
      error: undefined,
      isLoading: false,
    };
    expect(
      loginReducer(
        state as LoginSchema,
        loginByUsername.pending('', { username: '', password: '' }),
      ),
    ).toEqual({
      error: undefined,
      isLoading: true,
    });
  });

  test('обработка fulfilled состояния', () => {
    const state: DeepPartial<LoginSchema> = { isLoading: true };
    expect(
      loginReducer(
        state as LoginSchema,
        loginByUsername.fulfilled({ id: '1', username: 'admin' }, '', {
          username: '',
          password: '',
        }),
      ),
    ).toEqual({ isLoading: false });
  });

  test('обработка rejected состояния', () => {
    const state: DeepPartial<LoginSchema> = {
      isLoading: true,
      error: undefined,
    };
    expect(
      loginReducer(
        state as LoginSchema,
        loginByUsername.rejected(new Error(), '', { username: '', password: '' }, 'error'),
      ),
    ).toEqual({
      isLoading: false,
      error: 'error',
    });
  });
});
