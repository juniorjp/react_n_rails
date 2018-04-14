import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Dropzone from 'react-dropzone';
import { signUpAction } from '../actions/user_actions';
import { connect } from 'react-redux';

const renderDropzoneInput = (field) => {
  const files = field.input.value;
  return (
    <div>
      <Dropzone
        name={field.name}
        onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
      >
        <div>Choose an Avatar</div>
      </Dropzone>
      {field.meta.touched &&
      field.meta.error &&
      <span className="error">{field.meta.error}</span>}
      {files && Array.isArray(files) && (
        <ul>
          { files.map((file, i) => <li key={i}>{file.name}</li>) }
        </ul>
      )}
    </div>
  );
};


class SignUp extends Component {
  submit = (values) => {
    console.log(values);
    if(Array.isArray(values.user.avatar)){
      values.user.avatar = values.user.avatar[0]
    }

    this.props.signUpAction(values, this.props.history);
  };

  render(){
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div className="form">
        <div className="container">
          <h2>Sign Up</h2>
          <form className="well form-horizontal" onSubmit={handleSubmit(this.submit.bind(this))}>
            <div className="form-group">
              <label className="col-md-4 control-label" >Email</label>

              <div className="col-md-4 inputGroupContainer">
                <div className="input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>

                  <Field name="user[email]"
                         component="input"
                         type="text"
                         placeholder="Email"
                         className="form-control"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-4 control-label" >Username</label>

              <div className="col-md-4 inputGroupContainer">
                <div className="input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>

                  <Field name="user[username]"
                         component="input"
                         type="text"
                         placeholder="Username"
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
              </div>
            </div>

            <div className="form-group">
              <label className="col-md-4 control-label" >Avatar</label>

              <div className="col-md-4 inputGroupContainer">
                <div className="input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-file"></i></span>

                  <Field name="user[avatar]"
                         component={renderDropzoneInput}
                  />
                </div>
                <button type="submit" className="form-control" disabled={pristine || submitting}>Sign Up</button>

              </div>

            </div>
            <a href="/sign_in" class="btn btn-primary">Sign In</a>

          </form>
        </div>
      </div>
    );
  }
}

const reduxFormSignup = reduxForm({
  form: 'signup'
})(SignUp);

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUpAction: (values, history) => dispatch(signUpAction(values, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxFormSignup);