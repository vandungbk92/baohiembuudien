import { createSelector } from 'reselect';

const selectState = state => state.loaiphieu || [];

const makeGetLoaiPhieu = () =>
  createSelector(selectState, appState => {
    return appState
  });

export { makeGetLoaiPhieu };
