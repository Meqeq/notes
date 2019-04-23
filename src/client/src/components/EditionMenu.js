import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addBlock, createJson } from '../actions/noteActions';
import { open } from '../actions/windowActions';

class EditionMenu extends Component {
    render() {
        return (
            <div className="edition-menu">
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
                <div className="option" onClick={ () => this.props.openWindow("dropbox-saver")}>
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
    onCreateJson: createJson,
    openWindow: open
}
  
export default connect(mapStateToProps, mapActionsToProps)(EditionMenu);