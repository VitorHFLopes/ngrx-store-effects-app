import { Pizza } from '../../models/pizza.model';
import { LOAD_PIZZAS, LOAD_PIZZAS_FAIL, LOAD_PIZZAS_SUCCESS, PizzaActions } from '../actions/pizzas.actions';

export interface PizzaState {
    data: Pizza[];
    loaded: boolean;
    loading: boolean;
}

export const initialState: PizzaState = {
    data: [{
        name: 'Seaside Surfin\'',
        toppings: [
            {
                id: 6,
                name: 'mushroom'
            },
            {
                id: 7,
                name: 'olive'
            },
            {
                id: 2,
                name: 'bacon'
            },
            {
                id: 3,
                name: 'basil'
            },
            {
                id: 1,
                name: 'anchovy'
            },
            {
                id: 8,
                name: 'onion'
            },
            {
                id: 11,
                name: 'sweetcorn'
            },
            {
                id: 9,
                name: 'pepper'
            },
            {
                id: 5,
                name: 'mozzarella'
            }
        ],
        'id': 2
    }],
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

            return {
                ...state,
                loading: false,
                loaded: true
            };
        }

        default: {
            return state;
        }
    }
}