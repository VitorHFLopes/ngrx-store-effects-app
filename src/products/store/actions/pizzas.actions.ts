import { Action } from '@ngrx/store';
import { Pizza } from '../../models/pizza.model';

// Action types
export const LOAD_PIZZAS = '[Products] Pizza Load';
export const LOAD_PIZZAS_FAIL = '[Products] Pizza Load Fail';
export const LOAD_PIZZAS_SUCCESS = '[Products] Pizza Load Success';

// Actions
export class LoadPizzas implements Action {

    type: string;
}

export class LoadPizzasFail implements Action {

    type: string;
    constructor(public payload: any) {}
}

export class LoadPizzasSuccess implements Action {

    type: string;
    constructor(public payload: Pizza[]) {}
}

export type PizzaActions = LoadPizzas | LoadPizzasFail | LoadPizzasSuccess;