import React, { useState, useEffect } from 'react';
import 'typeface-roboto';
import './App.css';
import NameBlock from './NameBlock';

function App() {

  const billGatesTotal = 6379000000;

  const [submissions, setSubmissions] = useState([]);
  const [totalDebt, setTotalDebt] = useState(0);


  useEffect(() => {
    fetch('https://tpkfcvx8jf.execute-api.us-east-1.amazonaws.com/dev/submissions')
      .then((res) => res.json())
      .then((data) => {
        setTotalDebt(data[0]['total_debt'])
        setSubmissions(data[0]['submissions'])
      })
    }, [])

    function moneyLeft(){
      return(billGatesTotal-totalDebt);
    }

  return (
    <div className="App">

      <div className="App-header">
        <div className="App-container">
          <div className="App-section">
            <h1 className="text-xl">Bill Gates would pay $6.379 billion next year under Elizabeth’s wealth tax.</h1>
            <p className="text-lg">That’s enough money to pay off student loan debt for ...</p>
          </div>
        </div>
      </div>

      <div className="App-main">
        <div className="App-container">
          <div className="App-section">
            <NameBlock data={submissions}/>
          </div>
        </div>
      </div>

      <div className="App-footer">
        <div className="App-container">
          <div className="App-section">
            {moneyLeft() > 0 && 
            <p className="text-lg text-right">... and still have ${moneyLeft().toLocaleString()} left over.</p>
            }
            
            <p className="text-base">Elizabeth’s wealth tax, which only impacts America’s 75,000 wealthiest families, would generate enough revenue to cover universal child care, quality public education, forgive student loan debt, provide free public college, and help finance Medicare for All.</p>
            <p className="text-base text-center">
              <a href="https://elizabethwarren.com/plans/ultra-millionaire-tax">Find out more about the wealth tax</a> and <a href="https://elizabethwarren.com/join-us">join the fight</a>
            </p>
            <div className="disclaimer text-center">
              <p>Not affiliated with the Warren For President campaign</p>
              <p>Created by volunteers</p>
            </div>
          </div>
        </div>
      </div>
  
    </div>
  );
}

export default App;
