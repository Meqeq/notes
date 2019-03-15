import React, { Component } from 'react';
import request from '../modules/request';

import { withRouter } from 'react-router-dom';

import '../styles/dropboxLogin.css';

class DropboxLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            address: "",
            loaded: false,
        }
    }

    componentDidMount() {
        window.location = "http://localhost:5000/api/login";
    }

    render() {
        return (
            ""
        )
    }
}

export default withRouter(DropboxLogin);
