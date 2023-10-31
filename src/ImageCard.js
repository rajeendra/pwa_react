import Box from '@mui/material/Box';
import { Card } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const ImageCard = (props) =>{

    const clickCross = (event) =>{
        //console.log('clickCross')
        props.clickCross(event, props.albumName, props.photoKey)
    }
    
    return(<>
        <Card sx={{ maxWidth: props.width }}>
        <Box sx={{ position: 'relative' }}>
            <CardMedia
                component="img"
                height={props.height}
                width={props.width}
                //image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                image={props.src}
            />
            <a href="#.">
                <Box
                    sx={{
                        position: 'absolute',
                        //bottom: 0,
                        top: 0,
                        //left: 0,
                        right: 0,
                        //bgcolor: 'rgba(0, 0, 0, 0.54)',
                        color: 'white',
                        padding: '10px',
                    }}
                    onClick={(event) => {clickCross(event)} }
                >
                    <Typography variant="body2">X</Typography>
                </Box>
            </a>
        </Box>
        </Card>                
    </>)
}

export default ImageCard