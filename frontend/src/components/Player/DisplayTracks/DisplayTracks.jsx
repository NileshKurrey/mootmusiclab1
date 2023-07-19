import React from 'react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import './displayTracks.css'

import SongItem from '../SongItem/SongItem'
import { Songs } from '../../../songs'
import { useSelector } from 'react-redux'
function DisplayTracks({ open, setopen }) {
  const { currentSong } = useSelector((state) => state.currentSong);
  return (
    <Fragment>
      <div className="DisplayTrack-wrapper">
        <div className="currentTrack-wrapper" style={open ? {} : { display: 'none' }}>
            {currentSong !== null ? <>
          <div className="currentTrack-media">
            
            <img style={open ? { scale: '1', transition: '500ms', objectFit: 'contain' } : { scale: '0', transition: '500ms', }} src={currentSong.links.images[1].url} className='currentTrack-video' alt='display thumbnail'></img>
            <div className="createrLink">
              <h5 className='displayTrack_name'>{currentSong.name}</h5>
              <Link className="createrNameLink" to='/bio' >
                <span>{currentSong.author}</span>
            
              </Link>
            </div>
          </div>
          <div className="currentTrackDetails">
            <h2>Related Artists</h2>
            <div className="relatedArtists">
              <img src={currentSong.links.images[0].url} className='displayTrack_avatar' alt="" />
              <Link className='artistNameLink' to='/bio'>
                <h5>{currentSong.author}</h5>
              </Link>
            </div>
          </div>
            </> : <></>}
        </div>
        <div className="allTrack-wrapper" style={open ? {} : { display: 'none' }}>
          <div className="allTrack_track">
            <h1>Queue</h1>
            <span className="createrNameLink">25 Song</span>
          </div>
          <div className="AllTrack_Items">
            {Songs.map((Songs) => {
              return <SongItem name={Songs.name} songThumbnail={Songs.links.images[1].url} artistImg={Songs.links.images[0].url} artistName={Songs.author} url={Songs.url} key={Songs.id} />
            })}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default DisplayTracks