import { useSelector, useDispatch } from 'react-redux';
import {
    decrement,
    increment,
    incrementByAmount,
    incrementAsync,
    incrementIfOdd,
    selectCount,
} from './counterSlice';
import { useState } from 'react';

export function Counter() {
    const count = useSelector(selectCount);
    const dispatch = useDispatch();
    const [incrementAmount, setIncrementAmount] = useState('2');

    const incrementValue = Number(incrementAmount) || 0;

    return (
        <div className="p-4">
            <div className="bg-gray-500 flex justify-center items-center p-4">
                <button
                    className="bg-white w-10 h-10 rounded-full shadow-md"
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    -
                </button>
                <span className="text-white text-xl mx-4">{count}</span>
                <button
                    className="bg-white w-10 h-10 rounded-full shadow-md"
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    +
                </button>
            </div>
            <div className="mt-4 flex justify-center">
                <input
                    className="w-16 py-1 px-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                    aria-label="Set increment amount"
                    value={incrementAmount}
                    onChange={(e) => setIncrementAmount(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white py-1 px-4 rounded-md ml-2"
                    onClick={() => dispatch(incrementByAmount(incrementValue))}
                >
                    Add Amount
                </button>
                <button
                    className="bg-green-500 text-white py-1 px-4 rounded-md ml-2"
                    onClick={() => dispatch(incrementAsync(incrementValue) as any)}
                >
                    Add Async
                </button>
                <button
                    className="bg-yellow-500 text-white py-1 px-4 rounded-md ml-2"
                    onClick={() => dispatch(incrementIfOdd(incrementValue) as any)}
                >
                    Add If Odd
                </button>
            </div>
        </div>
    );
}
