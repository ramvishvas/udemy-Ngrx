import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AuthState } from "./reducers/index";

/* 
  1. Creating feature selector
*/
export const selectAuthState = createFeatureSelector<AuthState>("auth");

/* 
  1. First Way to access store data
  2. Minimized function using feature selector
  3. It will give us auto suggession
*/
export const isLoggedIn = createSelector(selectAuthState, auth => !!auth.user);

/* 
  1. Second Way to access store data
*/
export const isLoggedOut = createSelector(
  isLoggedIn,
  isLoggedIn => !isLoggedIn
);

/* 
  1. First Way to access store data
*/
// export const isLoggedIn = createSelector(
//   state => state["auth"],
//   auth => !!auth.user
// );

/* 
  1. Second Way to access store data
*/
// export const isLoggedOut = createSelector(
//   isLoggedIn,
//   isLoggedIn => !isLoggedIn
// );
