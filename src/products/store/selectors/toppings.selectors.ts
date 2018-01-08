import { createSelector } from '@ngrx/store';
import { getProductsState, ProductsState } from '../reducers';
import * as fromToppings from '../reducers/toppings.reducer';

export const getToppingsState = createSelector(
    getProductsState,
    (state: ProductsState) => state.toppings
);

export const getToppingEntities = createSelector(
    getToppingsState,
    fromToppings.getToppingEntities
);

export const getAllToppings = createSelector(
    getToppingEntities,
    entities => Object.keys(entities).map(id => entities[id])
);

export const getSelectedToppings = createSelector(
    getToppingsState,
    fromToppings.getSelectedToppings
);

export const getToppingsLoaded = createSelector(
    getToppingsState,
    fromToppings.getToppingsLoaded
);

export const getToppingsLoading = createSelector(
    getToppingsState,
    fromToppings.getToppingsLoading
);