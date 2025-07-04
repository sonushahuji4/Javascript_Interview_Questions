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

// inside of useState(), how it is create and built
const stateValues = [];
let callIndex = -1
const useState = (initialState) => {
  callIndex += 1;
  const currentCallIndex = Number(callIndex);
  if(stateValues[currentCallIndex] === undefined){
    stateValues[currentCallIndex] = initialState;
  }
  const setValue = (newValue) => {
    stateValues[currentCallIndex] = newValue;
    renderApp()
  }
  return [stateValues[currentCallIndex], setValue];
}

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
 /** Link: https://www.youtube.com/watch?v=5zempLONkxM&ab_channel=YoshitaJain */

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



/**
  Higher Order Components
  * A higher-order component is a function that takes a component and returns a new component with enhanced functionality. 
  - what ?
  - why ?
  - when ?
  - how ?

*/

import React, { useState } from 'react';

function App() {
  

  return (
    <div classNampe="parrent-component">
      <HocRed cmp={CounterCmp}/>
      <HocBlue cmp={CounterCmp}/>
    </div>
    )
    
}

export default App;


const HocRed = (props) => {
    return <p style={{color: "red"}}><props.cmp/></p>
}

const HocBlue = (props) => {
    return <p style={{color: "blue"}}><props.cmp/></p>
}

const CounterCmp = () => {
  
  const [count, setCount] = useState(0)
  
  return <div>
    <p> Red count : {count} </p>
      <button onClick={() => setCount(count + 1)}> count </button><br/> <br/>
  </div>
}


/**
  React Component Life Cycle
  1. Mounting - Birth of your component
  2. Update - Growth of your component
  3. UnMount - Death of your component

  Phase 1
    1. render() is used to render HTML of component in react. This method is required for class based component to render DOM.
        It runs during the mounting and updating of your component.
  Phase 2
    1. componentDidMount() method runs after the component output has been rendered to the DOM.

  Phase 3
    1. componentDidUpdate() method invokes as soon as updating happens. The most use case for componentDidUpdate() is updating the DOM in response to props or state change.

  Phase 4
    1. componentWillUnmount() method is called just before the component is unmounted and destroyed. Usually used to perform cleanups.
    
*/



/**
  State Management
  
  - state / props
      props (short for “properties”) and state are both plain JavaScript objects.
      both hold information that influences the output of render
      props get passed to the component (similar to function parameters)
      state is managed within the component (similar to variables declared within a function)
      
  - props driling
  
      Parent Component
          ||
          `,
      Child A Component
          ||
          `,
      Child B Component
          ||
          `,
      Child C Component

      now I have a data "name" which I need to pass directly to Child C component, how can I do that ?

      Data is passed from parent to Child A Component and then to Child B Component and then to Child C Component, and finaly Child C Component can access "name" data.
      This concept is called props driling.
      
      Note:
        Excessive prop drilling can lead to unnecessary re-renders of intermediate components. Even if those components don’t directly use the props, they still need to pass them down, which can negatively impact performance.
        To avoid this, we can make use of context API and context hook
        
  - context api
  
      1. create ( create a context )
      2. provide ( provide data )
      3. consume ( consume data )

      dataContext = createContext()

      const App  = () => {
        return (
          <dataContext.Provider value={"data value"}>
            <ChildAComponent/>
          </dataContext.Provider>
        }
      }

      const ChildAComponent = () => {
        return (
          <dataContext.Consumer>
            {
              (name) => {
                return (
                  <p>{name}</p>
                )
              }
            }
          </dataContext.Consumer>
        )
      }
      
   - passing data component to component, parent to child, sliblings etc
*/



/**
  Custom Hooks in React
    1. Custom Hooks are Regular JavaScript Functions:
      - Custom hooks are essentially JavaScript functions. The key difference is that their names start with "use", which is a convention that indicates they follow the rules of hooks.
    
    2. Using Other Hooks in Custom Hooks:
      - Inside custom hooks, you can utilize other React hooks (like useState, useEffect, useContext, etc.). This allows you to create hooks that manage state, handle side effects, or use context in a reusable way.
    
    3. Extracting and Reusing Logic:
      - One of the primary reasons for creating custom hooks is to extract and reuse logic that is common across multiple components. This helps in avoiding code duplication and keeps your components cleaner and more focused on their primary responsibilities.

    4. Code Reusability:
      - Custom hooks allow you to encapsulate logic that can be reused across different components. This promotes the DRY (Don't Repeat Yourself) principle and reduces redundancy in your codebase.
    
    5. Separation of Concerns:
      - By moving logic into custom hooks, you can separate the logic from the UI. This makes your components more focused and easier to manage, as they only handle rendering and user interactions.

    6. Testability
      - Custom hooks can be tested independently of the components that use them. This makes it easier to write unit tests and ensures that your logic works correctly in isolation.
    
*/


import { useState } from "react";

const useCounter = () => {
  const [count, setCount] = useState(0);

  const increament = () => {
    setCount(count + 1)
  }

  const decrement = () => {
    setCount(count - 1)
  }

  return [count, increament, decrement]
}

export default useCounter;



