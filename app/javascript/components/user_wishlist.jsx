import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dog } from './dog';

export class UserWishlist extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      dogs:[]
    };
  }

  componentDidMount() {
    fetch(`/dogs?user_id=${this.props.location.state.queryUser}`, {
      method: 'GET',
      headers: {
        "Accept": "application/vnd.api+json; version=1",
        "Authorization": this.props.user.token
      }
    }).then(res => res.json())
      .then(
        (result) => {
          this.setState({
            dogs: result.dogs
          });
        },

        (error) => {
          this.setState({
            dogs: []
          });
        }
      )
  }

  render(){
    const { user, history } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title">
                  <span className="glyphicon glyphicon-bookmark"></span>Wishlist</h3>
              </div>
              <div className="panel-body">
                <div className="row">

                  {
                    this.state.dogs.map(function(dog, i) {
                      return <Dog key={i} dog={dog} user={user} history={history}></Dog>
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