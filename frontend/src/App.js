
import React, { Fragment,useEffect } from 'react'
import './app.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import  Headers  from './components/Header/Headers'
import Maincontent from './components/Content/Maincontent'
import Footer from './components/Footer/Footer'
import Player from './components/Player/Player'
import Queue from './components/Queue/Queue'
import SignIn from './components/Login/SignIn'
import SignUp from './components/Login/SignUp'
import Home from './components/Admin/Pages/home/Home'
import Login from './components/Admin/Pages/login/login'
import Single from './components/Admin/Pages/single/single'
import New from './components/Admin/Pages/new/new'
import {userInputs } from "./formsource";
import List from './components/Admin/Pages/list/list'
import Upload from './components/Admin/Pages/Upload/Upload'
import Bio from './components/Bio/Bio'
import MyAdertisers from './components/Admin/Pages/My Adertisers/MyAdertisers'
import MyArtist from './components/Admin/Pages/MyArtist/MyArtist'
import { loadUser } from './actions/userActions'
import store from './store'
import { useSelector } from 'react-redux'
import About from './components/About/About'
import Contact from './components/contact/Contact'

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
 
  useEffect(()=>{
    store.dispatch(loadUser());
  },[])
  window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <Fragment>
      
    <Router>
      <Routes>
        
        <Route exact path='/' element={[<Headers key={1}/>,<Maincontent key={2}/>,<Footer key={3}/>,<Player key={4}/>]}/> 
        <Route exact path='/watch' element={<Queue/>}/> 
        <Route exact path='/logIn' element={<SignIn/>}/>
        <Route exact path='/signUp' element={<SignUp/>}/>
        <Route exact path='/queue' element={<Queue/>}/>
        <Route exact path='/bio' element={<Bio/>}/>
        <Route exact path='/about' element={<About/>}/>
        <Route exact path='/contact' element={<Contact/>}/>
        {isAuthenticated === true?<>
          <Route path="/profile">   
            <Route index element={ user.role ==='admin'?<Home />:user.role ==='advertiser'?<MyArtist/>:user.role==='Artist'?<MyAdertisers/>:<></>} />
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single/>} />
              <Route path="new" element={<New inputs={userInputs} title="Add New User" />} />
            </Route>
            <Route path="Artist">
              <Route index element={<List/>} />
              <Route path=":ArtistId" element={<Single />} />
              <Route path="new" element={<New />} />
            </Route>
            <Route path="Songs">
              <Route index element={<List/>} />
              <Route path=":SongId" element={<Single />} />
              <Route path="new" element={<New />} />
            </Route>
            <Route path="Upload">
              <Route index element={<Upload/>} />
              <Route path=":SongId" element={<Single />} />
              <Route path="new" element={<New />} />
            </Route>
          </Route></>:<></>}
        
      </Routes>
    </Router>
    </Fragment>
  )
}

export default App

