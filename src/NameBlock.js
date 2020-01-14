import React from 'react';
import Name from './Name';
import AddYourStory from './AddYourStory'

export function NameBlock(props){
    
return(
    // set in grid
    
    <div className="NameBlock">
        {props.data.map((person, index) => (
            <>
            <Name key={person.id} firstName={person.firstName} debt={person.debt} story={person.story}></Name>
            {index === 5 && <AddYourStory/>}
            </>
        ))}

    </div>
)}

export default NameBlock;