import React from 'react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import './displayTracks.css'
import song from '../../../assets/song.mp4'
import img from '../../../assets/image.JPG'
import SongItem from '../SongItem/SongItem'
import { Songs } from '../../../songs'
function DisplayTracks({open,setopen}) {
  return (
    <Fragment>
      <div className="DisplayTrack-wrapper">
        <div className="currentTrack-wrapper" style={open?{}:{display:'none'}}>
          <div className="currentTrack-media">
            <video style={open?{scale:'1',transition:'500ms'}:{scale:'0',transition:'500ms'}} src={song}  className='currentTrack-video'></video>
            <div className="createrLink">
                <h5 className='displayTrack_name'>Your Song Name</h5>
              <Link  className="createrNameLink" to='/bio' >
                <span>Creater Name</span>
              </Link>
            </div>
          </div>
          <div className="currentTrackDetails">
              <h2>Related Artists</h2>
              <div className="relatedArtists">
              <img src={img} className='displayTrack_avatar' alt="" />
              <Link className='artistNameLink' to='/bio'>
                <h5>Creater Name</h5>
              </Link>
              </div>
          </div>
        </div>
        <div className="allTrack-wrapper" style={open?{}:{display:'none'}}>
          <div className="allTrack_track">
            <h1>Queue</h1>
            <span className="createrNameLink">25 Song</span>
          </div>
          <div className="AllTrack_Items">
          {Songs.map((Songs)=>{
            return <SongItem name={Songs.name} songThumbnail={Songs.links.images[1].url} artistImg={Songs.links.images[0].url} artistName={Songs.author} url={Songs.url} key={Songs.id}  />
              })}
            
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default DisplayTracks