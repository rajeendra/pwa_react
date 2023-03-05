import logo from './logo.svg';
import './App.css';
import { test } from './test';
import Cam from './Cam';

function App() {

  const Default = () => {
    return (
      <>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>      
      </>
    )
  }

  return (
    <div className="App">
      <header className="App-header">

        {/* <Default /> */}
        <Cam />

        <div class="box"></div>
        <button class="button" onClick={test}>Click</button>
        <div class="box"></div>
        <a href="tel:+99718637334">Call: 99718637334</a>

      </header>
    </div>
  );
}

export default App;
