import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { UserInfo } from './user_info';

export class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users:[]
    };
  }

  componentDidMount() {
    fetch("/list_users", {
      method: 'GET',
      headers: {
        "Accept": "application/vnd.api+json; version=1",
        "Authorization": this.props.user.token
      }
    }).then(res => res.json())
      .then(
        (result) => {
          this.setState({
            users: result.users
          });
        },

        (error) => {
          this.setState({
            users: []
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
                  <span className="glyphicon glyphicon-bookmark"></span> Users</h3>
              </div>
              <div className="panel-body">
                <div className="row">

                  <p>Users</p>
                  {
                    this.state.users.map(function(user, i) {
                      return <UserInfo key={i} user={user} ></UserInfo>
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