import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { createDogAction } from '../actions/user_actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { renderDropzoneInput } from '../utils/dropzone_render_utils';


class NewDog extends Component {
  submit = (values) => {
    console.log(values);
    if(Array.isArray(values.dog.avatar)){
      values.dog.avatar = values.dog.avatar[0]
    }

    this.props.createDogAction(values, this.props.history);
  };

  render(){
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div className="form">
        <div className="container">
          <h2>Sign Up</h2>
          <form className="well form-horizontal" onSubmit={handleSubmit(this.submit.bind(this))}>
            <div className="form-group">
              <label className="col-md-4 control-label" >Name</label>

              <div className="col-md-4 inputGroupContainer">
                <div className="input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>

                  <Field name="dog[name]"
                         component="input"
                         type="text"
                         placeholder="Dog name"
                         className="form-control"
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="col-md-4 control-label" >Avatar</label>

              <div className="col-md-4 inputGroupContainer">
                <div className="input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-file"></i></span>

                  <Field name="dog[avatar]"
                         component={renderDropzoneInput}
                  />
                </div>
                <button type="submit" className="form-control" disabled={pristine || submitting}>Sign Up</button>

              </div>

            </div>
            <Link to="/sign_in" className="btn btn-primary">Sign In</Link>

          </form>
        </div>
      </div>
    );
  }
}

const reduxFormNewDog = reduxForm({
  form: 'newdog'
})(NewDog);

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

const mapDispatchToProps = (dispatch) => {
  return {
    createDogAction: (values, history) => dispatch(createDogAction(values, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxFormNewDog);