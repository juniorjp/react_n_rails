import React, { Component } from 'react';

class Dog extends Component {

  render(){
    const { dog } = this.props;
    return (
     <p>{dog.name}</p>
    );
  }
}
function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Dashboard);