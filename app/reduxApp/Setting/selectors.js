import { createSelector } from 'reselect';

const selectState = state => state.setting || [];

const makeGetSetting = () =>
  createSelector(selectState, appState => {
    return appState
  });

export { makeGetSetting };
