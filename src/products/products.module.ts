import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { effects } from './store/effects';

// components
import * as fromComponents from './components';

// containers
import * as fromContainers from './containers';

// guards
import * as fromGuards from '../products/guards';

// services
import * as fromServices from './services';
import { EffectsModule } from '@ngrx/effects';

// routes
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [fromGuards.PizzasGuard],
        component: fromContainers.ProductsComponent
    },
    {
        path: 'new',
        canActivate: [fromGuards.PizzasGuard, fromGuards.ToppingsGuard],
        component: fromContainers.ProductItemComponent
    },
    {
        path: ':pizzaId',
        canActivate: [fromGuards.PizzaExistsGuard, fromGuards.ToppingsGuard],
        component: fromContainers.ProductItemComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        StoreModule.forFeature('products', reducers),
        EffectsModule.forFeature(effects),
        RouterModule.forChild(ROUTES)
    ],
    providers: [...fromServices.services, ...fromGuards.guards],
    declarations: [...fromContainers.containers, ...fromComponents.components],
    exports: [...fromContainers.containers, ...fromComponents.components]
})
export class ProductsModule {
}
