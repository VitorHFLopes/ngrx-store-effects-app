import * as fromReducers from './pizzas.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface ProductState {
    pizzas: fromReducers.PizzaState
}

export const pizzasReducers: ActionReducerMap<ProductState> = {
    pizzas: fromReducers.pizzasReducer
};

export const getProductsState = createFeatureSelector<ProductState>('products');

export const getPizzasState = createSelector(getProductsState, (state: ProductState) => state.pizzas);

export const getPizzasEntitiesSelector = createSelector(
    getPizzasState,
    fromReducers.getPizzasEntities
);

export const getAllPizzas = createSelector(
    getPizzasEntitiesSelector,
    entities =>
        Object.keys(entities)
            .map(id =>
                entities[parseInt(id)])
);

export const getPizzasLoadedSelector = createSelector(
    getPizzasState,
    fromReducers.getPizzasLoaded
);

export const getPizzasLoadingSelector = createSelector(
    getPizzasState,
    fromReducers.getPizzasLoading
);