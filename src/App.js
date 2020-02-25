import React, { useState, useEffect } from 'react';
import 'typeface-roboto';
import './App.css';
import NameBlock from './NameBlock';
import CollapseStoryBlock from './CollapseStoryBlock';

function App() {

//  const billGatesTotal = 6379000000;
  const bloombergTotal = 3163000000;

  const [submissions, setSubmissions] = useState([]);
  const [totalDebt, setTotalDebt] = useState(0);

  const [lastSub, setLastSub] = useState(0);
  const [totalSubs, setTotalSubs] = useState(0);
  const limit = 12;

  useEffect(() => {
    
    if(lastSub === 0){
      fetch(process.env.REACT_APP_API_ENDPOINT + "?limit=" + 2 + "&from=" + lastSub)
      .then((res) => res.json())
      .then((data) => {
        setTotalDebt(data[0]['total_debt'])
        setSubmissions(submissions.concat(data[0]['submissions']))
        setTotalSubs(data[0]['count_submissions']);
      })
    }

    else{
      fetch(process.env.REACT_APP_API_ENDPOINT + "?limit=" + limit + "&from=" + lastSub)
        .then((res) => res.json())
        .then((data) => {
          setTotalDebt(data[0]['total_debt'])
          setSubmissions(submissions.concat(data[0]['submissions']))
          setTotalSubs(data[0]['count_submissions']);
        })
    }
    
    }, [lastSub])


  function loadStories(){
    let newLastSub = lastSub + limit;
    setLastSub(newLastSub)
  }

  function moneyLeft(){
    return(bloombergTotal-totalDebt);
  }

  return (
    <div className="App">

      <div className="App-header">
        <div className="App-container">
          <div className="App-section">
            <h1 className="text-xl">Michael Bloomberg would pay $3.163 billion next year under Elizabeth’s wealth tax.</h1>
            <h2 className="text-lg">That’s enough money to pay off student loan debt for ...</h2>
          </div>
        </div>
      </div>

      <div className="App-main">
        <div className="App-container">
          <div className="App-section">
            <CollapseStoryBlock data={submissions}/>
          </div>
          <div className="buttonDiv">
          <button className='moreStoriesButton' onClick={loadStories}>See More Stories</button>
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
              <p><a href="https://elizabethwarren.com/all-in-for-warren/">Created by volunteers</a></p>
              <small><strong>*</strong> This name is a placeholder</small>
            </div>
          </div>
        </div>
      </div>
  
    </div>
  );
}

export default App;