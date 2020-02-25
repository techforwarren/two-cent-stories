import React, { useState, useEffect } from 'react';
import 'typeface-roboto';
import './App.css';
import NameBlock from './NameBlock';

function App() {

//  const billGatesTotal = 6379000000;
  const bloombergTotal = 3163000000;

  const [submissions, setSubmissions] = useState([]);
  const [totalDebt, setTotalDebt] = useState(0);


  useEffect(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT)
      .then((res) => res.json())
      .then((data) => {
        setTotalDebt(data[0]['total_debt'])
        setSubmissions(data[0]['submissions'])
      })
    }, [])

    function moneyLeft(){
      return(bloombergTotal-totalDebt);
    }

  return (
    <div className="App">

      <div className="App-header">
        <div className="App-container">
          <div className="App-section">
            <title>How Elizabeth Warren Would Make Bloomberg Pay Your Student Loans</title>
            <h2 className="text-lg">Michael Bloomberg has spent over $500 million trying to buy this election. Elizabeth Warren has a better plan for all that cash.</h2>
   <h2 className="text-lg">Under Elizabeth’s <a href="https://elizabethwarren.com/plans/ultra-millionaire-tax">Ultra-Millionaire Tax</a> plan, Bloomberg would pay <a href="https://elizabethwarren.com/calculator/ultra-millionaire-tax">$3.16 billion</a>next year alone.</h2>
            <h2 className="text-lg">That’s enough money to pay off student loan debt for ...</h2>
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
            
            <p className="text-base">Elizabeth’s <a href="https://elizabethwarren.com/plans/ultra-millionaire-tax">Ultra-Millionaire Tax</a>, which only impacts America’s 75,000 wealthiest families, funds her biggest and boldest ideas, including:</p>
              <ul>
                <li><a href="https://elizabethwarren.com/plans/student-loan-debt-day-one">Student loan debt forgiveness</a></li>
                <li><a href="https://elizabethwarren.com/kids/">Universal child care</a></li>
                <li><a href="https://elizabethwarren.com/plans/public-education">Quality public education</a></li>
                <li><a href="https://elizabethwarren.com/plans/affordable-higher-education">Free public college for all</a></li>
              </ul>
            <p className="text-base text-center">
              Find out more about the <a href="https://elizabethwarren.com/plans/ultra-millionaire-tax">Ultra-Millionaire Tax</a> and <a href="https://elizabethwarren.com/join-us">join the fight</a>!
            </p>


 <p className="text-base text-center">
              It’s hard to imagine just how much one billion dollars really is—let alone three <i>trillion</i>. To help show how much Warren’s Ultra Millionaire tax could help all Americans, we wanted to show the tangible, human impact of the funds generated from one billionaire alone. Numbers can feel abstract, but behind every number in Warren’s plan are millions of people——and their stories.</p>
            <div className="disclaimer text-center">
              <p>Not affiliated with the Warren For President campaign</p>
              <p>This site was created independently by volunteers. <a href="https://elizabethwarren.com/all-in-for-warren/">Join us!</a></p>
              <small><strong>*</strong>This name is a placeholder</small>
            </div>
          </div>
        </div>
      </div>
  
    </div>
  );
}

export default App;
