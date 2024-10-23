import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';


const AWSPolly = () =>{

    const speakText = async () => {
        const speechText = document.getElementById("textEntry").value;

        const amazonCallbackFunction = (error, url) => {
            if (error) {
                //reject({error,url})
            } else {
                document.getElementById('audioSource').src = url;
                document.getElementById('audioPlayback').load();
                document.getElementById('result').innerHTML = "Speech ready to play.";
            }
        }

        window.awsHelper(speechText, amazonCallbackFunction)
    }

    return(
        <>
        <Box sx={{ flexGrow: 1, m:3 }}>
        <Grid container spacing={2}>
            <Grid item xs={12}  >
                <TextField fullWidth id="textEntry" label="Enter text here and then click Synthesize " variant="outlined" sx={{ backgroundColor: "white"}} />
            </Grid>
            <Grid item xs={12}  sx={{ display: 'flex', justifyContent: 'center'}}>
                <button class="button" onClick={speakText}> Synthesize</button>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>
                <p id="result"></p>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>
                <audio id="audioPlayback" controls>
                <source id="audioSource" type="audio/mp3" src="" />
                </audio>
            </Grid>
        </Grid>
        </Box>
        </>
    )
}

export default AWSPolly