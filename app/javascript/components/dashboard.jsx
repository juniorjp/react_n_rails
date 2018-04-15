import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dog } from './dog';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myDogs:[]
    };
  }

  componentDidMount() {
    fetch("/dogs", {
      method: 'GET',
      headers: {
        "Accept": "application/vnd.api+json; version=1",
        "Authorization": this.props.user.token
      }
    }).then(res => res.json())
      .then(
        (result) => {
          this.setState({
            myDogs: result.dogs
          });
        },

        (error) => {
          this.setState({
            myDogs: []
          });
        }
      )
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
                        <Link to="/new_dog" className="btn btn-success btn-lg"><i className="glyphicon glyphicon-plus"></i> Add a dog to wishlist</Link>
                        <Link to="/users" style={{marginLeft: '10px'}} className="btn btn-primary btn-lg"><i className="glyphicon glyphicon-plus"></i> Check users</Link>
                      </div>
                    </div>
                  </div>
                  <p>My dogs</p>
                  {
                    this.state.myDogs.map(function(dog, i) {
                      return <Dog key={i} dog={dog}></Dog>
                    })
                  }

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