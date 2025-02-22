import logo from './logo.svg';
import './App.css';
import { test } from './test';
import Cam from './Cam';
import { alertTitleClasses } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useState } from 'react';
import AppMenuBar from './AppMenuBar';
import Location from './Location';
import AWSPolly from './AWSPolly';
import AWSS3 from './AWSS3';

function App() {

  const [obj, setObj] = useState({text:'',mi:'home'});

  const setValues = (o) => {
    setObj(e=>
      {
        return {...e, ...o}
      })
  }

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
    <>
    <div className="App">
      <AppMenuBar setValues={setValues}/>
      
      {/* Test component */}
      <div style={{padding:"10px", margin:"0", backgroundColor: "#af2a359f" }}>Now time is {new Date().getTime()}.</div>

      {
      obj.mi==='home' 
      &&
      <>
      <div className="App-main-panel">
        <Default />
      </div>
      </> 
      }

      {
      obj.mi==='cam' 
      && 
      <div className="App-main-panel">
        <Cam />
      </div>
      }

      {
      obj.mi==='share' 
      &&
      <>
      <div className="App-main-panel">
        <div class="box"></div>
        <button class="button" onClick={ ()=>{test(setValues, 'share')} }>Share</button>
      </div>
      </> 
      }

      {
      obj.mi==='location' 
      && 
      <>
        <div className="App-main-panel">
          <div class="box"></div>
          <div style={{padding:"10px", margin:"0"}}><br></br>Note: In here location fetched, whole "App" element gets re-render </div>

          { obj.text && <Alert sx={{ color: 'white', ml:"1px", mr:"3px" }} variant="outlined" color="error">{obj.text}</Alert> }
          <div class="box"></div>
          <button class="button" onClick={ ()=>{test(setValues, 'location')} }>Location</button>
        </div>
      </>
      }

      {
      obj.mi==='map' 
      && 
      <Location values={obj} setValues={setValues} />
      }        

      {
      obj.mi==='dial' 
      && 
      <>
      <div className="App-main-panel">
        <div class="box"></div>
        <button class="button" onClick={ ()=>{window.open('tel:'+ '+94771115431')} } > Dial </button>
      </div>
      </>
      }

      {
      obj.mi==='aws-polly' 
      && 
      <>
      <div className="App-main-panel">
        <p>
          AWS <code>src/polly.js</code>
        </p>
      </div>
      <AWSPolly />
      </>
      }

      {
      obj.mi==='aws-s3' 
      && 
      <>
      <div className="App-main-panel">
        <p>
          AWS <code>src/S3.js</code>
        </p>
      </div>
      <AWSS3 />
      </>
      }

    </div>
    </>
  );
}

export default App;
