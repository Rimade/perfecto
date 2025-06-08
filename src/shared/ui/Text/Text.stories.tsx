import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Text, TextSize, TextTheme } from './Text';

export default {
  title: 'shared/Text',
  component: Text,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Заголовок',
  text: 'Текст',
  size: TextSize.M,
};

export const Error = Template.bind({});
Error.args = {
  title: 'Заголовок',
  text: 'Текст',
  theme: TextTheme.ERROR,
};

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
  title: 'Заголовок',
};

export const OnlyText = Template.bind({});
OnlyText.args = {
  text: 'Текст',
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  title: 'Заголовок',
  text: 'Текст',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const ErrorDark = Template.bind({});
ErrorDark.args = {
  title: 'Заголовок',
  text: 'Текст',
  theme: TextTheme.ERROR,
};
ErrorDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SizeL = Template.bind({});
SizeL.args = {
  title: 'Заголовок',
  text: 'Текст',
  size: TextSize.L,
};

export const SizeM = Template.bind({});
SizeM.args = {
  title: 'Заголовок',
  text: 'Текст',
  size: TextSize.M,
};
