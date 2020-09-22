import React from "react";
import PropTypes from "prop-types";
import { FormFeedback, FormGroup, Label } from "reactstrap";
import Select from "react-select";
import { ErrorMessage } from "formik";
SelectField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  //
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.array,
};

function SelectField(props) {
  const { field, form, options, type, label, placeholder, disabled } = props;
  const { name, value, onChange, onBlur } = field;

  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  const selectedOption = options.find((option) => option.value === value);

  const handelSelectedOptionChange = (selectedOption) => {
    const selectedValue = selectedOption
      ? selectedOption.value
      : selectedOption;
    const changeEvent = {
      target: {
        name: name,
        value: selectedValue,
      },
    };
    field.onChange(changeEvent);
  };
  return (
    <FormGroup>
      {label && <Label for={name}>{label}</Label>}
      <Select
        id={name}
        //
        name={name}
        value={value}
        onChange={handelSelectedOptionChange}
        onBlur={onBlur}
        //
        options={options}
        disabled={disabled}
        placeholder={placeholder}
        className={showError ? "is-invalid" : ""}
      />
      <ErrorMessage name={name} component={FormFeedback} />
    </FormGroup>
  );
}

export default SelectField;
