import { render } from "@testing-library/react";
import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector, reset } from "redux-form";

const required = value => value ? undefined : 'Required';

const afterSubmit = (result, dispatch) => dispatch(reset('mainForm'));

const renderField = ({ input, label, type, step, min, max, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} step={step} min={min} max={max}/>
      {touched && ((error && <span>{error}</span>))}
    </div>
  </div>
)

const renderSelectField = ({ input, label, meta: { touched, error }, children }) => (
  <div>
    <label>{label}</label>
    <div>
      <select {...input}>
        {children}
      </select>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

let MainForm = (props) => {
  const {
    dishTypeValue,
    handleSubmit,
    pristine,
    reset,
    submitting
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          name="name"
          type="text"
          component={renderField}
          label="Name"
          validate={required}
        />
      </div>
      <div>
        <Field
          label="Preparation time"
          name="preparation_time"
          component={renderField}
          type="time"
          step="1"
          validate={required}
        />
      </div>
      <div>
        <Field
          name="type"
          label="Type"
          component={renderSelectField}
          validate={required}
        >
          <option />
          <option value="pizza">Pizza</option>
          <option value="soup">Soup</option>
          <option value="sandwich">Sandwich</option>
        </Field>
      </div>
      {dishTypeValue === "pizza" && (
        <div>
          <div>
            <Field
              name="no_of_slices"
              label="Number of slices"
              component={renderField}
              type="number"
              parse={(newValue) => Number.parseInt(newValue)}
              validate={required}
            />
          </div>
          <div>
            <Field
              name="diameter"
              label="Diameter"
              component={renderField}
              type="number"
              step="any"
              parse={(newValue) => Number.parseFloat(newValue)}
              validate={required}
            />
          </div>
        </div>
      )}
      {dishTypeValue === "soup" && (
        <div>
          <Field
            name="spiciness_scale"
            label="Spiciness scale"
            component={renderField}
            type="range"
            min="1"
            max="10"
            step="1"
            parse={(newValue) => Number.parseInt(newValue)}
            validate={required}
          />
        </div>
      )}
      {dishTypeValue === "sandwich" && (
        <div>
          <Field
            name="slices_of_bread"
            label="Slices of bread"
            component={renderField}
            type="number"
            parse={(newValue) => Number.parseInt(newValue)}
            validate={required}
          />
        </div>
      )}
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

MainForm = reduxForm({
  form: "mainForm",
  onSubmitSuccess: afterSubmit
})(MainForm);

const selector = formValueSelector("mainForm");
MainForm = connect((state) => {
  const dishTypeValue = selector(state, "type");
  return {
    dishTypeValue,
  };
})(MainForm);

export default MainForm;
