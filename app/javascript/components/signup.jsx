import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Dropzone from 'react-dropzone';

const renderDropzoneInput = (field) => {
  const files = field.input.value;
  return (
    <div>
      <Dropzone
        name={field.name}
        onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
      >
        <div>Try dropping some files here, or click to select files to upload.</div>
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
    var body = new FormData();
    Object.keys(values.user).forEach(( key ) => {
      body.append(`user[${key}]`, values.user[ key ]);
    });
    console.info('POST', body, values);
    fetch(`/sign_up`, {
      method: 'POST',
      headers: {
        "Accept": "application/vnd.api+json; version=1"
      },
      body: body,
    })
    .catch(error => console.error(error));
  }

  render(){
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div className="form">
        <div className="container">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit(this.submit.bind(this))}>
            <label>Email</label>
            <Field name="user[email]"
                   component="input"
                   type="text"
                   placeholder="Email"
            />
            <label>Username</label>
            <Field name="user[username]"
                   component="input"
                   type="text"
                   placeholder="Username"
            />
            <label>Password</label>
            <Field name="user[password]"
                   component="input"
                   type="password"
                   placeholder="Password"
            />
            <Field
              name="avatar"
              component={renderDropzoneInput}
            />
            <button type="submit" className="blue" disabled={pristine || submitting}>Sign Up</button>
          </form>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'signup'
})(SignUp);