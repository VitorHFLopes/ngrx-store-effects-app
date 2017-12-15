import { Component, OnInit } from '@angular/core';

import { Pizza } from '../../models/pizza.model';
import { Store } from '@ngrx/store';
import { PizzaState } from '../../store/reducers/pizzas.reducer';
import { getAllPizzas } from '../../store/reducers';
import { Observable } from 'rxjs/Observable';
import { LoadPizzas } from '../../store/actions/pizzas.actions';

@Component({
    selector: 'products',
    styleUrls: ['products.component.scss'],
    template: `
        <div class="products">
            <div class="products__new">
                <a
                        class="btn btn__ok"
                        routerLink="./new">
                    New Pizza
                </a>
            </div>
            <div class="products__list">
                <div *ngIf="!((pizzas$ | async )?.length)">
                    No pizzas, add one to get started.
                </div>
                <pizza-item
                        *ngFor="let pizza of (pizzas$ | async)"
                        [pizza]="pizza">
                </pizza-item>
            </div>
        </div>
    `
})
export class ProductsComponent implements OnInit {
    pizzas$: Observable<Pizza[]>;

    constructor(private _store: Store<PizzaState>) {
    }

    ngOnInit() {
        this.pizzas$ = this._store.select(getAllPizzas);
        this._store.dispatch(new LoadPizzas())
    }
}
