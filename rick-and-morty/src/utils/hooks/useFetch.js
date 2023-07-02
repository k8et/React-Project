import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                //console.log(json)
                setData(json);
            } catch (error) {
                console.log('error',error);
            } finally {
                //console.log('win');
            }
        };

        fetchData();
    }, [url]);

    return {data};
};

export default useFetch;