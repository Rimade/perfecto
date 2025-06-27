import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import axios from 'axios';

import { loginReducer } from '../../model/slice/loginSlice';
import LoginForm from './LoginForm';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('LoginForm', () => {
  test('рендеринг компонента', () => {
    componentRender(<LoginForm />, {
      asyncReducers: { loginForm: loginReducer },
    });
    expect(screen.getByTestId('LoginForm')).toBeInTheDocument();
  });

  test('ввод имени пользователя', async () => {
    componentRender(<LoginForm />, {
      asyncReducers: { loginForm: loginReducer },
    });
    const usernameInput = screen.getByTestId('LoginForm.username');

    await userEvent.type(usernameInput, 'admin');

    expect(screen.getByDisplayValue('admin')).toBeInTheDocument();
  });

  test('ввод пароля', async () => {
    componentRender(<LoginForm />, {
      asyncReducers: { loginForm: loginReducer },
    });
    const passwordInput = screen.getByTestId('LoginForm.password');

    await userEvent.type(passwordInput, '123');

    expect(screen.getByDisplayValue('123')).toBeInTheDocument();
  });

  test('отображение ошибки', () => {
    componentRender(<LoginForm />, {
      initialState: {
        loginForm: {
          error: 'error',
        },
      },
      asyncReducers: {
        loginForm: loginReducer,
      },
    });

    const errorMessage = screen.getByText('Вы ввели неверный логин или пароль');

    expect(errorMessage).toBeInTheDocument();
  });

  test('отображение индикатора загрузки', () => {
    componentRender(<LoginForm />, {
      initialState: {
        loginForm: {
          isLoading: true,
        },
      },
      asyncReducers: {
        loginForm: loginReducer,
      },
    });

    const loginButton = screen.getByTestId('LoginForm.loginBtn');

    expect(loginButton).toBeDisabled();
  });

  test('нажатие на кнопку входа', async () => {
    mockedAxios.post.mockResolvedValue({ data: { username: 'admin', id: '1' } });
    componentRender(<LoginForm />, {
      asyncReducers: {
        loginForm: loginReducer,
      },
    });
    const loginButton = screen.getByTestId('LoginForm.loginBtn');
    const usernameInput = screen.getByTestId('LoginForm.username');
    const passwordInput = screen.getByTestId('LoginForm.password');

    await userEvent.type(usernameInput, 'admin');
    await userEvent.type(passwordInput, '123');
    await userEvent.click(loginButton);

    expect(mockedAxios.post).toHaveBeenCalled();
    await waitFor(() => {
      expect(loginButton).not.toBeDisabled();
    });
  });
});
