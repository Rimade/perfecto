import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

import type { Profile, ProfileSchema } from '../types/profile';

const initialState: ProfileSchema = {
  data: undefined,
  isLoading: false,
  error: undefined,
  readonly: true,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileData: (state, action: PayloadAction<Profile>) => {
      state.data = action.payload;
    },
    initProfileData: (state) => {
      const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
      if (user) {
        state.data = JSON.parse(user);
      }
    },
    updateProfileData: (state, action: PayloadAction<Profile>) => {
      state.data = { ...state.data, ...action.payload };
    },
    cancelEdit: (state) => {
      state.data = undefined;
      localStorage.removeItem(USER_LOCALSTORAGE_KEY);
    },
  },
});

export const { actions: profileActions, reducer: profileReducer } = profileSlice;
