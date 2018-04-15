import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class UserInfo extends Component {

  render(){
    const { user } = this.props;
    return (
      <div className="col-xs-6 col-md-6">
        <div className="col-xs-6">
          <div className="hero-widget well well-sm">
            <img src={user.avatar_url} className="img-thumbnail" />
            <div className="text">
              <var>Name: </var>
              <label className="text-muted">{user.username}</label>
            </div>
            <div className="options">
              <Link to={{pathname:`/user_wishlist/${user.id}`, state: {queryUser: user.id}}} className="btn btn-primary btn-lg"><i className="glyphicon glyphicon-plus"></i> See Wishlist</Link>
            </div>
          </div>
        </div>

      </div>
    );
  }
}