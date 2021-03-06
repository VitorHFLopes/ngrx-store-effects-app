import { Pizza } from '../../models/pizza.model';
import { LOAD_PIZZAS, LOAD_PIZZAS_FAIL, LOAD_PIZZAS_SUCCESS, PizzaActions } from '../actions';

export interface PizzasState {
    entities: { [id: number]: Pizza };
    loaded: boolean;
    loading: boolean;
}

export const initialState: PizzasState = {
    entities: {},
    loaded: false,
    loading: false
};

export function reducer(state = initialState, action: PizzaActions): PizzasState {

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

        default: {
            return state;
        }
    }
}

export const getPizzasEntities = (state: PizzasState) => state.entities;
export const getPizzasLoading = (state: PizzasState) => state.loading;
export const getPizzasLoaded = (state: PizzasState) => state.loaded;