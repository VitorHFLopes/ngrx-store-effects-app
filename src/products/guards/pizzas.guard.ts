import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ProductsState } from '../store/reducers';
import { getPizzasLoaded } from '../store/selectors';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { LoadPizzas } from '../store/actions';
import { of } from 'rxjs/observable/of';

@Injectable()
export class PizzasGuard implements CanActivate {

    constructor(private store: Store<ProductsState>) {
    }

    canActivate(): Observable<boolean> {
        return this.checkStore()
            .pipe(
                switchMap(() => of(true)),
                catchError(() => of(false))
            );
    }

    checkStore(): Observable<boolean> {

        return this.store.select(getPizzasLoaded)
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