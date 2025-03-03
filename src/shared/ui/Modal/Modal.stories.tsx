import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Modal } from './Modal';

export default {
  title: 'shared/Modal',
  component: Modal,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isOpen: true,
  children: 'Hi, i am Muhammad-Amin and i am 19 y.o. I\'m from Russia, Ingushetiya. I\'m a Frontend developer. I like to study and improve myself.',
};

export const Dark = Template.bind({});
Dark.args = {
  isOpen: true,
  children: 'Hi, i am Muhammad-Amin and i am 19 y.o. I\'m from Russia, Ingushetiya. I\'m a Frontend developer. I like to study and improve myself.',
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
