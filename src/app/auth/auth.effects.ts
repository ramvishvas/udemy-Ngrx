import { Inject, Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { AuthActions } from "./action-type";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";

/* 
  1. First Way to set side effect
*/
// @Injectable()
// export class AuthEffects {
//   constructor(private actions$: Actions) {
//     actions$.subscribe(action => {
//       if (action.type == "[Login Page] User Login") {
//         localStorage.setItem("user", JSON.stringify(action["user"]));
//       }
//     });
//   }
// }


/* 
  1. Second Way to set side effect
*/
@Injectable()
export class AuthEffects {
  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.login),
        tap(action =>
          localStorage.setItem("user", JSON.stringify(action["user"]))
        )
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(action => {
          localStorage.removeItem("user");
          this.router.navigateByUrl("login");
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private router: Router) {}
}
