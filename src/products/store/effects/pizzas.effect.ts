import { Injectable } from '@angular/core';
import { PizzasService } from '../../services';

import { Actions, Effect } from '@ngrx/effects';
import { LOAD_PIZZAS, LoadPizzasFail, LoadPizzasSuccess } from '../actions/pizzas.action';
import * as fromRoot from '../../../app/store';

import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import {
    CREATE_PIZZA, CREATE_PIZZA_SUCCESS, CreatePizza, CreatePizzaFail, CreatePizzaSuccess, REMOVE_PIZZA, RemovePizza,
    RemovePizzaFail,
    RemovePizzaSuccess,
    UPDATE_PIZZA,
    UpdatePizza,
    UpdatePizzaFail,
    UpdatePizzaSuccess
} from '../actions';

@Injectable()
export class PizzasEffects {

    constructor(private actions$: Actions,
                private pizzasService: PizzasService) {

    }

    // Effects dispatches actions by default
    @Effect()
        // listen to the action type of Observable stream
    loadPizzas$ = this.actions$.ofType(LOAD_PIZZAS)
        .pipe(
            switchMap(() => {
                return this.pizzasService.getPizzas()
                    .pipe(
                        map(pizzas => new LoadPizzasSuccess(pizzas)),
                        catchError(error => of(new LoadPizzasFail(error)))
                    );
            })
        );

    @Effect()
    createPizza$ = this.actions$.ofType(CREATE_PIZZA)
        .pipe(
            map((action: CreatePizza) => action.payload),
            switchMap(
                pizza => {
                    return this.pizzasService.createPizza(pizza)
                        .pipe(
                            map(pizza => new CreatePizzaSuccess(pizza)),
                            catchError(error => of(new CreatePizzaFail(error)))
                        );
                }
            )
        );

    @Effect()
    createPizzaSuccess$ = this.actions$.ofType(CREATE_PIZZA_SUCCESS)
        .pipe(
            map((action: CreatePizzaSuccess) => action.payload),
            map(pizza => new fromRoot.Go({
                path: ['/products', pizza.id]
            }))
        );

    @Effect()
    updatePizza$ = this.actions$.ofType(UPDATE_PIZZA)
        .pipe(
            map((action: UpdatePizza) => action.payload),
            switchMap(
                pizza => {
                    return this.pizzasService.updatePizza(pizza)
                        .pipe(
                            map(pizza => new UpdatePizzaSuccess(pizza)),
                            catchError(error => of(new UpdatePizzaFail(error)))
                        );
                }
            )
        );

    @Effect()
    removePizza$ = this.actions$.ofType(REMOVE_PIZZA)
        .pipe(
            map((action: RemovePizza) => action.payload),
            switchMap(
                pizza => {
                    return this.pizzasService.removePizza(pizza)
                        .pipe(
                            map(() => new RemovePizzaSuccess(pizza)),
                            catchError(error => of(new RemovePizzaFail(error)))
                        );
                }
            )
        );

    @Effect()
    handlePizzaSuccess$ = this.actions$.ofType(REMOVE_PIZZA, UPDATE_PIZZA)
        .pipe(
            map(pizza => new fromRoot.Go(
                {
                    path: ['products']
                }
            ))
        );
}