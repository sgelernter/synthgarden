import React from "react";
import "../../assets/stylesheets/sidebar.scss";

class Sidebar extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            patchesFetched: 'false',
            samplesFetched: false
        }
    }

    componentDidMount(){
        this.props.fetchPatches();
        this.props.fetchUserSamples(this.props.currentUserId);
        this.setState({
            patchesFetched: true,
            samplesFetched: true
        });
    }

    render(){
        if (this.state.patchesFetched === 'false') {
            return null;
        }
        
        if (this.state.samplesFetched === false) {
            return null;
        }
        // debugger
        return (
            <div className="sidebar">
                <h3>All Patches:</h3>
                <ul>
                    {Object.values(this.props.patches).map((fullPatch, idx) => (
                        <li key={idx} className="sidebar-list-item" onClick={() => this.props.loadPatch(fullPatch)} >
                            {fullPatch.name}
                        </li>
                    ))}
                </ul>
                <h3>Your Samples:</h3>
                <ul>
                    {Object.values(this.props.samples).map((sample, idx) => (
                        <li key={idx} className="sidebar-list-item" onClick={() => this.props.loadSample(sample)} >
                            {sample.name}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Sidebar;