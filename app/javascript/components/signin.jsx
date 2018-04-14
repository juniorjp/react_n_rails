import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { signUpAction } from '../actions/user_actions';
import { connect } from 'react-redux';


class SignIn extends Component {
  submit = (values) => {
    this.props.signinAction(values, this.props.history);
  };

  render(){
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div className="form">
        <div className="container">
          <h2>Login</h2>
          <form className="well form-horizontal" onSubmit={handleSubmit(this.submit.bind(this))}>
            <div className="form-group">
              <label className="col-md-4 control-label" >Login</label>

              <div className="col-md-4 inputGroupContainer">
                <div className="input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>

                  <Field name="user[login]"
                         component="input"
                         type="text"
                         placeholder="Email or Username"
                         className="form-control"
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="col-md-4 control-label" >Password</label>

              <div className="col-md-4 inputGroupContainer">
                <div className="input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>

                  <Field name="ser[password]"
                         component="input"
                         type="password"
                         placeholder="Password"
                         className="form-control"
                  />
                </div>
                <button type="submit" className="form-control" disabled={pristine || submitting}>Login</button>

              </div>
            </div>

          </form>
        </div>
      </div>
    );
  }
}

const reduxFormSignin = reduxForm({
  form: 'signin'
})(SignIn);

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

const mapDispatchToProps = (dispatch) => {
  return {
    signinAction: (values, history) => dispatch(signUpAction(values, history, '/sign_in'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxFormSignin);