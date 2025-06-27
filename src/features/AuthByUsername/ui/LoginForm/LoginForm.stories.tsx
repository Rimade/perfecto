import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import LoginForm from './LoginForm';

export default {
  title: 'features/LoginForm',
  component: LoginForm,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args) => <LoginForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [
  StoreDecorator({
    loginForm: { username: 'admin', password: '123' },
  }),
  ThemeDecorator(Theme.LIGHT),
];

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {};
PrimaryDark.decorators = [
  StoreDecorator({ loginForm: { username: 'admin', password: '123' } }),
  ThemeDecorator(Theme.DARK),
];

export const WithError = Template.bind({});
WithError.args = {};
WithError.decorators = [
  StoreDecorator({
    loginForm: { username: 'admin', password: '12345', error: 'Ошибка авторизации' },
  }),
  ThemeDecorator(Theme.LIGHT),
];

export const WithErrorDark = Template.bind({});
WithErrorDark.args = {};
WithErrorDark.decorators = [
  StoreDecorator({
    loginForm: { username: 'admin', password: '12345', error: 'Ошибка авторизации' },
  }),
  ThemeDecorator(Theme.DARK),
];

export const Loading = Template.bind({});
Loading.args = {};
Loading.decorators = [
  StoreDecorator({ loginForm: { username: 'admin', password: '123', isLoading: true } }),
  ThemeDecorator(Theme.LIGHT),
];

export const LoadingDark = Template.bind({});
LoadingDark.args = {};
LoadingDark.decorators = [
  StoreDecorator({ loginForm: { username: 'admin', password: '123', isLoading: true } }),
  ThemeDecorator(Theme.DARK),
];
