/**
 * List of Important React hooks
 * 1. useState
 * 2. useEffect
 * 3. useContext
 * 4. useReducer
 * 5. useCallback
 * 6. useMemo
 * 7. useRef
 * 8. useTransition
 * 9. useId
 * 10. useLayoutEffect
 */

import React, { useEffect, useState } from 'react';

/**
 * 1. useState() hook
 */
const [state, setState] = useState(initialState)

// other examples
const [age, setAge] = useState(28);
const [name, setName] = useState('Taylor');
const [todos, setTodos] = useState(() => createTodos());


/**
 * 2. useEffect()
 * This useEffect hook will be executed after the component has rendered
 */

const [count, setCount] = useState(0);

  // Variant 1: Runs after every render
useEffect(() => {
    console.log('Variant 1: Runs after every render');
});

// Variant 2: Runs once after initial render
useEffect(() => {
    console.log('Variant 2: Runs once after initial render');
}, []);

// Variant 3: Runs when count changes
useEffect(() => {
    console.log('Variant 3: Runs when count changes');
}, [count]);


/**
 * 3. useContext()
 * useContext is a React Hook that lets you read and subscribe to context from your component.
 */
// Note: create (using createContext) => provider => useContext
import React, { useContext } from 'react';

// Step 1: Create Context
const MyContext = React.createContext('default value');

// Step 2: Provide Context Value
function App() {
  return (
    <MyContext.Provider value="Hello from Context">
      <MyComponent />
    </MyContext.Provider>
  );
}

// Step 3: Consume Context Value
function MyComponent() {
  const value = useContext(MyContext);
  return <div>{value}</div>;
}

export default App;



/**
 * 4. useReducer()
 * useReducer is a React Hook that lets you add a reducer to your component.
 * const [state, dispatch] = useReducer(reducer, initialArg, init?)
 * Basically, you can build your own store and access data globally within the application using useContext and useReducer instead of relying on the external library Redux
 */

// CounterContext.js
import React, { createContext, useContext, useReducer } from 'react';

// Step 1: Create Context
const CounterContext = createContext();

// Step 2: Define Reducer
const initialState = { count: 0 };

function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

// Step 3: Create Provider Component
export function CounterProvider({ children }) {
  const [state, dispatch] = useReducer(counterReducer, initialState);
  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
}

// Step 4: Custom Hook to use Context
export function useCounter() {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error('useCounter must be used within a CounterProvider');
  }
  return context;
}

import React from 'react';
import { useCounter } from './CounterContext';

function CounterDisplay() {
  const { state } = useCounter();
  return <div>Count: {state.count}</div>;
}

export default CounterDisplay;



/**
 * 5. useCallback
 * const cachedFn = useCallback(fn, dependencies)
 * useCallback is a React hook used for optimizing performance by memoizing functions. 
 * It's particularly useful when passing callbacks to child components that rely on reference equality to avoid unnecessary re-renders.
 */
/**
 * 1. Memoizing Functions: When you wrap a function with useCallback, React will memoize the function so that it's only re-created if its dependencies change.
 * 2. Dependencies Array: You can specify an array of dependencies as the second argument to useCallback. React will re-create the memoized function only when any of the dependencies change. If the dependencies array is empty, the function will only be created once and won't change for the lifetime of the component.
 * 3. Avoiding Unnecessary Re-renders: By memoizing functions with useCallback, you can prevent unnecessary re-renders in child components that rely on reference equality to determine if props have changed.
 */

import React, { useState, useCallback } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);

  // This function will be re-created on every render
  const handleClick1 = () => {
    console.log('Button 1 clicked');
  };

  // This function will only be re-created if `count` changes
  const handleClick2 = useCallback(() => {
    console.log('Button 2 clicked');
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <ChildComponent onClick={handleClick1}>Button 1</ChildComponent>
      <ChildComponent onClick={handleClick2}>Button 2</ChildComponent>
    </div>
  );
}

function ChildComponent({ onClick, children }) {
  console.log('Rendering ChildComponent');
  return <button onClick={onClick}>{children}</button>;
}


/**
 * 6. useMemo 
 * const cachedValue = useMemo(calculateValue, dependencies)
 * useMemo is another React hook used for performance optimization, similar to useCallback. 
 * While useCallback is used to memoize functions, useMemo is used to memoize the result of expensive computations.
 */

/**
 * 1. Memoizing Values: When you wrap a value with useMemo, React will memoize the value so that it's only recalculated when necessary.
 * 2. Dependencies Array: Like useCallback, you can specify an array of dependencies as the second argument to useMemo. React will recompute the memoized value only when any of the dependencies change. If the dependencies array is empty, the value will only be computed once and won't change for the lifetime of the component.
 * 3. Avoiding Unnecessary Recomputations: By memoizing values with useMemo, you can prevent unnecessary recomputations of expensive operations, improving the performance of your application.
 */

import React, { useState, useMemo } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);

  // Expensive computation: factorial calculation
  const factorial = useMemo(() => {
    console.log('Computing factorial');
    let result = 1;
    for (let i = 2; i <= count; i++) {
      result *= i;
    }
    return result;
  }, [count]); // Recompute only when `count` changes

  return (
    <div>
      <p>Count: {count}</p>
      <p>Factorial: {factorial}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
    </div>
  );
}

// The factorial value is computed using useMemo. The factorial calculation is an expensive operation, so we want to memoize its result to avoid recomputing it unnecessarily.
// We specify count as a dependency for useMemo, so the factorial value will only be recomputed when the count state changes. If count remains the same between renders, the memoized value will be returned without recalculating the factorial.


/**
 * 7. useRef
 * const ref = useRef(initialValue)
 * useRef is a React hook used to create a mutable object that persists for the entire lifetime of the component. 
 * It allows you to keep references to DOM elements or to store any mutable value that persists across renders without causing a re-render.
 */

import React, { useRef, useEffect } from 'react';

function TextInputWithFocusButton() {
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus the input element when the component mounts
    inputRef.current.focus();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={() => inputRef.current.focus()}>Focus Input</button>
    </div>
  );
}
