import React from 'react';
import { reduxForm } from 'redux-form';
import './App.css';
import MainForm from './components/MainForm';

const handleSubmit = (data:any) => {
  fetch('https://frosty-wood-6558.getsandbox.com:443/dishes', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: (`${JSON.stringify(data)}`)
  })

  .then((response) => {
    response.json()
    .then((data) => {
        console.log(data);
    });
  })
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MainForm onSubmit={handleSubmit}/>
      </header>
    </div>
  );
}

export default App;
