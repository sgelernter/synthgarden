import { combineReducers } from "redux";
import { patchesReducer, currentPatchReducer } from "./patches_reducer";

const entitiesReducer = combineReducers({
    patches: patchesReducer,
    currentPatch: currentPatchReducer
});

export default entitiesReducer;