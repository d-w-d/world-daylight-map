import { makeStyles } from '@material-ui/styles';

import { IProps } from './index';

// Control-layout params
const controlHeight = 120;
const controlWidth = 220;
export const outerTopControlsOffset = 60;

// Params for controls in square-ish layout
const squareControlsLayoutCols = 'repeat(6, minmax(0px, 1fr))';
const squareControlsLayoutRows =
  'minmax(0px, 2fr) minmax(0px, 2fr) minmax(0px, 2fr)';
const squareControlsLayoutArea = `
    'timeZoneLabel timeZoneLabel timeZoneLabel timeZoneLabel timeZoneLabel timeZoneLabel'
    'decreaseMonth decreaseDay date date increaseDay increaseMonth'
    'decreaseTimezone decreaseTimezone time time increaseTimezone increaseTimezone'
`;

// Params for controls in row-ish layout
const rowControlsLayoutCols =
  'minmax(0px, 1fr) minmax(0px, 2fr) minmax(0px, 1fr) minmax(0px, 4fr) minmax(0px, 1fr) minmax( 0px, 1fr ) minmax(0px, 2fr) repeat(2, minmax(0px, 1fr)) ';
const rowControlsLayoutRows = 'minmax(0px, 1fr)';
const rowControlsLayoutArea =
  "'decreaseTimezone time increaseTimezone timeZoneLabel decreaseMonth decreaseDay date increaseDay increaseMonth'";

export const useStyles = (
  {
    width,
    height,
    controlsPosition,
    font,
    fontSize,
    controlsScale = 1,
  }: IProps['options'],
  fontScaleFactor: number = 1
) => {
  // console.log('width height', width, height);

  const svgHeight =
    controlsPosition === 'outer-top'
      ? `calc(100% - ${outerTopControlsOffset}px)`
      : '100%';

  return makeStyles(
    theme => ({
      container: {
        position: 'relative',
        width,
        height,
        margin: 'auto',
        padding: 0,
        fontFamily: font,
        fontSize: !!fontSize ? fontSize : 24 * fontScaleFactor,
        overflow: 'hidden',
        '& svg': {
          position: 'absolute',
          left: '0px',
          width: '100%',
          bottom: '0px',
          height: svgHeight,
          overflow: 'visible',
        },

        // Make sure we override any global box-size setting:
        boxSizing: 'border-box',
        '& *': {
          boxSizing: 'border-box',
        },
      },

      // Control Basics
      controls: {
        // Basics for the control panel
        position: 'absolute',
        color: '#fff',
        padding: '10px',
        transform: `scale(${controlsScale > 1 ? 1 : controlsScale})`,
        display: 'grid',
        gap: '3px',

        // Default values for control-panel children
        '& > div': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        },
      },

      // Misc Inner Control Details
      arrowWrapper: {
        transition: 'background-color 0.2s ease-in-out',
        cursor: 'pointer',

        '& *': {
          transition: 'background-color 0.2s ease-in-out',
          cursor: 'pointer',
        },
        '&:hover': {
          'background-color': 'rgba(255, 255, 255, 0.3)',
        },
      },

      arrow: {
        //
      },

      timezoneLabelText: {
        whiteSpace: 'normal',
        textAlign: 'center',
      },

      timeText: {
        //
      },

      dateText: {
        //
      },

      //////////////////////
      // Control Positioning
      //////////////////////
      controlsPositionOuterTop: {
        top: 0,
        left: 0,
        right: 0,
        height: controlHeight / 2,
        transformOrigin: 'center top',
        gridTemplateColumns: rowControlsLayoutCols,
        gridTemplateRows: rowControlsLayoutRows,
        gridTemplateAreas: rowControlsLayoutArea,
      },
      controlsPositionTop: {
        top: 0,
        left: 0,
        right: 0,
        height: controlHeight / 2,
        transformOrigin: 'center top',
        gridTemplateColumns: rowControlsLayoutCols,
        gridTemplateRows: rowControlsLayoutRows,
        gridTemplateAreas: rowControlsLayoutArea,
      },
      controlsPositionBottom: {
        bottom: 0,
        left: 0,
        right: 0,
        height: controlHeight / 2,
        transformOrigin: 'center bottom',
        gridTemplateColumns: rowControlsLayoutCols,
        gridTemplateRows: rowControlsLayoutRows,
        gridTemplateAreas: rowControlsLayoutArea,
      },
      controlsPositionTopLeft: {
        top: 0,
        left: 0,
        width: controlWidth,
        height: controlHeight,
        transformOrigin: 'left top',
        gridTemplateColumns: squareControlsLayoutCols,
        gridTemplateRows: squareControlsLayoutRows,
        gridTemplateAreas: squareControlsLayoutArea,
      },
      controlsPositionTopRight: {
        top: 0,
        right: 0,
        width: controlWidth,
        height: controlHeight,
        transformOrigin: 'right top',
        gridTemplateColumns: squareControlsLayoutCols,
        gridTemplateRows: squareControlsLayoutRows,
        gridTemplateAreas: squareControlsLayoutArea,
      },
      controlsPositionBottomLeft: {
        bottom: 0,
        left: 0,
        width: controlWidth,
        height: controlHeight,
        transformOrigin: 'left bottom',
        gridTemplateColumns: squareControlsLayoutCols,
        gridTemplateRows: squareControlsLayoutRows,
        gridTemplateAreas: squareControlsLayoutArea,
      },
      controlsPositionBottomRight: {
        bottom: 0,
        right: 0,
        width: controlWidth,
        height: controlHeight,
        transformOrigin: 'right bottom',
        gridTemplateColumns: squareControlsLayoutCols,
        gridTemplateRows: squareControlsLayoutRows,
        gridTemplateAreas: squareControlsLayoutArea,
      },
      controlsPositionNoControls: {
        display: 'none',
      },

      //////////////////////////////////////
      // Control Grid Cell Area Labels
      //////////////////////////////////////
      timezoneLabel: { gridArea: 'timeZoneLabel' },
      increaseTimezone: { gridArea: 'decreaseTimezone' },
      time: { gridArea: 'time' },
      decreaseTimezone: { gridArea: 'increaseTimezone' },
      daylightSavingsLabel: { gridArea: 'daylightSavingsLabel' },
      decreaseMonth: { gridArea: 'decreaseMonth' },
      decreaseDay: { gridArea: 'decreaseDay' },
      date: { gridArea: 'date' },
      increaseDay: { gridArea: 'increaseDay' },
      increaseMonth: { gridArea: 'increaseMonth' },
    }),
    { name: 'world-daylight-map' }
  );
};
