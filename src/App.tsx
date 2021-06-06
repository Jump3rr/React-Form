import React from 'react';
import './App.css';
import MainForm from './components/MainForm';
import showResults from './showResults';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MainForm onSubmit={showResults}/>
      </header>
    </div>
  );
}

export default App;