/**

  Lazy Loading in ReactJS
    1. Lazy loading in ReactJS is a technique used to improve performance by loading components or resources only when they are needed, rather than at the initial page load.

    2. Key Points:
      - Improves Performance: Reduces initial load time by splitting the code into smaller chunks and loading them on demand.
      - React.lazy(): A built-in method to lazy load components.
      - Suspense: Used to display a fallback (like a loading spinner) while the lazy-loaded component is being fetched.
*/

import { lazy, Suspense } from "react";

const LazyComponent = lazy(() => import('./LazyComponent'));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}


/**
  Link : https://www.youtube.com/watch?v=uE925hp9KDk&ab_channel=AkshaySaini
  Virtual DOM
  1. What is DOM : Document, Object, Model
    - Javaxript provide DOM APIs to do some manipulation to HTML web page or update it via javascript.
    - HTML -> converted to DOM -> Rendered View
    - Updating the DOM is a lighter operation, but re-rendering parts post-update in the browser is a very costly operation. If you do this frequently, you might reduce the performance of your app, eventually making it slower. This is where some libraries come into play to solve that problem.
    - React never ever update the original DOM tree 
    - React create's Virtual DOM, that looks excatly the Original DOM
    - Instead of changing the real DOM right away, React first updates a lightweight copy of it. It compares this copy to the old one, finds what's different, and updates only those parts in the real DOM. This makes React apps faster and more efficient.
    - Reconciliation, explain above part, if asked in an interview
    - React uses Diffing algorithm to find out the what has been changed and then in batches it updates the real DOM at a certain frequency.
*/



/**
  -------------------- APIs Backend ------------------------
  1. What are HTTP methods
  - GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS, TRACE, CONNECT, 
  
  - GET
    Purpose: Retrieve data from a server.
  - POST
    Purpose: Send data to a server to create a new resource.
  - PUT
    Purpose: Update an existing resource or create it if it does not exist.
    Usage: Replaces the entire resource with the provided data.
  - PATCH
    Purpose: Apply partial modifications to a resource.
    Usage: Updates part of the resource.
  - DELETE
    Purpose: Remove a resource from the server.
    Usage: Deletes a specified resource.
  - HEAD
    Purpose: Retrieve metadata about a resource.
    Usage: Similar to GET, but without the response body.
  - OPTIONS
    Purpose: Describe the communication options for the target resource.
    Usage: Returns the HTTP methods that the server supports for the specified URL.
  - TRACE
    Purpose: Perform a message loop-back test along the path to the target resource.
    Usage: Useful for debugging and diagnostic purposes.
  - CONNECT
    Purpose: Establish a tunnel to the server identified by the target resource.
    Usage: Used for creating a network connection to a resource.

  Sure! Here are the short differences between these HTTP methods:

1. GET vs POST Methods
  
  GET:

    Used to retrieve data from a server.
    Data is sent in the URL.
    Safe and idempotent (no side effects, and repeated requests have the same effect as a single request).
    Limited data length due to URL length restrictions.
    Not secure for sensitive data.
    
  POST:

    Used to send data to a server to create/update a resource.
    Data is sent in the body of the request.
    Not idempotent (repeated requests can have different effects).
    No data length restrictions.
    More secure for sensitive data when used with HTTPS.
    
2. PUT vs PATCH Methods

  PUT:

    Used to update or create a resource.
    Sends the entire resource for update.
    Idempotent (repeated requests result in the same effect).
  
  PATCH:

  Used to partially update a resource.
  Sends only the changes to be applied.
  Not necessarily idempotent (repeated requests may have different effects).

3. PUT vs POST Methods

  PUT:

    Used to create or replace a resource at a specific URL.
    Idempotent (repeated requests result in the same effect).
    The client defines the URL of the resource.

  POST:

    Used to create a new resource, or to submit data to be processed.
    Not idempotent (repeated requests can have different effects).
    The server defines the URL of the new resource.


HTTP Status Code

  1xx: Informational
    100 Continue: The server has received the request headers and the client should proceed to send the request body.
    101 Switching Protocols: The server is switching protocols as requested by the client.
  
  2xx: Success
    200 OK: The request was successful.
    201 Created: The request was successful and a resource was created.
    202 Accepted: The request has been accepted for processing, but the processing is not complete.
    204 No Content: The request was successful but there is no content to send in the response.

  3xx: Redirection
    301 Moved Permanently: The resource has been permanently moved to a new URL.
    302 Found: The resource is temporarily located at a different URL.
    304 Not Modified: The resource has not been modified since the last request.

  4xx: Client Error
    400 Bad Request: The server cannot process the request due to a client error.
    401 Unauthorized: Authentication is required and has failed or has not been provided.
    403 Forbidden: The server understands the request but refuses to authorize it.
    404 Not Found: The requested resource could not be found.
    405 Method Not Allowed: The request method is not supported for the requested resource.

  5xx: Server Error
    500 Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request.
    501 Not Implemented: The server does not support the functionality required to fulfill the request.
    502 Bad Gateway: The server received an invalid response from an upstream server.
    503 Service Unavailable: The server is not ready to handle the request, often due to maintenance or overload.
    504 Gateway Timeout: The server did not receive a timely response from an upstream server.


  Main components of HTTP request
    - Request Line
    - Headers
    - Body
    - URL/Path Parameters
    - Cookies
*/



