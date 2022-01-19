import * as PatchApiUtil from '../util/patch_api_util';

export const RECEIVE_ALL_PATCHES = 'RECEIVE_ALL_PATCHES';
export const RECEIVE_PATCH = 'RECEIVE_PATCH';
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

const removePatch = id => {
    return {
        type: REMOVE_PATCH,
        id: id
    }
}