import React from "react";
import { useEffect } from "react";
import { Review } from "./Review";

import { useContext } from "react";
import { UserContext } from "../../userContext";

import { useState } from "react";
import { ReviewAdd } from "./ReviewAdd";
import { ReviewsContext } from "./reviewsContext";
// Fem servir un context únicament dins de tots els components de Reviews

export const ReviewsList = ({ id, reviews_count }) => {
  //let {setAdd, setRefresca, reviewsCount, setReviewsCount } = useContext(ReviewsContext)
  let { usuari, setUsuari, authToken, setAuthToken } = useContext(UserContext);

  let [error, setError] = useState("");
  const [refresca, setRefresca] = useState(false);
  const [add, setAdd] = useState(true);
  const [reviewsCount, setReviewsCount] = useState(reviews_count);

  const [reviews, setReviews] = useState([]);

  // review ={v} setAdd={setAdd } setRefresca={ setRefresca}

  const listReviews = async () => {
    const headers = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
      method: "GET",
    };

    let data = await fetch(
      "https://backend.insjoaquimmir.cat/api/places/" + id + "/reviews",
      headers
    );
    let resposta = await data.json();
    console.log(resposta);

    if (resposta.success == true) setReviews(resposta.data);
    else {
      setError(resposta.message);
    }

    resposta.data.map((v) => {
      if (v.user.email === usuari) {
        setAdd(false);
        console.log("Te review");
      }
    });
  };

  useEffect(() => {
    listReviews();
    setRefresca(false);
  }, [refresca]);

  return (
    <ReviewsContext.Provider
      value={{ setAdd, setRefresca, reviewsCount, setReviewsCount }}
    >
      {add ? <ReviewAdd id={id} /> : <></>}
      <div class="flex mx-auto items-center justify-center  mt-6 mx-8 mb-4 max-w-lg">
        {reviewsCount == 0 ? (
          <div className="flex mb-4 w-full items-center space-x-2 rounded-2xl bg-red-50 px-4 ring-2 ring-red-200">
            No hi ha reviews
          </div>
        ) : (
          <div className="flex mb-4 w-full items-center space-x-2 rounded-2xl bg-blue-50 px-4 ring-2 ring-blue-200">
            Hi ha {reviewsCount} {reviewsCount > 1 ? " ressenyes" : " ressenya"}{" "}
          </div>
        )}
      </div>

      {error ? (
        <div className="flex mb-4 w-full items-center space-x-2 rounded-2xl bg-red-50 px-4 ring-2 ring-red-200 ">
          {error}
        </div>
      ) : (
        <></>
      )}

      {reviews.map((v) => {
        return <Review key={v.id} review={v} />;
      })}
    </ReviewsContext.Provider>
  );
};
