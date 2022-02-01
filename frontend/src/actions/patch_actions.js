import * as PatchApiUtil from '../util/patch_api_util';

export const RECEIVE_ALL_PATCHES = 'RECEIVE_ALL_PATCHES';
export const RECEIVE_PATCH = 'RECEIVE_PATCH';
export const LOAD_PATCH = 'LOAD_PATCH';
export const REMOVE_PATCH = 'REMOVE_PATCH';
export const defaultPatch = {
        "name": "no patch selected",
        "oscillator": {
            "osctype": "pwm",
            "attack": 0.2,
            "sustain": 0.3,
            "release": 1
        },
        "octave": 0,
        "eq": {
            "high": 0,
            "mid": 0,
            "low": 0
        },
        "mods": false,
        "chorus": {
            "LFO": 1.5,
            "delay": 3.5,
            "depth": 0.7
        },
        "tremolo": {
            "frequency": 10,
            "depth": 0.5
        },
        "harmonics": false,
        "selectedHarmonics": "distortion",
        "distortion": {
            "amt": 1
        },
        "bitCrusher": {
            "bitDepth": 4,
            "amount": 1
        },
        "delay": false,
        "selectedDelay": "feedback",
        "feedback": {
            "time": 0.25,
            "fb": 0.125,
            "amt": 1
        },
        "pingPong": {
            "time": 0.25,
            "fb": 0.5,
            "amt": 1
        },
        "signalChain": ""
}

const receivePatches = patches => {
    return {
        type: RECEIVE_ALL_PATCHES,
        patches: patches
    }
}

const receivePatch = patch => {
    return {
        type: RECEIVE_PATCH,
        patch: patch
    }
}

export const loadPatch = patch => {
    return {
        type: LOAD_PATCH,
        patch
    }
} 

const removePatch = patch => {
    return {
        type: REMOVE_PATCH,
        patch
    }
}

export const createPatch = patch => dispatch => {
    return PatchApiUtil.createPatch(patch)
    .then(patch => dispatch(receivePatch(patch)))
}

export const fetchPatches = () => dispatch => {
    return PatchApiUtil.fetchAllPatches()
    .then(patches => dispatch(receivePatches(patches)))
}

export const fetchUserPatches = userId => dispatch => {
    return PatchApiUtil.fetchUserPatches(userId)
      .then(patches => dispatch(receivePatches(patches)))
    }
    
    export const fetchPatch = id => dispatch => {
        return PatchApiUtil.fetchPatch(id)
        .then(patch => dispatch(receivePatch(patch)))
    }
    
    export const updatePatch = patchData => dispatch => {
        return PatchApiUtil.updatePatch(patchData)
        .then(patch => dispatch(receivePatch(patch)))
    }
    
    export const deletePatch = id => dispatch => {
        return PatchApiUtil.deletePatch(id)
        .then(patch => dispatch(removePatch(patch)))
}