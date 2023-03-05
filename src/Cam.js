import { useState } from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';

const styles = {
    root: {
      height: "100%",
      textAlign: 'center',
    },
    imgBox: {
      maxWidth: "80%",
      maxHeight: "80%",
      // margin: "10px"
    },
    img: {
      height: "inherit",
      maxWidth: "inherit",
    },
    input: {
      display: "none"
    }
};

function Cam() {
  
  const [source, setSource] = useState("");
  
  const handleCapture = (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        setSource(newUrl);
      }
    }
  };
  
  return (
    <Box sx={{ flexDirection: 'column', display: 'flex', alignItems: 'center',}}>

        <h5>Capture your image</h5>

        <input
          accept="image/*"
          style={styles.input}
          id="icon-button-file"
          type="file"
          capture="environment"
          onChange={(e) => handleCapture(e.target)}
        />

        <label htmlFor="icon-button-file">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <CameraAltIcon fontSize="large" color="primary" />
          </IconButton>
        </label>

        {
          source 
          &&
          <Box border={2} style={styles.imgBox} sx={{ flexDirection: 'column', display: 'flex',alignItems: 'center'}}>
            <img src={source} alt={"snap"} style={styles.img}></img>
          </Box>
        }
    </Box>
  );
}
export default Cam;