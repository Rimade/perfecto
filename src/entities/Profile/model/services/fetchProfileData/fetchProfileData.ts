import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkConfig } from 'app/providers/StoreProvider';

import type { Profile } from '../../types/profile';

/**
 * Получает данные профиля пользователя с сервера.
 * Использование:
 *   @example dispatch(fetchProfileData());
 */
export const fetchProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
  'profile/fetchProfileData',
  async (_, thunkAPI) => {
    const { rejectWithValue, extra } = thunkAPI;

    try {
      const response = await extra.api.get<Profile>('/profile');

      if (!response.data) {
        throw new Error('Нет данных пользователя');
      }

      return response.data;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      return rejectWithValue('error');
    }
  },
);
