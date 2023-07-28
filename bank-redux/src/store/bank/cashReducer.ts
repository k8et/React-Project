const defaultState = {
    cash: 0
}
export const cashReducer = (state = defaultState, action: any) => {
    if (action.type === "ADD_CASH") {
        return { ...state, cash: state.cash + action.payload };
    } else if (action.type === "GET_CASH") {
        return { ...state, cash: state.cash - action.payload };
    } else {
        return state;
    }
};
