import { createSlice } from '@reduxjs/toolkit';
import type { UserSchema } from '../types/user';

const initialState: UserSchema = {
  authData: undefined,
  isLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export const { actions: userActions, reducer: userReducer } = userSlice;
