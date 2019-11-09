import React from 'react';

export function Name(props){

return(
    <div className="Name">
        <p> <strong>{props.firstName}</strong> ${props.debt.toLocaleString()}</p>
    </div>
)
}

export default Name;