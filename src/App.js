import React from 'react';
import './styles.css';
import Header from './components/header';
import Routes from './routes';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes />
    </div>
  );
};

export default App;
