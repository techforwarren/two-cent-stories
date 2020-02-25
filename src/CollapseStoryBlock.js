import React, { useState } from 'react';
import Name from './Name';
import AddYourStory from './AddYourStory';

export function CollapseStoryBlock(props){

    const [formActive, setFormActive] = useState(false);

    function changeState(){
        setFormActive(!formActive);
    }

    return(
        <div className="NameBlock">
            {props.data.map((post, index) => (
                <>
                <Name key={post.id} firstName={post.firstName} debt={post.debt} story={post.story}></Name>
                </>
            ))}
            <button onClick={changeState} className="JoinUsSingle">Add Your Story</button>
            {formActive && 
            <AddYourStory></AddYourStory>}
        </div>    
    );
}

export default CollapseStoryBlock;