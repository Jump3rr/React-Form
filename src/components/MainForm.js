import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector, reset } from "redux-form";
import styled from 'styled-components';

const MainWrapper = styled.div`
  width: auto;
  height: auto;
`;

const Button = styled.button`
  margin: 1vw;
  padding: 8px;
  background: none;
  border-style: solid;
  border-color: #fff;
  border-radius: 20px;
  transition: 1s;
  color: #fff;

  &:hover, &:focus {
    background: #8597a3;
    color: #000;
    box-shadow: 0 0 10pt 0.5pt #8597a3;

  }
  &:active {
    background-color: #fff;
    box-shadow: 0 0 2pt 0.5pt #8597a3;
    color: #000000;
    transition: 0.2s;
  }
`;


const Form = styled.form`
  width: 100%;
  position: relative;
`;

const Label = styled.label`
  color: white;
  font-size: 20px;
  display: flex;
  margin-top: 5vh;
`;
const RequiredMsg = styled.div`
  color: #ff0000;
  font-size: 0.7em;
`;
const Input = styled.input`
  padding-top: 10px;
  margin-top: 10px;
  border: 0;
  background-color: transparent;
  border-bottom: 2px solid #eee;
  font: inherit;
  font-size: 14px;
  font-weight: 30px;
  transition: 0.5s;
  color: #8597a3;
  text-align: center;
  &::-webkit-calendar-picker-indicator {
    filter: invert(1);
}

  &:focus {
    outline: 0;
    border-bottom-color: blue;
    color: #fff;
  }
`;
const Select = styled.select`
  background-color: #fff;
  border: none;
  transition: 0.7s;
  color: #8597a3;

  &:hover, &:focus {
    background-color: #8597a3;
    color: white;
  }
`;

const required = value => value ? undefined : 'Required!';

const afterSubmit = (result, dispatch) => dispatch(reset('mainForm'));

const renderField = ({ input, label, type, step, min, max, meta: { touched, error } }) => (
  <div>
    <Label>{label}</Label>
    <div>
      <Input {...input} placeholder={label} type={type} step={step} min={min} max={max}/>
      {touched && ((error && <RequiredMsg>{error}</RequiredMsg>))}
    </div>
  </div>
)

const renderSelectField = ({ input, label, meta: { touched, error }, children }) => (
  <div>
    <Label>{label}</Label>
    <div>
      <Select {...input}>
        {children}
      </Select>
      {touched && error && <RequiredMsg>{error}</RequiredMsg>}
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
    <MainWrapper>
    <Form onSubmit={handleSubmit}>
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
              min="1"
              max="100000000000000000000"
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
              min="0.000001"
              max="100000000000000000000"
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
            min="1"
            max="100000000000000000000"
            parse={(newValue) => Number.parseInt(newValue)}
            validate={required}
          />
        </div>
      )}
      <div>
        <Button type="submit" disabled={pristine || submitting}>
          Submit
        </Button>
        <Button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </Button>
      </div>
    </Form>
    </MainWrapper>
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
