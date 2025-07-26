import type { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';
import type { StateSchema } from 'app/providers/StoreProvider';
import type { AxiosStatic } from 'axios';
import axios from 'axios';

type ActionCreatorType<Return, Arg, RejectedValue> = (
  arg: Arg,
) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>;

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

export class TestAsyncThunk<Return, Arg, RejectedValue> {
  dispatch: jest.MockedFunction<Dispatch>;

  getState: jest.MockedFunction<() => StateSchema>;

  actionCreator: ActionCreatorType<Return, Arg, RejectedValue>;

  api: jest.Mocked<AxiosStatic>;

  navigate: jest.MockedFunction<any>;

  constructor(actionCreator: ActionCreatorType<Return, Arg, RejectedValue>) {
    this.getState = jest.fn();
    this.dispatch = jest.fn();
    this.actionCreator = actionCreator;

    this.api = mockedAxios;
    this.navigate = jest.fn();
  }

  async callThunk(arg: Arg) {
    const action = this.actionCreator(arg);
    const result = await action(this.dispatch, this.getState, {
      api: this.api,
      navigate: this.navigate,
    });

    return result;
  }
}
