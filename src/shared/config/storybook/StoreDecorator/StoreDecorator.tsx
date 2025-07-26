import type { Story } from '@storybook/react';
import { StoreProvider } from 'app/providers/StoreProvider';
import type { StateSchema } from 'app/providers/StoreProvider';
import { profileReducer } from 'entities/Profile';
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';
import type { ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

const defaultAsyncReducers: ReducerList = {
  loginForm: loginReducer,
  profile: profileReducer,
};

export const StoreDecorator =
  (initialState: DeepPartial<StateSchema>, asyncReducers?: ReducerList) =>
  (StoryComponent: Story) => {
    const reducers = { ...defaultAsyncReducers, ...asyncReducers };

    return (
      <StoreProvider initialState={initialState} asyncReducers={reducers}>
        <StoryComponent />
      </StoreProvider>
    );
  };
