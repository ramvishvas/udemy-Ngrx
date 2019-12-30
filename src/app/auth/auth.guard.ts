import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { AppState } from "../reducers/index";
import { Store, select } from "@ngrx/store";
import { isLoggedIn } from "./auth.selector";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";

export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.pipe(
      select(isLoggedIn),
      tap(loggedIn => {
        if (!loggedIn) {
          this.router.navigateByUrl("login");
        }
      })
    );
  }
}
