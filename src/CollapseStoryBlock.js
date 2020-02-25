import React from 'react';
import Name from './Name';
import JoinUsSingle from './JoinUsSingle';

export function CollapseStoryBlock(props){

    return(
        <div className="NameBlock">
            {props.data.map((post, index) => (
                <>
                <Name key={post.id} firstName={post.firstName} debt={post.debt} story={post.story}></Name>
                </>
            ))}
            <JoinUsSingle key={0} firstName={'You?'} debt='?' story={"Share your story"}></JoinUsSingle>
        </div>    
    );
}

export default CollapseStoryBlock;