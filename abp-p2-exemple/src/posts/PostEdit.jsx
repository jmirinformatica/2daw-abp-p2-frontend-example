import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import { useContext } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import { UserContext } from '../userContext';
import { useNavigate } from 'react-router';



export const PostEdit = () => {

    const { id } = useParams();
    let navigate = useNavigate();

    const [error,setError] = useState("")
    const [ avis, setAvis] = useState("");

   
    let { authToken } = useContext(UserContext)
    let [ formulari,setFormulari] = useState({});


    //const { id } = useParams();
    console.log(id)
          

    const getPost = async () => {
      try {
      

        console.log("Inicio lectura");
        const data = await fetch ("https://backend.insjoaquimmir.cat/api/posts/"+id,{
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '  + authToken 
                  },
                  method: "GET",
       })

        const resposta = await data.json();

        console.log(resposta.data)
        
        setFormulari({
              body: resposta.data.body,
              upload:"",
              latitude: resposta.data.latitude,
              longitude: resposta.data.longitude,
              visibility: resposta.data.visibility.id

        })

      }
      catch (e) {

          console.log("S'ha produit algun error");
      }   
             
     

    }

    const handleChange = (e)=> {

      e.preventDefault();

      setError("");
      if (e.target.type && e.target.type==="file")
      {
        console.log(e.target.files[0].name)
        setFormulari({

          ...formulari,
          [e.target.name] : e.target.files[0] 
  
        })

      }
      else {
      // Canviem l'element de l'objecte de l'estat
      setFormulari({

        ...formulari,
        [e.target.name] : e.target.value

      })
    }

  }
  
    useEffect(() => {
     
    
              getPost();      
   
         }, []) 

  
    const editar = (e) => {

        e.preventDefault();
    
        let {body,upload,latitude,longitude,visibility}=formulari;
        const formData = new FormData();
        formData.append("body", body);
        formData.append("upload", upload);
        formData.append("latitude", latitude);
        formData.append("longitude", longitude);
        formData.append("visibility", visibility);
    
    
    
        console.log("Editant un Post....")
        console.log(formulari)
        console.log(JSON.stringify({ body,upload,latitude,longitude,visibility }))
        // Enviam dades a l'aPI i recollim resultat
        fetch ("https://backend.insjoaquimmir.cat/api/posts/"+id,{
            headers: {
                'Accept': 'application/json',
                //'Content-type': 'multipart/form-data',
                'Authorization': 'Bearer ' + authToken 
            },
            method: "POST",
            // body: JSON.stringify({ name,description,upload,latitude,longitude,visibility })
            body: formData
    
          }
        ).then( data => data.json() )
        .then (resposta => { 
            
                console.log(resposta); 
                if (resposta.success == true )
                {
                    
                    console.log(authToken)
                    setAvis("Post modificat correctament")
                    //setAfegir(false); // Tornem al llistat
                    navigate("/posts/")
                }
                else
                {
                      setError(resposta.message)

                }
            } ) 
    
    
      }


  return (
   
    <>
     <div className="py-9 pl-9">


    
    {/* <form method="post" action="" enctype="multipart/form-data"> */}
    

    <div className="w-1/3">
  <label className="text-gray-600">Descripció</label>
  <textarea
    name="body"
    value= { formulari.body }
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
    onChange={ handleChange}
  ></textarea>

<div className="flex justify-center">
  <div className="mb-3 w-96">
    <label htmlFor="formFile" className="form-label inline-block mb-2 text-gray-600">Imatge PNG, JPG or GIF (MAX. 800x400px)</label>
    <input name="upload" 
    onChange={ handleChange}
    // value= { formulari.upload }
    className="form-control
    block
    w-full
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="upload"/>
  </div>
</div>

<span className="flex flex-col gap-y-2">
        <label className="text-gray-600" htmlFor="Name">Longitud</label>
        <input
            type="text"
            name="longitude"
            value= { formulari.longitude }
            onChange={ handleChange}
            className="w-1/3 px-4 py-2 border border-gray-300 outline-none focus:border-gray-400"
        />
</span>
<span className="flex flex-col gap-y-2">
        <label className="text-gray-600" htmlFor="Name">Latitud</label>
        <input
            type="text"
            name="latitude"
            value= { formulari.latitude }
            onChange={ handleChange}
            className="w-1/3 px-4 py-2 border border-gray-300 outline-none focus:border-gray-400"
        />
</span>

<label htmlFor="visibility" className="block mb-2 text-sm text-gray-600 dark:text-white">Selecciona la visibilitat</label>
<select name="visibility" value= { formulari.visibility } id="visibility" onChange={ handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option defaultValue value="">----</option>
  <option  value="1">Public</option>
  <option value="2">Contactes</option>
  <option value="3">Privat</option>
  
</select>
<div className="py-9">
{ avis ? (<div className="flex w-full items-center space-x-2 rounded-2xl bg-green-50 px-4 ring-2 ring-green-200 ">{avis}</div>) : (<></>)  }
{ error ? (<div className="flex w-full items-center space-x-2 rounded-2xl bg-red-50 mb-4 px-4 ring-2 ring-red-200 ">{error}</div>) : (<></>)  }
<button onClick={editar}  type="submit" className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
    Editar Entrada
    </button>
    <button onClick={ ()=> {navigate(-1)}}  type="submit" className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
    Cancelar
    </button>
    
    
  </div>
    
  
    
    
    
    
    
    </div>
    {/* </form> */}
   
    </div>
    
    
    
    
    
    </>
  )
}
