import logo from './logo.svg';
import './App.css';
import { test } from './test';
import Cam from './Cam';
import { alertTitleClasses } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useState } from 'react';
import AppMenuBar from './AppMenuBar';
import Location from './Location';
// import useAuth from "../../iam/hooks/useAuth";

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
    <div className="App">
      <AppMenuBar setValues={setValues}/>
      <header className="App-header">
        {
          obj.text 
          && 
          <>
          <div class="box"></div>
          <Alert sx={{ color: 'white' }} variant="outlined" color="error">{obj.text}</Alert>
          </>
        }

        {
        obj.mi==='home' 
        &&
        <>
        <Default />
        </> 
        }

        {
        obj.mi==='cam' 
        && 
        <Cam />
        }

        {
        obj.mi==='share' 
        &&
        <>
        <div class="box"></div>
        <button class="button" onClick={ ()=>{test(setValues, 'share')} }>Share</button>
        </> 
        }

        {
        obj.mi==='location' 
        && 
        <>
        <div class="box"></div>
        <button class="button" onClick={ ()=>{test(setValues, 'location')} }>Location</button>
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
        <div class="box"></div>
        <button class="button" onClick={ ()=>{window.open('tel:'+ '+94771115431')} } > Dial </button>
        </>
        }

        {/* <a href="tel:+99718637334">Call: 99718637334</a> */}

      </header>
    </div>
  );
}

export default App;
