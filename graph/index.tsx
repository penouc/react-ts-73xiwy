import React, { useState } from 'react';

function Graph() {
  const [num, setNum] = useState(123);

  return <div>{num}</div>;
}

export { Graph };
