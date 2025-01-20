import reactLogo from './assets/react.svg'
import './App.css'
import { LoginRegister } from './auth/LoginRegister'
import { useState } from 'react'
//import { createContext } from 'react'

import { UserContext } from './userContext'
import { Routes,Route } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'

import { About } from './components/aplicacio/About'
import { NotFound } from './components/aplicacio/NotFound'

import { Posts } from './posts/Posts'
import { PostsMenu } from './posts/PostsMenu'
import { PostsList } from './posts/PostsList'
import { PostsPList } from './posts/PostsPList'
import { PostsGrid } from './posts/PostsGrid'

import { PostsAdd } from './posts/PostsAdd'
import { Post } from './posts/Post'
import { PostEdit } from './posts/PostEdit'


// "leaflet": "^1.9.3",
//     "react": "^18.2.0",
//     "react-dom": "^18.2.0",
//     "react-leaflet": "^4.2.0",
//     "react-leaflet-marker": "^2.1.0",
//     "react-router-dom": "^6.4.3"

function App() {
  

  let [usuari, setUsuari] = useState("");
  let [ authToken,setAuthToken] = useState("");

  

  return (
   <>

    <UserContext.Provider value= { { usuari, setUsuari,authToken,setAuthToken }}>
      
      { authToken != "" ? (
      
        <>
        <Header/>
      
         <Routes>
            <Route path='*' element={<NotFound />} />
            <Route path="/" element={<Posts />}/>
           
            <Route path="/posts" element={<><PostsMenu/><PostsList/></>} />
            <Route path="/posts/list" element={ <><PostsMenu/><PostsList/></> } /> 
            <Route path="/posts/plist" element={ <><PostsMenu/><PostsPList/></> } /> 

            <Route path="/posts/grid" element={ <><PostsMenu/><PostsGrid/></> } /> 
            <Route path="/posts/add" element={ <><PostsMenu/><PostsAdd/></> } /> 
            <Route path="/posts/edit/:id" element={  <><PostsMenu/><PostEdit /></> } />
            <Route path="/posts/:id" element={ <><PostsMenu/><Post/></> } /> 
            
            
            
             {/* <Route path="/posts" element={ <Places />} />
            <Route path="/posts/:id" element={<PlacesShow />} /> */}
            <Route path="/about" element={<About />} />
        </Routes>

        {/* <Footer/> */}
       </>

    ) :  <LoginRegister /> }
    
    </UserContext.Provider>

      {/* <LoginRegister/> */}
   </>
  
  )
}

export default App

