import React, { Component } from 'react';
import { render } from 'react-dom';
import { Graph } from './graph';
import './style.css';

interface AppProps {}
interface AppState {
  name: string;
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React',
    };
  }

  render() {
    return (
      <div>
        <Graph />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
