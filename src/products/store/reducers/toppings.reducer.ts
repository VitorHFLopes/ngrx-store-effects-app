import { Topping } from '../../models/topping.model';
import {
    LOAD_TOPPINGS, LOAD_TOPPINGS_FAIL, LOAD_TOPPINGS_SUCCESS, ToppingsActions,
    VISUALIZE_TOPPINGS
} from '../actions';

export interface ToppingsState {

    entities: { [id: number]: Topping };
    loaded: boolean;
    loading: boolean;
    selectedToppings: number[]
}

export const initialState: ToppingsState = {
    entities: {},
    loaded: false,
    loading: false,
    selectedToppings: []
};

export function reducer(state = initialState, action: ToppingsActions): ToppingsState {

    switch (action.type) {

        case LOAD_TOPPINGS: {

            return {
                ...state,
                loading: true
            };
        }

        case VISUALIZE_TOPPINGS: {

            const selectedToppings = action.payload;

            return {
                ...state,
                selectedToppings
            };
        }

        case LOAD_TOPPINGS_SUCCESS: {

            const toppings = action.payload;

            const entities = toppings.reduce((entities: { [id: number]: Topping }, topping: Topping) => {
                return {
                    ...entities,
                    [topping.id]: topping
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

        case LOAD_TOPPINGS_FAIL: {

            return {
                ...state,
                loading: false,
                loaded: false
            };
        }
    }

    return state;
}

// useful, best practice
export const getSelectedToppings = (state: ToppingsState) => state.selectedToppings;
export const getToppingEntities = (state: ToppingsState) => state.entities;
export const getToppingsLoaded = (state: ToppingsState) => state.loaded;
export const getToppingsLoading = (state: ToppingsState) => state.loading;

