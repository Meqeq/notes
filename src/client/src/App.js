import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './styles/bootstrap-reboot.min.css';
import './styles/layout.css';

import { logged } from './actions/userActions'; 

import Menu from './components/Menu';

class App extends Component {
    componentDidMount() {
        this.props.loginAction();
    }

    render() {
        return(
            <Router>
                <div className="wrapper">
                    <header>
                        <span>NOTES</span>
                    </header>
                    <Menu />
                    <main>
                        Michał Kozik nie ma pleców
                    </main>
                    <footer>
                        Notes by MeqeqWengiel | Krk 2019
                    </footer>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = state => ({
    windowOpen: state.window.open,
    componentName: state.window.component
});

const mapActionsToProps = {
    loginAction: logged
}
  
export default connect(mapStateToProps, mapActionsToProps)(App);
  
