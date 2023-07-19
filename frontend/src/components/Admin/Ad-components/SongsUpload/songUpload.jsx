import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import './songsupload.css'
import { TfiVideoClapper } from 'react-icons/tfi'
import { BsMusicNoteBeamed } from 'react-icons/bs'
import { IoAdd, IoSend } from 'react-icons/io5'
import { Box, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import LoadingButton from '@mui/lab/LoadingButton';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../../../firebase'
import {clearErrors,getAllArtist}from '../../../../actions/artistAction'
import {getAllGenre,createSong}from '../../../../actions/songAction'
import { useDispatch, useSelector } from 'react-redux';
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));
function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', width: '80%', height: '90px', marginTop: '16px', background: "aliceblue", justifyContent: "space-evenly" }}>
            <Box>
                <TfiVideoClapper style={{ color: "#605e5e", background: "white", fontSize: '30px' }} />
            </Box>
            <Box sx={{ width: '90%' }}>
                <Box >
                    <Typography variant='body1' color='text.primary' >
                        {props.title}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <Box sx={{ mr: 1, width: '100%' }}>
                        <BorderLinearProgress variant="determinate" {...props} />
                    </Box>
                    <Box sx={{ minWidth: 35 }}>
                        <Typography variant="body2" color="text.secondary">{`${Math.round(
                            props.value,
                        )}%`}</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
LinearProgressWithLabel.propTypes = {

    value: PropTypes.number.isRequired,
};

