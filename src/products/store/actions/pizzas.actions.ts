import { Action } from '@ngrx/store';
import { Pizza } from '../../models/pizza.model';

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

export const CREATE_PIZZA = '[Products] Pizza Create';
export const CREATE_PIZZA_FAIL = '[Products] Pizza Create Fail';
export const CREATE_PIZZA_SUCCESS = '[Products] Pizza Create Success';

export class CreatePizza implements Action {

    readonly type = CREATE_PIZZA;
    constructor(public payload: Pizza) {}
}

export class CreatePizzaFail implements Action {

    readonly type = CREATE_PIZZA_FAIL;
    constructor(public payload: any) {}
}

export class CreatePizzaSuccess implements Action {

    readonly type = CREATE_PIZZA_SUCCESS;
    constructor(public payload: Pizza) {}
}

// Action types
export type PizzaActions =
    | LoadPizzas
    | LoadPizzasFail
    | LoadPizzasSuccess
    | CreatePizza
    | CreatePizzaFail
    | CreatePizzaSuccess;