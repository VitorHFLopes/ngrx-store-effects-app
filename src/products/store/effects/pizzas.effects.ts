import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { LOAD_PIZZAS, LoadPizzasFail, LoadPizzasSuccess } from '../actions/pizzas.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PizzasService } from '../../services';
import { of } from 'rxjs/observable/of';

@Injectable()
export class PizzasEffects {

    constructor(private actions$: Actions,
                private pizzasService: PizzasService) {

    }

    // Dispatch actions by default
    @Effect()
    // listen to the action type of
    // Observable stream
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
}