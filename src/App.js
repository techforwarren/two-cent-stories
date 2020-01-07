import React, { useState, useEffect } from 'react';
import './App.css';
import NameBlock from './NameBlock';

function App() {

  const billGatesTotal = 6379000000;

  const [submissions, setSubmissions] = useState([]);
  const [totalDebt, setTotalDebt] = useState(0);
  const [lastSub, setLastSub] = useState(0);
  const [totalSubs, setTotalSubs] = useState(0);
  const limit = 58;
  useEffect(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "?limit=" + limit + "&from=" + lastSub)
      .then((res) => res.json())
      .then((data) =>{
        setTotalDebt(data[0]['total_debt'])
        setSubmissions(submissions.concat(data[0]['submissions']))
        setTotalSubs(data[0]['count_submissions']);
      })
    }, [lastSub])

    function moneyLeft(){
      return(billGatesTotal-totalDebt);
    }

  return (
    <div className="App">      
      <div>
        <h1>Bill Gates would pay $6.379 billion next year under Elizabeth's wealth tax.</h1>
        <h3>That's enough money to pay off student loan debt for {totalSubs} people and still have ${moneyLeft().toLocaleString()} left over.</h3>
      </div>
        <NameBlock data={submissions}/>
      <div>

        { lastSub+limit < totalSubs &&
          <button onClick={() => {setLastSub(lastSub+limit)}}>more stories</button>
        }
       
        
        <p>Elizabeth's wealth tax, which only impacts America's 75,000 wealthiest families, would generate enough revenue to cover universal child care, quality public education, forgive student loan debt, provide free public college, and help finance Medicare for All.</p>
        <a href="https://elizabethwarren.com/plans/ultra-millionaire-tax">Find out more about the wealth tax</a> and <a href="https://elizabethwarren.com/join-us">join the fight</a>
        <div className="disclaimer">
          <p>Not affiliated with the Warren For President campaign</p>
          <p>Created by volunteers</p>
        </div>
        
      </div>

    </div>
  );
}

export default App;
