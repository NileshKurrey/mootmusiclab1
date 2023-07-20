import React ,{Fragment} from 'react'
import Slider from './Slider/Slider'
import './maincontent.css'
function Maincontent() {
  const slider = [{title:'New Realease',CardsType:"Cards",id:1,style:{width: '90vw'}},
  // {title:'New Albums',CardsType:"CardsAlbum",id:2,style:{width: '90vw'}},{title:'Explore Genres',CardsType:"CardGrid",id:3,style:{width: '90vw'}},
  // // {title:'Popular Artist',CardsType:"ArtistCard",id:4,style:{width: '90vw'}},
  // {title:'Most Loved Music',CardsType:"LikedCard",id:5,style:{width: '90vw'}}
]
  return (
    <Fragment>
        <div className="content-container">
           {slider.map((slider)=>{
           return  <Slider title = {slider.title} CardsType={slider.CardsType} key = {slider.id} style={slider.style}/>
           })}
        </div>
    </Fragment>
  )
}

export default Maincontent