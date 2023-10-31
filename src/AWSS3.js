import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useState, useRef } from 'react';
import ImageCard from './ImageCard';

// AWS Policy: Which Resource, Which action

// This enable the display images to s3 after add the image
// Individual action - s3:PutObject , All the actions - s3:*
// All the resources - "arn:aws:s3:::rajeendra-john-bucket-one/test-photos/*"
// All the Principles - "*"

//   {
//     "Id": "Policy1698516731786",  
//     "Version": "2012-10-17",
//     "Statement": [
//       {
//         "Sid": "Stmt1698516724926",
//         "Action": "s3:*",
//         "Effect": "Allow",
//         "Resource": "arn:aws:s3:::rajeendra-john-bucket-one/test-photos/*",
//         "Principal": "*"
//       }
//     ]
//   }


const AWSS3 = () =>{

    const [album, setAlbum] = useState();
    const [clickTime, setClickTime] = useState(0);

    async function listAlbums() {
        window.s3.listObjects({ Delimiter: "/" }, function(err, data) {
          if (err) {
            return alert("There was an error listing your albums: " + err.message);
          } else {
            var albums = data.CommonPrefixes.map(function(commonPrefix) {
                var prefix = commonPrefix.Prefix;
                var albumName = decodeURIComponent(prefix.replace("/", ""));
                return albumName
            });
          }
        });
    }

    async function viewAlbum() {
        const albumName = 'test-photos'
        
        var albumPhotosKey = encodeURIComponent(albumName) + "/";

        window.s3.listObjects({ Prefix: albumPhotosKey }, function(err, data) {
          if (err) {
            return alert("There was an error viewing your album: " + err.message);
          }
          // 'this' references the AWS.Response instance that represents the response
          var href = this.request.httpRequest.endpoint.href;
          //var bucketUrl = href + albumBucketName + "/";
          var bucketUrl = href + 'rajeendra-john-bucket-one' + "/";
      
          var photos = data.Contents.map(function(photo) {
            // s3://rajeendra-john-bucket-one/test-photos/9c496bbaf.jpg
            // https://s3.amazonaws.com/rajeendra-john-bucket-one/test-photos/9c496bbaf.jpg
            var photoKey = photo.Key;
            var photoUrl = bucketUrl + encodeURIComponent(photoKey);

            return <Photo imageUrl={photoUrl} albumName={albumName} photoKey={photoKey} />
          });
          
          // 
          // setAlbum( photos )
          
          // slicing out first element of the array
          setAlbum( [ ...photos.slice(1) ])
        });
    }

    function addPhoto(photoFileObj) {
        const albumName = 'test-photos'

        // var files = document.getElementById("photoupload").files;
        
        // if (!files.length) {
        //   return alert("Please choose a file to upload first.");
        // }

        // var file = files[0];
        
        var file = photoFileObj;
        var fileName = file.name;
        var albumPhotosKey = encodeURIComponent(albumName) + "/";
        // Ex: test-photos/ +  ij123.jpg  
        var photoKey = albumPhotosKey + fileName;
      
        window.awsS3upload(
            {
                Bucket: 'rajeendra-john-bucket-one',
                Key: photoKey,
                Body: file
            }, 
            viewAlbum
        )
    }

    const filePickerRef = useRef(null);

    const handleClick = () => {
      //  This is how programmatically click on component: Here click on the <input> element   
      // 👇️ open file input box on click of the button
      filePickerRef.current.click();
    };
  
    const handleFileChange = event => {
      const fileObj = event.target.files && event.target.files[0];
      if (!fileObj) {
        return;
      }
  
      console.log('fileObj is', fileObj);
  
      // 👇️ reset file input
      event.target.value = null;
  
      // 👇️ is now empty
      console.log(event.target.files);
  
      // 👇️ can still access file object here
      console.log(fileObj);
      console.log(fileObj.name);

      addPhoto(fileObj);
    };

    function deletePhoto(event, albumName, photoKey) {
        const now = new Date().getTime();
        const gap = now - clickTime - 0;
        //console.log(gap)
        setClickTime(now)

        // double click
        //if(gap<250){
            window.s3.deleteObject({ Key: photoKey }, function(err, data) {
              if (err) {
                return alert("There was an error deleting your photo: ", err.message);
              }
              //alert("Successfully deleted photo.");
              viewAlbum();
            });
        //}

    }
      
    const Photo = (props) => {
        return(
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center'}}  >
                <ImageCard width={'125px'} height={'125px'} src={props.imageUrl} albumName={props.albumName} photoKey={props.photoKey} clickCross={deletePhoto} />
            </Grid>
        )
    }

    return(
        <>
        <Box sx={{ flexGrow: 1, m:3 }}>
        <Grid container spacing={2}>
            <Grid item xs={12}  sx={{ display: 'flex', justifyContent: 'center'}}>
                <button class="button" onClick={viewAlbum}> S3 Refresh</button>
            </Grid>
            <Grid item xs={12}  sx={{ display: 'flex', justifyContent: 'center'}}>
                <div>
                    <input
                        style={{display: 'none'}}
                        ref={filePickerRef}
                        type="file"
                        onChange={handleFileChange}
                    />

                    <button class="button" onClick={handleClick}>S3 Add</button>
                </div>            
            </Grid>
            {album}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>
            </Grid>
        </Grid>
        </Box>
        </>
    )
}

export default AWSS3
