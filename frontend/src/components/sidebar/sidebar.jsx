import React from "react";
import "../../assets/stylesheets/sidebar.scss";

class Sidebar extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            patchesFetched: 'false',
            samplesFetched: false,
            currentUserId: this.props.currentUserId
        }
    }

    componentDidMount(){
        if (this.state.currentUserId !== '') this.props.fetchUserPatches(this.props.currentUserId);
        this.props.fetchSamples();
        this.setState({
            patchesFetched: true,
            samplesFetched: true
        });
    }

    componentDidUpdate(prevProps){
        if (prevProps.currentUserId !== this.props.currentUserId) {
            this.props.fetchUserPatches(this.props.currentUserId);
            this.setState({
                currentUserId: this.props.currentUserId
            })
        }
    }

    render(){
        if (this.state.currentUserId === '') {
            return (
                <div className="sidebar hidden">
    
                </div>
            )   
        }
        if (this.state.patchesFetched === 'false' || this.state.samplesFetched === false) {
            return null;
        }
        return (
            <div className="sidebar">
                <h3>Your Patches:</h3>
                <ul className="patches-list">
                    {Object.values(this.props.patches).map((fullPatch, idx) => (
                        <li key={idx} className="sidebar-list-item" onClick={() => this.props.loadPatch(fullPatch)} id="sidebar-list">
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