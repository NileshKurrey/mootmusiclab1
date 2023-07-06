import React from 'react'
import './bio.css'
import Navbar from '../Header/Navbar/Navbar'
import img from '../../assets/image.JPG'
import { Link } from 'react-router-dom'
import {AiFillHeart} from 'react-icons/ai'
import Footer from '../Footer/Footer'
import { certainSongs } from '../../certainSons'
import SongItem from '../Player/SongItem/SongItem'
function Bio() {
  return (
    <>
        <Navbar/>
        <div className="Bio_wrapper">
            <div className="Bio_artistDetail_wrapper">
                <div className="Bio_artisDetail_avatar">
                    <img src={img} className='avatar' alt="" />
                    <h1 className='bio_artistDetail_name'>Artist Name</h1>
                </div>
                <div className="Bio_artistDesc">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis iusto nam distinctio sunt dolorum maxime tempora consequuntur repellendus quod earum?</p>
                </div>
                <div className="Bio_artist_setteng">
                    <Link>
                     <button className='Bio_ArtistSettin_btn'>Donate</button>
                    </Link>
                    <Link>
                     <button className='Bio_ArtistSettin_btn'>Hire Artist</button>
                    </Link>
                    <AiFillHeart className='Bio_artistSetting_icon'/>
                </div>
            </div>
            <div className="Bio_ArtistSong_wrapper">
                <h2 className='bio_arttistSong_name'>Songs</h2>
            {certainSongs.map((certainSongs)=>{
            return <>  <SongItem name={certainSongs.name} songThumbnail={certainSongs.links.images[1].url} artistImg={certainSongs.links.images[0].url} artistName={certainSongs.author} url={certainSongs.url} key={certainSongs.id}  /><hr /></>
              })}
           
            </div>
            <div className="Bio_ArtistAlbum_wrapper">

            </div>
        </div>
        <Footer/>
    </>
  )
}

export default Bio