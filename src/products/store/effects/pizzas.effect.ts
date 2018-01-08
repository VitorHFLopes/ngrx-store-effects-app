import { Injectable } from '@angular/core';
import { PizzasService } from '../../services';

import { Actions, Effect } from '@ngrx/effects';
import { LOAD_PIZZAS, LoadPizzasFail, LoadPizzasSuccess } from '../actions/pizzas.actions';

import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import {
    CREATE_PIZZA, CreatePizza, CreatePizzaFail, CreatePizzaSuccess, UPDATE_PIZZA, UpdatePizza, UpdatePizzaFail,
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
}