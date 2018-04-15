import React, { Component } from 'react';
import { connect } from 'react-redux';


class Dashboard extends Component {

  render(){
    return (
      <p>Oi eu sou o Goku</p>
    );
  }
}
function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Dashboard);