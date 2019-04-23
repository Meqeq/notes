import React, { Component } from 'react';
import { connect } from 'react-redux';

import EditionMenu from '../components/EditionMenu';
import MarkdownEditor from '../components/MarkdownEditor';

class Create extends Component {
    render() {
        return (
            <div className="create">

                { this.props.blocks.map( (element, key) => {
                    switch(element.type) {
                        case "markdown":
                            return <MarkdownEditor key={ key } order={ key } />;
                        default:
                            return <div />;
                    }
                })}

                <EditionMenu />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    blocks: state.note.blocks
});
  
export default connect(mapStateToProps)(Create);
