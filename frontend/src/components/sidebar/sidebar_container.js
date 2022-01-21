import { connect } from "react-redux";
import { fetchUserPatches, loadPatch, deletePatch } from "../../actions/patch_actions";
import { fetchSamples, loadSample, deleteSample } from "../../actions/sample_actions";

import Sidebar from "./sidebar";

const mSTP = state => {
    return {
        patches: state.entities.patches,
        samples: state.entities.samples,
        currentUserId: state.session.user.id
    }
};

const mDTP = dispatch => {
    return {
        fetchUserPatches: (userId) => dispatch(fetchUserPatches(userId)),
        loadPatch: (patchId) => dispatch(loadPatch(patchId)),
        deletePatch: (id) => dispatch(deletePatch(id)),
        fetchSamples: () => dispatch(fetchSamples()),
        loadSample: (sampleId) => dispatch(loadSample(sampleId)),
        deleteSample: (id) => dispatch(deleteSample(id))
    }
};
 
export default connect(mSTP, mDTP)(Sidebar);