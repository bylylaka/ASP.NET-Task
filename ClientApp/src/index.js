import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';
import registerServiceWorker from './registerServiceWorker';

import NewBug from "./components/newBug"
import BugList from "./components/BugList"


const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
    <BrowserRouter basename={baseUrl}>
        <div>
            <Route exact path='/' component={NewBug} />
            <Route exact path='/bugList' component={BugList} />
        </div>
  </BrowserRouter>,
  rootElement);

registerServiceWorker();
