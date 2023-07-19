import React from 'react'
import { Fragment, useState, useEffect, useRef, useCallback, } from 'react'
import { IoPlaySkipBack, IoPlaySkipForward, } from 'react-icons/io5'
import { AiFillPlayCircle, AiFillPauseCircle, AiTwotoneHeart } from 'react-icons/ai'
import {IoMdVolumeOff, IoMdVolumeLow, IoMdVolumeHigh } from 'react-icons/io'
import { MdOutlineQueueMusic } from 'react-icons/md'
import { useSelector } from 'react-redux';
import song from '../../../assets/song2.mp3'
import './controls.css'

export default function Controls({open,setOpen}) {
  const {currentSong} = useSelector((state) => state.currentSong);

 const onclickplay = ()=>{
  console.log(currentSong.author)
 }
  const playAnimationRef = useRef();
  const volumeRef = useRef();
  const progressBarRef = useRef();
  const audioRef = useRef()
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLikes, setisLikes] = useState(true);
  const [volume, setVolume] = useState(100);
  const [muteVolume, setMuteVolume] = useState(false);
  const handleProgressChange = () => {
    audioRef.current.currentTime = progressBarRef.current.value;
  };
  const repeat = useCallback(() => {
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      '--range-progress',
      `${(progressBarRef.current.value / duration) * 100}%`
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  const togglePlayPause = () => {
    const prevValue = isPlaying
    setIsPlaying(!prevValue)

  };
  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };
  const toggleLike = () => {
    setisLikes((prev) => !prev);
  }

  const handleVolume = () => {
    setVolume(volumeRef.current.value)
    volumeRef.current.style.setProperty(
      '--volume-progress',
      `${(volumeRef.current.value)}%`
    );
  }
  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes =
        minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds =
        seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return '00:00';
  };
 
  
  useEffect(() => {
      
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      playAnimationRef.current = requestAnimationFrame(repeat);
    
  }, [isPlaying, audioRef, repeat]);
  useEffect(() => {

  })
  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  }, [volume, audioRef,muteVolume]);
  return (
    <Fragment>
      <div className="controls-wrapper" >
        {currentSong !==null?<>
        <audio src={currentSong.url} ref={audioRef} onLoadedMetadata={onLoadedMetadata} ></audio>
        
        </>:<>
        <audio src={song} ref={audioRef} onLoadedMetadata={onLoadedMetadata} ></audio></>}
        <input type="range" name="" id="" className='progressbar' ref={progressBarRef} defaultValue="0"
          onChange={handleProgressChange} />

        {currentSong==null?<>
          <div className="nullPlayer" style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%',width:"100%"}}>
            <h3>
              Select a Song to display Controls!
            </h3>
          </div>
        </>:<>
        <div className="controls">
          <div className="play-pause-wrapper">
            <div className="play-pause">

              <button className='control-btn'>
                <IoPlaySkipBack className='control-icon' />
              </button>
              <button onClick={togglePlayPause} className='control-btn'>
                {isPlaying ? <AiFillPauseCircle className='play-btn' /> : <AiFillPlayCircle className='play-btn' />}
              </button>
              <button className='control-btn'>

                <IoPlaySkipForward className='control-icon' />
              </button>
              <span className='time-details'>{formatTime(timeProgress)}/{formatTime(duration)}</span>
            </div>
          </div>
          <div className="songdetails-wrapper">

            <div className="songdetails-cards-grid">
              <div className="img">
                <img src={currentSong.links.images[1].url} alt="" className="songdetails-wrapper-liked-Thumbnail" />
              </div>
              <div className="songDetails-controls" onClick={()=> onclickplay()}>
                <h4 className="likedTitle">{currentSong.name}</h4>
                <p className="likedArtist">{currentSong.author}-<span> Mere Sona re Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit maiores dolorum reiciendis soluta eius. Voluptatibus tenetur quasi provident. Blanditiis voluptate mollitia ab ullam ex voluptatibus quasi molestias animi voluptates hic!</span></p>
              </div>
              <div className="songlike" onClick={toggleLike}>
                {isLikes ? <AiTwotoneHeart className='control-icon' /> : <AiTwotoneHeart className='control-icon control-icon-color' />}

              </div>
            </div>
          </div>
          <div className="extraContorls">

            <div className="song-volume">
              <button onClick={() => setMuteVolume((prev) => !prev)} className='control-btn'>
                {muteVolume || volume < 5 ? (
                  <IoMdVolumeOff className='control-icon' />
                ) : volume < 40 ? (
                  <IoMdVolumeLow className='control-icon'/>
                ) : (
                  <IoMdVolumeHigh className='control-icon' />
                )}

              </button>
              <input type="range" min={0} max={100} className="volume-bar" value={volume} ref={volumeRef} onChange={handleVolume} />
            </div>
            <div className="queue-wrapper">
              <button className='control-btn' onClick={() => { setOpen(!open)}}>
                <MdOutlineQueueMusic className='control-icon queue-icon' />
              </button>
            </div>
          </div>
        </div>
        <div></div>
        </>}
     
      </div>
    </Fragment>
  )
}
