import { setAdd, setError, setComments, setCommentsCount, startLoadingComments } from "./commentSlice";

export const getComments = (page = 0, id, authToken, usuari = "") => {
    return async (dispatch, getState) => {

        const apiUrl = process.env.API_URL;

        dispatch(startLoadingComments());

        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "GET",
        };
        const url = apiUrl+"/posts/" + id + "/comments"

        const data = await fetch(url, headers);
        const resposta = await data.json();

        if (resposta.success == true) {
            console.log(resposta.data.filter( v => v.user.email === usuari ))
            console.log(usuari)
            console.log(resposta.data)
            resposta.data.filter( v => v.user.email === usuari ).length > 0 ? dispatch(setAdd(false)) : dispatch(setAdd(true))
            dispatch(setComments(resposta.data));
            dispatch(setCommentsCount(resposta.data.length))
            console.log(resposta.data.filter( v => v.user.email === usuari ))

        }
        else {
            dispatch(setError(resposta.message));
        }

        // el posem a true per a evitar que si no hi ha comentaris
        // de ningú no entri al bucle segünt i per tant
        // no activi el formulari ReveiwAdd
        // dispatch(setAdd(true));

        // resposta.data.map((v) => {
        //     if (v.user.email === usuari)   dispatch(setAdd(false)); 
        // });

        // O bé emprem filter i amb una epxressió ternària tenim el mateix i més compacte 
        
    };
}

export const delComment = (comment, authToken) => {
    return async (dispatch, getState) => {


        const data = await fetch(
            "https://backend.insjoaquimmir.cat/api/posts/" +
            comment.post.id +
            "/comments/" +
            comment.id,
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

        console.log(resposta);
        if (resposta.success == true) {

            dispatch(setAdd(true));
            // usuari no l'indiquem i per defecta estarà a ""
            //dispatch(getReviews(0, review.place.id, authToken))
            
            //const state = getState()
            //dispatch(setReviewsCount(state.reviews.reviewsCount - 1));
        }


    };
};

export const addComment = (review, id, authToken) => {
    return async (dispatch, getState) => {

        let data = await fetch("https://backend.insjoaquimmir.cat/api/posts/" + id + "/comments", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            },
            method: "POST",
            body: JSON.stringify( review )
        })
        let resposta = await data.json()
        if (resposta.success == true) {
            dispatch(setAdd(false));
            //dispatch(getReviews(0, id, authToken))
            //const state = getState()
            //dispatch(setReviewsCount(state.reviews.reviewsCount + 1));

        }
        else {
            dispatch(setError(resposta.message));
        }
    }
}

