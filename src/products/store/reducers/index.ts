import * as fromPizzas from './pizzas.reducer';
import * as fromToppings from './toppings.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface ProductState {
    pizzas: fromPizzas.PizzasState;
    toppings: fromToppings.ToppingsState;
}

export const reducers: ActionReducerMap<ProductState> = {
    pizzas: fromPizzas.reducer,
    toppings: fromToppings.reducer
};

export const getProductsState = createFeatureSelector<ProductState>('products');