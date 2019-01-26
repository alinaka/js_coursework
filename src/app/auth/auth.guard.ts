import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable, of} from 'rxjs';

import {catchError, map} from "rxjs/operators";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private _authService: AuthService,
                private _router: Router) {}
    canActivate(): Observable<boolean>  {
        return this._authService.isTokenExpired().pipe(
            map(e => {
                if (e) {
                    return true;
                } else {
                    return false;
                }
            }),
            catchError((err) => {
                this._router.navigate(['/login']);
                return of(false);
            })
        );
    }
}
