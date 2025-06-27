import { userActions } from 'entities/User';
import axios from 'axios';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { loginByUsername } from './loginByUsername';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('loginByUsername', () => {
  const thunk = new TestAsyncThunk(loginByUsername);

  test('успешный вход в систему', async () => {
    const userValue = { username: 'admin', id: '1' };
    mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));

    const result = await thunk.callThunk({ username: 'admin', password: '123' });

    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(userValue);
    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
    expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    expect(mockedAxios.post).toHaveBeenCalled();
  });

  test('ошибка входа в систему', async () => {
    mockedAxios.post.mockReturnValue(Promise.reject(new Error('error')));

    const result = await thunk.callThunk({ username: 'admin', password: '123' });

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(mockedAxios.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('error');
  });

  test('отсутствие данных пользователя', async () => {
    mockedAxios.post.mockReturnValue(Promise.resolve({ data: null }));

    const result = await thunk.callThunk({ username: 'admin', password: '123' });

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(mockedAxios.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
  });

  // let dispatch: Dispatch;
  // let getState: () => StateSchema;

  // beforeEach(() => {
  //   dispatch = jest.fn();
  //   getState = jest.fn();
  // });

  // test('ошибка входа в систему', async () => {
  //   mockedAxios.post.mockReturnValue(Promise.reject(new Error('error')));

  //   const action = loginByUsername({ username: 'admin', password: '123' });
  //   const result = await action(dispatch, getState, undefined);

  //   expect(dispatch).toHaveBeenCalledTimes(2);
  //   expect(mockedAxios.post).toHaveBeenCalled();
  //   expect(result.meta.requestStatus).toBe('rejected');
  //   expect(result.payload).toBe('error');
  // });

  // test('отсутствие данных пользователя', async () => {
  //   mockedAxios.post.mockReturnValue(Promise.resolve({ data: null }));

  //   const action = loginByUsername({ username: 'admin', password: '123' });
  //   const result = await action(dispatch, getState, undefined);

  //   expect(mockedAxios.post).toHaveBeenCalled();
  //   expect(result.meta.requestStatus).toBe('rejected');
  //   expect(result.payload).toBe('error');
  // });
});
