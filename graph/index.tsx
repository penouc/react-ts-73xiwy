import React, { useState, useRef, useEffect } from 'react';
import { uuid } from './utils';

function Graph() {
  const [num, setNum] = useState(123);
  const uid = uuid();

  useEffect(() => {});

  return <div id={uid}></div>;
}

export { Graph };
