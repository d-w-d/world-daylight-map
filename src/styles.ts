import { makeStyles } from '@material-ui/core';

import { IProps } from './index';

const controlHeight = 80;
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
/* const rowControlsLayoutCols = `minmax(0px, 4fr) minmax(0px, 0.0fr) minmax(0px, 1fr) minmax(0px, 2fr) minmax(0px, 1fr) minmax( 0px, 0.0fr ) repeat(2, minmax(0px, 1fr)) minmax(0px, 2fr) repeat(2, minmax(0px, 1fr)) `;
const rowControlsLayoutRows = `minmax(0px, 1fr)`;
const rowControlsLayoutArea = `'timeZoneLabel . decreaseTimezone time increaseTimezone . decreaseMonth decreaseDay date increaseDay increaseMonth'`; */

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
  }: IProps,
  fontScaleFactor: number = 1
) => {
  // console.log('font', fontScaleFactor);

  const svgHeight =
    controlsPosition === 'outer-top'
      ? `calc(100% - ${outerTopControlsOffset}px)`
      : '100%';

  return makeStyles(
    theme => ({
      container: {
        position: 'relative',
        // backgroundColor: 'green',
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
      // Control Grid Cell Containers
      //////////////////////////////////////
      timezoneLabel: {
        gridArea: 'timeZoneLabel',
        // fontSize: 14,
        // background-color: green;
        '& #timezone-label-text': {
          whiteSpace: 'normal',
          textAlign: 'center',
          // wordWrap: 'normal'
        },
      },
      increaseTimezone: {
        gridArea: 'decreaseTimezone',
        // background-color: red;
      },
      time: {
        gridArea: 'time',
        // background-color: yellow;
      },
      decreaseTimezone: {
        gridArea: 'increaseTimezone',
        // background-color: brown;
      },
      daylightSavingsLabel: {
        gridArea: 'daylightSavingsLabel',
        // background-color: purple;
      },
      decreaseMonth: {
        gridArea: 'decreaseMonth',
        // background-color: orange;
      },
      decreaseDay: {
        gridArea: 'decreaseDay',
        // background-color: pink;
      },
      date: {
        gridArea: 'date',
        // background-color: cyan;
        '& date-text': {
          fontSize: '16px',
        },
      },
      increaseDay: {
        gridArea: 'increaseDay',
        // background-color: blue;
      },
      increaseMonth: {
        gridArea: 'increaseMonth',
        // background-color: magenta;
      },
    }),
    { name: 'world-daylight-map' }
  );
};
