import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myDogs:[]
    };
  }

  render(){
    const { user } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title">
                  <span className="glyphicon glyphicon-bookmark"></span> Dashboard</h3>
              </div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-xs-6">
                    <div className="hero-widget well well-xs">
                      <img src={user.avatar_url} className="img-rounded" />
                      <div className="text">
                        <var>Welcome </var>
                        <label className="text-muted">{user.username}</label>
                      </div>
                      <div className="options">
                        <Link to="/dogs/new" className="btn btn-success btn-lg"><i className="glyphicon glyphicon-plus"></i> Add a dog to wishlist</Link>
                      </div>
                    </div>
                  </div>
                  <p>My dogs</p>
                  {
                    this.state.myDogs.map(function(dog) {
                      return <Dog dog={dog}></Dog>
                    })
                  }
                  <div className="col-xs-6 col-md-6">
                    <div className="col-xs-6">
                      <div className="hero-widget well well-sm">
                        <img src={user.avatar_url} className="img-thumbnail" />
                        <div className="text">
                          <var>Welcome </var>
                          <label className="text-muted">{user.username}</label>
                        </div>
                        <div className="options">
                          <a href="" className="btn btn-primary btn-lg"><i className="glyphicon glyphicon-plus"></i> Details</a>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Dashboard);