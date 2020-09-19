import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { WorldDaylightMap } from '../.';
import './styles.css';

const App = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '400px',
      }}
    >
      <WorldDaylightMap
        controlsPosition="outer-top"
        controlsScale={1.8}
        // fontSize="16px"
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
