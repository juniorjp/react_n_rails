import { AUTHENTICATED, AUTHENTICATION_ERROR, UNAUTHENTICATED } from '../actions/user_actions';

export default function(state={}, action) {
  switch(action.type) {
    case AUTHENTICATED:
      return { ...state, user: action.user, authenticated: true };
    case UNAUTHENTICATED:
      return { ...state, authenticated: false };
    case AUTHENTICATION_ERROR:
      return { ...state, authenticated: false, error: action.payload };
  }
  return state;
}