import React, { Component } from 'react';
import { connect } from 'react-redux';
import { close } from '../actions/windowActions';

import '../styles/window.scss';
import Download from './Download';
import OpenFromComputer from './OpenFromComputer';
import OpenFromDropbox from './OpenFromDropbox';
import SaveDropbox from './SaveDropbox';

class Window extends Component {
    chooseComponent() {
        console.log(this.props.component);
        switch(this.props.component) {
            case "download":
                //console.log("Zdzisłąw Onderka nie ma pleców");
                return(<Download />);
            case "open-computer":
                return(<OpenFromComputer />);
            case "open-dropbox":
                return(<OpenFromDropbox />);
            case "dropbox-saver":
                return(<SaveDropbox />);
            default:
                return "";
        }
    }

    render() {
        if(!this.props.open) return ("");
        return (
            <div className="fs-window">
                <div className="fog" onClick={ () => this.props.closeAction() } />
                { this.chooseComponent() }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    component: state.window.component,
    open: state.window.open
});

const mapActionsToProps = { 
    closeAction: close
};

export default connect(mapStateToProps, mapActionsToProps)(Window);
