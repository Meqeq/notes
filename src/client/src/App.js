import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import history from './history';

import { logged } from './actions/userActions'; 

import './styles/bootstrap-reboot.min.css';
import './styles/main.scss';

import Menu from './components/Menu';
import Overview from './pages/Overview';
import Note from './pages/Note';
/*
import './styles/layout.css';


import Window from './components/Window';

import Create from './pages/Create';
import Open from './pages/Open';
import OpenNote from './pages/OpenNote';
*/
class App extends Component {
    componentDidMount() {
        this.props.loginAction();  
    }

    render() {
        return(
            <Router history={ history }>
                <React.Fragment>
                    <header>
                        <span>NOTES</span>
                    </header>

                    <Menu />

                    <main>
                        <Route path="/overview" component={ Overview } />
                        <Route path="/note" component={ Note } />
                    </main>

                    <footer>Notes by MeqeqWengiel | Krk 2019</footer>
                </React.Fragment>
            </Router>
        );
    }
/*
    render() {
        return(
            <Router history={ history }>
                <div className="wrapper">
                    <Window />
                    <header>
                        <span>NOTES</span>
                    </header>
                    <Menu />
                    <main>
                        <Route path="/create" component={ Create } />
                        <Route path="/overview" component={ Overview } />
                        <Route path="/open" component={ Open } />
                        <Route path="/note" component={ OpenNote } />
                    </main>
                    <footer>
                        Notes by MeqeqWengiel | Krk 2019
                    </footer>
                </div>
            </Router>
        );
    }*/
}

const mapStateToProps = state => ({
    windowOpen: state.window.open,
    componentName: state.window.component
});

const mapActionsToProps = {
    loginAction: logged
}
  
export default connect(mapStateToProps, mapActionsToProps)(App);
  
