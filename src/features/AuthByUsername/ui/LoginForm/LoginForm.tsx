import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername';
import type { FormEvent, KeyboardEvent } from 'react';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { Text, TextAlign, TextSize, TextTheme } from 'shared/ui/Text/Text';

import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { loginActions } from '../../model/slice/loginSlice';
import styles from './LoginForm.module.scss';

// eslint-disable-next-line import/order
import i18n from 'shared/config/i18n/i18n';

interface LoginFormProps {
  className?: string;
}

export const LoginForm = memo(({ className }: LoginFormProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { username, password, isLoading, error } = useSelector(getLoginState);

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
  );
});
