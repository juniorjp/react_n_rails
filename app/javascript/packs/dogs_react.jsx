import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Signup from '../components/signup';
import { reducer as formReducer, } from 'redux-form';
import authReducer from '../reducers/authentication_reducer';

const reducers = combineReducers({
  form: formReducer,
  auth: authReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <div>
          <p>Dogs Pinterest App</p>
          <Route exact path="/" component={Signup} />
          <Route path="/signup" component={Signup} />
        </div>
      </Router>
    </Provider>,
    document.querySelector('#dogs-app')
  );
});