import React, { useState, useTransition } from "react";
import { useContext } from "react";
import { UserContext } from "../userContext";

// Temporal
//import places from '../../json/places.json'
//import users from '../../json/users.json'
import { PostsAdd } from "./PostsAdd";
import { useEffect } from "react";
import { PostList } from "./PostList";



export const PostsList = () => {

  const apiUrl = process.env.API_URL;

  // desa el retorn de dades de l'api places
  let [posts, setPosts] = useState([]);
  // Ho utilitzem per provar un refresc quan esborrem un element
  let [refresh, setRefresh] = useState(false);
  // Dades del context. Ens cal el token per poder fer les crides a l'api
  let { usuari, setUsuari, authToken, setAuthToken } = useContext(UserContext);

  const [isPending, startTransition] = useTransition();

  // només quan la vble d'estat refresca canvia el seu valor
  // refresca canviarà el valor quan fem alguna operació com delete
  useEffect(() => {
    // Crida a l'api. mètode GET

    startTransition(async () => {
      const data = await fetchData();
      console.log(data)
      setPosts(data);
    });

  
  }, [refresh]); // condició d'execució del useffect

  const fetchData = async ()=> {

    try {

      const json = await fetch(apiUrl+"/posts", {
        // mode: 'cors',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // Authorization: "Bearer " + authToken,
        },
        method: "GET",
      })

      let dades = await json.json()
      return dades.data


    }
    catch(error)
    {
      console.log(error)
    }

    

  }


  // Esborrar un element
  const deletePost = (id, e) => {

    let confirma = confirm("Estas  segur?");

    if (confirma) {
      fetch(apiUrl+"/posts/" + id, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
        method: "DELETE",
      })
        .then((data) => data.json())
        .then((resposta) => {
          if (resposta.success == true) {
            // provoca el refrescat del component i la reexecució de useEffect
            setRefresh(!refresh);
          }
        });
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                
                {isPending && <div>Loading...</div>}
                {!isPending && <>
                  <thead className="bg-white border-b">
                  <tr>
                   
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Títol
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Descripció
                    </th>
                   
                    
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Visibilitat
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Autoria
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      #Comentaris
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      👁️📝
                      <svg
                        class="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        ></path>
                      </svg>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((v) => {
                    return (
            
                      <>
                      { v.status.name== 'published' || v.author.email == usuari.email ? (<PostList  deletePost={ deletePost } key={v.id} v={v}/>) : <></> }
                  
                      </>
                      )
                  })}

                  
                </tbody>
                </>}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
