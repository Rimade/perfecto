import type { DeepPartial } from '@reduxjs/toolkit';
import type { Story } from '@storybook/react';
import { StoreProvider } from 'app/providers/StoreProvider';
import type { StateSchema } from 'app/providers/StoreProvider';

export const StoreDecorator =
  (initialState: DeepPartial<StateSchema>) => (StoryComponent: Story) => (
    <StoreProvider initialState={initialState}>
      <StoryComponent />
    </StoreProvider>
  );
