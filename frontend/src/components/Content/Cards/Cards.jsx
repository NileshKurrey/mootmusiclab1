import React, {Fragment  } from 'react'
import './cards.css'

export default function Cards(props) {


 if(props.propType === 'Cards'){
  return(
    <Fragment>
      <div className="card">
        <div className="cardImg">
          <img src={props.songThumbnail} alt="" className="thumbnail" />
          <div className="overlay-image"></div>
        </div>
        <div className="cardDetails">
          <h3 className="cardTitle">{props.name}</h3>
          <p className="artistname">{props.artistName} -<span> {props.name}</span></p>
        </div>
      </div>
    </Fragment>
  )
 }
 if(props.propType ==='CardGrid'){
  return(
    <Fragment>
      <div className="CardGrid">
        <h4 className="genreTitle">Genre</h4>
      </div>
    </Fragment>
  )
 }
 if(props.propType === 'ArtistCard'){
  return(
    <Fragment>
      <div className="artistCard">
        <div className="artistimg">
        <img src={props.artistImg} alt="" className="artistpic" />
        </div>
        <div className="artistDetails">
          <h3 className="artistName">{props.artistName}</h3>
          <p className="artistlikes">25k likes</p>
        </div>
      </div>
    </Fragment>
  )
 }
 if(props.propType === 'LikedCard'){
  return(
    <Fragment>
    <div className="likesGrid">
        <div className="img">
        <img src={props.songThumbnail} alt="" className="likedThumbnail" />
        </div>
        <p className="likedN0">200</p>
        <div className="songDetails">
        <h4 className="likedTitle">{props.name}</h4>
        <p className="likedArtist">{props.artistName} -<span> {props.name}</span></p>
        </div>
      </div>
    </Fragment>
  )
 }
}
