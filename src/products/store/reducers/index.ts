import * as fromPizzas from './pizzas.reducer';
import * as fromToppings from './toppings.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface ProductState {
    pizzas: fromPizzas.PizzaState;
    toppings: fromToppings.ToppingsState;
}

export const pizzasReducers: ActionReducerMap<ProductState> = {
    pizzas: fromPizzas.pizzasReducer,
    toppings: fromToppings.toppingsReducer
};

export const getProductsState = createFeatureSelector<ProductState>('products');