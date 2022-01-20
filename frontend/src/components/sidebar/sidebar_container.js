import { connect } from "react-redux";
import { fetchPatches, loadPatch } from "../../actions/patch_actions";
import Sidebar from "./sidebar";

const mSTP = state => {
    return {
        patches: state.entities.patches
    }
};

const mDTP = dispatch => {
    return {
        fetchPatches: () => dispatch(fetchPatches()),
        loadPatch: (patchId) => dispatch(loadPatch(patchId))
    }
};
 
export default connect(mSTP, mDTP)(Sidebar);