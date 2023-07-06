import React,{useEffect, useState} from 'react'
import Controls from './Controls/Controls'
import DisplayTracks from './DisplayTracks/DisplayTracks'
import'./player.css'

function Player() {
 const [open,setOpen] =useState(false)
 
useEffect(()=>{
  if(open===true){
    document.body.style ='overflow:hidden'
  }
  else if(open===false){
    document.body.style ='overflow:normal'
  }
})
  return (
      <>

        <div className='player'>
          <div style={open?{opacity:1,visibility:'visible',transition:'500ms',height:'87vh'}:{opacity:0,visibility:'hidden',transition:'500ms',height:'0',display:''}}>
              <DisplayTracks {...{open,setOpen}}/>
          </div>
            <Controls    {...{ open,setOpen }} />
        </div>
    </>
  )
}

export default Player