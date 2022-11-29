import React, {useState, useContext, useEffect} from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import TopBar from "./components/TopBar";
import { observer } from 'mobx-react-lite'
import {Context} from './index'
import { Spinner } from "react-bootstrap";
import videoBg from './BackGround/videoBg.mp4'
import bg from './BackGround/bg.mp4'
const App = observer( () => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
      user.checkAuth().then(data=>{
        user.setUser(data)
        user.setIsAuth(true) 
      }).finally(()=>setLoading(false)) 
  }, [])

  if(loading) { 
    return <Spinner animation={"grow"}/>
  }

  return (
     <div className='main'>
        <video
          autoPlay
          loop
          muted
          style={{
            position: 'absolute',
            width: '100%',
            left: '50%',
            top: '50%',
            height: '100%',
            objectFit: 'cover',
            transform: 'translate(-50%, -50%)',
            zIndex: '-1'
          }}
        >
          {/* <source src={videoBg} type="video/mp4"/> */}
          <source src={bg} type="video/mp4"/>

          
        </video>
    <BrowserRouter> 
      <TopBar />
      <AppRouter />
    </BrowserRouter>
    
    </div>
    );
});

export default App;