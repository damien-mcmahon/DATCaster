import React from 'react';

const FormField = ({inputType, label, onChange }) => (
  <div className="form-field__wrapper">
    <label>{label}</label>
    <input type={inputType} onChange={onChange} />
  </div>
);

export default FormField
