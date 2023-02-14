import { Watch } from '@models/watch.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as WatchApiActions from '@store/actions/watch-api.actions';
import * as WatchActions from '@store/actions/watch.actions';

export interface WatchState extends EntityState<Watch> {
  newWatchLoading: boolean;
}

export const adapter: EntityAdapter<Watch> = createEntityAdapter<Watch>({
  // TODO: Nånting blir galet här man lägger till en ny klocka...
  sortComparer: (a: Watch, b: Watch) => a.added.localeCompare(b.added),
});

export const initialState: WatchState = adapter.getInitialState({
  newWatchLoading: false,
});

export const watchReducer = createReducer(
  initialState,
  on(WatchApiActions.loadWatchesSuccess, (state, { watches }) => {
    return adapter.setAll(watches, state);
  }),
  on(WatchApiActions.deleteWatchSuccess, (state, { watchId }) => {
    return adapter.removeOne(watchId, state);
  }),
  on(WatchApiActions.addWatchSuccess, (state, { newWatch }) => {
    return adapter.addOne(newWatch, { ...state, newWatchLoading: false });
  }),
  on(
    WatchApiActions.addWatchFailure,
    (state): WatchState => ({
      ...state,
      newWatchLoading: false,
    })
  ),
  on(
    WatchApiActions.toggleActiveStatusSuccess,
    WatchApiActions.toggleActiveStatusFailure,
    (state, { watchProps }) => {
      return adapter.updateOne(
        { id: watchProps.id, changes: { active: watchProps.active } },
        state
      );
    }
  ),
  on(
    WatchApiActions.addWatch,
    (state): WatchState => ({
      ...state,
      newWatchLoading: true,
    })
  ),
  on(
    WatchActions.addWatch,
    // Om klockan inte kunde tas bort, lägg till den igen
    WatchApiActions.deleteWatchFailure,
    (state, { watch }) => {
      return adapter.addOne(watch, state);
    }
  ),
  on(WatchActions.deleteWatch, (state, { watchId }) => {
    return adapter.removeOne(watchId, state);
  })
);

const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();

export const selectWatchIds = selectIds;

export const selectWatchEntities = selectEntities;

export const selectAllWatches = selectAll;

export const selectWatchTotal = selectTotal;
