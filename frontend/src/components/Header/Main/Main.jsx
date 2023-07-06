import React from 'react'
import './main.css'
import background from '../../../assets/background.jpg'
function Main() {
  const stylemain ={
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height:'35rem',
    width:'100%',
    objectFit: 'cover'
  }
  return (
    <>
    <div className="main-comp" style={stylemain}>
      <div className="main-container">
        <h1>Feel the <span className='span-main'>Music</span> with Us!</h1>
      </div>
    </div>
    </>
  )
}

export default Main