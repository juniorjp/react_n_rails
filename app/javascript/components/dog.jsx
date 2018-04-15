import React, { Component } from 'react';

export class Dog extends Component {

  render(){
    const { dog } = this.props;
    return (
      <div className="col-xs-6 col-md-6">
        <div className="col-xs-6">
          <div className="hero-widget well well-sm">
            <img src={dog.avatar_url} className="img-thumbnail" />
            <div className="text">
              <var>Name: </var>
              <label className="text-muted">{dog.name}</label>
            </div>
            <div className="options">
              <a href="" className="btn btn-primary btn-lg"><i className="glyphicon glyphicon-plus"></i> Details</a>
            </div>
          </div>
        </div>

      </div>
    );
  }
}