import React, { Component } from 'react';
import { connect } from 'react-redux';

class Download extends Component {
    constructor(props) {
        super(props);
        this.state = { name: "" }
    }

    render() {
        return (
            <div className="download-menu">
                Twoja notatka gotowa do ściągnięcia
                <input type="text" placeholder="Nazwa" onChange={ e => this.setState({ name: e.target.value }) }/>
                <a href={ "data:application/json;base64," + this.props.data } download={ this.state.name === "" ? "notatka.json" : this.state.name + ".json" }>Pobierz</a>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    data: state.note.json
});

export default connect(mapStateToProps)(Download);

