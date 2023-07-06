import React from 'react'
import './SongItem.css'
function SongItem(props) {
    // let img = 'https://i.ytimg.com/vi/C4NAuQmnuMY/maxresdefault.jpg'
  return (
    <>
    <div className="SongItemWrapper">
        <div className="SongWrapperSame">
        <div className="SongWrapperThumbnail">
            <img src={props.songThumbnail} className='SongWrapperThumbnailImag' alt="" />
        </div>
        <div className="SongWrapperDetails">
            <h4 className='SongWrapperDetails_heading' >{props.name}</h4>
            <p className='SongWrapperDetails_para'>{props.artistName} - {props.name}</p>
        </div>

        </div>
        <div className="SongWrapperSettings">
            <span style={{fontSize: "19px"}}>3:10</span>
        </div>
    </div>
    </>
  )
}

export default SongItem