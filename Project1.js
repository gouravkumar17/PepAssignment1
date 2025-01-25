import React,{useState,useEffect} from 'react';
function Project1(){
  const [workTime,setWorkTime] = useState(25);
  const [breakTime,setBreakTime] = useState(5);
  const [timerState,setTimerState] = useState('stopped');
  const [currentTime,setCurrentTime] = useState(workTime*60);
  const [isRunning,setIsRunning] = useState(false);

  useEffect(()=>{
    if(!isRunning) return;
    const timer = setInterval(()=>{
      setCurrentTime((prev)=>prev-1);
    },1000);
    return ()=>clearInterval(timer);
  },[isRunning]);

  useEffect(()=>{
    if(currentTime === 0){
      if(timerState === 'working'){
        alert('Work time complete!');
        setTimerState('breaking');
        setCurrentTime(breakTime*60);
      }
      else if(timerState === 'breaking'){
        alert('Break time complete!');
        setTimerState('stopped');
        setIsRunning(false);
        setCurrentTime(workTime*60);
      }
    }
  },[currentTime,timerState,workTime,breakTime]);

  function handleStart(){
    setTimerState('working');
    setIsRunning(true);
  };

  function handleStop(){
    setTimerState('stopped');
    setIsRunning(false);
  };

  function handleReset(){
    setTimerState('stopped');
    setIsRunning(false);
    setCurrentTime(workTime*60);
  };

  function handleWorkTimeChange(event){
    const value = parseFloat(event.target.value);
    if (!isNaN(value) && value >= 0){
      setWorkTime(value);
      if(!isRunning) setCurrentTime(value*60);
    }
    else{
      setWorkTime('');
    }
  };

  function handleBreakTimeChange(event){
    const value = parseFloat(event.target.value);
    if(!isNaN(value) && value >= 0){
      setBreakTime(value);
    }
    else{
      setBreakTime('');
    }
  };

  function formatTime(seconds){
    const minutes = Math.floor(seconds/60).toString().padStart(2,'0');
    const secondsLeft = (seconds%60).toString().padStart(2,'0');
    return `${minutes}:${secondsLeft}`;
  };

  return (
    <div>
      <h1>{formatTime(currentTime)}</h1>
      <h2>{timerState === 'working'?'Work Time':timerState === 'breaking' ? 'Break Time' : 'Stopped'}</h2>
      <div>
        <button onClick={handleStart} disabled={isRunning}>Start</button>
        <button onClick={handleStop} disabled={!isRunning}>Stop</button>
        <button onClick={handleReset} disabled={!isRunning}>Reset</button>
      </div>
      <div>
        <label>
          <input type="number" step="1" value={workTime} onChange={handleWorkTimeChange} placeholder="Enter Work Duration"/>
        </label>
        <label>
          <input type="number" step="1" value={breakTime} onChange={handleBreakTimeChange} placeholder="Enter Break Duration"/>
        </label>
      </div>
    </div>
  );
}
export default Project1;
