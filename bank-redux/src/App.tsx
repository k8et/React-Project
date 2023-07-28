import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addCustomerAction, removeCustomerAction} from "./store/bank/customerReducer";
import {fetchCustomer} from "./store/asyncAction/castomer";

function App() {
    const dispatch = useDispatch();
    const cash = useSelector((state: any) => state.cash.cash);
    const customer: any[] = useSelector((state: any) => state.customer.customer);

    const addCash = (amount: number) => {
        dispatch({ type: 'ADD_CASH', payload: amount });
    };

    const getCash = (amount: number) => {
        dispatch({ type: 'GET_CASH', payload: amount });
    };

    const addCustomers = (name: string) => {
        const customers = {
            name: name,
            id: Date.now(),
        };
        dispatch(addCustomerAction(customers));
    };
    const removeCustomers = (item: any) => {
        dispatch(removeCustomerAction(item.id))
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            <h1 className="text-4xl font-bold mb-4">Cash: ${cash}</h1>
            <div className="flex">
                <button
                    onClick={() => addCash(Number(prompt('Enter cash to add:')))}
                    className="flex justify-center items-center rounded-full bg-gray-500 w-10 h-10 mr-2 transition duration-300 hover:bg-gray-600 hover:scale-110"
                >
                    +
                </button>
                <button
                    onClick={() => getCash(Number(prompt('Enter cash to get:')))}
                    className="flex justify-center items-center rounded-full bg-gray-500 w-10 h-10 transition duration-300 hover:bg-gray-600 hover:scale-110"
                >
                    -
                </button>
            </div>
            {customer.length === 0 ? (
                <div style={{ marginTop: '20px', fontSize: '18px', color: 'gray' }}>
                    Load...
                </div>
            ) : (
                <div style={{ marginTop: '20px', fontSize: '18px' }}>
                    {customer.map((item, index) => (
                        <div onClick={()=>removeCustomers(item)} className={
                            'w-full flex items-center justify-center font-bold border-black border-2 p-4 bg-gray-500 '
                        } key={index}>{item.name}</div>
                    ))}
                </div>
            )}
            <div style={{ marginTop: '20px' }}>
                <button
                    onClick={() => addCustomers(String(prompt('Name customers')))}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                >
                    Add Customer
                </button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <button
                    onClick={()=> dispatch(fetchCustomer())}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                >
                    Add Many Customers
                </button>
            </div>
        </div>
    );
}

export default App;
