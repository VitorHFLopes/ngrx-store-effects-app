import * as fromReducers from '../reducers/pizzas.reducer';
import { createSelector } from '@ngrx/store';
import { getProductsState, ProductsState } from '../reducers';
import { getRouterState } from '../../../app/store/reducers';
import { Pizza } from '../../models/pizza.model';
import { getSelectedToppings, getToppingEntities } from './toppings.selectors';

export const getPizzasState = createSelector(getProductsState, (state: ProductsState) => state.pizzas);

export const getPizzasEntities = createSelector(
    getPizzasState,
    fromReducers.getPizzasEntities
);

export const getSelectedPizza = createSelector(
    getPizzasEntities,
    getRouterState,
    (entities, router): Pizza => router.state && entities[router.state.params.pizzaId]
);

export const getPizzasVisualized = createSelector(
    getSelectedPizza,
    getToppingEntities,
    getSelectedToppings,
    (pizza, toppingsEntities, selectedToppings) => {
        const toppings = selectedToppings.map(id => toppingsEntities[id]);
        return {
            ...pizza,
            toppings
        };
    }
);

export const getAllPizzas = createSelector(
    getPizzasEntities,
    entities =>
        Object.keys(entities)
            .map(id =>
                entities[parseInt(id)])
);

export const getPizzasLoaded = createSelector(
    getPizzasState,
    fromReducers.getPizzasLoaded
);

export const getPizzasLoading = createSelector(
    getPizzasState,
    fromReducers.getPizzasLoading
);