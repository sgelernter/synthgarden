import { connect } from "react-redux";
import { fetchUserSamples, loadSample } from "../../actions/sample_actions";
import { fetchUserPatches, loadPatch, deletePatch } from "../../actions/patch_actions";

import Sidebar from "./sidebar";

const mSTP = state => {
    return {
        currentUserId: state.session.user.id,
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
        fetchUserSamples: (userId) => dispatch(fetchUserSamples(userId)),
        loadSample: (sampleId) => dispatch(loadSample(sampleId))
    }
};
 
export default connect(mSTP, mDTP)(Sidebar);