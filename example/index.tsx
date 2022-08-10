import * as React from 'react';
import { createRoot } from 'react-dom/client';

import { WorldDaylightMap, Options } from '../dist';
import { icons } from './icons';

const options: Options = {
  controlsPosition: 'outer-top',
  controlsScale: 1,
  font: "'Roboto', sans-serif",
  fontSize: undefined,
  isSunshineDisplayed: true,
  icons,
};

const App = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  return (
    <div style={{ height: 600 }}>
      <div style={{ height: '100%' }}>
        <WorldDaylightMap options={options} />
      </div>

      <button onClick={() => setIsDialogOpen(true)}>Open Dialog</button>
    </div>
  );
};

createRoot(document.getElementById('app')!).render(<App />);
