import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from "@angular/router";
import { AppState } from "./reducers/index";
import { isLoggedIn, isLoggedOut } from "./auth/auth.selector";
import { logout, login } from "./auth/auth.action";
import { map } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  loading = true;

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit() {
    const userProfile = localStorage.getItem("user");

    if (userProfile) {
      this.store.dispatch(login({ user: JSON.parse(userProfile) }));
    }

    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });

    // this.store.subscribe(state => {
    //   console.log("Store Value: ", state);
    // });

    /* 
    1. First Way to access store data
    2. it get colled each time
    */
    // this.isLoggedIn$ = this.store.pipe(map(state => !!state["auth"].user));
    // this.isLoggedOut$ = this.store.pipe(map(state => !state["auth"].user));

    /* 
    1. Second Way to access store data
    2. get called only when data get updated
    */
    // this.isLoggedIn$ = this.store.pipe(select(state => !!state["auth"].user));
    // this.isLoggedOut$ = this.store.pipe(select(state => !state["auth"].user));

    // optimal
    this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));

    this.isLoggedOut$ = this.store.pipe(select(isLoggedOut));
  }

  logout() {
    this.store.dispatch(logout());
  }
}
