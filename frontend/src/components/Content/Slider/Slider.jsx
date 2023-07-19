import React , {useRef} from 'react'
import {Link} from 'react-router-dom'
import './slider.css'
import {BiChevronLeft, BiChevronRight} from 'react-icons/bi'
import Cards from '../Cards/Cards'
import {Songs} from '../../../songs'
import { useDispatch,useSelector} from 'react-redux';
import {selectSong} from '../../../actions/selectSongAction'
function Slider({title,CardsType,style ,titleStyle}) {
  const {genre} = useSelector((state)=>state.allGenre)
  const dispatch = useDispatch();
  const handleSongClick = (songs) => {
    dispatch(selectSong(songs));
    console.log(dispatch(selectSong(songs)))
    console.log('song is cliked')
  };
  let box = useRef(null);
  const btnprev = () =>{
    let width = box.current.clientWidth
    box.current.scrollLeft = box.current.scrollLeft - width
  }
  const btnnext = () =>{
    let width = box.current.clientWidth
    box.current.scrollLeft = box.current.scrollLeft + width
  }
  return (
    <>
      <div className="slider-container" style={{width:`${style.width}`}}>
          <div className="text-container">
              <h1 className='content-title' style={titleStyle}>{title}</h1>
              <div className="slide-contaner">
                <div className="slide-btn-container">
                <BiChevronLeft onClick={btnprev} className='arrow'/>
                <BiChevronRight onClick={btnnext} className='arrow'/>
                </div>
              <Link to='' className='contentMoreLink'>more</Link>
              </div>
          </div>
          {CardsType ==='CardGrid' || CardsType === "LikedCard" ?<div className="carousel-container">
            {CardsType==='CardGrid'?<>
            <div className="carousel-container-grid" ref={box}>
              {genre.map((genre)=>{
                return <Cards style={{cursor:'pointer'}} name={genre.name} propType={CardsType}>

                </Cards>
              })}
              </div></>:<>
           <div className="carousel-container-grid" ref={box}>
           {Songs.map((Songs)=>{
            return <Cards style={{cursor:'pointer'}} name={Songs.name} songThumbnail={Songs.links.images[1].url} artistImg={Songs.links.images[0].url} artistName={Songs.author} url={Songs.url} key={Songs.id}  propType = {CardsType}/>
              })}
           </div>    
            </>}
        
             </div>:<div className="carousel-container" ref={box}>
              {Songs.map((Songs)=>{
            return <Cards  name={Songs.name} songThumbnail={Songs.links.images[1].url} artistImg={Songs.links.images[0].url} artistName={Songs.author} url={Songs.url} key={Songs.id}  propType = {CardsType} onClick={() => handleSongClick(Songs)}/>
              })}
            
          </div>}
      </div>
    </>
  )
}

export default Slider