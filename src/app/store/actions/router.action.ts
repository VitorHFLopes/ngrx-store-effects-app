import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const GO = '[Router] Go';
export const BACK = '[Router] Back';
export const FORWARD = '[Router] Forward';

export class Go implements Action {

    readonly type: string;

    constructor(public payload: {
        path: any[],
        query?: object,
        extras?: NavigationExtras
    }) {
    }
}

export class Back implements Action {

    readonly type: string;
}

export class Forward implements Action {

    readonly type: string;
}

export type Actions =
    | Go
    | Back
    | Forward;