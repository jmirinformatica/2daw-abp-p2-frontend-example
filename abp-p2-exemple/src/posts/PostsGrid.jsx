import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../userContext";
import editar from "../assets/editar.png";
import esborrar from "../assets/esborrar.png";

// Temporal
//import places from '../../json/places.json'
//import users from '../../json/users.json'
import { PostsAdd } from "./PostsAdd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PostGrid } from "./PostGrid";

export const PostsGrid = () => {
  // desa el retorn de dades de l'api places
  let [posts, setPosts] = useState([]);
  // Ho utilitzem per provar un refresc quan esborrem un element
  let [refresca, setRefresca] = useState(false);
  // Dades del context. Ens cal el token per poder fer les crides a l'api
  let { usuari, setUsuari, authToken, setAuthToken } = useContext(UserContext);

  // només quan la vble d'estat refresca canvia el seu valor
  // refresca canviarà el valor quan fem alguna operació com delete
  useEffect(() => {
    // Crida a l'api. mètode GET
    fetch("https://backend.insjoaquimmir.cat/api/posts/", {
      //mode: 'no-cors',
      headers: {
        // 'Access-Control-Allow-Origin': 'http://192.168.1.43:5173',
        // 'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
        // 'Access-Control-Allow-Headers': 'Accept, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
        // 'Access-Control-Request-Method': 'https',
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
      method: "GET",
    })
      .then((data) => data.json())
      .then((resposta) => {
        // Faria falta control·lar possible error
        console.log("Resposta: " + resposta.data);
        // Actualitzem la vble d'estat places
        setPosts(resposta.data);
        // Canvia el valor de refresca
        // provocarà que entri a useEffect
        // al fer el rendertizat
        setRefresca(false);
      });
  }, [refresca]); // condició d'execució del useffect

  // Esborrar un element
  const deletePlace = (id, e) => {
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
          console.log("Posts:" + resposta);
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
      <div className="py-16 bg-gradient-to-br from-green-50 to-cyan-100">
        <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
          <div className="mb-12 space-y-2 text-center">
            <span className="block w-max mx-auto px-3 py-1.5 border border-green-200 rounded-full bg-green-100 text-green-600 text-4x1">
              Llistat de Llocs
            </span>
            {/* <h2 className="text-2xl text-cyan-900 font-bold md:text-4xl">Sharing is Caring</h2>
        <p className="lg:w-6/12 lg:mx-auto">Quam hic dolore cumque voluptate rerum beatae et quae, tempore sunt, debitis dolorum officia aliquid explicabo? Excepturi, voluptate?</p> */}
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {posts.map((v, i) => {
              return (
                <>
              { v.visibility.id == 1 || v.author.email == usuari ? ( <PostGrid  setRefresca={ setRefresca } key={v.id} v={v}/>) : <></> }
              
            
              </>
              )

              


            })}

            {/* <div className="p-1 rounded-xl group sm:flex space-x-6 bg-white bg-opacity-50 shadow-xl hover:rounded-2xl">
          <img src="https://tailus.io/sources/blocks/twocards/preview/images/man.jpg" alt="art cover" loading="lazy" width="1000" height="667" className="h-56 sm:h-full w-full sm:w-5/12 object-cover object-top rounded-lg transition duration-500 group-hover:rounded-xl"/>
          <div className="sm:w-7/12 pl-0 p-5">
            <div className="space-y-2">
              <div className="space-y-4">
                <h4 className="text-2xl font-semibold text-cyan-900">Provident de illo eveniet commodi fuga fugiat laboriosam expedita.</h4>
                <p className="text-gray-600">Laborum saepe laudantium in, voluptates ex placeat quo harum aliquam totam, doloribus eum impedit atque! Temporibus...</p>
              </div>
              <a href="www.tailus.io" className="block w-max text-cyan-600">Read more</a>
            </div>
          </div>
        </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
