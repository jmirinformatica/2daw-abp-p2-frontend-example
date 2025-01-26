import React, { useContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { UserContext } from '../../userContext';

export const Header = () => {

    const apiUrl = process.env.API_URL;

    let { usuari,setUsuari, authToken,setAuthToken } = useContext(UserContext)
    let [ roles, setRoles] = useState([]);
    


    useEffect(() => {

      get_user_info()  
      
      
      
    }, [])

   
    const get_user_info = async () =>{

        try {
            const jsonr = await fetch (apiUrl + "/user",{        
                headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                   'Authorization': 'Bearer '  + authToken,                 
               },
               method: "GET",           
               })
            
            const result = await jsonr.json()

            console.log(result)

            if (result.success == true )
            {

                console.log(result.user.name)
                console.log(result.user.email)

                setUsuari(result.user)

            }





        }
        catch (error) {

            console.log("error")
        }
        


    }

    
    const logout = async ()=> {


        try {

            const json = await fetch (apiUrl + "/logout",{
        
                headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                   'Authorization': 'Bearer '  + authToken,
               },
                method: "POST",
               })
            
            const result = await json.json()

            if (resposta.success) setAuthToken("");

               


        }
        catch(e){
            console.log(e)
        }
        
                
        

    }
  return (
      <>
  
      <nav className="bg-indigo-400 px-4 p-4">
      <div className="flex items-center justify-between">

          <div className="flex items-center">
          <div class="w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center font-bold text-white text-xs">EXEMPLE</div>


              <div className="pl-9 ">
                  <Link to="/places">Places </Link>  
                  <Link to="/posts">Posts </Link>  
                  <Link to="/about">About </Link>  
              </div>
          </div>
          <div>
              { usuari.name } 
              {/* (               { roles.map ((v)=> ( <span key={v}> {v} </span>))}) -  */}
              <a className="text-orange-800" onClick={logout} href=""> - Logout</a>
              
          </div>

      </div>

      </nav>

     
 
     
      </>    
  )
}
