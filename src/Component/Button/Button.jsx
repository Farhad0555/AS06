import React from 'react';

const Button = ({bgcolour , text}) => {
    return (
        <div>
           <button style={{backgroundColor:bgcolour}} className="btn">
                       {text}
           </button> 
        </div>
    );
};

export default Button;