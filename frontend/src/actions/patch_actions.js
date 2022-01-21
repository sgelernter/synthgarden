import * as PatchApiUtil from '../util/patch_api_util';

export const RECEIVE_ALL_PATCHES = 'RECEIVE_ALL_PATCHES';
export const RECEIVE_PATCH = 'RECEIVE_PATCH';
export const LOAD_PATCH = 'LOAD_PATCH';
export const REMOVE_PATCH = 'REMOVE_PATCH';

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