import { RECEIVE_PATCH, RECEIVE_ALL_PATCHES, REMOVE_PATCH, LOAD_PATCH } from "../actions/patch_actions";

const patchesReducer = (state = {}, action) => {

    Object.freeze(state);
    let nextState = Object.assign({}, state)

    switch (action.type) {
        default: 
            return state;

        case RECEIVE_PATCH:
            // newState.filter(patch => action.patch.data._id in patch);
            return action.patch.data;

        case RECEIVE_ALL_PATCHES:
            const patchesObj = {};
            action.patches.data.forEach(patch => patchesObj[patch.name] = patch);
            return patchesObj;

        case REMOVE_PATCH:
            delete nextState[action.patch.id]
            return nextState;
    }
} 

const currentPatchReducer = (state = null, action) => {
    
    switch (action.type) {
        default: 
            return state;
            
        case LOAD_PATCH:
            return action.patch;
    }
}

export { patchesReducer, currentPatchReducer};  

