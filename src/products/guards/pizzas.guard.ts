import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ProductState } from '../store/reducers';
import { getPizzasLoadedSelector } from '../store/selectors';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { LoadPizzas } from '../store/actions';
import { of } from 'rxjs/observable/of';

@Injectable()
export class PizzasGuard implements CanActivate {

    constructor(private store: Store<ProductState>) {
    }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        return this.checkStore()
            .pipe(
                switchMap(() => of(true)),
                catchError(() => of(false))
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