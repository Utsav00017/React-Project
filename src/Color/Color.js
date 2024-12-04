import React, { useEffect, useRef, useState } from 'react';
// import './App.css';

const App = () => {
  const [log, setLog] = useState([]);
  const observerRef = useRef(null);

  useEffect(() => {
    const observeResults = () => {
      const targetNode = document.querySelector('.parity-record'); // Adjust selector as needed

      if (targetNode) {
        const config = { childList: true, subtree: true };

        const callback = (mutationsList) => {
          for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
              const newNodes = Array.from(mutation.addedNodes).map(node => node.textContent);
              console.log('New child nodes added:', newNodes);
              setLog(prevLog => [...prevLog, ...newNodes]);
            }
          }
        };

        observerRef.current = new MutationObserver(callback);
        observerRef.current.observe(targetNode, config);
      } else {
        console.log('Target node not found, retrying...');
        setTimeout(observeResults, 1000); // Retry after 1 second
      }
    };

    observeResults();

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Color Prediction Monitoring</h1>
        <div className="parity-record">
          {/* Parity records will be dynamically added here */}
        </div>
        <div className="log">
          {log.map((entry, index) => (
            <div key={index}>{entry}</div>
          ))}
        </div>
      </header>
    </div>
  );
};

export default App;

