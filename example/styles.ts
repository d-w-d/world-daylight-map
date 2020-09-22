import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  theme => ({
    container: {
      position: 'relative',
      width: '100%',
      height: '100%',
    },

    nonDialogMapWrapper: {
      width: '100%',
      height: '600px',
    },

    dialogContainer: {
      position: 'relative',
      boxSizing: 'border-box',
      minHeight: 300,
      // Make height = width / 2
      '&::before': {
        display: 'block',
        paddingTop: '50%',
        content: '" "',
        padding: 10,
      },
    },

    dialogMapWrapper: {
      position: 'absolute',
      backgroundColor: 'green',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  }),

  { name: 'demo' }
);
