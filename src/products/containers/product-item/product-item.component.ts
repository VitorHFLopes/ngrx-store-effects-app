import { Component, OnInit } from '@angular/core';

import { Pizza } from '../../models/pizza.model';

import { Topping } from '../../models/topping.model';
import { ProductState } from '../../store/reducers';
import { Store } from '@ngrx/store';
import { getAllToppings, getPizzasVisualized, getSelectedPizza } from '../../store/selectors';
import { Observable } from 'rxjs/Observable';
import { CreatePizza, UpdatePizza, VisualizeToppings } from '../../store/actions';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'product-item',
    styleUrls: ['product-item.component.scss'],
    template: `
        <div
                class="product-item">
            <pizza-form
                    [pizza]="pizza$ | async"
                    [toppings]="toppings$ | async"
                    (selected)="onSelect($event)"
                    (create)="onCreate($event)"
                    (update)="onUpdate($event)"
                    (remove)="onRemove($event)">
                <pizza-display
                        [pizza]="visualise$ | async">
                </pizza-display>
            </pizza-form>
        </div>
    `
})
export class ProductItemComponent implements OnInit {
    pizza$: Observable<Pizza>;
    visualise$: Observable<Pizza>;
    toppings$: Observable<Topping[]>;

    constructor(private store: Store<ProductState>) {
    }

    ngOnInit() {

        this.pizza$ = this.store.select(getSelectedPizza)
            .pipe(
                // TAP () step out of an observable stream everything we've done inside the stream doesn't get return
                // anything or mutate the stream
                tap(
                    (pizza: Pizza = null) => {
                        const pizzaExists = pizza && pizza.toppings.length;
                        const toppings = pizzaExists ? pizza.toppings.map(topping => topping.id) : [];
                        this.store.dispatch(new VisualizeToppings(toppings));
                    }
                )
            );
        this.toppings$ = this.store.select(getAllToppings);
        this.visualise$ = this.store.select(getPizzasVisualized);
    }

    onSelect(event: number[]) {
        this.store.dispatch(new VisualizeToppings(event));
    }

    onCreate(event: Pizza) {
        this.store.dispatch(new CreatePizza(event));
    }

    onUpdate(event: Pizza) {
        this.store.dispatch(new UpdatePizza(event));
    }

    onRemove(event: Pizza) {
        const remove = window.confirm('Are you sure?');
        if (remove) {
        }
    }
}
