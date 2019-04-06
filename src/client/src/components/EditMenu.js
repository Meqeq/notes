import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addBlock, createJson } from '../actions/noteActions';

import '../styles/savesection.css';

class EditMenu extends Component {
    render() {
        return (
            <div className="edit-menu">
                <div className="option" onClick={ () => this.props.addNewBlock("markdown") }>
                    <i className="fab fa-markdown" />
                    <br />
                    <span>TEKST</span>
                </div>
                <div className="option">
                    <i className="fas fa-square-root-alt" />
                    <br />
                    <span>RÓWNANIE</span>
                </div>
                <div className="option" onClick={ () => this.props.onCreateJson() }>
                    <i className="fas fa-desktop" />
                    <br />
                    <span>KOMPUTER</span>
                </div>
                <div className="option">
                    <i className="fab fa-dropbox" />
                    <br />
                    <span>DROPBOX</span>
                </div>
                <div className="desc">
                    Dodaj
                </div>
                <div className="desc">
                    Zapisz
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({});

const mapActionsToProps = {
    addNewBlock: addBlock,
    onCreateJson: createJson
}
  
export default connect(mapStateToProps, mapActionsToProps)(EditMenu);