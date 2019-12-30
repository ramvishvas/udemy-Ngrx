import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on
} from "@ngrx/store";
import { AuthActions } from "../action-type";

export const authFeatureKey = "auth";

export interface AuthState {
  [x: string]: any;
}

export const initialAuthState: AuthState = {
  user: undefined
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    return { user: action.user };
  }),
  on(AuthActions.logout, (state, action) => {
    return {
      user: undefined
    };
  })
);
