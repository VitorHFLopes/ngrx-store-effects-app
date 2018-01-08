import { Pizza } from '../../models/pizza.model';
import { LOAD_PIZZAS, LOAD_PIZZAS_FAIL, LOAD_PIZZAS_SUCCESS, PizzaActions } from '../actions/pizzas.actions';
import { CREATE_PIZZA_SUCCESS, UPDATE_PIZZA_SUCCESS } from '../actions';

export interface PizzaState {
    entities: { [id: number]: Pizza };
    loaded: boolean;
    loading: boolean;
}

export const initialState: PizzaState = {
    entities: {},
    loaded: false,
    loading: false
};

export function pizzasReducer(state = initialState, action: PizzaActions): PizzaState {

    switch (action.type) {

        case LOAD_PIZZAS: {

            return {
                ...state,
                loading: true
            };
        }

        case LOAD_PIZZAS_FAIL: {

            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case LOAD_PIZZAS_SUCCESS: {

            const pizzas = action.payload;

            const entities = pizzas.reduce((entities: { [id: number]: Pizza }, pizza: Pizza) => {
                return {
                    ...entities,
                    [pizza.id]: pizza
                };
            }, {
                ...state.entities
            });

            return {
                ...state,
                loading: false,
                loaded: true,
                entities
            };
        }

        case UPDATE_PIZZA_SUCCESS: // or for switch/case
        case CREATE_PIZZA_SUCCESS: {

            const pizza = action.payload;

            const entities = {
                ...state.entities,
                [pizza.id]: pizza
            };

            return {
                ...state,
                entities
            };
        }

        default: {
            return state;
        }
    }
}

export const getPizzasEntities = (state: PizzaState) => state.entities;
export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;