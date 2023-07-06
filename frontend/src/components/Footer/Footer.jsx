import React,{Fragment} from 'react'
import { Link} from 'react-router-dom'
import './footer.css'
import logo from '../../assets/logo.png'
function Footer() {
  return (
    <Fragment>

      <div className="footer">
        <div className="logo">
          <img src={logo} alt="" className="logoImg" />
        </div>
        <div className="copyright">
        <p className="copyPara">
        Copright &copy; Moot Music lab
          </p> 
        </div>
        <div className="policy">
          <Link to='/legal' className='termslinks'>Legal stuff</Link>
          <Link to='/privacy' className='termslinks'  >Privacy Policy</Link>
          <Link to='/terms' className='termslinks' > Terms</Link>
        </div>
      </div>

    </Fragment>
  )
}

export default Footer