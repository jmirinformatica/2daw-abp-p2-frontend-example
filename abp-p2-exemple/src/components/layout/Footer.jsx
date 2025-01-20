import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (

    <footer className=" w-full fixed bottom-0 text-center lg:text-left bg-gray-100 text-gray-600">
   
  <div className="text-center p-6 bg-gray-200">
    <span>© 2023 Copyright: </span>
    <Link className="text-gray-600 font-semibold" to="/xxxx">Reynholm Industries</Link>     
  </div>
</footer>



  )
}
