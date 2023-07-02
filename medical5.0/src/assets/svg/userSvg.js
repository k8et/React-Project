import React from 'react';

const UserSvg = () => {
    return (
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="30"
                fill="none"
                viewBox="0 0 27 30"
            >
                <g filter="url(#filter0_d_20_50)">
                    <path
                        fill="#fff"
                        d="M7.906 5.688c0 1.508.576 2.955 1.602 4.021a5.364 5.364 0 003.867 1.666c1.45 0 2.841-.6 3.867-1.666a5.805 5.805 0 001.602-4.021 5.805 5.805 0 00-1.602-4.022A5.364 5.364 0 0013.375 0c-1.45 0-2.841.6-3.867 1.666a5.805 5.805 0 00-1.602 4.022zm13.282 15.437H4.78a.766.766 0 01-.552-.238.83.83 0 01-.229-.575v-2.437c0-1.077.412-2.11 1.144-2.873a3.832 3.832 0 012.762-1.19h10.938c1.036 0 2.03.429 2.762 1.19a4.147 4.147 0 011.144 2.873v2.438a.83.83 0 01-.229.574.766.766 0 01-.552.238h-.782z"
                    ></path>
                </g>
                <defs>
                    <filter
                        id="filter0_d_20_50"
                        width="26.75"
                        height="29.125"
                        x="0"
                        y="0"
                        colorInterpolationFilters="sRGB"
                        filterUnits="userSpaceOnUse"
                    >
                        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                        <feColorMatrix
                            in="SourceAlpha"
                            result="hardAlpha"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        ></feColorMatrix>
                        <feOffset dy="4"></feOffset>
                        <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                        <feComposite in2="hardAlpha" operator="out"></feComposite>
                        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
                        <feBlend
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_20_50"
                        ></feBlend>
                        <feBlend
                            in="SourceGraphic"
                            in2="effect1_dropShadow_20_50"
                            result="shape"
                        ></feBlend>
                    </filter>
                </defs>
            </svg>
        </div>
    );
};

export default UserSvg;