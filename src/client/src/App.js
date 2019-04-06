import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './styles/bootstrap-reboot.min.css';
import './styles/layout.css';

import { logged } from './actions/userActions'; 

import Menu from './components/Menu';
import Window from './components/Window';

import Create from './pages/Create';
import Overview from './pages/Overview';
import Open from './pages/Open';

class App extends Component {
    componentDidMount() {
        this.props.loginAction();
    }

    render() {
        return(
            <Router>
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
  
