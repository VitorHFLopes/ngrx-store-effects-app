import * as fromReducers from '../reducers/pizzas.reducer';
import { createSelector } from '@ngrx/store';
import { getProductsState, ProductState } from '../reducers';
import { getRouterState } from '../../../app/store/reducers';
import { Pizza } from '../../models/pizza.model';

export const getPizzasState = createSelector(getProductsState, (state: ProductState) => state.pizzas);

export const getPizzasEntitiesSelector = createSelector(
    getPizzasState,
    fromReducers.getPizzasEntities
);

export const getSelectedPizza = createSelector(
    getPizzasEntitiesSelector,
    getRouterState,
    (entities, router): Pizza => router.state && entities[router.state.params.pizzaId]
);

export const getAllPizzas = createSelector(
    getPizzasEntitiesSelector,
    entities =>
        Object.keys(entities)
            .map(id =>
                entities[parseInt(id)])
);

export const getPizzasLoadedSelector = createSelector(
    getPizzasState,
    fromReducers.getPizzasLoaded
);

export const getPizzasLoadingSelector = createSelector(
    getPizzasState,
    fromReducers.getPizzasLoading
);