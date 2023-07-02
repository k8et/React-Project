import React from 'react';

const FavoriteSvg = ({ fill }) => {
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                version="1.1"
                viewBox="0 0 501.28 501.28"
                xmlSpace="preserve"
            >
                <g fill={fill}>
                    <path d="M501.28 194.37L335.26 159.33 250.64 12.27 250.64 419.77 405.54 489.01 387.56 320.29z"></path>
                    <path d="M166.02 159.33L0 194.37 113.72 320.29 95.74 489.01 250.64 419.77 250.64 12.27z"></path>
                </g>
            </svg>
        </>
    );
};


export default FavoriteSvg;