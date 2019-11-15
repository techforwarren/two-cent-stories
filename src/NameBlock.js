import React from 'react';
import Name from './Name';
import JoinUsQuad from './JoinUsQuad';
import AddYourStory from './AddYourStory'

export function NameBlock(props){

return(
    // set in grid
    
    <div className="NameBlock">
        {props.data.map((person, index) => (
            <>
            <Name key={person.id} firstName={person.firstName} debt={person.debt} story={person.story}></Name>
            {index === 13 && <AddYourStory/>}
            </>
        ))}
        
    </div>
)
}

export default NameBlock;