import { Pizza } from '../../models/pizza.model';
import { LOAD_PIZZAS, LOAD_PIZZAS_FAIL, LOAD_PIZZAS_SUCCESS, PizzaActions } from '../actions/pizzas.actions';

export interface PizzaState {
    data: Pizza[];
    loaded: boolean;
    loading: boolean;
}

export const initialState: PizzaState = {
    data: [],
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

            const data = action.payload;

            return {
                ...state,
                loading: false,
                loaded: true,
                data
            };
        }

        default: {
            return state;
        }
    }
}