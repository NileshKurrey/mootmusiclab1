import React,{useState,useRef} from 'react'
import Navbar from '../Header/Navbar/Navbar'
import Controls from '../Player/Controls/Controls'
import DisplayTracks from '../Player/DisplayTracks/DisplayTracks'

function Queue() {

    const [timeProgress, setTimeProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const progressBarRef = useRef();
    const audioRef = useRef()
  return (
    <>
    <Navbar/>
    <DisplayTracks  {...{ audioRef, setDuration, progressBarRef,setTimeProgress,timeProgress,duration}}/>
    <Controls/>
    </>
  )
}

export default Queue