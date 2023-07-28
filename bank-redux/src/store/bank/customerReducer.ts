const defaultState = {
    customer: []
}
const ADD_CUSTOMER = "ADD_CUSTOMER"
const REMOVE_CUSTOMER = "REMOVE_CUSTOMER"
const ADD_MANY_CUSTOMERS = "ADD_MANY_CUSTOMERS"
export const customerReducer = (state: any = defaultState, action: any) => {
    if (action.type === ADD_MANY_CUSTOMERS){
        return {...state, customer: [...state.customer, ...action.payload]}
    } else if (action.type === ADD_CUSTOMER) {
        return {...state, customer: [...state.customer, action.payload]}
    } else if (action.type === REMOVE_CUSTOMER) {
        return {...state, customer: state.customer.filter((item: any) => item.id !== action.payload)}
    } else {
        return state
    }
}
export const addCustomerAction = (payload: any) => ({type: ADD_CUSTOMER, payload})
export const removeCustomerAction = (payload: any) => ({type: REMOVE_CUSTOMER, payload})
export const addManyCustomerAction = (payload: any) => ({type: ADD_MANY_CUSTOMERS, payload})
