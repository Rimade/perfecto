import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';

export const getCounterValue = createSelector(
    (state: StateSchema) => state.counter,
    (counter) => counter.value,
);
