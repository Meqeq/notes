import React, { Component } from 'react';
import { connect } from 'react-redux';
import MarkdownBlock from './MarkdownBlock';

import { saveInLocal, loadFromLocal, umount } from '../actions/noteActions';

import '../styles/note.scss';

class Note extends Component {
    componentDidMount() {
        this.props.load();
        this.props.save();
        //console.log(localStorage.getItem('note'));
    }
    componentWillUnmount() {
        //this.props.clean();
        this.props.clean();
    }
    render() {
        return (
            <div className="note">
                { this.props.content.map( (value, key) => {
                    switch(value.type) {
                        case 'markdown':
                            return <MarkdownBlock content={ value.content } key={ key } />;
                        default:
                            return <div />
                    }
                })}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    content: state.note.blocks
});

const mapActionsToProps = {
    save: saveInLocal,
    load: loadFromLocal,
    clean: umount
}
  
export default connect(mapStateToProps, mapActionsToProps)(Note);
