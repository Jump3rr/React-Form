import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector } from "redux-form";

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
        <label>Name: </label>
          <Field
            name="firstName"
            component="input"
            type="text"
            placeholder="Name"
          />
      </div>
      <div>
        <label>Preparation time: </label>
        <Field name="preparation_time" component="input" type="time" step='1' placeholder="time" />
      </div>
     <div>
        <label>Type: </label>
          <Field name="dishType" component="select">
            <option />
            <option value="pizza">Pizza</option>
            <option value="soup">Soup</option>
            <option value="sandwich">Sandwich</option>
          </Field>
      </div>
      {dishTypeValue === "pizza" && (
        <div>
        <div>
          <label>Number of slices: </label>
          <Field name="no_of_slices" component="input" type="number" />
        </div>
        <div>
          <label>Diameter: </label>
          <Field name="diameter" component="input" type="number" step="0.01" />
        </div>
        </div>
      )}
      {dishTypeValue === "soup" && (
        <div>
          <label>Spiciness scale: </label>
          <Field name="spiciness_scale" component="input" type="range" min="1" max="10" step="1" />
        </div>
      )}
      {dishTypeValue === "sandwich" && (
        <div>
          <label>Slices of bread: </label>
          <Field name="slices_of_bread" component="input" type="number" />
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
  form: "mainForm"
})(MainForm);

const selector = formValueSelector("mainForm");
MainForm = connect((state) => {
  const dishTypeValue = selector(state, "dishType");
  return {
    dishTypeValue,
  };
})(MainForm);

export default MainForm;
