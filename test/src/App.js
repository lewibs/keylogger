import logo from './logo.svg';
import './App.css';
import React from 'react';
import {globalinstance} from 'lewibs-keylogger';

function App() {
  const [toggle, setToggle] = React.useState(false);
  const lastHistory = globalinstance.history[globalinstance.history.length - 1] || {};

  React.useEffect(()=>{
    window.addEventListener("keydown", ()=>{
      console.log("window: ", globalinstance);
      setToggle(p=>!p);
    });

    window.addEventListener("keyup", ()=>{
      console.log("window: ", globalinstance);
      setToggle(p=>!p);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Try pressing some keys:
        </p>
        <div>
          current keys
          <p>
            {JSON.stringify(globalinstance.pressed)}
          </p>
        </div>
        <br/>
        <div>
          last key press:
          <p>
            pressed keys: {JSON.stringify(lastHistory.pressedKeys)}
          </p>
          <p>
            time: {JSON.stringify(lastHistory.time)}
          </p>
          <p>
            event: {JSON.stringify(lastHistory.event)}
          </p>
        </div>
      </header>
    </div>
  );
}

export default App;
