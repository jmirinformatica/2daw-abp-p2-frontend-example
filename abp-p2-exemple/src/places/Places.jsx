import React, { useState } from 'react'
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { PlaceEdit } from './PlaceEdit';
import { PlacesAdd } from './PlacesAdd';
import { PlacesGrid } from './PlacesGrid';
import { PlacesList } from './PlacesList';
import { PlacesMenu } from './PlacesMenu';
import { PlacesShow } from './PlacesShow';


export const Places = () => {

    let [ afegir, setAfegir ] =  useState(false);
    let [ grid , setGrid]  = useState(false);
    let [ editar, setEditar ] =  useState(false);

    
    const navega = useNavigate()
    useEffect ( ()=> {
        navega("/places/grid")

    },[])
    //;
 
    return (
    <>
    
    
    {<PlacesMenu/>}
    {/* { editar==true ? <PlacesEdit setEditar={setEditar}/> : <></> } */}
    {/* {  afegir==true ?  <PlacesAdd setAfegir={setAfegir} /> :<>
        <div className="flex py-2 pl-9">
     */}
    

            {/* <Route path="/places/list" element={ <PlacesList /> } /> 
            <Route path="/places/grid" element={ <PlacesGrid /> } />  */}
           

    
    
    {/* </div> */}
    {/* Depenent de si cliquem grid o list veiem format llista o Grid */}
    {/* { grid ? <PlacesGrid/> : <PlacesList/>} */}
    
        {/* </>  } */}

    
    
    
    </>      
    
  )
}
