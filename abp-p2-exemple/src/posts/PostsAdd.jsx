import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../userContext";
import "leaflet/dist/leaflet.css";

import "../App.css";
import { Icon } from "leaflet";

import {
  Marker,
  Popup,
  useMapEvents,
  MapContainer,
  TileLayer,
  useMap,
} from "react-leaflet";
import { PostsMenu } from "./PostsMenu";
import { useEffect } from "react";

export const PostsAdd = ({ setAfegir }) => {


  const apiUrl = process.env.API_URL;

  

  let { authToken } = useContext(UserContext);

  const [position, setPosition] = useState(null);
  const [formulari, setFormulari] = useState({});
  const [error,setError] = useState("")
  const [ avis, setAvis] = useState("");


  

  const handleChange = (e) => {
    e.preventDefault();
   
      setFormulari({
        ...formulari,
        [e.target.name]: e.target.value,
      });
    // }
  };
  const afegir = async (e) => {
    e.preventDefault();

    let { title, body,  status_id } =  formulari;
     const formData = new FormData();
    
     formData.append("title", title);
     formData.append("body", body);
     formData.append("status_id", status_id);

  

    try {
      const json2= await fetch(apiUrl+"/posts", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + authToken,
        },
        method: "POST",
        body: formData,
      })

      const resposta = await json2.json()

      if (resposta.success == true) {
        setAvis("Missatge penjat correctament")
        setError("")
      } else {
        setError(resposta.message)
        console.log(JSON.stringify({ title,body,status_id }))
      }
      }
    catch (e)
    {
      setError("S\'ha produit un error")
    }

    // Enviam dades a l'aPI i recollim resultat
    
  };

  const tornar = (e) => {
    e.preventDefault();
    //setAfegir(false);
  };

  return (
    <>
      <div className="py-9 pl-9">
        {/* <form method="post" action="" enctype="multipart/form-data"> */}
       

        <div className="w-1/3">
        <label className="text-gray-600">Títol</label>
          <input
            name="title"
            value={formulari.title}
            className="
                      w-full
                     
                      px-4
                      py-3
                      border-2 border-gray-300
                      rounded-sm
                      outline-none
                      focus:border-blue-400
    "
            placeholder="Títol"
            onChange={handleChange}
          ></input>
          <label className="text-gray-600">Comentari</label>
          <textarea
            name="body"
            value={formulari.body}
            className="
                      w-full
                      h-32
                      px-4
                      py-3
                      border-2 border-gray-300
                      rounded-sm
                      outline-none
                      focus:border-blue-400
    "
            placeholder="Explica'ns alguna cosa d'aquest lloc..."
            onChange={handleChange}
          ></textarea>

         

         

          <label
            htmlFor="status_id  "
            className="block mb-2 text-sm text-gray-600 dark:text-white"
          >
            Selecciona la visibilitat
          </label>
          <select
            value={formulari.status_id}
            name="status_id"
            id="status_id"
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option defaultValue value="">
              ----
            </option>
            <option value="1">Draft</option>
            <option value="2">Published</option>
            <option value="3">Hidden</option>
          </select>
          { error ? (<div className="flex w-full items-center space-x-2 rounded-2xl bg-red-50 px-4 ring-2 ring-red-200 ">{error}</div>) : (<></>)  }
          <div className="py-9">
            <button
              onClick={afegir}
              type="submit"
              className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Afegir Entrada
            </button>
          </div>
          <div className="py-9">
          { error ? (<div className="flex w-full items-center space-x-2 rounded-2xl bg-red-50 px-4 ring-2 ring-red-200 ">{error}</div>) : (<></>)  }
          { avis ? (<div className="flex w-full items-center space-x-2 rounded-2xl bg-green-50 px-4 ring-2 ring-green-200 ">{avis}</div>) : (<></>)  }
          </div>
        </div>
      
      </div>
    </>
  );
};
