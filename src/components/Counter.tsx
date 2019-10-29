import React from 'react';

interface CounterProps {
  count: number;
}

const Counter: React.FC<CounterProps> = ({ count }) => {
  const plural = count === 1 ? '' : 's';

  return (
    <small role="alert" aria-live="polite" className="text-muted font-italic">
      {count} recipe{plural}
    </small>
  );
};

export default Counter;
