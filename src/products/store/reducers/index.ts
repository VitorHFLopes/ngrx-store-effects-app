import * as fromReducers from './pizzas.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface ProductState {
    pizzas: fromReducers.PizzaState
}

export const pizzasReducers: ActionReducerMap<ProductState> = {
    pizzas: fromReducers.pizzasReducer
};

export const getProductsState = createFeatureSelector<ProductState>('products');