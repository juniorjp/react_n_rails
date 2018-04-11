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
    Object.keys(values).forEach(( key ) => {
      body.append(key, values[ key ]);
    });

    console.info('POST', body, values);
    console.info('This is expected to fail:');
    fetch(`/users`, {
      method: 'POST',
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
            <label>First Name</label>
            <Field name="email"
                   component="input"
                   type="text"
                   placeholder="Email"
            />
            <Field name="password"
                   component="input"
                   type="password"
                   placeholder="Password"
            />
            <Field
              name="files"
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