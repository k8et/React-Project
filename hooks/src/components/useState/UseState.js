import React, {useState} from 'react';
import'./style.css'

const UseState = () => {
    const [count,setCount] = useState(0)
    const [value,setValue] = useState('text')
    function increment(){
        return setCount(count +1)
    }
    console.log(useState())
    return (
        <div className={'main'}>
            <div className={'count'}>
                <p>Вы кликнули {count}</p>
                <button onClick={increment}>
                    click +1
                </button>
                <button onClick={()=> setCount(count -1)}>
                    click -1
                </button>
            </div>
            <div className="text">
                <h1>{value}</h1>
                <input
                    type={'text'} value={value}
                    onChange={event => setValue(event.target.value)}
                />
            </div>
        </div>

    );
};
export default UseState;