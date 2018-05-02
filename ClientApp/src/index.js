import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './css/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';
import registerServiceWorker from './registerServiceWorker';

import NewBug from "./components/newBug"
import BugList from "./components/BugList"
import EditBug from "./components/editBug"
import Login from "./components/Login"
import SignIn from "./components/SignIn"
import Profile from "./components/Profile"
import NewUser from "./components/newUser"
import Menu from "./components/Menu"



const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
    <BrowserRouter basename={baseUrl}>
        <div>
            <Route component={Menu} />
            <Route exact path='/newBug' component={NewBug} />
            <Route exact path='/bugList' component={BugList} />
            <Route exact path='/editBug/:bug' component={EditBug} />
            <Route exact path='/Login' component={Login} />
            <Route exact path='/SignIn' component={SignIn} />
            <Route exact path='/Profile' component={Profile} />
            <Route exact path='/newUser' component={NewUser} />
            <Route exact path='/' component={Profile} />
        </div>
  </BrowserRouter>,
  rootElement);

registerServiceWorker();
