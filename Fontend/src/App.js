import React from 'react';

import './App.css';
import {Home} from './components/Home'
import {Department} from './components/Department'
import {Employee} from './components/Employee'
import {Order} from './components/Order'
import {Navigation} from './components/Navigation'


import{BrowserRouter,Route, Switch} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <div className="container">
    <h3 className="mt-3 d-flex justify-content-center">
    ReactJS with Web api Demo</h3>
    <h5 className="mt-3 d-flex justify-content-center">
    Employee Management</h5>
    <Navigation/>
      <Switch>
      <Route path='/' component={Home} exact/>
      <Route path='/department' component={Department} />
      <Route path='/employee' component={Employee} />
      <Route path='/order' component={Order} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
