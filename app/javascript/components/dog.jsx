import React, { Component } from 'react';

export class Dog extends Component {

  constructor (props){
    super(props);
    this.addToWishList = this.addToWishList.bind(this);
  }

  addToWishList(){
    window.lol = this.props
    fetch(`/dogs/${this.props.dog.id}/add_wishlist`, {
      method: 'POST',
      headers: {
        "Accept": "application/vnd.api+json; version=1",
        "Authorization": this.props.user.token
      }
    }).then(res => res.json())
      .then(
        (result) => {
          this.props.history.push('/dashboard')
        },
        (error) => {
          alert('Dog already in wishlist')
        }
      )
  }
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
            <div className="text">
              <var>Author: </var>
              <label className="text-muted">{dog.author.username}</label>
            </div>
            {this.props.user ? (
            <div className="options">
              <button onClick={this.addToWishList} className="btn btn-primary btn-lg"><i className="glyphicon glyphicon-plus"></i> Add to Wishlist</button>
            </div>
            ) : (<p></p>)
            }

          </div>
        </div>

      </div>
    );
  }
}