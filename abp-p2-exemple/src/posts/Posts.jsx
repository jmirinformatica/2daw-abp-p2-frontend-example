import React, { useState } from "react";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { PostEdit } from "./PostEdit";
import { PostsAdd } from "./PostsAdd";
import { PostsGrid } from "./PostsGrid";
import { PostsList } from "./PostsList";
import { PostsMenu } from "./PostsMenu";
import { Post } from "./Post";

export const Posts = () => {
  let [afegir, setAfegir] = useState(false);
  let [grid, setGrid] = useState(false);
  let [editar, setEditar] = useState(false);

  const navega = useNavigate();
  useEffect(() => {
    navega("/posts/list");
  }, []);
  //;

  return (
    <>
      {<PostsMenu />}
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
  );
};
