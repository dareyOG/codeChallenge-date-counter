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
  function stepPrevious() {
    setStep(currStep => currStep - 1);
  }

  // Next count
  function stepNext() {
    setStep(currStep => currStep + 1);
  }

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

  return (
    <>
      <div>
        <button onClick={stepPrevious}>-</button>
        <span>Step: {step}</span>
        <button onClick={stepNext}>+</button>
      </div>
      <div>
        <button onClick={countPrevious}>-</button>
        <span>Count: {count}</span>
        <button onClick={countNext}>+</button>
      </div>
      <p>
        {count < 0 && `${Math.abs(count)} days ago was ${addDays(date, count)}`}
        {count === 0 && `Today is ${date.toDateString()}`}
        {count > 0 && `${count} days from today is ${addDays(date, count)}`}
      </p>
    </>
  );
}

// Jonas' solution

function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const date = new Date('june 21 2027');
  date.setDate(date.getDate() + count);

  return (
    <div>
      <div>
        <button
          onClick={() => {
            setStep(s => s - 1);
          }}
        >
          -
        </button>
        <span>Step: {step}</span>
        <button
          onClick={() => {
            setStep(s => s + 1);
          }}
        >
          +
        </button>
      </div>

      <div>
        <button
          onClick={() => {
            setCount(c => c - step);
          }}
        >
          -
        </button>
        <span>Count: {count}</span>
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
    </div>
  );
}