const ColorButton = styled(LoadingButton)(({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: 'none',
    lineHeight: 1.5,
    backgroundColor: '#FFDE59',
    borderColor: '#FFDE59',
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
    ].join(','),
    '&:hover': {
        backgroundColor: '#ffe57e',
        borderColor: 'none',
        boxShadow: 'none',
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: '#ffe57e',
        borderColor: 'none',
    },
    '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
}));
function SongUpload() {
    const [songId, setSongInd] = useState({})
    const [genreId, setGenre] = useState([])
    const [img, setImg] = useState('');
    const [video, setVideo] = useState('');
    const [imgPerc, setImgPerc] = useState(null);
    const [videoPerc, setVideoPerc] = useState(null);
    const [song, setSong] = useState({
        songname:'',
        thumbnail:'',
        songUrl:''
    })

    const {songname,thumbnail,songUrl}= song
    const dispatch = useDispatch()
    const {loading ,error,artists} = useSelector((state)=>state.allArtist)
    const {loading2 ,error2,genre} = useSelector((state)=>state.allGenre)
    const {loadingbtn} = useSelector((state)=>state.song)
  
    const handlechange =(e)=>{
      setSong({...song,[e.target.name]: e.target.value})
    }
    const uploadsong = (e) => {
       e.preventDefault();
    const myform = new FormData();
    myform.set('songName', songname);
    myform.set('thumbnail', thumbnail);
    myform.set('songUrl', songUrl);
    myform.set("ArtistsList", songId);
    myform.set("Genre", genreId);
    console.log(myform)
    dispatch(createSong(myform))
    }
    useEffect(()=>{
        if(error || error2 ){
            dispatch(clearErrors())
        }
        dispatch(getAllArtist())
        dispatch(getAllGenre())
    },[dispatch,error,error2])
    useEffect(() => {
        const uploadfile = () => {
            const fileName = new Date().getTime() + img.name;
            const storageRef = ref(storage, `thumbnail/${fileName} `);
            const uploadTask = uploadBytesResumable(storageRef, img);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.floor(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setImgPerc(progress)
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                        default:
                            break;
                    }
                },
                (error) => { },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setSong((prev) => {
                            return { ...prev, thumbnail: downloadURL };
                        });
                    });
                }
            );
        }
        img && uploadfile()
    }, [img])

    useEffect(() => {
        const uploadfilemedia = () => {
            const fileName = new Date().getTime() + video.name;
            const storageRef = ref(storage, `songs/${fileName} `);
            const uploadTask = uploadBytesResumable(storageRef, video);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.floor(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setVideoPerc(progress)
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                        default:
                            break;
                    }
                },
                (error) => { },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setSong((prev) => {
                            return { ...prev, songUrl: downloadURL };
                        });
                    });
                }
            );
        }
        video && uploadfilemedia()
    }, [video])



    const handleInput = (newValue) => {
        setSongInd(newValue)

    }
    console.log(songId)
    const handlegenre = (newValue) => {
        setGenre(newValue)

    }
    return (
        <>
            <div className="songUploadWrapper">
                <div className="mediaUpload">
                    <Button variant="text" component="label" sx={{ height: 150, border: '3px dashed grey', boxShadow: 'none' }} className="mediaUploadCard">
                        <input hidden type="file" accept='video/*,audio/*' onChange={(e) => (setVideo(e.target.files[0]))} />
                        <span className='upload-icon'>
                            Upload Your Music Here
                        </span>
                        <IoAdd className='upload-icon' />
                    </Button>
                    {videoPerc !== null && videoPerc < 100 ?

                    <LinearProgressWithLabel title={video.name} value={videoPerc} />


                     :<>{videoPerc===100? <LinearProgressWithLabel title={video.name} value={videoPerc} />
                    :<></>}</>} 

                </div>

                <div className="musicUpload-wrapper">
                    <div className="fileUpload">
                        {
                            imgPerc !== null && imgPerc < 100 ?
                                <>
                                    {img ? <div className="previewImage">
                                        <img
                                            src={URL.createObjectURL(img)}
                                            alt="" style={{ opacity: 0.5, height: '15rem', width: '15rm', borderRadius: '4px', marginBottom: '10px' }} />
                                        <CircularProgress sx={{
                                            position: 'absolute', left: "82px", top: "82px", color: '#FFDE59'
                                        }} value={imgPerc} variant="determinate" />
                                        <span style={{ position: 'absolute', top: '90px', left: '82px', color: '#FFDE59', fontWeight: 'bold' }}>{`${imgPerc}%`}</span>

                                    </div> :
                                        <Card sx={{ Width: 275, height: '15rem', background: '#a1c9d1', cursor: 'pointer', boxShadow: 'none' }} className='uploadCard'>
                                            <BsMusicNoteBeamed className='uploadIcon' />
                                        </Card>}
                                </>
                                :
                                <>
                                    {img ?  <div className="previewImage"><img
                                        src={URL.createObjectURL(img)}
                                        alt="" style={{ height: '15rem', width: '15rem',objectFit:'cover', borderRadius: '4px', marginBottom: '10px' }} /></div> : <Card sx={{ Width: 275, height: '15rem', background: '#a1c9d1', cursor: 'pointer', boxShadow: 'none' }} className='uploadCard'>
                                        <BsMusicNoteBeamed className='uploadIcon' />
                                    </Card>}
                                </>
                        }
                        <Button color='secondary' variant="contained" component="label">
                            <span style={{ color: 'white' }}>  Add Thumbnail </span>
                            <input hidden accept="image/*" multiple type="file" onChange={(e) => (setImg(e.target.files[0]))} />
                        </Button>
                    </div>
                    <div className="songUploadDetails">
                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>

                            <TextField
                                id="filled-multiline-flexible"
                                label="Name of Music"
                                name='songName'
                                variant="filled"
                                defaultValue={songname}
                                onChange={handlechange}
                                sx={{ width: 650 }}
                            />
                            <div>
                                <Autocomplete
                                    multiple
                                    limitTags={2}
                                    isOptionEqualToValue={(option, value)=>option._id === value._id}
                                    getOptionSelected={(option, value) => option.id === value.id}
                                    id="multiple-limit-tags"
                                    getOptionLabel={(artists) => artists.artistInfo.name}
                                    options={artists}
                                    loading={loading}
                                    inputValue={songId._id}
                                    renderOption={(props,option)=>(
                                        <Box component="li" sx={{ '& > Avatar': { mr: 2, flexShrink: 0 } }} {...props}  key={option._id}>
                                            <Avatar alt="profile" sx={{ width: 24, height: 24 ,mr:2}} src={option.artistInfo.Avatar} />
                                            {option.artistInfo.name}
                                        </Box>
                                     )}
                                    onChange={(event, newValue) => { handleInput(newValue) }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Add Artist" InputProps={{
                                            ...params.InputProps,
                                            endAdornment: (
                                                <React.Fragment>
                                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                    {params.InputProps.endAdornment}
                                                </React.Fragment>

                                            ),
                                        }} />
                                    )}
                                    sx={{ width: '400px', marginTop: '1rem' }}
                                />
                            </div>
                            <div>
                                <Autocomplete
                                    multiple
                                    isOptionEqualToValue={(option, value)=>option._id === value._id}
                                    limitTags={1}
                                    id="multiple-limit-tags"
                                    getOptionLabel={(genre) => genre.genreName}
                                    options={genre}
                                    loading={loading2}
                                    onChange={(event, newValue) => { handlegenre(newValue) }}
                                    renderOption={(props,option)=>(
                                        <Box component="li" sx={{ '& > Avatar': { mr: 2, flexShrink: 0 } }} {...props}  key={option._id}>
                                            {option.genreName}
                                        </Box>
                                     )}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Add genre" InputProps={{
                                            ...params.InputProps,
                                            endAdornment: (
                                                <React.Fragment>
                                                    {loading2 ? <CircularProgress color="inherit" size={20} /> : null}
                                                    {params.InputProps.endAdornment}
                                                </React.Fragment>
                                            ),
                                        }} />
                                    )}
                                    sx={{ width: '235px', marginTop: '1rem', marginLeft: '1rem' }}
                                />
                            </div>
                        </Box>
                    </div>
                    <div className="uploadMusic-btn">
                        <Box sx={{ '& > button': { m: 1 } }}>
                            <ColorButton
                                onClick={uploadsong}
                                loading={loadingbtn}
                                endIcon={<IoSend style={{ color: 'white', }} />}
                                loadingPosition="end"
                                variant="contained"
                                sx={{ hover: '#FFDE59' }}
                                color="secondary"
                            >
                                <span style={{ color: 'white', }}>Upload</span>
                            </ColorButton>
                        </Box>
                    </div>
                </div>
            </div>

        </>
    )
}


export default SongUpload