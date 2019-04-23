import React, { Component } from 'react';
import { connect } from 'react-redux';
import { close } from '../actions/windowActions';

import Download from './Download';
import OpenFromComputer from './OpenFromComputer';
import OpenFromDropbox from './OpenFromDropbox';
import SaveDropbox from './SaveDropbox';

class Window extends Component {
    chooseComponent() {
        console.log(this.props.component);
        switch(this.props.component) {
            case "download":
                return(<Download />);
            case "open-computer":
                return(<OpenFromComputer />);
            case "open-dropbox":
                if(this.props.logged)
                    return(<OpenFromDropbox />);
                return(<div className="not-logged">Najpierw zaloguj się na swoje konto dropbox</div>);
            case "dropbox-saver":
                if(this.props.logged)
                    return(<SaveDropbox />);
                return(<div className="not-logged">Najpierw zaloguj się na swoje konto dropbox</div>);
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
    open: state.window.open,
    logged: state.user.logged
});

const mapActionsToProps = { 
    closeAction: close
};

export default connect(mapStateToProps, mapActionsToProps)(Window);
