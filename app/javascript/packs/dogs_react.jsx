import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Signup from '../components/signup';
import Signin from '../components/signin';
import Dashboard from '../components/dashboard';
import protectedResource from '../components/protected';

import {AUTHENTICATED} from '../actions/user_actions';

import { reducer as formReducer, } from 'redux-form';
import authReducer from '../reducers/authentication_reducer';

const reducers = combineReducers({
  form: formReducer,
  auth: authReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

const storedUser = localStorage.getItem('dogs_test_user');
let user = null;
if(storedUser) {
  user =  JSON.parse(storedUser);
  store.dispatch({ type: AUTHENTICATED });
}


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <div>
          <p>Dogs Pinterest App</p>
          <Route exact path="/" component={Signup} />
          <Route path="/sign_up" component={Signup} />
          <Route path="/sign_in" component={Signin} />
          <Route path="/dashboard" component={protectedResource(Dashboard)} />
        </div>
      </Router>
    </Provider>,
    document.querySelector('#dogs-app')
  );
});