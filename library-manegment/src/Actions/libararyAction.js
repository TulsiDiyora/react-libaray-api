import axios from 'axios';

const addData = (data) => {
    return {
        type: "setbooks",
        payload: data
    }
}

const setLoading = () => {
    return {
        type: "isLoading",
    };
}

const error = (err) => {
    return {
        type: "error",
        payload: err
    }
}

const singleRec = (id) => {

    return {
        type: "singleData",
        payload: id
    }
}
export const selectDropdown = (genre) => {
    return {
        type: "setDropdown",
        payload: genre.toLowerCase(),
    };
};

export const bookAsync = (bookData) => {
    return (dispatch) => {
        dispatch(setLoading());

        setTimeout(() => {
            axios.post("http://localhost:3003/users", bookData).then((res) => {

                console.log("addData", res.bookData);

                dispatch(getAsync());

            }).catch((err) => {

                console.log(err);
                dispatch(error(err));

            });
        }, 2000)
    }
}

export const getAsync = () => {
    return (dispatch) => {
        dispatch(setLoading());

        setTimeout(() => {
            axios.get("http://localhost:3003/users").then((res) => {

                console.log("getdata", res.data);

                dispatch(addData(res.data));

            }).catch((err) => {

                console.log(err);

                dispatch(error(err));

            });
        }, 2000)
    }
}

export const singleAsync = (id) => {
    return (dispatch) => {

        dispatch(setLoading());

        axios.get(`http://localhost:3003/users/${id}`).then((res) => {

            console.log(res.data);

            dispatch(singleRec(res.data));

        }).catch((err) => {

            console.log(err);

            dispatch(error(err));

        });
    };
};

export const editAsync = (formInput) => {
    return (dispatch) => {

        axios.put(`http://localhost:3003/users/${formInput.id}`, formInput)
            .then((res) => {

                console.log("Edit response", res);

                dispatch(getAsync());

            }).catch((err) => {
                console.log("Edit error", err);
                dispatch(error(err));
            });
    }
}

export const deleteAsync = (id) => {

    return (dispatch) => {

        axios.delete(`http://localhost:3003/users/${id}`).then((res) => {

                console.log("Delete response", res);

                dispatch(getAsync());

            }).catch((err) => {

                console.log("Delete error", err);

                dispatch(error(err));

            });
    }
}
