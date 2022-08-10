import { IProps } from './index';
import { TStyles } from './models/TStyles';
import {
  controlHeight,
  controlWidth,
  outerTopControlsOffset,
} from './utils/constants';

// Params for controls in square-ish layout
const squareControlsLayoutCols = 'repeat(6, minmax(0px, 1fr))';
const squareControlsLayoutRows =
  'minmax(0px, 2fr) minmax(0px, 2fr) minmax(0px, 2fr)';
const squareControlsLayoutArea = `
    'timeZoneLabel timeZoneLabel timeZoneLabel timeZoneLabel timeZoneLabel timeZoneLabel '
    'decreaseMonth decreaseDay date date increaseDay increaseMonth '
    'decreaseTimezone decreaseTimezone time time increaseTimezone increaseTimezone '
`;

// Params for controls in row-ish layout
const rowControlsLayoutCols =
  'minmax(0px, 1fr) minmax(0px, 2fr) minmax(0px, 1fr) minmax(0px, 4fr) repeat(2, minmax(0px, 1fr)) minmax(0px, 2fr) repeat(2, minmax(0px, 1fr)) ';
const rowControlsLayoutRows = 'minmax(0px, 1fr)';
const rowControlsLayoutArea =
  "'decreaseTimezone time increaseTimezone timeZoneLabel decreaseMonth decreaseDay date increaseDay increaseMonth'";

const controlChildrenDefaults: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
};

/**
 * function used to be based on material-ui js-in-css styles
 */
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
  const svgHeight =
    controlsPosition === 'outer-top'
      ? `calc(100% - ${outerTopControlsOffset}px)`
      : '100%';

  // Determine controlsPositionClass based on controlsPosition input
  let controlsPositioning: React.CSSProperties | { display: 'none' } = {
    display: 'none',
  };
  switch (controlsPosition) {
    case 'top':
      controlsPositioning = {
        top: 0,
        left: 0,
        right: 0,
        height: controlHeight / 2,
        transformOrigin: 'center top',
        gridTemplateColumns: rowControlsLayoutCols,
        gridTemplateRows: rowControlsLayoutRows,
        gridTemplateAreas: rowControlsLayoutArea,
      };
      break;
    case 'outer-top':
      controlsPositioning = {
        top: 0,
        left: 0,
        right: 0,
        height: controlHeight / 2,
        transformOrigin: 'center top',
        gridTemplateColumns: rowControlsLayoutCols,
        gridTemplateRows: rowControlsLayoutRows,
        gridTemplateAreas: rowControlsLayoutArea,
      };
      break;
    case 'top-left':
      controlsPositioning = {
        top: 0,
        left: 0,
        width: controlWidth,
        height: controlHeight,
        transformOrigin: 'left top',
        gridTemplateColumns: squareControlsLayoutCols,
        gridTemplateRows: squareControlsLayoutRows,
        gridTemplateAreas: squareControlsLayoutArea,
      };
      break;
    case 'top-right':
      controlsPositioning = {
        top: 0,
        right: 0,
        width: controlWidth,
        height: controlHeight,
        transformOrigin: 'right top',
        gridTemplateColumns: squareControlsLayoutCols,
        gridTemplateRows: squareControlsLayoutRows,
        gridTemplateAreas: squareControlsLayoutArea,
      };
      break;
    case 'bottom':
      controlsPositioning = {
        bottom: 0,
        left: 0,
        right: 0,
        height: controlHeight / 2,
        transformOrigin: 'center bottom',
        gridTemplateColumns: rowControlsLayoutCols,
        gridTemplateRows: rowControlsLayoutRows,
        gridTemplateAreas: rowControlsLayoutArea,
      };
      break;
    case 'bottom-left':
      controlsPositioning = {
        bottom: 0,
        left: 0,
        width: controlWidth,
        height: controlHeight,
        transformOrigin: 'left bottom',
        gridTemplateColumns: squareControlsLayoutCols,
        gridTemplateRows: squareControlsLayoutRows,
        gridTemplateAreas: squareControlsLayoutArea,
      };
      break;
    case 'bottom-right':
      controlsPositioning = {
        bottom: 0,
        right: 0,
        width: controlWidth,
        height: controlHeight,
        transformOrigin: 'right bottom',
        gridTemplateColumns: squareControlsLayoutCols,
        gridTemplateRows: squareControlsLayoutRows,
        gridTemplateAreas: squareControlsLayoutArea,
      };
      break;
    case 'no-controls':
      controlsPositioning = {
        display: 'none',
      };
      break;
  }

  return (): TStyles => ({
    container: {
      position: 'relative',
      width,
      height,
      margin: 'auto',
      padding: 0,
      fontFamily: font,
      fontSize: !!fontSize ? fontSize : 24 * fontScaleFactor,
      overflow: 'hidden',
      // Make sure we override any global box-size setting:
      boxSizing: 'border-box',
    },

    svg: {
      position: 'absolute',
      left: '0px',
      width: '100%',
      bottom: '0px',
      height: svgHeight,
      overflow: 'visible',
    },

    controlsGrid: {
      // Basics for the control panel
      position: 'absolute',
      padding: '10px',
      transform: `scale(${controlsScale > 1 ? 1 : controlsScale})`,
      display: 'grid',
      gap: '3px',
      ...controlsPositioning,
    },

    // Misc Inner Control Details
    arrow: {
      transition: 'background-color 0.2s ease-in-out',
      cursor: 'pointer',
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

    //////////////////////////////////////
    // Control Grid Cell Area Labels
    //////////////////////////////////////
    timezoneLabel: {
      gridArea: 'timeZoneLabel',
      ...controlChildrenDefaults,
    },
    decreaseTimezone: {
      gridArea: 'increaseTimezone',
      ...controlChildrenDefaults,
    },
    time: {
      gridArea: 'time',
      ...controlChildrenDefaults,
    },
    increaseTimezone: {
      gridArea: 'decreaseTimezone',
      ...controlChildrenDefaults,
    },
    decreaseMonth: {
      gridArea: 'decreaseMonth',
      ...controlChildrenDefaults,
    },
    decreaseDay: {
      //
      gridArea: 'decreaseDay',
      ...controlChildrenDefaults,
    },
    date: {
      gridArea: 'date',
      ...controlChildrenDefaults,
    },
    increaseDay: {
      gridArea: 'increaseDay',
      ...controlChildrenDefaults,
    },
    increaseMonth: {
      gridArea: 'increaseMonth',
      ...controlChildrenDefaults,
    },
  });
};
