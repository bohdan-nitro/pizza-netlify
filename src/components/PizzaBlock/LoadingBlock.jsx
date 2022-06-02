import React from 'react';
import ContentLoader from "react-content-loader";

function LoadingBlock() {
    return(
        <ContentLoader
            className={"pizza-block"}
            speed={2}
            width={280}
            height={460}
            viewBox="0 0 280 520"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <circle cx="130" cy="150" r="130" />
            <rect x="0" y="299" rx="3" ry="3" width="242" height="25" />
            <rect x="0" y="335" rx="6" ry="6" width="238" height="109" />
            <rect x="0" y="454" rx="4" ry="4" width="77" height="28" />
            <rect x="121" y="454" rx="17" ry="17" width="115" height="40" />
        </ContentLoader>
    );

}



export default LoadingBlock;