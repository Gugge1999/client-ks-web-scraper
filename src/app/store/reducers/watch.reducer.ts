import { Watch } from '@models/watch.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as WatchApiActions from '@store/actions/watch-api.actions';
import * as WatchActions from '@store/actions/watch.actions';

export interface WatchState extends EntityState<Watch> {}

export const adapter: EntityAdapter<Watch> = createEntityAdapter<Watch>({
  sortComparer: (a: Watch, b: Watch) => a.added.localeCompare(b.added),
});

export const initialState: WatchState = adapter.getInitialState();

export const watchReducer = createReducer(
  initialState,
  // TODO: lägg till loading state, kräver kanske att man skapar WatchApiActions.addWatchApi
  on(WatchApiActions.loadWatchesSuccess, (state, { watches }) => {
    return adapter.setAll(watches, state);
  }),
  on(WatchApiActions.deleteWatchByIdSuccess, (state, { watchId }) => {
    return adapter.removeOne(watchId, state);
  }),
  on(WatchApiActions.addWatchSuccess, (state, { newWatch }) => {
    return adapter.addOne(newWatch, state);
  }),
  on(WatchApiActions.toggleActiveStatusSuccess, (state, { id, active }) => {
    return adapter.updateOne({ id: id, changes: { active: active } }, state);
  }),
  on(WatchActions.addWatch, (state, { watch }) => {
    return adapter.addOne(watch, state);
  }),
  on(WatchActions.deleteWatch, (state, { watchId }) => {
    return adapter.removeOne(watchId, state);
  })
);

// get the selectors
const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();

// select the array of user ids
export const selectWatchIds = selectIds;

// select the dictionary of user entities
export const selectWatchEntities = selectEntities;

// select the array of users
export const selectAllWatches = selectAll;

// select the total user count
export const selectWatchTotal = selectTotal;
