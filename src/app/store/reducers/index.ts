import { routerReducer, RouterReducerState, RouterStateSerializer } from '@ngrx/router-store';
import { ActivatedRouteSnapshot, Params, RouterStateSnapshot } from '@angular/router';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface RouterStateUrl {
    params: Params;
    queryParams: Params;
    url: string;
}

export interface State {
    routerReducer: RouterReducerState<RouterStateUrl> // required by ngrx router store
}

export const reducers: ActionReducerMap<State> = {
    routerReducer: routerReducer
};

export const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('routerReducer');

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {

    serialize(routerState: RouterStateSnapshot): RouterStateUrl {

        const { url } = routerState,
            { queryParams } = routerState.root;

        let state: ActivatedRouteSnapshot = routerState.root;

        while (state.firstChild) {

            state = state.firstChild;
        }

        const { params } = state;

        return {
            url,
            queryParams,
            params
        };
    }
}