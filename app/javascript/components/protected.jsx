import React, { Component } from 'react';
import { connect } from 'react-redux'
import {compose} from "redux";

function protectedResource(WrappedComponent) {
  // ...and returns another component...
  return class AuthenticatedComponent extends React.Component {
    constructor(props) {
      super(props);
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.history.push('/sign_in');
      }
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.history.push('/sign_in');
      }
    }

    render() {

      return <WrappedComponent {...this.props} />;
    }
  };

}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated, user: state.auth.user || {} };
}

const composedHoc = compose(
  connect(mapStateToProps),
  protectedResource
);

export default composedHoc;



