import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'react-app-polyfill/ie11';
import { Dialog, DialogProps } from '@material-ui/core';

import { WorldDaylightMap, Options } from '../.';
import { useStyles } from './styles';
import { icons } from './icons';
import './styles.css';

const options: Options = {
  controlsPosition: 'outer-top',
  controlsScale: 1,
  font: "'Roboto', sans-serif",
  fontSize: undefined,
  isSunshineDisplayed: !true,
  icons,
};

const App = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.nonDialogMapWrapper}>
        <WorldDaylightMap options={options} />
      </div>

      <button onClick={() => setIsDialogOpen(true)}>Open Dialog</button>

      <Dialog
        fullWidth={true}
        maxWidth={'xl' as DialogProps['maxWidth']}
        onClose={() => setIsDialogOpen(false)}
        aria-labelledby="programs-dialog"
        open={isDialogOpen}
      >
        <div className={classes.dialogContainer}>
          <div className={classes.dialogMapWrapper}>
            <WorldDaylightMap
              options={{
                controlsPosition: 'outer-top',
                isSunshineDisplayed: false,
                icons,
              }}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
