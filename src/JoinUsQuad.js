import React from 'react';
/*<form>
            
            <label className="inputLabel">Email</label>
            <input className="emailInput"></input>
            <label className="inputLabel">Zip</label>
            <input className="zipInput"></input>
            <button className="Submit">Submit</button>
        </form>
        */
export function JoinUsQuad(props){
    return(
    <div className="JoinUsQuad">
  
        <div id="header">
            <h3>ADD YOUR NAME</h3>
        </div>
        <div id="email">
           <label>Email</label>
           <input></input>
        </div>
        <div id="zip">
            <label>Zip</label>
            <input></input>
        </div>
        <div id="submit">
            <button>Submit</button>
        </div>
  
    </div>
    );
}
export default JoinUsQuad;

