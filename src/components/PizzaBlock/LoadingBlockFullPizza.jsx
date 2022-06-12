import React from 'react';
import ContentLoader from "react-content-loader";

function LoadingBlockFullPizza(props) {
    
    return(
        <ContentLoader
            className={"pizza-block"}
            speed={2}
    width={576}
    height={224}
    viewBox="0 0 476 124"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="150" cy="71" r="80" /> 
    <rect x="73" y="18" rx="0" ry="0" width="0" height="5" /> 
    <rect x="78" y="7" rx="0" ry="0" width="1" height="0" /> 
    <rect x="87" y="6" rx="0" ry="0" width="1" height="0" /> 
    <rect x="91" y="34" rx="0" ry="0" width="0" height="1" /> 
    <rect x="89" y="23" rx="0" ry="0" width="0" height="6" /> 
    <rect x="221" y="26" rx="0" ry="0" width="310" height="84" />
        </ContentLoader>
        
    );

}



export default LoadingBlockFullPizza;