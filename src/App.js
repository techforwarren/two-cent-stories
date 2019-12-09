import React, { useState } from 'react';
import './App.css';
import NameBlock from './NameBlock';
import testData from './testData.json';

function App() {

  const billGatesTotal = 6379000000;
  let leftover = billGatesTotal;

  const data = testData.people;

  function getLeftover(){
    data.forEach((person) => {
      leftover -= person.debt;
    });

  }

  getLeftover();

  return (
    <div className="App">      
      <div>
        <h1>Bill Gates would pay $6.379 billion next year under Elizabeth's wealth tax.</h1>
        <h3>Thats enough money to pay off student loan debt for ...</h3>
      </div>
      <NameBlock data={data}/>
      <div>
        {leftover > 0 && 
        <h3>... and still have ${leftover.toLocaleString()} leftover.</h3>
        }
        
        <p>Elizabeth's wealth tax, which only impacts America's 75,000 wealthiest families, would generate enough revenue to cover universal child care, quality public education, forgive student loan debt, provide free public college, and help finance Medicare for All.</p>
        <a href="https://elizabethwarren.com/plans/ultra-millionaire-tax">Find out more about the Wealth tax and join the fight</a>
      </div>

    </div>
  );
}

export default App;
