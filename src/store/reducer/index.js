const INITIAL_STATE = {
    users: [],
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GETDATA":
            return ({
                ...state,
                users: action.payload
            })
        default:
            return state;
    }
}