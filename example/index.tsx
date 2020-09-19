import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import { WorldDaylightMap } from '../.';
const WorldDaylightMap = require('../dist').default;
import './styles.css';

console.log(WorldDaylightMap);

const App = () => {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <WorldDaylightMap
        options={
          {
            // width: 300,
            // height: 300,
            // controlsPosition: 'outer-top',
            // controlsScale: 1.0,
            // font: "'Roboto', sans-serif",
            // fontSize: 24,
          }
        }
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
