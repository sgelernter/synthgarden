import { RECEIVE_ALL_SAMPLES, RECEIVE_SAMPLE, LOAD_SAMPLE, REMOVE_SAMPLE } from '../actions/sample_actions'

const samplesReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state)
    
    switch (action.type) {
        case RECEIVE_SAMPLE:
            const sampleObj = {};
            sampleObj[action.sample.data._id] = action.sample.data;
            return Object.assign({}, state, sampleObj);
        case RECEIVE_ALL_SAMPLES:
            const samplesObj = {};
            action.samples.data.forEach(sample => samplesObj[sample._id] = sample);
            return samplesObj;
        case REMOVE_SAMPLE:
            delete nextState[action.sample.data._id]
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