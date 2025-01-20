import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../userContext";
import "leaflet/dist/leaflet.css";

import "../App.css";
import { Icon } from "leaflet";

import { Marker, Popup, MapContainer, TileLayer, useMap } from "react-leaflet";
import { PlacesMenu } from "./PlacesMenu";
import { ReviewAdd } from "./reviews/ReviewAdd";
import { ReviewsList } from "./reviews/ReviewsList";
// import { MarkerLayer, Marker } from "react-leaflet-marker";

export const PlacesShow = () => {
  const { id } = useParams();

  let { usuari, setUsuari, authToken, setAuthToken } = useContext(UserContext);

  let [place, setPlace] = useState({});

  // place és un objecte, amb ojctes interns (place.file.filepath, per exemple)
  // Quan llegim amb fetch aquest triga un estona en obtenir les dades
  // i al renderitzar amb aquest objecte buit, dona error
  // i l 'aplicació peta i ja no es torna a renderitzar quan places
  // té el valor correcte
  // Emprem isLoading, per rendertizar només quan ja s'ha carregat el place
  let [isLoading, setIsLoading] = useState(true);
  let [favorited, setFavorited] = useState(false);
  let [favorites, setFavorites] = useState(0)


  const unfavourite = async () => {

    setFavorited(false);
    console.log("Not Favorited");
    const data = await fetch(
      "https://backend.insjoaquimmir.cat/api/places/" + id + "/favorites",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
        method: "DELETE",
      }
    );
    const resposta = await data.json();
    if (resposta.success == true) {
      setFavorited(false);
      setFavorites(favorites-1)
      
    }
  

  }
  const favourite = async () => {
    try {
      const data = await fetch(
        "https://backend.insjoaquimmir.cat/api/places/" + id + "/favorites",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + authToken,
          },
          method: "POST",
        }
      );
      const resposta = await data.json();

      if (resposta.success == true) {
        setFavorited(true);
        setFavorites(favorites+1)
        
      } else {
        setFavorited(false);
        console.log("Epp, algo ha passat ");
      }
    } catch (e) {
      console.log(e);
    }


  };
  const test_favourite = async () => {
    try {
      const data = await fetch(
        "https://backend.insjoaquimmir.cat/api/places/" + id + "/favorites",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + authToken,
          },
          method: "POST",
        }
      );
      const resposta = await data.json();

      console.log(resposta);
      if (resposta.success == true) {
        setFavorited(false);
        console.log("Not Favorited");
        const data = await fetch(
          "https://backend.insjoaquimmir.cat/api/places/" + id + "/favorites",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + authToken,
            },
            method: "DELETE",
          }
        );
        const resposta = await data.json();
      } else {
        setFavorited(true);
        console.log("Favorited");
      }
    } catch (e) {
      console.log("oeoeoeoe");
      console.log(e);
    }
  };
  const getPlaces = async () => {
    try {
      const data = await fetch(
        "https://backend.insjoaquimmir.cat/api/places/" + id,
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

      console.log(resposta.data);
      // En aquest punt omplim l'array,  resposta. data
      // no és un array, és un objecte retornat per l'api
      // per tant, hem de crear un array, d'un sol element
      // per a que el .map del jsx pugui iterar l'únic
      // element
      setPlace(resposta.data);
      setFavorites (resposta.data.favorites_count)
      console.log(resposta.data.favorites_count)
      console.log(place);
      // Ara podem dir que ja s'ha carregat place i es pot renderitzar
      setIsLoading(false);

      // Actualitzem la vble d'estat places
      //setPlaces(resposta.data);
      // Canvia el valor de refresca
      // provocarà que entri a useEffect
      // al fer el rendertizat
      //setRefresca(false);
    } catch (e) {
      console.log(e);
    }
  };
  // Sempre necessari, o al actualitzar l'state torna a executar-ho i entra
  // en bucle
  useEffect(() => {
    getPlaces();
    test_favourite();
  }, []);

  const position = [43.92853, 2.14255];

  const deletePlace = (id, e) => {
    e.preventDefault();

    let confirma = confirm("Estas  segur?");

    if (confirma) {
      fetch("https://backend.insjoaquimmir.cat/api/places/" + id, {
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
      {/* PlacesShow { id } */}

      {/* Només es renderitza quan isLoading es false */}
      {isLoading ? (
        "Espera...."
      ) : (
        <>
          <div className="md:grid md:grid-col-1 md:grid-flow-row gap-4 md:mx-auto p-6 justify-center dark:bg-gray-900 dark:text-gray-100">
            <div className="relative overflow-hidden bg-no-repeat bg-cover col-span-1 ">
              <img
                src={
                  "https://backend.insjoaquimmir.cat/storage/" +
                  place.file.filepath
                }
                alt=""
                className=" col-span-1 w-200 h-96 items-center"
              />

              <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-40 transition duration-300 ease-in-out bg-white"></div>
            </div>

            <div className="max-w-xl">
              <h2 className="bg-blue-300 col-span-1 text-xl font-semibold">
                {place.name}
              </h2>
              <span className="bg-blue-200 col-span-1 block pb-2 text-sm dark:text-gray-400">
                Enviada per: {place.author.name}
              </span>
              <span className="self-center   px-9 bg-gray-200 col-span-2 text-x2 font-semibold">
                Latitud: {place.latitude}{" "}
              </span>
              <span className="self-center px-7 bg-gray-200 text-x2 font-semibold">
                Longitud: {place.longitude}
              </span>

              <div className="bg-orange-100 py-3 text-x2 font-semibold">
                Descripció
              </div>
              <p className=" bg-yellow-100">{place.description}</p>
              <div className="mt-10 h-12 max-h-full md:max-h-screen">
                {/* <MapContainer  style={{ height: 280 }} center={[43.92853, 2.14255]} zoom={12} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[43.92853, 2.14255]}>
    <Popup>
       { position }. 
    </Popup>
  </Marker>
</MapContainer> */}

                {place.author.email === usuari ? (
                  <>
                    <Link
                      to={"/places/edit/" + id}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-10 px-4 h-10 md:h-10 uppercase"
                    >
                      {" "}
                      Editar{" "}
                    </Link>
                    <a
                      href="#"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-10 md:h-10 uppercase"
                      onClick={(e) => deletePlace(id, e)}
                    >
                      {" "}
                      Esborrar
                    </a>
                  </>
                ) : (
                  <></>
                )}
                {favorited ? (
                  <a
                    href="#"
                    onClick={(e) => unfavourite(id, e)}
                    className="bg-blue-300 hover:bg-blue-400 text-white font-bold py-2 px-4 h-10 md:h-10 uppercase"
                  >
                    - ❤️ {favorites}
                  </a>
                ) : (
                  <a
                    href="#"
                    onClick={(e) => favourite(id, e)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-10 md:h-10 uppercase"
                  >
                    + ❤️ {favorites}
                  </a>
                )}

                {/* <ReviewAdd id={place.id}/> */}
                <ReviewsList
                  id={place.id}
                  reviews_count={place.reviews_count}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
