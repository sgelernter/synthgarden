import * as SampleApiUtil from '../util/sample_api_util';

export const RECEIVE_ALL_SAMPLES = 'RECEIVE_ALL_SAMPLES';
export const RECEIVE_SAMPLE = 'RECEIVE_SAMPLE';
export const REMOVE_SAMPLE = 'REMOVE_SAMPLE';

const receiveSAMPLES = samples => {
    return {
        type: RECEIVE_ALL_SAMPLES,
        samples: samples
    }
}

const receiveSample = sample => {
    return {
        type: RECEIVE_SAMPLE,
        sample: sample
    }
}

const removeSample = id => {
    return {
        type: REMOVE_SAMPLE,
        id: id
    }
}