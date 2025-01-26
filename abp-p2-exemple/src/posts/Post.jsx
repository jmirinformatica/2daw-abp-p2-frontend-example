import React from "react";
import { useState, useTransition,useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../userContext";
import "leaflet/dist/leaflet.css";

import "../App.css";


import { PostsMenu } from "./PostsMenu";
import { CommentAdd } from "./comments/CommentAdd";
import { CommentsList } from "./comments/CommentsList";
// import { MarkerLayer, Marker } from "react-leaflet-marker";

export const Post = () => {
  const { id } = useParams();

  console.log(id)
  const apiUrl = process.env.API_URL;


  let [post, setPost] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  
  let { usuari, setUsuari, authToken, setAuthToken } = useContext(UserContext);
 
  let [error, setError] = useState("");


  
  const getPost = async () => {
    try {

      console.log(apiUrl+"/posts/" + id)
      const data = await fetch(apiUrl+"/posts/" + id,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + authToken,
          },
          method: "GET",
        }
      );
      const resposta = await data.json();

      // Faria falta control·lar possible error
      console.log(resposta)
      if (resposta.success == true) { setError("");  setPost(resposta.data) }
      else setError(resposta.message)

      setIsLoading(false)
          


     
    } catch (e) {
      setError("S'ha produit algun error")
      console.log("error")
    }
  };
  // Sempre necessari, o al actualitzar l'state torna a executar-ho i entra en bucle
  useEffect(() => {
     getPost()
   
  
  }, []);


  const deletePost = (id, e) => {
    e.preventDefault();

    let confirma = confirm("Estas  segur?");

    if (confirma) {
      fetch("https://backend.insjoaquimmir.cat/api/posts/" + id, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
        method: "DELETE",
      })
        .then((data) => data.json())
        .then((resposta) => {
          console.log(resposta);
          if (resposta.success == true) {
            console.log("OK");
            // provoca el refrescat del component i la reexecució de useEffect
            setRefresca(true);
          }
        });
    }
  };

  return (
    <>
      {/* Només es renderitza quan isPending es false */}

      {isLoading ? (
        "Espera...."
      ) : (
        
        <>
          <div className="md:grid md:grid-col-1 md:grid-flow-row gap-4 md:mx-auto p-6 justify-center dark:bg-gray-900 dark:text-gray-100">
            <div className="relative overflow-hidden bg-no-repeat bg-cover col-span-1 ">
             
              <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-40 transition duration-300 ease-in-out bg-white"></div>
            </div>

            <div className="max-w-xl">

            <span className="bg-blue-200 col-span-1 block pb-2 text-sm dark:text-gray-400">
                { error }
              </span>
           
              <span className="bg-blue-200 col-span-1 block pb-2 text-sm dark:text-gray-400">
                Enviada per: {post.author.name}
              </span>
             
              <div className="bg-orange-100 py-1 px-3 text-x2 font-semibold">
                Títol
              </div>
              <p className=" bg-yellow-100 py-3 px-3">{post.title}</p>

              <div className="bg-orange-100 py-1 px-3 text-x2 font-semibold">
                Descripció
              </div>
              <p className=" bg-yellow-100 py-3 px-3">{post.body}</p>
              <div className="mt-10 h-12 max-h-full md:max-h-screen">
              

                {post.author.email === usuari ? (
                  <>
                    <Link
                      to={"/posts/edit/" + id}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-10 px-4 h-10 md:h-10 uppercase"
                    >
                      {" "}
                      Editar{" "}
                    </Link>
                    <a
                      href="#"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-10 md:h-10 uppercase"
                      onClick={(e) => deletePost(id, e)}
                    >
                      {" "}
                      Esborrar
                    </a>
                  </>
                ) : (
                  <></>
                )}
             

                {/* <ReviewAdd id={place.id}/> */}
                <CommentsList
                  id={post.id}
                  comments_count={post.comments_count}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
