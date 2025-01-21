import React from 'react'
import { useState } from 'react';

export const Register = ({ setLogin }) => {



    // Buidar i deixar només un text dins el requadre
    
    let [ register,setRegister] = useState({});
    let [ error, setError] = useState("");



    const handleSubmit = (e) => {

        e.preventDefault();

        const { name,email,password } = register

         // .....        

    }

    const handleChange = (e)=> {

        e.preventDefault(); 
  
        setRegister({
                ...register,
                [e.target.name] : e.target.value            
          })

    }


    
  return (
   
    <section
            className="absolute top-1/2 left-1/2 mx-auto max-w-sm -translate-x-1/2 -translate-y-1/2 transform space-y-4 text-center">
            <div x-show="isLoginPage" className="space-y-4">
                <header className="mb-3 text-2xl font-bold">Crea Usuari</header>
                
                <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="text" name="name" placeholder="Name"  onChange={ handleChange} value={register.name}
                        className="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
                <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="text" name="email" placeholder="Email"  onChange={ handleChange} value={register.email}
                        className="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
                <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="password" name="password" placeholder="Password"  onChange={ handleChange} value={register.password}
                        className="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
                <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="password2" name="password2" placeholder="Repeat Password"  onChange={ handleChange}
                        className="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
                { error ? (<div className="flex w-full items-center space-x-2 rounded-2xl bg-red-50 px-4 ring-2 ring-red-200 ">{error}</div>) : (<></>)  }
                <button onClick={handleSubmit }
                    className="w-full rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400">
                    CREA COMPTE
                </button>

                <div className="mt-8 text-sm text-gray-400">
                    <button onClick={ ()=> setLogin(true) } className="underline">Ja registrat?</button>                    
                </div>
            </div>
    </section>

  )
}
