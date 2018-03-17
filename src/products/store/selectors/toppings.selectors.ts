import { createSelector } from '@ngrx/store';
import { getProductsState, ProductsState } from '../reducers';
import {
    getSelectedToppings, getToppingEntities, getToppingLoaded,
    getToppingLoading
} from '../reducers/toppings.reducer';

export const getToppingsState = createSelector(
    getProductsState,
    (state: ProductsState) => state.toppings
);

export const getToppingsEntities = createSelector(
    getToppingsState,
    getToppingEntities
);

export const getAllToppings = createSelector(
    getToppingsEntities,
    entities => Object.keys(entities).map(id => entities[id])
);

export const getSelectedToppingsSelector = createSelector(
    getToppingsState,
    getSelectedToppings
);

export const getToppingsLoaded = createSelector(
    getToppingsState,
    getToppingLoaded
);

export const getToppingsLoading = createSelector(
    getToppingsState,
    getToppingLoading
);