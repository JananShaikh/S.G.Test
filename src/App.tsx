import React from 'react';
import './App.scss';  // Ensure this is imported to style the layout
import Menu from './components/Menu';

const App: React.FC = () => {
  return (
    <div className="App">
      <Menu />
      <div className="right-buttons">
        <button>Share</button>
        <button>Version</button>
      </div>
    </div>
  );
};

export default App;

