import React, { Component } from 'react';

import { addBlock } from '../actions/noteActions';

import { connect } from 'react-redux';
import '../styles/addsection.css';

class AddSection extends Component {
    render() {
        return (
            <div className="add-section">
                <div className="desc">Dodaj</div>
                <div className="block" onClick={ () => this.props.addNewBlock("markdown") } >
                    Blok markdown
                </div>
                <div className="block">
                    Równanie
                </div>
                <div className="desc">Zapisz</div>
                <div className="block" onClick={ () => this.props.addNewBlock("markdown") } >
                    na Komputerze
                </div>
                <div className="block">
                    na Dropbox'ie
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
});

const mapActionsToProps = {
    addNewBlock: addBlock
}
  
export default connect(mapStateToProps, mapActionsToProps)(AddSection);