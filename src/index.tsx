import React, { useEffect, useState } from 'react';
import { simpleUID } from './utils';

import { useStyles } from './styles';
import { WorldDaylightMapGen as WDMG } from './WorldDaylightMapGen';
export type TControlsPosition =
  | 'outer-top'
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'no-controls';

export interface IProps {
  width?: string;
  height?: string;
  controlsPosition?: TControlsPosition;
  font?: string;
  fontSize?: number | string;
  controlsScale?: number;
}

export const WorldDaylightMap = ({
  // Provide default values to props
  width = '100%',
  height = '100%',
  controlsPosition = 'outer-top',
  font = "'Roboto', sans-serif",
  fontSize = undefined,
  controlsScale = 1,
}: IProps) => {
  //
  //
  // Define stateful params
  const [svgId] = useState('svg-' + simpleUID());
  const [worldDaylightMap] = useState<WDMG>(new WDMG(svgId));
  const [fontScaleFactor, setFontScaleFactor] = useState(1);

  // Get Styles
  const classes = useStyles(
    { width, height, controlsPosition, font, fontSize, controlsScale },
    fontScaleFactor
  )();

  // Initialize svg with unique id
  useEffect(() => {
    worldDaylightMap.init();
  }, [worldDaylightMap]);

  // Determine controlsPositionClass based on controlsPosition input
  let controlsPositionClass = classes.controlsPositionTop;
  switch (controlsPosition) {
    case 'outer-top':
      controlsPositionClass = classes.controlsPositionOuterTop;
      break;
    case 'top-left':
      controlsPositionClass = classes.controlsPositionTopLeft;
      break;
    case 'top-right':
      controlsPositionClass = classes.controlsPositionTopRight;
      break;
    case 'bottom':
      controlsPositionClass = classes.controlsPositionBottom;
      break;
    case 'bottom-left':
      controlsPositionClass = classes.controlsPositionBottomLeft;
      break;
    case 'bottom-right':
      controlsPositionClass = classes.controlsPositionBottomRight;
      break;
    case 'no-controls':
      controlsPositionClass = classes.controlsPositionNoControls;
      break;
  }

  return (
    <div
      className={classes.container}
      ref={el => {
        if (!!el && !!el.clientWidth) {
          const containerWidth = el.clientWidth;
          let fsf = containerWidth / 1200;
          setFontScaleFactor(fsf);
        }
      }}
    >
      <svg id={svgId} />
      <div className={classes.controls + ' ' + controlsPositionClass}>
        <div className={classes.timezoneLabel}>
          <span className={classes.timezoneLabel} id="timezone-label-text">
            {' '}
          </span>
        </div>
        <div
          className={classes.decreaseTimezone + ' ' + classes.arrowWrapper}
          id="decrease-timezone"
          onClick={() => !!worldDaylightMap && worldDaylightMap.redrawAll(-60)}
        >
          <span className={classes.arrow}> &rsaquo; </span>
        </div>
        <div className={classes.time}>
          <span className={classes.timeText} id="time-text">
            {' '}
          </span>
        </div>
        <div
          className={classes.increaseTimezone + ' ' + classes.arrowWrapper}
          id="increase-timezone"
          onClick={() => !!worldDaylightMap && worldDaylightMap.redrawAll(60)}
        >
          <span className={classes.arrow}> &lsaquo; </span>
        </div>
        <div
          className={classes.decreaseMonth + ' ' + classes.arrowWrapper}
          id="decrease-month"
          onClick={() =>
            !!worldDaylightMap && worldDaylightMap.redrawAll(-43200)
          }
        >
          <span className={classes.arrow}> &lsaquo;</span>
          <span className={classes.arrow}>&lsaquo; </span>
        </div>
        <div
          className={classes.decreaseDay + ' ' + classes.arrowWrapper}
          id="decrease-month"
          onClick={() =>
            !!worldDaylightMap && worldDaylightMap.redrawAll(-1440)
          }
        >
          <span className={classes.arrow}> &lsaquo; </span>
        </div>
        <div className={classes.date}>
          <span className={classes.dateText} id="date-text">
            {' '}
          </span>
        </div>
        <div
          className={classes.increaseDay + ' ' + classes.arrowWrapper}
          id="increase-day"
          onClick={() => !!worldDaylightMap && worldDaylightMap.redrawAll(1440)}
        >
          <span className={classes.arrow}> &rsaquo; </span>
        </div>
        <div
          className={classes.increaseMonth + ' ' + classes.arrowWrapper}
          id="increase-month"
          onClick={() =>
            !!worldDaylightMap && worldDaylightMap.redrawAll(43200)
          }
        >
          <span className={classes.arrow}>&rsaquo;</span>
          <span className={classes.arrow}>&rsaquo; </span>
        </div>
      </div>
    </div>
  );
};

export default WorldDaylightMap;
