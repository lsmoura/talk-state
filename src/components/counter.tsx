import React, { useCallback, useState } from 'react';

const Counter = () => {
  const [counter, setCounter] = useState(0);
  const increaseCounter = useCallback(() => {
    setCounter(e => e + 1);
  }, [setCounter]);
  const decreaseCounter = useCallback(() => {
    setCounter(e => e - 1);
  }, [setCounter]);

  return (
    <div>
      <div>{counter}</div>
      <div>
        <button onClick={increaseCounter}>increase</button>
        <button onClick={decreaseCounter}>decrease</button>
      </div>
    </div>
  );
};

export default Counter;
