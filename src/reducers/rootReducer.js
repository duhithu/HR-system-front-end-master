const initState = {
    user: {
        isAuthenticated: false,
        user: null
    },
    errors: {},
    loading: false
}


const rootReducer = (state = initState, action) => {
    return state;
}


export default rootReducer;