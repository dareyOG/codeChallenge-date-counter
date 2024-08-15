import { useState } from 'react';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <MyCounter />
      <Counter />
    </div>
  );
}

// My solution:

function MyCounter() {
  const date = new Date();

  const [step, setStep] = useState(1);

  const [count, setCount] = useState(step - 1);

  // Previous step
  function countPrevious() {
    setCount(currCount => currCount - step);
  }

  // Next count
  function countNext() {
    setCount(currCount => currCount + step);
  }

  // Function to add days to current date
  function addDays(date, days) {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate.toDateString();
  }

  // Function reset
  function resetFunc() {
    setStep(1);
    setCount(0);
  }

  return (
    <>
      <div>
        <div>Step: {step}</div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={e => setStep(Number(e.target.value))}
        />
      </div>
      <div>
        <button onClick={countPrevious}>-</button>

        <input
          type="text"
          value={count}
          onChange={e => setCount(Number(e.target.value))}
        />

        <button onClick={countNext}>+</button>
      </div>
      <p>
        {count < -1 &&
          `${Math.abs(count)} days ago was ${addDays(date, count)}`}
        {count === -1 && `Yesterday was ${addDays(date, count)}`}
        {count === 0 && `Today is ${date.toDateString()}`}
        {count === 1 && `Tomorrow  is ${addDays(date, count)}`}
        {count >= 2 && `${count} days from today is ${addDays(date, count)}`}
      </p>

      {(step !== 1 || count !== 0) && (
        <div>
          <button onClick={resetFunc}>Reset</button>
        </div>
      )}
    </>
  );
}

// Jonas' solution

function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  function handleReset() {
    setCount(0);
    setStep(1);
  }
  const date = new Date('june 21 2027');
  date.setDate(date.getDate() + count);

  return (
    <div>
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={e => setStep(Number(e.target.value))}
        />
        <span>Step: {step}</span>
      </div>

      <div>
        <button
          onClick={() => {
            setCount(c => c - step);
          }}
        >
          -
        </button>
        <input
          type="text"
          value={count}
          onChange={e => setCount(Number(e.target.value))}
        />
        <button
          onClick={() => {
            setCount(c => c + step);
          }}
        >
          +
        </button>
      </div>

      <p>
        <span>
          {count === 0
            ? 'Today is '
            : count > 0
            ? `${count} days from today is `
            : `${Math.abs(count)} days ago was `}
        </span>
        <span>{date.toDateString()}</span>
      </p>

      {count !== 0 || step !== 1 ? (
        <button onClick={handleReset} onChange={handleReset}>
          Reset
        </button>
      ) : null}
    </div>
  );
}
