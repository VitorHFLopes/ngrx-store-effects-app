import { PizzaState, pizzasReducer } from './pizzas.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface ProductState {
    pizzas: PizzaState
}

export const pizzasReducers: ActionReducerMap<ProductState> = {
    pizzas: pizzasReducer
};

export const getProductsState = createFeatureSelector<ProductState>('products');

export const getPizzasState = createSelector(getProductsState, (state: ProductState) => state.pizzas);

export const getAllPizzas = createSelector(getPizzasState, (state: PizzaState) => state.data);
export const getPizzasLoaded = createSelector(getPizzasState, (state: PizzaState) => state.loaded);
export const getPizzasLoading = createSelector(getPizzasState, (state: PizzaState) => state.loading);