import {combineReducers} from 'redux';
import entitiesReducer from './entities_reducer';
import session from './session_api_reducer';
import errors from './errors_reducer';
import ui from './ui_reducer';

const rootReducer = combineReducers({
  entities: entitiesReducer,
    session,
    errors,
    ui
});

export default rootReducer;