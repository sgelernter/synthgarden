import { combineReducers } from "redux";
import { patchesReducer, currentPatchReducer } from "./patches_reducer";
import { samplesReducer, currentSampleReducer } from './samples_reducer';

const entitiesReducer = combineReducers({
    patches: patchesReducer,
    currentPatch: currentPatchReducer,
    samples: samplesReducer,
    currentSample: currentSampleReducer
});

export default entitiesReducer;