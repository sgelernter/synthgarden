import * as SampleApiUtil from '../util/sample_api_util';

export const RECEIVE_ALL_SAMPLES = 'RECEIVE_ALL_SAMPLES';
export const RECEIVE_SAMPLE = 'RECEIVE_SAMPLE';
export const LOAD_SAMPLE = 'LOAD_SAMPLE';
export const REMOVE_SAMPLE = 'REMOVE_SAMPLE';

const receiveSamples = samples => {
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

export const loadSample = sample => {
    return {
        type: LOAD_SAMPLE,
        sample
    }
} 

const removeSample = sample => {
    return {
        type: REMOVE_SAMPLE,
        sample
    }
}

export const createSample = sample => dispatch => {
    return SampleApiUtil.createSample(sample)
      .then(sample => dispatch(receiveSample(sample)))
}

export const fetchSamples = () => dispatch => {
    return SampleApiUtil.fetchAllSamples()
      .then(samples => dispatch(receiveSamples(samples)))
}

export const fetchUserSamples = userId => dispatch => {
    return SampleApiUtil.fetchUserSamples(userId)
      .then(samples => dispatch(receiveSamples(samples)))
}

export const fetchSample = id => dispatch => {
    return SampleApiUtil.fetchSample(id)
      .then(sample => dispatch(receiveSample(sample)))
}

export const updateSample = data => dispatch => {
    return SampleApiUtil.updateSample(data)
      .then(sample => dispatch(receiveSample(sample)))
}

export const deleteSample = id => dispatch => {
    return SampleApiUtil.deleteSample(id)
      .then(sample => dispatch(removeSample(sample)))
}