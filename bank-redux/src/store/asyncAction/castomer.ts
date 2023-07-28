import {addManyCustomerAction} from "../bank/customerReducer";

export const fetchCustomer: any = () => {
return function (dispatch: any){
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => dispatch(addManyCustomerAction(json)))
}
}