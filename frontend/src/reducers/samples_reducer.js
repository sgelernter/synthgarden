import { RECEIVE_ALL_SAMPLES, RECEIVE_SAMPLE, LOAD_SAMPLE, REMOVE_SAMPLE } from '../actions/sample_actions'

const samplesReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state)
    
    switch (action.type) {
        case RECEIVE_SAMPLE:
            return action.sample.data;

        case RECEIVE_ALL_SAMPLES:
            const samplesObj = {};
            action.samples.data.forEach(sample => samplesObj[sample.name] = sample);
            return patchesObj;

        case REMOVE_PATCH:
            delete nextState[action.sample.id]
            return nextState;
    
        default:
            return state;
    }
}

const currentSampleReducer = (state = null, action) => {
    
    switch (action.type) {
        case LOAD_SAMPLE:
            return action.sample;

        default: 
            return state;
    }
}

export { samplesReducer, currentSampleReducer };