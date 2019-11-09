import React from 'react';
import Name from './Name';
//import JoinUsSingle from './JoinUsSingle';
import JoinUsQuad from './JoinUsQuad';

export function NameBlock(props){

return(
    // set in grid
    
    <div className="NameBlock">
        {props.data.map((person, index) => (
            <>
            <Name key={person.id} firstName={person.firstName} debt={person.debt} story={person.story}></Name>
            {index === 13 && <JoinUsQuad/>}
            </>
        ))}
        
    </div>
)
}

export default NameBlock;


/*
        <Name firstName="Emily" debt="5,000"/>
        <Name firstName="James" debt="100,000"/>
        <Name firstName="Terrence" debt="30,000"/>
        <Name firstName="Joe" debt="2,000"/>
        <Name firstName="Shea" debt="9,000"/>
        <Name firstName="Jason" debt="270,000"/>
        <Name firstName="June" debt="13,000"/>
        <Name firstName="Ezra" debt="41,000"/>
        <Name firstName="Teresa" debt="114,000"/>
        <Name firstName="Cora" debt="46,000"/>
        <JoinUsQuad/>

        <Name firstName="Shelly" debt="37,000"/>
        <Name firstName="Jackie" debt="75,000"/>
        <Name firstName="Sasha" debt="45,000"/>
        <Name firstName="Nolan" debt="25,000"/>
        <Name firstName="Sidney" debt="27,000"/>
        <Name firstName="Harriette" debt="43,000"/>
        <JoinUsSingle/>
        <Name firstName="August" debt="34,000"/>
        <Name firstName="Ann" debt="10,000"/>
        <Name firstName="Sam" debt="900,000"/>
        <Name firstName="Maximiliano" debt="31,000"/>
        <Name firstName="Emily" debt="5,000"/>
*/