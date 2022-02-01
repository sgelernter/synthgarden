import React from 'react';



class PatchControls extends React.Component {
    constructor(props){
        super(props);
    }

    toggleNewPatchUI(){
        document.getElementById('loaded-patch-CRUD').className = "hidden";
        document.getElementById('new-patch-CRUD').className = "visible";
        document.getElementById('new-patch-toggle').className = "hidden"; 
    }

    render(){
        return (
            <div className="patch-interface" onFocus={this.props.disableKeys} onBlur={this.props.enableKeys}>
                <div className="visible" id="new-patch-CRUD">
                    <input type="text" value={this.props.patchName} placeholder="enter patch name" onChange={this.props.updatePatchName} className="default-text" />
                    <button onClick={() => this.props.savePatch('new')} id="save-patch">
                        save to patch library
                    </button>
                </div>
                <button className="hidden" id="new-patch-toggle" onClick={this.toggleNewPatchUI}>
                    create new patch
                </button>
                <div className="hidden" id="loaded-patch-CRUD">
                    <button onClick={() => this.props.savePatch('update')} id="update-patch">
                        update this patch
                    </button>
                    <button onClick={() => this.props.deletePatch(this.props.currentPatch._id)} id="delete-patch">
                        delete patch
                    </button>
                </div>
                <div id="current-patch-display">
                    <span id="current-patch-title">
                        Current patch: 
                    </span>
                    <span>
                        {this.props.currentName}
                    </span>
                </div>
            </div>
        )
    }
}

export default PatchControls;