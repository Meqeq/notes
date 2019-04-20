import React, { Component } from 'react';
import { connect } from 'react-redux';

import MarkdownEditor from '../components/MarkdownEditor';
import EditMenu from '../components/EditMenu';

class Create extends Component {
    render() {
        return (
            <React.Fragment>
                { this.props.blocks.map( (element, key) => {
                    switch(element.type) {
                        case "markdown":
                            return <MarkdownEditor key={ key } order={ key } />;
                        default:
                            return <div />;
                    }
                })}
    
                <EditMenu />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    blocks: state.note.blocks
});

const mapActionsToProps = {
    
}
  
export default connect(mapStateToProps, mapActionsToProps)(Create);
