import React from 'react';
//import './assetss/css/App.css';
import 'bootstrap/dist/css/bootstrap.css';


import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './components/Login';
import Home from './components/Home';
import Desafios from './components/Desafios';

function App() {
  return (
      <React.Fragment>
            <Router>
              <Switch>
                <Route path="/" exact render = { props=> ( <Login {...props}/>)}></Route>
                <Route path="/home" exact render = { props=> ( <Home {...props}/>)}></Route>     
                <Route path="/desafios" exact render = { props=> ( <Desafios {...props}/>)}></Route>
              </Switch>
            </Router>
      </React.Fragment>
    
  );
}

export default App;
