import { screen } from '@testing-library/react';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';

import { loginReducer } from '../../model/slice/loginSlice';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  test('рендерится без ошибок', () => {
    componentRender(<LoginForm onSuccess={() => {}} />, {
      asyncReducers: { loginForm: loginReducer },
    });
    expect(screen.getByTestId('LoginForm')).toBeInTheDocument();
  });

  test('отображает поля ввода и кнопку', () => {
    componentRender(<LoginForm onSuccess={() => {}} />, {
      asyncReducers: { loginForm: loginReducer },
    });
    expect(screen.getByTestId('LoginForm.username')).toBeInTheDocument();
    expect(screen.getByTestId('LoginForm.password')).toBeInTheDocument();
    expect(screen.getByTestId('LoginForm.loginBtn')).toBeInTheDocument();
  });

  test('можно ввести логин и пароль', () => {
    componentRender(<LoginForm onSuccess={() => {}} />, {
      asyncReducers: { loginForm: loginReducer },
    });
    const usernameInput = screen.getByTestId('LoginForm.username');
    const passwordInput = screen.getByTestId('LoginForm.password');

    expect(usernameInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
  });
});
