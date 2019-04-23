import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import history from './history';

import { logged } from './actions/userActions'; 

import './styles/bootstrap-reboot.min.css';
import './styles/main.scss';

import Menu from './components/Menu';
import Create from './pages/Create';
import Overview from './pages/Overview';
import Note from './pages/Note';
import Open from './pages/Open';
import Window from './components/Window';

class App extends Component {
    componentDidMount() {
        this.props.loginAction();  
    }

    render() {
        return(
            <Router history={ history }>
                <React.Fragment>
                    <Window />

                    <header>
                        <span>NOTES</span>
                    </header>

                    <Menu />

                    <main>
                        <Route path="/overview" component={ Overview } />
                        <Route path="/create" component={ Create } />
                        <Route path="/note" component={ Note } />
                        <Route path="/open" component={ Open } />
                    </main>

                    <footer>Notes by Meqeq | Krk 2019</footer>
                </React.Fragment>
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
  
