import React, { Component } from 'react';
import { connect } from 'react-redux'
import {compose} from "redux";

function protectedResource(WrappedComponent) {
  // ...and returns another component...
  return class AuthenticatedComponent extends React.Component {
    constructor(props) {
      super(props);
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.history.push('/');
      }
    }

    render() {

      return <WrappedComponent {...this.props} />;
    }
  };

}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

const composedHoc = compose(
  connect(mapStateToProps),
  protectedResource
);

export default composedHoc;



