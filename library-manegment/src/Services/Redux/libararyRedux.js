const initial = {
    books: [],
    book: null,
    dropdownn: [],
    isLoading: false,
    isError: false,
    errorMsg: 'soming error occured'
};

const libararyRedux = (state = initial, action) => {

    switch (action.type) {
        case "setbooks":

            const allData = action.payload;
            // localStorage.setItem("bookdata", JSON.stringify(allData));
            return {
                ...state,
                books: allData,
                isLoading: false,
                isError: false,
                book: null
            };

        case 'isLoading':
            return {
                ...state,
                isLoading: true
            }
        case "error":
            return {
                ...state,
                isError: true,
                errorMsg: "Network error"
            }

        case "singleData":
            return {
                ...state,
                book: action.payload,
                isLoading: false,
            }
        case "setDropdown":
            const dropdown = action.payload.toLowerCase();
            console.log('Filtering books for genre:', dropdown);

            let filteredBooks = state.books;

            if (dropdown) {
                filteredBooks = state.books.filter((book) =>
                    book.genre.toLowerCase() === dropdown
                );
            } else {
                filteredBooks = [];
            }

            console.log('Filtered Books:', filteredBooks);

            return {
                ...state,
                dropdownn: filteredBooks,
            };
        default:

            return state;
    }
}

export default libararyRedux