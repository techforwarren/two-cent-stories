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
      <div className="App-header">
        <div className="App-container">
          <h1 className="text-xl">Bill Gates would pay $6.379 billion next year under Elizabeth’s wealth tax.</h1>
          <p className="text-lg">That’s enough money to pay off student loan debt for ...</p>
        </div>
      </div>

      <div className="App-main">
        <div className="App-container">
          <NameBlock data={data}/>
        </div>
      </div>

      <div className="App-footer">
        <div className="App-container">
          <div>
            {leftover > 0 && 
            <p className="text-lg">... and still have ${leftover.toLocaleString()} leftover.</p>
            }
            
            <p className="text-base">Elizabeth’s wealth tax, which only impacts America’s 75,000 wealthiest families, would generate enough revenue to cover universal child care, quality public education, forgive student loan debt, provide free public college, and help finance Medicare for All.</p>
            <p className="text-base">
              <a href="https://elizabethwarren.com/plans/ultra-millionaire-tax">Find out more about the Wealth tax and join the fight</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
