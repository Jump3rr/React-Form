import react from 'react';
import {Field, reduxForm } from 'redux-form';

const MainForm = (props:any) => {
  const {handleSubmit, pristine, reset, submitting } = props


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name: </label>
        <Field name="name" component="input" type="text" placeholder="Name" />
      </div>
      <div>
        <label>Preparation time: </label>
        <Field name="preparation_time" component="input" type="time" step='1' placeholder="time" />
      </div>
      <div>
        <label>Type: </label>
        <Field name="type" component="select">
          <option value="pizza">Pizza</option>
          <option value="soup">Soup</option>
          <option value="sandwich">Sandwich</option>
        </Field>
      </div>
      <div>
        <label>Slices</label>
        <Field name="slices" component="input" type="number" />
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'mainForm'
})(MainForm)
