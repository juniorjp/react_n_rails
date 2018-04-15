import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

export const renderDropzoneInput = (field) => {
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