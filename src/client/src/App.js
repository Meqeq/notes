import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './styles/bootstrap-reboot.min.css';
import './styles/main.css';

import request from './modules/request';

import Nav from './components/Nav';
import HomeMenu from './components/HomeMenu';

class App extends Component {
    componentDidMount() {
        request("/api/logged").then( res => {
            console.log(res);
        })
    }

    render() {
        return (
            <Router>
                <React.Fragment>
                    <header>
                        <i className="far fa-sticky-note" />
                        <span>NOTES</span>
                    </header>
                    <main>
                        <h4>Zabierz swoje notatki wszędzie</h4>
                        <Nav />
                        <Route exact path="/" component={ HomeMenu } />
                    </main>
                    <footer>
                        Notes by MeqeqWengiel | Krk 2019
                    </footer>
                </React.Fragment>
            </Router>
        );
    }
}

const mapStateToProps = state => ({
    windowOpen: state.window.open,
    componentName: state.window.component
});
  
export default connect(mapStateToProps)(App);
  
