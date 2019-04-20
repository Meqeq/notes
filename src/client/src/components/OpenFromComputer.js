import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openNote } from '../actions/noteActions';
import history from '../history';

import '../styles/openComputer.scss';

class OpenFromComputer extends Component {
    change(e) {
        this.props.open(e, history)
    }

    render() {
        return (
            <div className="opener">
                Wybierz plik z dysku
                <br />
                <input type="file" id="file" accept="application/json" onChange={ e => this.change(e) } />
                <label htmlFor="file">Wybierz</label>
            </div>
        )
    }
}

const mapStateToProps = state => ({
});

const mapActionsToProps = { 
    open: openNote
};

export default connect(mapStateToProps, mapActionsToProps)(OpenFromComputer);

