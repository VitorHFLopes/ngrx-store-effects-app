import { Action } from '@ngrx/store';
import { Pizza } from '../../models/pizza.model';

// Action types
export const LOAD_PIZZAS = '[Products] Pizza Load';
export const LOAD_PIZZAS_FAIL = '[Products] Pizza Load Fail';
export const LOAD_PIZZAS_SUCCESS = '[Products] Pizza Load Success';

// Actions
export class LoadPizzas implements Action {

    readonly type = LOAD_PIZZAS;
}

export class LoadPizzasFail implements Action {

    readonly type = LOAD_PIZZAS_FAIL;
    constructor(public payload: any) {}
}

export class LoadPizzasSuccess implements Action {

    readonly type = LOAD_PIZZAS_SUCCESS;
    constructor(public payload: Pizza[]) {}
}

export type PizzaActions = LoadPizzas | LoadPizzasFail | LoadPizzasSuccess;