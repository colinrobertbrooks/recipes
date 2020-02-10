import React from 'react';

interface CounterProps {
  count: number;
}

const Counter: React.FC<CounterProps> = ({ count }) => (
  <small role="alert" aria-live="polite" className="text-muted font-italic">
    {count} {count === 1 ? 'recipe' : 'recipes'}
  </small>
);

export default Counter;
