import { useEffect, useState } from 'react'
import './App.css'
import {Route,Routes} from 'react-router-dom'
import HomePage from './components/HomePage'
import Signup from './components/Signup'
import { authStore } from './store/auth.store.js'
import Login from './components/Login.jsx'
import { Navigate } from 'react-router-dom'
import ResumeUpload from './components/ResumeUpload.jsx'
import {Loader} from 'lucide-react'
import {Toaster} from 'react-hot-toast'
import SearchResume from './components/SearchResume.jsx'
function App() {

  const {checkAuth,checkingAuth,authUser} = authStore(); 

  useEffect(()=>{
    checkAuth(); 
  },[checkAuth])

 
  if(checkingAuth && !authUser){
    return(
     <div className=' flex items-center justify-center h-screen'>
     <Loader className=' size-10 animate-spin'/>
   </div>
    )
   }

  console.log("authuser : ", authUser); 
  return (
   <div className=''>
    <Routes>
      <Route path='/' element={authUser?<HomePage/>:<Navigate to={"/login"}/>}/>
      <Route path='/signup' element={!authUser?<Signup/>:<Navigate to={'/'}/>}/>
      <Route path='/login' element={!authUser?<Login/>:<Navigate to={'/'}/>}/>
      <Route path='/resume-upload' element={authUser?<ResumeUpload/>:<Navigate to={"/login"}/>}/>
      <Route path='/resume-search' element={authUser?<SearchResume/>:<Navigate to={"/login"}/>} />
    </Routes>

<Toaster/>
   </div>
  )
}

export default App
