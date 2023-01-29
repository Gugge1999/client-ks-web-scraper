import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import * as fromWatch from '@store/reducers/watch.reducer';

export interface State {
  watches: fromWatch.WatchState;
}

export const reducers: ActionReducerMap<State> = {
  watches: fromWatch.watchReducer,
};

export const selectWatchState =
  createFeatureSelector<fromWatch.WatchState>('watch');

export const selectWatchIds = createSelector(
  selectWatchState,
  // shorthand for WatchesState => fromWatch.selectWatchIds(WatchesState)
  fromWatch.selectWatchIds
);

export const selectWatchEntities = createSelector(
  selectWatchState,
  fromWatch.selectWatchEntities
);

export const selectAllWatches = createSelector(
  selectWatchState,
  fromWatch.selectAllWatches
);

export const selectWatchTotal = createSelector(
  selectWatchState,
  fromWatch.selectWatchTotal
);

export const selectNewWatchLoading = createSelector(
  selectWatchState,
  (state) => state.newWatchLoading
);
