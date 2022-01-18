import { RECEIVE_CURRENT_USER, 
         RECEIVE_USER_LOGOUT, 
         RECEIVE_USER_SIGN_IN } from '../actions/session_actions';

const _nullSession = {
    isAuthenticated: false,
    user: {}
};

const SessionReducer = (prevState = _nullSession, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        ...prevState,
        isAuthenticated: !!action.currentUser,
        user: action.currentUser
      };
    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: undefined
      };
    case RECEIVE_USER_SIGN_IN:
      return {
        ...prevState,
        isSignedIn: true
      }
    default:
      return prevState;
  }
}

export default SessionReducer;