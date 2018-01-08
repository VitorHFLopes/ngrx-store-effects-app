import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ProductState } from '../store/reducers';
import { getPizzasEntitiesSelector, getPizzasLoadedSelector } from '../store/selectors';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { LoadPizzas } from '../store/actions';
import { Pizza } from '../models/pizza.model';

@Injectable()
export class PizzaExistsGuard implements CanActivate {

    constructor(private store: Store<ProductState>) {
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.checkStore()
            .pipe(
                switchMap(() => {
                    const id = parseInt(route.params.pizzaId, 10);
                    return this.hasPizza(id);
                })
            );
    }

    hasPizza(id: number): Observable<boolean> {
        return this.store.select(getPizzasEntitiesSelector)
            .pipe(
                map((entities: { [key: number]: Pizza }) => !!entities[id]),
                take(1)
            );
    }

    checkStore(): Observable<boolean> {

        return this.store.select(getPizzasLoadedSelector)
            .pipe(
                tap(loaded => {
                    if (!loaded) {
                        this.store.dispatch(new LoadPizzas());
                    }
                }),
                filter(loaded => loaded),
                take(1)
            );
    }

}