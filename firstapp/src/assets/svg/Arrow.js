import React from 'react'

const Arrow = (props) => {
const {secondIcon = false,className} = props
    return(
        <>
            {!secondIcon?
                <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 16 16">
                    <path d="M15 8a.5.5 0 00-.5-.5H2.707l3.147-3.146a.5.5 0 10-.708-.708l-4 4a.5.5 0 000 .708l4 4a.5.5 0 00.708-.708L2.707 8.5H14.5A.5.5 0 0015 8z"></path>
                </svg>:
                <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="white"
                     viewBox="0 0 16 16">
                    <path
                        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                </svg>
            }
        </>
    );
};

export default Arrow;