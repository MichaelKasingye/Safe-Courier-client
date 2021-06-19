
export const initialState = {
    user: localStorage.getItem('name'),

};

 function reducer(state,action){
    console.log(action);
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            };
       
        default:
            return state;
    }
};

export default reducer;