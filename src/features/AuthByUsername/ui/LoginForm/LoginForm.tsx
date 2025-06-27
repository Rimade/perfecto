import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername';
import type { FormEvent, KeyboardEvent } from 'react';
import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { Text, TextAlign, TextSize, TextTheme } from 'shared/ui/Text/Text';
import type { StoreWithManager } from 'app/providers/StoreProvider';
import i18n from 'shared/config/i18n/i18n';
import type { ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { DynamicModuleLoader } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginLoading } from '../../model/selectors/getLoginLoading/getLoginLoading';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import styles from './LoginForm.module.scss';

export interface LoginFormProps {
  className?: string;
}

const initialReducers: ReducerList = {
  loginForm: loginReducer,
};

const LoginForm = memo(({ className }: LoginFormProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const store = useStore() as StoreWithManager;

  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const isLoading = useSelector(getLoginLoading);
  const error = useSelector(getLoginError);

  useEffect(() => {
    store.reducerManager.add('loginForm', loginReducer);
    dispatch({ type: 'login/init' });
    return () => {
      store.reducerManager.remove('loginForm');
      dispatch({ type: 'login/reset' });
    };
    // eslint-disable-next-line
  }, []);

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(loginActions.setUsername(value));
    },
    [dispatch],
  );

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value));
    },
    [dispatch],
  );

  const onLoginClick = useCallback(() => {
    dispatch(loginByUsername({ username, password }));
  }, [dispatch, username, password]);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onLoginClick();
    },
    [onLoginClick],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onLoginClick();
      }
    },
    [onLoginClick],
  );

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <form
        className={classNames(styles.LoginForm, {}, [className])}
        onSubmit={onSubmit}
        data-testid="LoginForm"
      >
        <Text title={t('Авторизация')} align={TextAlign.CENTER} size={TextSize.L} />
        {error && (
          <Text
            theme={TextTheme.ERROR}
            text={i18n.t('Вы ввели неверный логин или пароль')}
            align={TextAlign.CENTER}
            size={TextSize.L}
          />
        )}
        <Input
          value={username}
          onChange={onChangeUsername}
          onKeyDown={onKeyDown}
          autoFocus
          placeholder={t('Введите username')}
          className={styles.input}
          data-testid="LoginForm.username"
        />
        <Input
          value={password}
          onChange={onChangePassword}
          onKeyDown={onKeyDown}
          placeholder={t('Введите пароль')}
          className={styles.input}
          data-testid="LoginForm.password"
        />
        <Button
          theme={ButtonTheme.OUTLINE}
          onClick={onLoginClick}
          disabled={isLoading}
          className={styles.loginBtn}
          data-testid="LoginForm.loginBtn"
        >
          {t('Войти')}
        </Button>
      </form>
    </DynamicModuleLoader>
  );
});

export default LoginForm;
