import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import { useContext } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import { UserContext } from '../userContext';
import { useNavigate } from 'react-router';



export const PostEdit = () => {

  const apiUrl = process.env.API_URL;

  const { id } = useParams();
  let navigate = useNavigate();

  const [error, setError] = useState("")
  const [avis, setAvis] = useState("");


  let { authToken } = useContext(UserContext)
  let [formulari, setFormulari] = useState({});


  //const { id } = useParams();
  console.log(id)


  const getPost = async () => {
    try {


      console.log("Inicio lectura");
      const data = await fetch(apiUrl + "/posts/" + id, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authToken
        },
        method: "GET",
      })

      const resposta = await data.json();

      console.log(resposta.data)

      setFormulari({
        title: resposta.data.title,
        body: resposta.data.body,
        status_id: resposta.data.status.id

      })

    }
    catch (e) {

      console.log("S'ha produit algun error");
      console.log(e)
    }



  }

  const handleChange = (e) => {

    e.preventDefault();

    setError("");
    // Aqui no s'utilitza però us serà útil per al projecte principal
    if (e.target.type && e.target.type === "file") {
      console.log(e.target.files[0].name)
      setFormulari({

        ...formulari,
        [e.target.name]: e.target.files[0]

      })

    }
    else {
      // Canviem l'element de l'objecte de l'estat
      setFormulari({

        ...formulari,
        [e.target.name]: e.target.value

      })
    }

  }

  useEffect(() => {


    getPost();

  }, [])


  const editar = async (e) => {

    e.preventDefault();

    let { body, status_id } = formulari;



    console.log("Editant un Post....")
  
    console.log(JSON.stringify({ body: body, status_id: status_id }))
    // Enviam dades a l'aPI i recollim resultat
    try {

      const temp = await fetch(apiUrl + "/posts/" + id, {
        headers: {
          'Accept': 'application/json',
          //'Content-type': 'multipart/form-data',
          'Authorization': 'Bearer ' + authToken
        },
        method: "PUT",
        body: JSON.stringify({ body: body, status_id: status_id })


      })

      const resposta = await temp.json()

      console.log(resposta)

      if (resposta.success == true) {
        setAvis("Post modificat correctament")
        //setAfegir(false); // Tornem al llistat
        //navigate("/posts/")
      }
      else {
        setError(resposta.message)

      }

    }catch(e){
      setError(e.meesage)
    }

  }
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
              htmlFor="status_id"
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
            {error ? (<div className="flex w-full items-center space-x-2 rounded-2xl bg-red-50 px-4 ring-2 ring-red-200 ">{error}</div>) : (<></>)}
            <div className="py-9">
              <button
                onClick={editar}
                type="submit"
                className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Editar Entrada
              </button>
            </div>
            <div className="py-9">
              {error ? (<div className="flex w-full items-center space-x-2 rounded-2xl bg-red-50 px-4 ring-2 ring-red-200 ">{error}</div>) : (<></>)}
              {avis ? (<div className="flex w-full items-center space-x-2 rounded-2xl bg-green-50 px-4 ring-2 ring-green-200 ">{avis}</div>) : (<></>)}
            </div>
          </div>

        </div>





      </>
    )
  }
