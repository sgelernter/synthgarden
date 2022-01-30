import { connect } from "react-redux";
import PatchControls from "./patch_controls";
import { deletePatch, loadPatch, defaultPatch } from '../../actions/patch_actions';

const mSTP = state => ({
    currentPatch: state.entities.currentPatch
});


const mDTP = dispatch => ({
    deletePatch: (id) => dispatch(deletePatch(id)).then(() => {
        document.getElementById('loaded-patch-CRUD').className = "hidden";
        document.getElementById('new-patch-CRUD').className = "visible";
        document.getElementById('new-patch-toggle').className = "hidden";
        dispatch(loadPatch(defaultPatch));
    })
})

export default connect(mSTP, mDTP)(PatchControls);