import { createSelector } from 'reselect';

const selectState = state => state.tinhthanh || [];

const makeGetDuLieu = () =>
  createSelector(selectState, appState => {
    return appState
  });

export { makeGetDuLieu };
